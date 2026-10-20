import React from 'react';
import { ArrowRight, Phone, Award, Shield, Clock, Calendar, CheckCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative bg-gradient-to-b from-stone-50 via-white to-stone-50/50 pt-8 sm:pt-14 pb-16 border-b border-stone-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Proposition & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Metadata Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">
              <span>Boutique Dental Studio</span>
              <span aria-hidden="true">·</span>
              <span>East Fort Lauderdale</span>
              <span aria-hidden="true">·</span>
              <span>Dr. Zelka Licina, DDS</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.12] font-serif font-semibold text-slate-900 tracking-tight text-balance">
              Uncompromising Dental Artistry in Fort Lauderdale.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Led by Dr. Zelka Licina (NYU College of Dentistry & Columbia University Medical Center trained), our boutique 2500 E Oakland Park Blvd practice pairs advanced 3D digital precision with tranquil, unhurried patient care.
            </p>

            {/* Primary & Secondary Action Block */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-sm"
              >
                <span>Request Your Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-800 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                <span>Call (954) 408-9282</span>
              </a>
            </div>

            {/* Verified Patient Trust Points */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium text-slate-800">
                <CheckCircle className="w-4 h-4 text-slate-900" />
                <span>NYU & Columbia University Alumni</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-800">
                <CheckCircle className="w-4 h-4 text-slate-900" />
                <span>Saturday Appointments Available</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-800">
                <CheckCircle className="w-4 h-4 text-slate-900" />
                <span>Major PPO Plans & 0% Financing</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Asset */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="relative w-full h-[380px] sm:h-[460px] lg:h-full min-h-[380px] rounded-2xl overflow-hidden border border-stone-200/90 shadow-md bg-stone-100">
              <img
                src="/images/hero-suite.jpg"
                alt="My Dentist of Fort Lauderdale luxury dental operatory suite with coastal view"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              {/* Ambient Scrim & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-900 mb-0.5">
                  <span>Private Operatory Suites</span>
                  <span className="text-[11px] text-slate-500 font-normal">East Oakland Park Blvd</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Designed for patient tranquility with ergonomic dental chairs, ceiling entertainment, and digital 3D intraoral diagnostics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI & Verified Trust Strip (Full-Width Row Below Hero) */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-stone-200/80">
          <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
              Columbia & NYU
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Ivy League & NYU Post-Doctoral Residency
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
              Saturday Hours
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Open 8:00 AM – 3:00 PM for Busy Schedules
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
              25% Savings
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              In-House My Dental Membership for Non-Insured
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">
              0% Financing
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              CareCredit, Cherry & Alphaeon Deferred Interest
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
