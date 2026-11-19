import React from 'react';
import { Car, Phone } from 'lucide-react';
import { CurrencyKey, CURRENCY_RATES } from '../data/sylhetData';

interface NavbarProps {
  onOpenBooking: () => void;
  currency: CurrencyKey;
  setCurrency: (c: CurrencyKey) => void;
  savedBookingsCount: number;
  onOpenSavedBookings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  currency,
  setCurrency,
  savedBookingsCount,
  onOpenSavedBookings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0">
          <span className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center shadow-sm">
            <Car className="w-5 h-5 text-emerald-100" />
          </span>
          <span className="font-serif tracking-normal text-2xl text-stone-900">
            Surma Chauffeur
          </span>
        </a>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#destinations" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            Destinations
          </a>
          <a href="#fleet" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            Vehicles
          </a>
          <a href="#calculator" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            Fare Calculator
          </a>
          <a href="#itinerary" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            Day Planner
          </a>
          <a href="#chauffeurs" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            Our Drivers
          </a>
          <a href="#faq" className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
            Travel FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action (plus quiet currency dropdown & my booking link) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center text-xs font-semibold bg-stone-100 border border-stone-200 rounded-md p-1">
            {(Object.keys(CURRENCY_RATES) as CurrencyKey[]).map((cKey) => (
              <button
                key={cKey}
                onClick={() => setCurrency(cKey)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currency === cKey
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title={CURRENCY_RATES[cKey].label}
              >
                {cKey} ({CURRENCY_RATES[cKey].symbol})
              </button>
            ))}
          </div>

          {savedBookingsCount > 0 && (
            <button
              onClick={onOpenSavedBookings}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0"
            >
              My Bookings ({savedBookingsCount})
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors shadow-xs whitespace-nowrap shrink-0"
          >
            Reserve a Car
          </button>
        </div>
      </div>
    </header>
  );
};
