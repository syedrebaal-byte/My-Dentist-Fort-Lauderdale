import React from 'react';
import { Star, Quote, CheckCircle, Shield } from 'lucide-react';
import { REVIEWS } from '../data/clinicData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
              <span>Patient Experiences</span>
              <span aria-hidden="true">·</span>
              <span>Verified Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 tracking-tight text-balance">
              Trusted by Discerning Patients Across Fort Lauderdale.
            </h2>
            <p className="mt-3 text-slate-600 text-base leading-relaxed">
              Read authentic feedback from patients who entrusted Dr. Zelka Licina with their smile transformations and lifelong oral health.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl self-start md:self-auto">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs text-slate-700 font-medium">
              <span className="font-bold text-slate-900 font-mono">5.0 / 5.0</span> Average Patient Rating
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 sm:p-7 rounded-2xl border border-stone-200/90 bg-stone-50/50 flex flex-col justify-between hover:bg-stone-50 transition-colors"
            >
              <div>
                {/* Review Header */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#D4AF37]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 font-medium text-[11px]">
                    <span>{review.source}</span>
                    <span aria-hidden="true">·</span>
                    <span>{review.date}</span>
                  </div>
                </div>

                {/* Treatment tag */}
                <div className="text-xs font-medium text-slate-800 mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>{review.treatment}</span>
                </div>

                {/* Quote */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-5 pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{review.author}</span>
                <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Verified Patient
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Lounge Feature Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-md">
          <div className="h-[280px] sm:h-[340px] w-full relative">
            <img
              src="/images/lounge-interior.jpg"
              alt="My Dentist of Fort Lauderdale reception lounge"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent flex items-center p-6 sm:p-12">
              <div className="max-w-lg text-white">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#D4AF37] block mb-2">
                  Hospitality Meets Modern Medicine
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                  A Relaxing Haven on East Oakland Park Boulevard.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Step away from sterile, cold dental clinics. Enjoy freshly brewed espresso, ambient music, and a calm, coastal design tailored for your tranquility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
