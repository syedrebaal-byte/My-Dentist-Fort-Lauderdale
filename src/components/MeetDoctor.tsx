import React from 'react';
import { Award, GraduationCap, Heart, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MeetDoctorProps {
  onOpenBooking: () => void;
}

export const MeetDoctor: React.FC<MeetDoctorProps> = ({ onOpenBooking }) => {
  const { leadDentist } = CLINIC_INFO;

  const amenities = [
    { title: 'Painless Computerized Anesthesia', desc: 'Precise computer-assisted delivery ensuring gentle, pinch-free comfort.' },
    { title: 'Ceiling Entertainment Screens', desc: 'Watch your favorite streaming shows or listen via noise-canceling headphones.' },
    { title: 'Warm Organic Scented Linens', desc: 'Heated neck wraps and warm lemon-scented towelettes for post-care relaxation.' },
    { title: 'Unrushed 1-on-1 Consultations', desc: 'Dr. Licina dedicates full attention to every patient with zero double-booking.' }
  ];

  return (
    <section id="doctor" className="py-20 bg-stone-50/70 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Studio Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-md bg-stone-100 aspect-4/5 max-w-md mx-auto lg:max-w-none">
              <img
                src="/images/dr-zelka-licina.jpg"
                alt="Dr. Zelka Licina, DDS - Lead Dentist at My Dentist of Fort Lauderdale"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />

              {/* Scrim Overlay & Name Plate */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-serif font-bold text-slate-900">
                      {leadDentist.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      NYU Dentistry & Columbia University Medical Center Residency
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Credentials & Practice Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
              <span>Meet Your Dentist</span>
              <span aria-hidden="true">·</span>
              <span>Clinical Leadership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 tracking-tight text-balance">
              "Dental care should feel restorative, personalized, and profoundly gentle."
            </h2>

            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {leadDentist.bio}
            </p>

            {/* Verified Education & Accreditations */}
            <div className="mt-6 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Post-Doctoral Education & Honors
              </p>
              {leadDentist.credentials.map((cred, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <GraduationCap className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                  <span className="font-medium">{cred}</span>
                </div>
              ))}
            </div>

            {/* Comfort Amenities Grid */}
            <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {amenities.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                  <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="mt-8">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-2xs"
              >
                Schedule an In-Person Consultation with Dr. Licina
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
