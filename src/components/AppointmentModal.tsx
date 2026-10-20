import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, ShieldCheck, CheckCircle2, User, Phone, Mail, FileText, Download } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const APPOINTMENT_REASONS = [
  { id: 'new-patient', label: 'New Patient Comprehensive Exam & 3D Scans' },
  { id: 'veneers', label: 'Cosmetic Veneers & Smile Makeover Consultation' },
  { id: 'implants', label: 'Dental Implants — Complimentary 3D Consultation' },
  { id: 'invisalign', label: 'Clear Aligners / Invisalign Orthodontic Scan' },
  { id: 'cleaning', label: 'Routine Professional Ultrasonic Cleaning & Hygiene' },
  { id: 'emergency', label: 'Same-Day Urgent Care / Tooth Pain Emergency' },
  { id: 'tmj-botox', label: 'Therapeutic Botox & TMJ Jaw Relief' }
];

const TIME_SLOTS = [
  '8:30 AM',
  '9:45 AM',
  '11:00 AM',
  '1:15 PM',
  '2:30 PM',
  '4:00 PM',
  '5:30 PM (Wednesdays Only)'
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedReason, setSelectedReason] = useState<string>(preselectedService || 'new-patient');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('9:45 AM');
  const [paymentOption, setPaymentOption] = useState<string>('insurance');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedReason(preselectedService);
    }
  }, [preselectedService]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Default date to next business day
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1); // skip Sunday
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
      setStep(1);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;
    setIsSubmitted(true);
  };

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//My Dentist of Fort Lauderdale//Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Dental Visit with Dr. Zelka Licina — My Dentist FTL`,
      `DESCRIPTION:Appointment: ${selectedReason}. Location: 2500 E Oakland Park Blvd, Fort Lauderdale, FL 33306. Call: (954) 408-9282`,
      `LOCATION:2500 E Oakland Park Blvd, Fort Lauderdale, FL 33306`,
      `DTSTART:${selectedDate.replace(/-/g, '')}T140000Z`,
      `DTEND:${selectedDate.replace(/-/g, '')}T150000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'MyDentistFTL-Appointment.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
              My Dentist of Fort Lauderdale
            </span>
            <h3 id="modal-title" className="text-base font-semibold text-slate-900">
              {isSubmitted ? 'Appointment Requested' : 'Schedule Your Visit'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-200/50 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Progress Steps Indicator */}
              <div className="grid grid-cols-3 gap-2 pb-2">
                {[
                  { num: 1, label: 'Service' },
                  { num: 2, label: 'Date & Time' },
                  { num: 3, label: 'Patient Info' }
                ].map((s) => (
                  <button
                    type="button"
                    key={s.num}
                    onClick={() => setStep(s.num)}
                    className={`text-left p-2 rounded-lg border text-xs transition-all ${
                      step === s.num
                        ? 'border-slate-900 bg-stone-100/70 font-semibold text-slate-900'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <span className="font-mono text-[10px] block opacity-70">STEP 0{s.num}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: Select Service */}
              {step === 1 && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    What is the primary reason for your visit?
                  </label>
                  <div className="space-y-2">
                    {APPOINTMENT_REASONS.map((reason) => (
                      <label
                        key={reason.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                          selectedReason === reason.id
                            ? 'border-slate-900 bg-stone-50 font-medium text-slate-900 shadow-2xs'
                            : 'border-stone-200 hover:border-stone-300 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={reason.id}
                          checked={selectedReason === reason.id}
                          onChange={(e) => setSelectedReason(e.target.value)}
                          className="text-slate-900 focus:ring-slate-900"
                        />
                        <span>{reason.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Next: Choose Date & Time →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none"
                        required
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      We offer Saturday appointments (8 AM–3 PM) and Wednesday evening hours (10 AM–7 PM).
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3 py-2 text-xs rounded-lg border text-center transition-all ${
                            selectedTime === slot
                              ? 'border-slate-900 bg-slate-900 text-white font-medium'
                              : 'border-stone-200 hover:border-stone-300 text-slate-700 bg-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Payment / Insurance Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'insurance', label: 'PPO Insurance' },
                        { id: 'membership', label: 'My Dental Membership' },
                        { id: 'financing', label: '0% APR Financing' }
                      ].map((opt) => (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setPaymentOption(opt.id)}
                          className={`p-2.5 text-xs rounded-lg border text-center transition-all ${
                            paymentOption === opt.id
                              ? 'border-slate-900 bg-stone-100 font-medium text-slate-900'
                              : 'border-stone-200 text-slate-600 bg-white'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Next: Patient Details →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Patient Information */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Jessica Sterling"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="(954) 555-0192"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="jessica@example.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Notes or Dental Goals (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Interested in cosmetic veneers, experiencing mild sensitivity on upper right molar..."
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none"
                    />
                  </div>

                  <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      HIPAA Protected: We respect your privacy. Our clinical concierge will contact you promptly to verify your appointment and answer any questions.
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={!patientName || !patientPhone}
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-sm"
                    >
                      Confirm Appointment Request
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* Confirmation State */
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Request Received
                </span>
                <h3 className="text-2xl font-serif text-slate-900 mt-1">
                  Thank You, {patientName}
                </h3>
                <p className="mt-2 text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Our concierge coordinator at <strong>2500 E Oakland Park Blvd</strong> has reserved your tentative time for{' '}
                  <span className="font-semibold text-slate-900">{selectedDate} at {selectedTime}</span>.
                </p>
              </div>

              {/* Appointment Summary Box */}
              <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-medium text-slate-900 text-right">{selectedReason}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-medium text-slate-900">{selectedDate} ({selectedTime})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-slate-500">Practice:</span>
                  <span className="font-medium text-slate-900">Dr. Zelka Licina, DDS</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-medium text-slate-900">2500 E Oakland Park Blvd, FTL</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadIcs}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Add to Apple / Google Calendar</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Close & Return to Site
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Need urgent care right now? Call our clinic directly at{' '}
                <a href="tel:+19544089282" className="text-slate-900 underline font-medium">
                  (954) 408-9282
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
