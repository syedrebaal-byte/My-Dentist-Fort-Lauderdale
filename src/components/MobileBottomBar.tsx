import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 shadow-lg flex items-center gap-3">
      <a
        href={`tel:${CLINIC_INFO.contact.phoneRaw}`}
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-slate-700" />
        <span>Call Office</span>
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Visit</span>
      </button>
    </div>
  );
};
