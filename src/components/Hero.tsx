import React, { useState } from 'react';
import { Calendar, MapPin, Users, Car, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { DESTINATIONS, POPULAR_PICKUP_POINTS, VEHICLES } from '../data/sylhetData';

interface HeroProps {
  onQuickBook: (params: {
    destinationId: string;
    vehicleId: string;
    pickup: string;
    date: string;
    passengers: number;
  }) => void;
  onExploreDestinations: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickBook, onExploreDestinations }) => {
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0].id);
  const [selectedVehicle, setSelectedVehicle] = useState('noah');
  const [pickup, setPickup] = useState(POPULAR_PICKUP_POINTS[0]);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook({
      destinationId: selectedDest,
      vehicleId: selectedVehicle,
      pickup,
      date,
      passengers,
    });
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-b from-stone-100/60 to-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-100/80 px-3 py-1.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Official Tourist Chauffeur Service · Sylhet Division</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Private Car &amp; Chauffeur For Exploring Beautiful Sylhet
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Experience the crystal waters of <span className="font-medium text-stone-800">Sada Pathor</span>, the tranquil flooded canopies of <span className="font-medium text-stone-800">Ratargul Swamp</span>, and the rolling tea hills of <span className="font-medium text-stone-800">Sreemangal</span>. Clean, air-conditioned private vehicles with vetted local English &amp; Sylheti speaking drivers.
            </p>

            {/* Quick Proof Badges (Unboxed typography / quiet items) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-stone-600 border-t border-stone-200/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="font-medium text-stone-800">Fixed Transparent Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="font-medium text-stone-800">Full AC &amp; Fuel Included</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="font-medium text-stone-800">Airport &amp; Hotel Pickup</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all"
              >
                <span>Calculate Fare &amp; Book</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onExploreDestinations}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-all"
              >
                <span>Browse Tourist Circuits</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src="/src/assets/images/hero_sylhet_car_tour_1793946019099.jpg"
                alt="Toyota Prado SUV parked overlooking lush green rolling tea garden hills in Sylhet, Bangladesh"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                <p className="text-xs font-semibold tracking-wide uppercase text-emerald-300 mb-1">
                  Scenic Mountain &amp; Tea Estate Tours
                </p>
                <p className="text-base sm:text-lg font-bold leading-snug">
                  Malnicherra, Sreemangal &amp; Meghalaya Border Drives
                </p>
                <p className="text-xs text-stone-300 mt-1">
                  Complimentary chilled water, luggage assistance, and personalized photo stops.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Quick Reservation Strip */}
        <div className="mt-10 lg:mt-12 bg-white rounded-xl shadow-md border border-stone-200 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <Car className="w-4 h-4 text-emerald-700" />
              <span>Instant Trip Planner &amp; Vehicle Allocation</span>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">
              Instant quote · Zero booking deposit required to confirm
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* 1. Destination */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Where to explore?
              </label>
              <div className="relative">
                <select
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name.split(' + ')[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Pickup Location */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Pickup Point
              </label>
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {POPULAR_PICKUP_POINTS.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc.split('(')[0].trim()}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Travel Date */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Travel Date
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg py-2 px-3 text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* 4. Vehicle Type */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Vehicle Preference
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.passengers} seats)
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Submit CTA */}
            <div className="sm:col-span-2 lg:col-span-1 flex items-end">
              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Lock In Date</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
