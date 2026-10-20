import React, { useState } from 'react';
import { ShieldCheck, Check, X, Sparkles, CreditCard, HelpCircle, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MembershipFinancingProps {
  onOpenBooking: () => void;
}

export const MembershipFinancing: React.FC<MembershipFinancingProps> = ({ onOpenBooking }) => {
  const { membership, financing } = CLINIC_INFO;
  const [selectedPlan, setSelectedPlan] = useState<'adult' | 'child'>('adult');
  const [calcProcedure, setCalcProcedure] = useState<string>('crown');

  const PROCEDURES_CALC = [
    { id: 'crown', label: 'Ceramic Dental Crown', standardCost: 1450, discount: 0.25 },
    { id: 'veneer', label: 'Porcelain Aesthetic Veneer', standardCost: 1600, discount: 0.25 },
    { id: 'filling', label: 'Tooth-Colored Bio-Composite', standardCost: 320, discount: 0.25 },
    { id: 'implant', label: 'Single Implant Restoration', standardCost: 3400, discount: 0.25 }
  ];

  const currentCalc = PROCEDURES_CALC.find((p) => p.id === calcProcedure) || PROCEDURES_CALC[0];
  const memberCost = Math.round(currentCalc.standardCost * (1 - currentCalc.discount));
  const savings = currentCalc.standardCost - memberCost;

  return (
    <section id="membership" className="py-20 bg-stone-50/70 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">
            <span>Direct Patient Care</span>
            <span aria-hidden="true">·</span>
            <span>Zero Insurance Hassles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 tracking-tight text-balance">
            The My Dental Membership Plan.
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            No dental insurance? You do not need it. We created our direct wellness membership so you receive comprehensive preventive coverage and an immediate 25% discount on all restorative and cosmetic dentistry.
          </p>
        </div>

        {/* Membership Details & Interactive Savings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Plan Inclusions Card */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Annual Wellness Subscription
                </span>
                <h3 className="text-2xl font-serif text-slate-900">
                  My Dental Membership
                </h3>
              </div>

              {/* Adult / Child Toggle */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200">
                <button
                  onClick={() => setSelectedPlan('adult')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedPlan === 'adult' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Adult ($379/yr)
                </button>
                <button
                  onClick={() => setSelectedPlan('child')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedPlan === 'child' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Child ($299/yr)
                </button>
              </div>
            </div>

            {/* Inclusions List */}
            <div className="py-6 space-y-3.5">
              {membership.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                No deductibles · No annual maximums · Immediate activation
              </div>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-2xs"
              >
                Enroll in Membership
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 25% Discount Calculator */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Calculate Your Member Savings
              </span>
              <h4 className="text-lg font-serif font-bold text-slate-900 mb-4">
                25% Instant Procedure Discount
              </h4>

              <div className="space-y-2 mb-6">
                <label className="text-xs text-slate-600 font-medium">Select a Treatment:</label>
                <div className="grid grid-cols-2 gap-2">
                  {PROCEDURES_CALC.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setCalcProcedure(p.id)}
                      className={`p-2 rounded-lg border text-xs text-left transition-all ${
                        calcProcedure === p.id
                          ? 'border-slate-900 bg-stone-100 font-semibold text-slate-900'
                          : 'border-stone-200 text-slate-600 bg-white hover:border-stone-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price comparison numbers */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Standard Non-Insured Rate:</span>
                  <span className="line-through font-mono text-slate-400 tabular-nums">
                    ${currentCalc.standardCost}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                  <span>With My Dental Membership:</span>
                  <span className="font-mono text-emerald-700 text-base tabular-nums">
                    ${memberCost}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200/70 flex justify-between items-center text-xs font-medium text-slate-700">
                  <span>You Save Instantly:</span>
                  <span className="font-mono text-slate-900 tabular-nums">
                    ${savings} ({currentCalc.discount * 100}%)
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
              *The plan easily pays for itself on a single major restoration while covering 100% of your annual cleanings, digital checkups, and emergency visit.
            </p>
          </div>
        </div>

        {/* Traditional Insurance vs. My Dental Membership Comparison Table */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 mb-16 overflow-x-auto">
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">
            Compare: Traditional Dental Insurance vs. Our In-House Plan
          </h3>

          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4">Traditional PPO Insurance</th>
                <th className="py-3 px-4 text-slate-900 bg-stone-50/70 rounded-t-lg">My Dental Membership</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-slate-700">
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Annual Maximums</td>
                <td className="py-3.5 px-4 text-slate-500">Usually capped at $1,000–$1,500/year</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900 bg-stone-50/70">No Annual Cap or Maximums</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Waiting Periods</td>
                <td className="py-3.5 px-4 text-slate-500">6 to 12 months for major work</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900 bg-stone-50/70">Zero Waiting Period (Immediate)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Pre-Authorizations</td>
                <td className="py-3.5 px-4 text-slate-500">Required; claims often denied or delayed</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900 bg-stone-50/70">None; Dr. Licina designs your care directly</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Cosmetic Dentistry Coverage</td>
                <td className="py-3.5 px-4 text-slate-500">Excluded (0% covered)</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900 bg-stone-50/70">25% Discount on ALL Cosmetic Care</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-slate-900">Routine Cleanings & 3D Scans</td>
                <td className="py-3.5 px-4 text-slate-500">Subject to copays and deductible limits</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900 bg-stone-50/70">100% Included at $0 Out-of-Pocket</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financing Partners Block (CareCredit, Cherry, Alphaeon) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-md">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Flexible Financing Options
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif mt-1">
              Care When You Need It, Budgeted on Your Terms.
            </h3>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
              We partner with premier healthcare financing lenders offering up to 24 months of deferred interest with low or zero down payment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financing.map((f, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {f.provider}
                  </h4>
                  <p className="text-xs font-medium text-[#D4AF37] mb-2">
                    {f.headline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {f.details}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-slate-400">
                  Instant decision · Soft credit check
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
