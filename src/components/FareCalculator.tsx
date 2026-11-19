import React, { useState, useMemo } from 'react';
import {
  Car,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Info,
  DollarSign
} from 'lucide-react';
import {
  DESTINATIONS,
  VEHICLES,
  POPULAR_PICKUP_POINTS,
  CURRENCY_RATES,
  CurrencyKey,
  Destination,
  Vehicle
} from '../data/sylhetData';

interface FareCalculatorProps {
  currency: CurrencyKey;
  setCurrency: (c: CurrencyKey) => void;
  onProceedToBooking: (bookingData: {
    destinationId: string;
    vehicleId: string;
    pickup: string;
    date: string;
    pickupTime: string;
    passengers: number;
    tripType: 'round' | 'drop' | 'multiday';
    days: number;
    addons: string[];
    totalBDT: number;
  }) => void;
  initialDestinationId?: string;
  initialVehicleId?: string;
}

export const FareCalculator: React.FC<FareCalculatorProps> = ({
  currency,
  setCurrency,
  onProceedToBooking,
  initialDestinationId,
  initialVehicleId,
}) => {
  const [destinationId, setDestinationId] = useState(initialDestinationId || DESTINATIONS[0].id);
  const [vehicleId, setVehicleId] = useState(initialVehicleId || 'noah');
  const [pickup, setPickup] = useState(POPULAR_PICKUP_POINTS[0]);
  const [customPickup, setCustomPickup] = useState('');
  const [pickupTime, setPickupTime] = useState('07:30 AM');
  const [tripType, setTripType] = useState<'round' | 'drop' | 'multiday'>('round');
  const [days, setDays] = useState(2);
  const [passengers, setPassengers] = useState(4);
  const [date, setDate] = useState(() => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return tm.toISOString().split('T')[0];
  });

  const [selectedAddons, setSelectedAddons] = useState<string[]>(['water']);

  const currentDest = useMemo(
    () => DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0],
    [destinationId]
  );

  const currentVehicle = useMemo(
    () => VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[1],
    [vehicleId]
  );

  // Compute calculated fare in BDT
  const calculatedFareBDT = useMemo(() => {
    let basePrice = 0;
    if (vehicleId === 'sedan') basePrice = currentDest.baseSedanPriceBDT;
    else if (vehicleId === 'noah') basePrice = currentDest.baseNoahPriceBDT;
    else if (vehicleId === 'hiace') basePrice = currentDest.baseHiAcePriceBDT;
    else if (vehicleId === 'prado') basePrice = currentDest.basePradoPriceBDT;

    if (tripType === 'drop') {
      basePrice = Math.round(basePrice * 0.75); // One-way drop discount
    } else if (tripType === 'multiday') {
      basePrice = basePrice * days + (days - 1) * 1000; // Multi-day with night allowance
    }

    if (selectedAddons.includes('boat_concierge')) {
      basePrice += 500;
    }
    if (selectedAddons.includes('snack_pack')) {
      basePrice += 800;
    }

    return basePrice;
  }, [currentDest, vehicleId, tripType, days, selectedAddons]);

  const formatPrice = (bdt: number) => {
    const rateInfo = CURRENCY_RATES[currency];
    const converted = bdt * rateInfo.rate;
    if (currency === 'BDT') {
      return `${rateInfo.symbol} ${converted.toLocaleString()}`;
    }
    return `${rateInfo.symbol} ${converted.toFixed(0)}`;
  };

  const handleToggleAddon = (addonKey: string) => {
    if (selectedAddons.includes(addonKey)) {
      setSelectedAddons(selectedAddons.filter((k) => k !== addonKey));
    } else {
      setSelectedAddons([...selectedAddons, addonKey]);
    }
  };

  const handleBookNow = () => {
    onProceedToBooking({
      destinationId,
      vehicleId,
      pickup: pickup.includes('Custom') && customPickup ? customPickup : pickup,
      date,
      pickupTime,
      passengers,
      tripType,
      days,
      addons: selectedAddons,
      totalBDT: calculatedFareBDT,
    });
  };

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-stone-50 border-b border-stone-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-emerald-800 uppercase mb-2">
            Instant Fare Calculator &amp; Transparency Guarantee
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Clear, All-Inclusive Private Car Pricing
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            No surprise fuel bills, toll shocks, or roadside bargaining. Get an instant guaranteed quote in your preferred currency.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Parameters */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Trip Type Segmented Control */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                Trip Format
              </label>
              <div className="grid grid-cols-3 gap-2 bg-stone-100 p-1.5 rounded-lg border border-stone-200">
                <button
                  type="button"
                  onClick={() => setTripType('round')}
                  className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                    tripType === 'round'
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Day Tour (Round Trip)
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('drop')}
                  className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                    tripType === 'drop'
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  One-Way Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('multiday')}
                  className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                    tripType === 'multiday'
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Multi-Day Hire
                </button>
              </div>
            </div>

            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                Destination / Tourist Circuit
              </label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} · ~{d.distanceKm} km · {d.recommendedDuration}
                  </option>
                ))}
              </select>
              <div className="mt-2 text-xs text-stone-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{currentDest.highlight}</span>
              </div>
            </div>

            {/* Vehicle Selection Cards */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Select Vehicle Category
                </label>
                <span className="text-xs text-stone-500">Max passengers &amp; baggage capacity</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {VEHICLES.map((v) => {
                  const isSelected = vehicleId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicleId(v.id)}
                      className={`text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 shadow-xs'
                          : 'border-stone-200 bg-stone-50/60 hover:bg-stone-100 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {v.name}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Up to {v.passengers} seats
                      </div>
                      <div className="text-[10px] text-emerald-800 font-medium truncate mt-1">
                        {v.tag.split('(')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pickup Location & Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Pickup Point in Sylhet
                </label>
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  {POPULAR_PICKUP_POINTS.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {pickup.includes('Custom') && (
                  <input
                    type="text"
                    placeholder="Enter hotel name or full Sylhet address"
                    value={customPickup}
                    onChange={(e) => setCustomPickup(e.target.value)}
                    className="mt-2 w-full bg-white border border-stone-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-700"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            {/* Morning Pickup Time & Passengers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                  Pickup Time (Recommended: {currentDest.bestStartTime.split('(')[0]})
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="06:30 AM">06:30 AM (Best for Sreemangal birds)</option>
                  <option value="07:00 AM">07:00 AM</option>
                  <option value="07:30 AM">07:30 AM (Best for Sada Pathor)</option>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="08:30 AM">08:30 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="02:00 PM">02:00 PM (Afternoon / Sunset Tour)</option>
                </select>
              </div>

              {tripType === 'multiday' ? (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Number of Days
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={2}
                      max={7}
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full accent-emerald-700"
                    />
                    <span className="text-sm font-bold text-stone-900 w-16">
                      {days} Days
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Estimated Passengers (Max: {currentVehicle.passengers})
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6, 8, 10].filter((n) => n <= currentVehicle.passengers).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setPassengers(n)}
                        className={`w-9 h-9 rounded-lg text-xs font-bold border transition-colors ${
                          passengers === n
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Optional Tourist Services / Inclusions */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                Included Amenities &amp; Optional Add-ons
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-2.5 rounded-lg bg-stone-50 border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mt-1 accent-emerald-700 rounded"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-stone-900">
                      Standard Chauffeur Hospitality Pack (Free)
                    </span>
                    <p className="text-stone-500">
                      Chilled bottled mineral water, tissue box, cell phone chargers, and luggage loading.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes('boat_concierge')}
                    onChange={() => handleToggleAddon('boat_concierge')}
                    className="mt-1 accent-emerald-700 rounded"
                  />
                  <div className="text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900">
                        Dedicated Ghat Boat Counter Concierge (+{formatPrice(500)})
                      </span>
                    </div>
                    <p className="text-stone-500">
                      Driver accompanies your party directly to the official boat ticket counter at Sada Pathor / Ratargul, negotiates transparent rates, and secures life jackets.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-2.5 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes('snack_pack')}
                    onChange={() => handleToggleAddon('snack_pack')}
                    className="mt-1 accent-emerald-700 rounded"
                  />
                  <div className="text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900">
                        Sylheti Refreshment Hamper (+{formatPrice(800)})
                      </span>
                    </div>
                    <p className="text-stone-500">
                      Fresh green coconuts (dab), local Sylheti roasted tea biscuits, and seasonal fruit basket placed in your vehicle prior to departure.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Price Summary & Breakdown Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-stone-800">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                    Guaranteed Flat Rate
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tabular-nums">
                    {formatPrice(calculatedFareBDT)}
                  </div>
                </div>

                {/* Currency Switcher */}
                <div className="text-right">
                  <label className="block text-[11px] text-stone-400 mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as CurrencyKey)}
                    className="bg-stone-800 text-xs font-semibold text-white border border-stone-700 rounded-md py-1 px-2 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="BDT">BDT (৳ Taka)</option>
                    <option value="USD">USD ($ Dollar)</option>
                    <option value="GBP">GBP (£ Pound)</option>
                  </select>
                </div>
              </div>

              {/* Inclusions Breakdown */}
              <div className="py-4 space-y-3 text-xs border-b border-stone-800 text-stone-300">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Destination Circuit:</span>
                  <span className="font-medium text-white text-right max-w-[200px] truncate">
                    {currentDest.name.split(' + ')[0]}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Vehicle Allocated:</span>
                  <span className="font-medium text-white">{currentVehicle.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Air Conditioning:</span>
                  <span className="font-medium text-emerald-400">100% Unlimited AC Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Fuel &amp; Gas (CNG/Octane):</span>
                  <span className="font-medium text-emerald-400">Full Tank Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Chauffeur Honorarium &amp; Food:</span>
                  <span className="font-medium text-white">Covered</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Highway Tolls &amp; Parking:</span>
                  <span className="font-medium text-white">Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Duration Allocated:</span>
                  <span className="font-medium text-white">
                    {tripType === 'multiday'
                      ? `${days} Full Days Dedicated Car`
                      : tripType === 'drop'
                      ? 'One-Way Direct Point to Point'
                      : '8 to 10 Hours Full Day Tour'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 space-y-3">
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm tracking-wide"
                >
                  <span>Proceed to Reserve Vehicle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-stone-400 text-center">
                  Pay securely after your trip completion. Zero advance deposit required.
                </p>
              </div>
            </div>

            {/* Driver & Support Guarantee Box */}
            <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-5 text-xs text-stone-700 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>The Surma Chauffeur Quality Promise</span>
              </div>
              <ul className="space-y-1.5 text-stone-600 text-xs">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>On-time arrival guarantee: If car is late &gt;15 min, 10% discount applies.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Drivers are non-smokers with spotless, regularly steam-sanitized interiors.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Flight tracking included for all Osmani International Airport (ZYL) pickups.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
