import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sun, Sparkles, ZoomIn, Info, CheckCircle2 } from 'lucide-react';

interface Hotspot {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  description: string;
  specs: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'enamel',
    name: 'Translucent Feldspathic Ceramic',
    category: 'Aesthetic Layer',
    position: [0, 1.3, 0.7],
    description: 'Custom multi-layered porcelain mimicking the natural light transmission, opalescence, and mammelons of human tooth enamel.',
    specs: '0.3mm ultra-thin preparation with 99.4% biocompatibility'
  },
  {
    id: 'margin',
    name: 'Precision CAD/CAM Marginal Seal',
    category: 'Structural Fit',
    position: [0.8, 0.1, 0.5],
    description: 'Digital 3D intraoral optical scan ensures sub-micron margin fit, preventing micro-leakage and secondary caries.',
    specs: '< 25 micron marginal discrepancy'
  },
  {
    id: 'core',
    name: 'High-Density Zirconia / Lithium Disilicate Core',
    category: 'Load-Bearing Core',
    position: [0, -0.6, 0.4],
    description: 'Internal ceramic substructure engineered to withstand up to 500+ MPa of chewing forces without fractures or chipping.',
    specs: 'Up to 500 MPa flexural strength'
  },
  {
    id: 'root',
    name: 'Titanium Implant Abutment Collar',
    category: 'Osseointegration',
    position: [0, -1.5, 0],
    description: 'Biocompatible grade-5 titanium foundation integrating directly with the alveolar bone for permanent stability.',
    specs: 'Bio-inert grade 5 medical titanium'
  }
];

export const Interactive3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[0]);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'warm' | 'clinical'>('studio');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const mainLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.PointLight | null>(null);

  // Rotation controls
  const pointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.15, y: 0.4 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 5.2);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 3. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff8ee, 2.0);
    mainLight.position.set(3, 4, 4);
    scene.add(mainLight);
    mainLightRef.current = mainLight;

    const fillLight = new THREE.PointLight(0xdce7f6, 1.4, 20);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 1.2);
    rimLight.position.set(0, -3, -3);
    scene.add(rimLight);

    // 4. Procedural High-Precision Tooth & Crown Geometry
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Porcelain Crown (Enamel shell with cusps)
    const crownMat = new THREE.MeshPhysicalMaterial({
      color: 0xfdfdfc,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transmission: 0.25,
      thickness: 1.2,
      ior: 1.52,
      specularIntensity: 0.9,
      specularColor: 0xffffff
    });

    // Anatomical Crown body
    const crownGeo = new THREE.CylinderGeometry(1.05, 0.88, 1.2, 48, 16);
    // Sculpt crown cusps procedurally
    const crownPos = crownGeo.attributes.position;
    for (let i = 0; i < crownPos.count; i++) {
      const x = crownPos.getX(i);
      const y = crownPos.getY(i);
      const z = crownPos.getZ(i);
      if (y > 0.3) {
        // Create 4 distinct occlusal dental cusps
        const angle = Math.atan2(z, x);
        const cuspWave = Math.sin(angle * 4) * 0.14 + Math.cos(angle * 2) * 0.06;
        const radialDist = Math.sqrt(x * x + z * z);
        crownPos.setY(i, y + cuspWave * (radialDist / 1.05));
      }
    }
    crownGeo.computeVertexNormals();
    const crownMesh = new THREE.Mesh(crownGeo, crownMat);
    crownMesh.position.y = 0.6;
    modelGroup.add(crownMesh);

    // Occlusal Central Pit & Fissures
    const topCapGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.1, 32);
    const topCapMat = new THREE.MeshStandardMaterial({
      color: 0xfaf4eb,
      roughness: 0.4,
      metalness: 0.02
    });
    const topCap = new THREE.Mesh(topCapGeo, topCapMat);
    topCap.position.y = 1.15;
    modelGroup.add(topCap);

    // Cervical Collar / Margin Line
    const marginGeo = new THREE.TorusGeometry(0.88, 0.045, 16, 64);
    const marginMat = new THREE.MeshStandardMaterial({
      color: 0xe6e1d8,
      roughness: 0.3,
      metalness: 0.2
    });
    const marginMesh = new THREE.Mesh(marginGeo, marginMat);
    marginMesh.rotation.x = Math.PI / 2;
    marginMesh.position.y = 0.0;
    modelGroup.add(marginMesh);

    // Anatomical Root structure / Substructure
    const rootMat = new THREE.MeshStandardMaterial({
      color: 0xd8d4cb,
      roughness: 0.35,
      metalness: 0.15
    });

    // Root 1 (Mesial)
    const root1Geo = new THREE.ConeGeometry(0.42, 1.6, 24);
    root1Geo.translate(0, -0.8, 0);
    const root1 = new THREE.Mesh(root1Geo, rootMat);
    root1.position.set(-0.35, 0, 0.15);
    root1.rotation.z = -0.12;
    modelGroup.add(root1);

    // Root 2 (Distal)
    const root2Geo = new THREE.ConeGeometry(0.4, 1.5, 24);
    root2Geo.translate(0, -0.75, 0);
    const root2 = new THREE.Mesh(root2Geo, rootMat);
    root2.position.set(0.35, 0, -0.15);
    root2.rotation.z = 0.12;
    modelGroup.add(root2);

    // Implant Titanium Core Pin (internal structure)
    const implantCollarGeo = new THREE.CylinderGeometry(0.32, 0.38, 1.8, 32);
    const implantMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.25
    });
    const implantPin = new THREE.Mesh(implantCollarGeo, implantMat);
    implantPin.position.y = -0.9;
    modelGroup.add(implantPin);

    // Hotspot Anchor Markers
    const markerGroup = new THREE.Group();
    modelGroup.add(markerGroup);

    HOTSPOTS.forEach((hs) => {
      const pinGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(...hs.position);

      const glowGeo = new THREE.RingGeometry(0.08, 0.12, 24);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.set(...hs.position);
      glow.position.z += 0.02;

      markerGroup.add(pin);
      markerGroup.add(glow);
    });

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (modelGroupRef.current) {
        if (isAutoRotating && !isDragging) {
          targetRotationRef.current.y += delta * 0.45;
        }

        // Smooth damping
        modelGroupRef.current.rotation.y += (targetRotationRef.current.y - modelGroupRef.current.rotation.y) * 0.1;
        modelGroupRef.current.rotation.x += (targetRotationRef.current.x - modelGroupRef.current.rotation.x) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 460;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      crownGeo.dispose();
      root1Geo.dispose();
      root2Geo.dispose();
      implantCollarGeo.dispose();
    };
  }, [isAutoRotating, isDragging]);

  // Lighting presets update
  useEffect(() => {
    if (!mainLightRef.current || !fillLightRef.current) return;
    if (lightingPreset === 'studio') {
      mainLightRef.current.color.setHex(0xfff8ee);
      mainLightRef.current.intensity = 2.0;
      fillLightRef.current.color.setHex(0xdce7f6);
      fillLightRef.current.intensity = 1.4;
    } else if (lightingPreset === 'warm') {
      mainLightRef.current.color.setHex(0xffecd2);
      mainLightRef.current.intensity = 2.4;
      fillLightRef.current.color.setHex(0xfde047);
      fillLightRef.current.intensity = 1.0;
    } else if (lightingPreset === 'clinical') {
      mainLightRef.current.color.setHex(0xf8fafc);
      mainLightRef.current.intensity = 2.6;
      fillLightRef.current.color.setHex(0xe2e8f0);
      fillLightRef.current.intensity = 1.8;
    }
  }, [lightingPreset]);

  // Mouse & Touch Orbit Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    pointerPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - pointerPosRef.current.x;
    const deltaY = e.clientY - pointerPosRef.current.y;
    pointerPosRef.current = { x: e.clientX, y: e.clientY };

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x = Math.max(-0.6, Math.min(0.6, targetRotationRef.current.x + deltaY * 0.008));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleResetView = () => {
    targetRotationRef.current = { x: 0.15, y: 0.4 };
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-stone-100/90 to-stone-50/70 border border-stone-200/80 p-6 shadow-sm overflow-hidden">
      {/* Top Header & Mode Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-stone-200/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500">
            <span>Interactive 3D Technology</span>
            <span aria-hidden="true">·</span>
            <span>Digital Smile Anatomy</span>
          </div>
          <h4 className="text-lg font-semibold text-slate-900 mt-0.5">
            Micro-Engineered Ceramic Restoration
          </h4>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-stone-200 shadow-2xs">
            <button
              onClick={() => setLightingPreset('studio')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                lightingPreset === 'studio' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Studio Lighting"
            >
              Studio
            </button>
            <button
              onClick={() => setLightingPreset('warm')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                lightingPreset === 'warm' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Warm Lighting"
            >
              Warm
            </button>
            <button
              onClick={() => setLightingPreset('clinical')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                lightingPreset === 'clinical' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Clinical 5500K"
            >
              Clinical
            </button>
          </div>

          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-lg border border-stone-200 text-xs transition-colors ${
              isAutoRotating ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-stone-50'
            }`}
            title={isAutoRotating ? 'Pause rotation' : 'Start auto-rotate'}
            aria-label="Toggle auto rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetView}
            className="p-2 rounded-lg border border-stone-200 bg-white text-slate-700 hover:bg-stone-50 text-xs transition-colors"
            title="Reset perspective"
            aria-label="Reset perspective"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div
          className="lg:col-span-7 relative h-[360px] sm:h-[420px] w-full rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div ref={mountRef} className="w-full h-full" />

          {/* Interactive drag hint */}
          <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm border border-stone-200/80 rounded-md px-3 py-1.5 text-xs text-slate-600 pointer-events-none flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>Drag to rotate 360° · Touch or mouse responsive</span>
          </div>
        </div>

        {/* Hotspot Inspector Cards */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">
            Inspect Structural Components
          </p>

          <div className="space-y-2">
            {HOTSPOTS.map((hs) => {
              const isSelected = activeHotspot.id === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspot(hs)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-sm'
                      : 'bg-white/60 hover:bg-white border-stone-200/90 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 text-sm">{hs.name}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{hs.category}</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                    {hs.description}
                  </p>
                  {isSelected && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-2 text-[11px] font-medium text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                      <span>{hs.specs}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2 p-3 bg-stone-100/70 rounded-lg text-xs text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              All restorations crafted with Dr. Licina are digitally designed in-house using digital optical scanning for biological longevity.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
