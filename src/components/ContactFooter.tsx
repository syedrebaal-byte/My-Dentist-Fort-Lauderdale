import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp, Navigation, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { CLINIC_INFO, FAQS } from '../data/clinicData';

interface ContactFooterProps {
  onOpenBooking: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenBooking }) => {
  const { contact, hours } = CLINIC_INFO;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQs Section */}
        <div className="mb-20 pb-16 border-b border-slate-800">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#D4AF37] block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
              Frequently Asked Patient Questions
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Clear, transparent answers about our clinical treatments, insurance coverage, and office visits.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-800/50 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-sm sm:text-base font-medium text-white hover:text-[#D4AF37] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800">
          {/* Clinic Brand & Overview */}
          <div className="lg:col-span-4">
            <span className="text-xl sm:text-2xl font-serif font-bold text-white block mb-2">
              My Dentist Fort Lauderdale
            </span>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Boutique cosmetic, dental implant, and comprehensive family dentistry led by Dr. Zelka Licina, DDS. Providing gentle, high-precision oral care to the Fort Lauderdale community.
            </p>

            <div className="space-y-3 text-xs">
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  {contact.address.street}, {contact.address.city}, {contact.address.state} {contact.address.zip}
                  <span className="block text-[11px] text-slate-400">
                    ({contact.address.neighborhood})
                  </span>
                </span>
              </a>

              <a
                href={`tel:${contact.phoneRaw}`}
                className="flex items-center gap-3 hover:text-white transition-colors font-mono"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-sm font-semibold text-white">{contact.phone}</span>
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{contact.email}</span>
              </a>
            </div>

            <div className="mt-6">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-900 bg-[#D4AF37] hover:bg-[#e6c148] rounded-lg transition-colors shadow-sm"
              >
                Request an Appointment
              </button>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Office Hours</span>
            </h4>

            <div className="space-y-2 text-xs">
              {hours.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1.5 border-b border-slate-800/60"
                >
                  <span className="text-slate-400">{h.day}</span>
                  <span className={`font-mono ${h.day === 'Saturday' ? 'text-[#D4AF37] font-semibold' : 'text-slate-200'}`}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-slate-800/60 rounded-lg text-[11px] text-slate-400">
              *Free reserved patient parking is available directly behind our building off E Oakland Park Blvd.
            </div>
          </div>

          {/* Location & Interactive Map Preview */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#D4AF37]" />
              <span>Visit Our Studio</span>
            </h4>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-800 aspect-16/9 relative group">
              <iframe
                title="Google Map location of My Dentist Fort Lauderdale"
                src="https://maps.google.com/maps?q=2500+E+Oakland+Park+Blvd,+Fort+Lauderdale,+FL+33306&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale contrast-125 opacity-85 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
              <div className="absolute bottom-2 right-2">
                <a
                  href={contact.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-900 bg-white/95 backdrop-blur-sm rounded shadow-sm hover:bg-white transition-colors"
                >
                  <span>Open Directions</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-slate-400">
              Conveniently located near the Intracoastal & Fort Lauderdale Beach, serving Coral Ridge, Victoria Park, and greater Broward County.
            </p>
          </div>
        </div>

        {/* Quiet Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} My Dentist of Fort Lauderdale. All rights reserved.</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Dr. Zelka Licina, DDS · 2500 E Oakland Park Blvd, Fort Lauderdale, FL 33306 · (954) 408-9282
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#doctor" className="hover:text-white transition-colors">Dr. Licina</a>
            <a href="#membership" className="hover:text-white transition-colors">Membership</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
