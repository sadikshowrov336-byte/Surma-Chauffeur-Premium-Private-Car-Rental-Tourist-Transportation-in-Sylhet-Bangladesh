import React from 'react';
import { ShieldCheck, Award, MessageSquare, Star, CheckCircle2, UserCheck } from 'lucide-react';
import { CHAUFFEURS, Chauffeur } from '../data/sylhetData';

export const ChauffeursTrust: React.FC = () => {
  return (
    <section id="chauffeurs" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Verified Local Chauffeurs
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Trained Professionals Who Know Every Corner of Sylhet
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            More than just drivers — our chauffeurs are polite local guides who ensure your safety, assist with boat counter navigation, take family photos, and know the cleanest highway rest stops.
          </p>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHAUFFEURS.map((driver) => (
            <div
              key={driver.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with avatar / status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-lg">
                    {driver.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Verified</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-stone-900">{driver.name}</h3>
                <div className="text-xs text-stone-500 mb-3">{driver.hometown}</div>

                {/* Unboxed metadata metrics */}
                <div className="flex items-center gap-2 text-xs text-stone-600 pb-3 mb-3 border-b border-stone-100">
                  <span className="font-semibold text-stone-900">{driver.experienceYears} Years Exp</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-0.5 text-amber-700 font-bold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{driver.rating}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{driver.tripsCompleted}+ Tours</span>
                </div>

                {/* Languages */}
                <div className="mb-3">
                  <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">Languages:</div>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-700">
                    {driver.languages.map((lang, idx) => (
                      <span key={idx} className="bg-stone-100 px-2 py-0.5 rounded text-stone-800 font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialty */}
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">Tour Specialty:</div>
                  <p className="text-xs text-stone-600 leading-snug">
                    {driver.specialty}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Background &amp; Drug Tested</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chauffeur Code of Conduct Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">Zero Commission Stops</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our drivers never force unwanted souvenir shops or kickback tourist traps. You choose where and when to stop.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">100% Non-Smoking Vehicles</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Strict smoke-free cabin policy. Vehicles are thoroughly vacuumed, fresh, and temperature-controlled before pickup.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">Ghat &amp; Boat Assistance</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Navigating local boat stands can be tricky for outsiders. Your driver guides you to official counters and ensures honest ticket prices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
