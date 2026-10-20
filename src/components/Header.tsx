import React, { useState } from 'react';
import { Phone, Menu, X, Calendar, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  onOpenBooking: (service?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      {/* Discreet Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>2500 E Oakland Park Blvd, Fort Lauderdale</span>
            </span>
            <span className="hidden md:inline-block text-slate-500" aria-hidden="true">·</span>
            <span className="hidden md:inline-block text-slate-400">
              Saturday Appointments Available
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
              className="flex items-center gap-1.5 font-medium text-white hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono">{CLINIC_INFO.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            className="text-xl sm:text-2xl font-serif font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            My Dentist Fort Lauderdale
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a
              href="#services"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#doctor"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Dr. Licina
            </a>
            <a
              href="#technology"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              3D Technology
            </a>
            <a
              href="#membership"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Membership & Costs
            </a>
            <a
              href="#reviews"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              Patient Reviews
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all shadow-2xs whitespace-nowrap shrink-0"
            >
              Book Appointment
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-3">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-slate-900 py-1"
              >
                Services & Treatments
              </a>
              <a
                href="#doctor"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-slate-900 py-1"
              >
                Meet Dr. Zelka Licina
              </a>
              <a
                href="#technology"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-slate-900 py-1"
              >
                Interactive 3D Technology
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-slate-900 py-1"
              >
                Smile Transformation Gallery
              </a>
              <a
                href="#membership"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-slate-900 py-1"
              >
                My Dental Membership Plan
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-slate-900 py-1"
              >
                Verified Reviews
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-slate-900 py-1"
              >
                Location & Hours
              </a>
            </nav>

            <div className="pt-4 border-t border-stone-200 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-sm font-semibold text-white bg-slate-900 rounded-lg text-center"
              >
                Request an Appointment
              </button>
              <a
                href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
                className="w-full py-3 text-sm font-medium text-slate-800 bg-stone-100 rounded-lg text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-slate-700" />
                <span>Call (954) 408-9282</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
