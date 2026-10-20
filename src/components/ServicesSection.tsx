import React, { useState } from 'react';
import { ArrowRight, Check, Clock, Sparkles, ChevronRight, X, ShieldAlert } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/clinicData';

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'cosmetic', label: 'Cosmetic Veneers' },
    { id: 'implants', label: 'Dental Implants' },
    { id: 'restorative', label: 'Restorative & Crowns' },
    { id: 'wellness', label: 'Hygiene & TMJ' },
    { id: 'emergency', label: 'Emergency Care' }
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
              <span>Comprehensive Dental Care</span>
              <span aria-hidden="true">·</span>
              <span>Fort Lauderdale, FL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 tracking-tight text-balance">
              Precision Clinical Dentistry Grounded in Biology.
            </h2>
            <p className="mt-3 text-slate-600 text-base leading-relaxed">
              Every procedure is delivered with gentle patience, computer-assisted diagnostics, and natural aesthetic refinement.
            </p>
          </div>

          {/* Functional Category Filter (Segmented control) */}
          <div className="flex flex-wrap gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start md:self-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeCategory === c.id
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const isMarquee = service.id === 'cosmetic-veneers' || service.id === 'dental-implants';
            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all hover:shadow-md ${
                  isMarquee
                    ? 'bg-stone-50/70 border-stone-300/80'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div>
                  {/* Clean Editorial Numbering */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                    <span>{`0${idx + 1}.`}</span>
                    <span className="uppercase text-[11px] font-sans font-medium tracking-wider text-slate-500">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 mb-6">
                    {service.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/70 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 underline underline-offset-4"
                  >
                    Details & FAQs
                  </button>

                  <button
                    onClick={() => onOpenBooking(service.title)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <span>Reserve</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Deep-Dive Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-100"
              aria-label="Close treatment details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              <span>Treatment Overview</span>
              <span aria-hidden="true">·</span>
              <span>{selectedService.category}</span>
            </div>

            <h3 className="text-2xl font-serif text-slate-900 mb-2">
              {selectedService.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <div className="space-y-4 mb-6 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-semibold text-slate-900 block mb-1">Expected Visit Duration:</span>
                <span className="text-slate-600">{selectedService.duration}</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-semibold text-slate-900 block mb-1">Recovery & Downtime:</span>
                <span className="text-slate-600">{selectedService.recovery}</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-semibold text-slate-900 block mb-1">Ideal Candidate:</span>
                <span className="text-slate-600">{selectedService.bestFor}</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Clinical Advantages
              </p>
              {selectedService.benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onOpenBooking(serviceName);
                }}
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors text-center"
              >
                Book This Treatment
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="w-full py-2.5 text-xs font-medium text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
