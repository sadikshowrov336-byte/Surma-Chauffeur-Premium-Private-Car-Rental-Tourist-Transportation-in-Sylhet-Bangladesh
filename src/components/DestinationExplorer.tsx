import React, { useState } from 'react';
import { Clock, MapPin, Navigation, ArrowRight, Compass, Shield } from 'lucide-react';
import { DESTINATIONS, Destination, CURRENCY_RATES, CurrencyKey } from '../data/sylhetData';

interface DestinationExplorerProps {
  currency: CurrencyKey;
  onSelectDestination: (destinationId: string) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  currency,
  onSelectDestination,
}) => {
  const [filter, setFilter] = useState<'all' | 'water' | 'tea' | 'heritage'>('all');

  const filteredDestinations = DESTINATIONS.filter((d) => {
    if (filter === 'all') return true;
    if (filter === 'water') return d.id.includes('sada') || d.id.includes('bisnakandi') || d.id.includes('jaflong');
    if (filter === 'tea') return d.id.includes('sreemangal') || d.id.includes('jaflong');
    if (filter === 'heritage') return d.id.includes('city') || d.id.includes('airport');
    return true;
  });

  const formatPrice = (bdt: number) => {
    const rateInfo = CURRENCY_RATES[currency];
    const converted = bdt * rateInfo.rate;
    if (currency === 'BDT') {
      return `${rateInfo.symbol} ${converted.toLocaleString()}`;
    }
    return `${rateInfo.symbol} ${converted.toFixed(0)}`;
  };

  return (
    <section id="destinations" className="py-16 lg:py-24 bg-white border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
              Curated Tourist Circuits
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              Top Sightseeing Destinations in Sylhet
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600">
              Each circuit is carefully paced to maximize your sightseeing time with safe driving, scenic photography rest stops, and hassle-free boat terminal navigation.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Tours
            </button>
            <button
              onClick={() => setFilter('water')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                filter === 'water'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Rivers &amp; Swamps
            </button>
            <button
              onClick={() => setFilter('tea')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                filter === 'tea'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tea Estates &amp; Forests
            </button>
            <button
              onClick={() => setFilter('heritage')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                filter === 'heritage'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              City &amp; Airport
            </button>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image Container with Fallback */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                {dest.image ? (
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
                    <Compass className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {dest.recommendedDuration}
                </div>
                <div className="absolute top-3 right-3 bg-emerald-900/90 backdrop-blur-xs text-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-md">
                  From {formatPrice(dest.baseSedanPriceBDT)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-semibold text-emerald-800 mb-0.5">
                    {dest.bengaliName}
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {dest.name}
                  </h3>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-2 mb-3">
                    <span>{dest.distanceKm} km round trip</span>
                    <span aria-hidden="true">·</span>
                    <span>~{dest.driveTimeHours} hrs one-way drive</span>
                    <span aria-hidden="true">·</span>
                    <span>AC Included</span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-3">
                    {dest.description}
                  </p>

                  {/* Highlights list */}
                  <div className="border-t border-stone-200/80 pt-3">
                    <div className="text-[11px] font-semibold text-stone-700 uppercase tracking-wide mb-1.5">
                      Key Highlights:
                    </div>
                    <ul className="text-xs text-stone-600 space-y-1">
                      {dest.keyStops.slice(0, 3).map((stop, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="w-1 h-1 rounded-full bg-emerald-700 shrink-0"></span>
                          <span>{stop}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                  <div className="text-[11px] text-stone-500">
                    Depart: <span className="font-semibold text-stone-800">{dest.bestStartTime.split('(')[0]}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectDestination(dest.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                  >
                    <span>Book Circuit</span>
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
