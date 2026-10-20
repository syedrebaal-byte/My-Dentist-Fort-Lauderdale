import React from 'react';
import { Interactive3DViewer } from './Interactive3DViewer';
import { Cpu, Eye, ShieldCheck, Zap } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="py-20 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
            <span>Modern Digital Precision</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Impression Workflows</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 tracking-tight text-balance">
            Advanced Diagnostics for Effortless Patient Comfort.
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            We have retired outdated impression goop, bulky trays, and high-radiation film. Our Fort Lauderdale studio operates on a fully digital architecture engineered for microscopic accuracy.
          </p>
        </div>

        {/* 3D Interactive Restorations Viewer */}
        <div className="mb-14">
          <Interactive3DViewer />
        </div>

        {/* Technology Triad / Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-slate-900 mb-4 shadow-2xs">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-slate-900 mb-2">
                3D Optical Intraoral Scanning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Captures over 6,000 high-definition images per second to construct an exact microscopic digital twin of your teeth in under two minutes without gagging or mess.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] font-medium text-slate-700">
              Zero physical impression paste
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-slate-900 mb-4 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-slate-900 mb-2">
                Ultra-Low Dose Digital Sensors
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emits up to 80% less radiation than traditional dental X-rays while producing instant, crystal-clear diagnostic imaging displayed on chairside monitors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] font-medium text-slate-700">
              Instant diagnostic clarity
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-slate-900 mb-4 shadow-2xs">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-slate-900 mb-2">
                Digital Smile Design (DSD)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Preview your future smile before any enamel is touched. We map tooth proportions to your facial aesthetics, lip line, and natural speech dynamics.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/70 text-[11px] font-medium text-slate-700">
              Predictable aesthetic outcomes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
