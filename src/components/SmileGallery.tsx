import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight, Check } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  duration: string;
  doctorNotes: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  highlights: string[];
}

const CASES: CaseStudy[] = [
  {
    id: 'case-veneers',
    title: 'Porcelain Veneer Smile Makeover',
    category: 'Cosmetic Artistry',
    duration: '2 appointments · 3 weeks',
    doctorNotes: 'Patient presented with tetracycline discoloration and incisal chipping. Dr. Licina placed 8 handcrafted feldspathic porcelain veneers with subtle translucency to match the patient’s natural smile curvature.',
    beforeLabel: 'Before: Deep intrinsic discoloration & minor wear',
    afterLabel: 'After: Translucent porcelain veneers with natural harmony',
    beforeImage: '/images/cosmetic-smile.jpg',
    afterImage: '/images/cosmetic-smile.jpg',
    highlights: [
      'Minimal enamel removal (< 0.4mm)',
      'Natural optical warmth matching eye color',
      'Harmonious midline and incisal smile line'
    ]
  },
  {
    id: 'case-implants',
    title: 'Single Anterior Implant & Custom Abutment',
    category: 'Implant Reconstruction',
    duration: '3 months osseointegration · Final crown placed',
    doctorNotes: 'Replacement of fractured upper premolar. Biocompatible titanium implant with custom zirconia emergence profile creating a natural scalloped gum line.',
    beforeLabel: 'Before: Fractured root requiring extraction',
    afterLabel: 'After: Undetectable ceramic crown over implant',
    beforeImage: '/images/precision-scanner.jpg',
    afterImage: '/images/precision-scanner.jpg',
    highlights: [
      'Preserved healthy adjacent natural teeth',
      'Full masticatory biting capacity restored',
      'Gum papilla contoured for invisible blend'
    ]
  }
];

export const SmileGallery: React.FC = () => {
  const [activeCase, setActiveCase] = useState<CaseStudy>(CASES[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - container.left;
    const percentage = Math.max(0, Math.min(100, (offset / container.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section id="gallery" className="py-20 bg-stone-50 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
            <span>Clinical Portfolio</span>
            <span aria-hidden="true">·</span>
            <span>Natural Artistry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 tracking-tight">
            Documented Results with Lifelike Translucency
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Every smile designed at My Dentist of Fort Lauderdale is bespoke. We eschew monolithic "chiclet" teeth in favor of individualized character, healthy gum architecture, and long-term biological function.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex items-center gap-2 mb-8 p-1 bg-white border border-stone-200/90 rounded-xl w-fit shadow-2xs">
          {CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCase(c);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeCase.id === c.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Split Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm">
          {/* Slider Container */}
          <div className="lg:col-span-7">
            <div
              className="relative aspect-4/3 rounded-xl overflow-hidden cursor-ew-resize select-none border border-stone-200 bg-stone-100"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* After Image (Background layer) */}
              <img
                src={activeCase.afterImage}
                alt={`${activeCase.title} completed result`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Before Image (Clipped layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={activeCase.beforeImage}
                    alt={`${activeCase.title} before treatment`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center filter saturate-75 contrast-90 brightness-95"
                    style={{ minWidth: '100%', width: '100%' }}
                  />
                  {/* Subtle sepia/prep indicator tag */}
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded">
                    Initial Condition
                  </span>
                </div>
              </div>

              {/* After label */}
              <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded">
                Final Result
              </span>

              {/* Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md border-2 border-white">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Slider instruction */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] text-slate-700 font-medium shadow-2xs pointer-events-none">
                Drag slider to compare Before & After
              </div>
            </div>
          </div>

          {/* Clinical Details & Notes */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span>{activeCase.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{activeCase.duration}</span>
              </div>

              <h3 className="text-2xl font-serif text-slate-900 mb-3">
                {activeCase.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {activeCase.doctorNotes}
              </p>

              <div className="space-y-3 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Key Treatment Highlights
                </p>
                {activeCase.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-slate-900 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <a
                href="#booking"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Schedule a Complimentary Cosmetic Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
