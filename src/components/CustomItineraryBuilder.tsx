import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  MapPin,
  Car,
  ArrowRight,
  Sparkles,
  Utensils,
  Sun,
  Coffee
} from 'lucide-react';
import { CURRENCY_RATES, CurrencyKey } from '../data/sylhetData';

interface CustomItineraryBuilderProps {
  currency: CurrencyKey;
  onBookCustomPlan: (customSummary: {
    stops: string[];
    hours: number;
    estimatedFareBDT: number;
  }) => void;
}

interface StopOption {
  id: string;
  name: string;
  region: string;
  timeSlot: 'Morning' | 'Midday' | 'Afternoon' | 'Evening';
  estHours: number;
  description: string;
  isPopular?: boolean;
}

const AVAILABLE_STOPS: StopOption[] = [
  {
    id: 'sada_pathor',
    name: 'Bholaganj Sada Pathor',
    region: 'Companiganj',
    timeSlot: 'Morning',
    estHours: 3.5,
    description: 'White stone riverbed and Meghalaya runoff stream.',
    isPopular: true,
  },
  {
    id: 'ratargul',
    name: 'Ratargul Freshwater Swamp Forest',
    region: 'Gowainghat',
    timeSlot: 'Morning',
    estHours: 2.5,
    description: 'Motorless wooden dinghy boat ride through submerged swamp trees.',
    isPopular: true,
  },
  {
    id: 'jaflong_zero',
    name: 'Jaflong Zero Point & Piyain River',
    region: 'Jaflong',
    timeSlot: 'Morning',
    estHours: 3.5,
    description: 'Dawki border suspension bridge view and rocky river banks.',
  },
  {
    id: 'panshi_lunch',
    name: 'Traditional Sylheti Feast at Panshi / Pach Bhai',
    region: 'Sylhet City Center',
    timeSlot: 'Midday',
    estHours: 1.5,
    description: 'Famous spicy beef curry, authentic Shorisha Ilish, and dried fish (shutki) delicacies.',
    isPopular: true,
  },
  {
    id: 'malnicherra',
    name: 'Malnicherra Tea Estate (Oldest in Subcontinent, 1854)',
    region: 'Airport Road',
    timeSlot: 'Afternoon',
    estHours: 1.5,
    description: 'Stroll among ancient shade trees and pristine green tea hillocks.',
    isPopular: true,
  },
  {
    id: 'shah_jalal',
    name: 'Hazrat Shah Jalal (R) Mazar Sharif',
    region: 'Dargah Gate',
    timeSlot: 'Afternoon',
    estHours: 1.5,
    description: 'Historic spiritual shrine, serene courtyard, sacred pigeons and catfish fountain.',
  },
  {
    id: 'lalakhal_sunset',
    name: 'Lalakhal Emerald Blue Water Cruise at Sunset',
    region: 'Jaintiapur',
    timeSlot: 'Evening',
    estHours: 3.0,
    description: 'Spectacular tea garden boat glide on turquoise blue water as twilight settles.',
  },
  {
    id: 'seven_color_tea',
    name: 'Nilkantha 7-Layer Tea Experience',
    region: 'Sreemangal',
    timeSlot: 'Evening',
    estHours: 2.0,
    description: 'Taste the world-famous layered tea with different flavors in a single glass.',
  },
];

export const CustomItineraryBuilder: React.FC<CustomItineraryBuilderProps> = ({
  currency,
  onBookCustomPlan,
}) => {
  const [selectedStopIds, setSelectedStopIds] = useState<string[]>([
    'ratargul',
    'sada_pathor',
    'panshi_lunch',
    'malnicherra',
  ]);

  const toggleStop = (id: string) => {
    if (selectedStopIds.includes(id)) {
      if (selectedStopIds.length <= 1) return; // Keep at least one
      setSelectedStopIds(selectedStopIds.filter((s) => s !== id));
    } else {
      if (selectedStopIds.length >= 5) return; // Max 5 stops in one day
      setSelectedStopIds([...selectedStopIds, id]);
    }
  };

  const selectedStops = AVAILABLE_STOPS.filter((s) => selectedStopIds.includes(s.id));
  const totalHours = Math.min(
    12,
    selectedStops.reduce((sum, s) => sum + s.estHours, 0)
  );

  // Dynamic fare estimation based on stops and hours
  const baseEstimatedBDT = Math.max(
    4800,
    selectedStops.length * 1400 + (totalHours > 8 ? (totalHours - 8) * 400 : 0)
  );

  const formatPrice = (bdt: number) => {
    const rateInfo = CURRENCY_RATES[currency];
    const converted = bdt * rateInfo.rate;
    if (currency === 'BDT') {
      return `${rateInfo.symbol} ${converted.toLocaleString()}`;
    }
    return `${rateInfo.symbol} ${converted.toFixed(0)}`;
  };

  const handleBook = () => {
    onBookCustomPlan({
      stops: selectedStops.map((s) => s.name),
      hours: totalHours,
      estimatedFareBDT: baseEstimatedBDT,
    });
  };

  return (
    <section id="itinerary" className="py-16 lg:py-24 bg-white border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Tailor-Made Sightseeing
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Build Your Custom Sylhet Day Tour
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Combine your favorite attractions. Our route optimization ensures you spend less time in traffic and more time enjoying Sylhet’s natural wonders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stop Selector Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span>Select 2 to 5 stops for your day</span>
              <span className="font-semibold text-emerald-800">
                {selectedStopIds.length} stops selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_STOPS.map((stop) => {
                const isSelected = selectedStopIds.includes(stop.id);
                return (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => toggleStop(stop.id)}
                    className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-700 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          {stop.timeSlot} · {stop.region}
                        </span>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-stone-300" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-stone-900">{stop.name}</h4>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {stop.description}
                      </p>
                    </div>

                    <div className="mt-3 text-[11px] font-medium text-stone-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-700" />
                      <span>Est. ~{stop.estHours} hrs</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Custom Itinerary Route & Plan */}
          <div className="lg:col-span-5 bg-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-stone-800">
            <div className="border-b border-stone-800 pb-4 mb-5">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Optimized Day Route
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Your Personalized Tour Itinerary
              </h3>
              <div className="flex items-center gap-4 text-xs text-stone-400 mt-2">
                <span>Total Time: ~{totalHours.toFixed(1)} Hours</span>
                <span aria-hidden="true">·</span>
                <span>Includes Driver &amp; Fuel</span>
              </div>
            </div>

            {/* Step-by-Step Waypoint Timeline */}
            <div className="space-y-4 mb-6">
              {selectedStops.map((stop, idx) => (
                <div key={stop.id} className="flex items-start gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-100 font-bold flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    {idx < selectedStops.length - 1 && (
                      <span className="w-0.5 h-6 bg-stone-700 my-0.5"></span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{stop.name}</div>
                    <div className="text-[11px] text-stone-400">
                      {stop.region} · ~{stop.estHours} hours stop
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated Custom Quote */}
            <div className="pt-4 border-t border-stone-800 flex items-end justify-between mb-5">
              <div>
                <span className="text-xs text-stone-400">Estimated Tour Fare</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums">
                  {formatPrice(baseEstimatedBDT)}
                </div>
              </div>
              <span className="text-[11px] text-stone-400">Sedan / Noah included</span>
            </div>

            <button
              type="button"
              onClick={handleBook}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <span>Book This Custom Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
