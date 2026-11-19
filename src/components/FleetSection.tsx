import React from 'react';
import { Users, Briefcase, Wind, Fuel, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { VEHICLES, Vehicle } from '../data/sylhetData';

interface FleetSectionProps {
  onSelectVehicle: (vehicleId: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicle }) => {
  return (
    <section id="fleet" className="py-16 lg:py-24 bg-stone-100/60 border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Private Chauffeur Fleet
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Spotless, Air-Conditioned Tourist Vehicles
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Every vehicle is mechanically inspected before each tour, fitted with high-efficiency air conditioning, and maintained to the highest comfort standards for our international and domestic guests.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VEHICLES.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/9] bg-stone-200 overflow-hidden">
                <img
                  src={vehicle.image || '/src/assets/images/fleet_tourist_vehicles_1793946020308.jpg'}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-md">
                  {vehicle.tag}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-stone-900">{vehicle.name}</h3>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {vehicle.description}
                  </p>

                  {/* Capacity & Specs Strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 my-4 bg-stone-50 rounded-xl border border-stone-200/80 text-center text-xs">
                    <div>
                      <div className="text-stone-400 text-[10px] uppercase font-bold">Capacity</div>
                      <div className="font-bold text-stone-800 flex items-center justify-center gap-1 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Up to {vehicle.passengers}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-stone-400 text-[10px] uppercase font-bold">Luggage</div>
                      <div className="font-bold text-stone-800 flex items-center justify-center gap-1 mt-0.5">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{vehicle.luggage} Suitcases</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-stone-400 text-[10px] uppercase font-bold">Cooling</div>
                      <div className="font-bold text-stone-800 flex items-center justify-center gap-1 mt-0.5">
                        <Wind className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Dual AC</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-1.5">
                    {vehicle.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs text-stone-500 italic">
                    Best for: {vehicle.suitableFor.split(',')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(vehicle.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-xs"
                  >
                    <span>Choose Vehicle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
