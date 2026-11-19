import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Car,
  Users,
  ShieldCheck,
  Phone,
  Mail,
  Printer,
  Share2,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import {
  DESTINATIONS,
  VEHICLES,
  POPULAR_PICKUP_POINTS,
  CURRENCY_RATES,
  CurrencyKey
} from '../data/sylhetData';

export interface BookingSubmission {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  flightNotes: string;
  destinationId: string;
  destinationName: string;
  vehicleId: string;
  vehicleName: string;
  pickup: string;
  date: string;
  pickupTime: string;
  passengers: number;
  totalBDT: number;
  currency: CurrencyKey;
  totalFormatted: string;
  tripType: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    destinationId?: string;
    vehicleId?: string;
    pickup?: string;
    date?: string;
    pickupTime?: string;
    passengers?: number;
    tripType?: 'round' | 'drop' | 'multiday';
    days?: number;
    addons?: string[];
    totalBDT?: number;
  };
  currency: CurrencyKey;
  onBookingConfirmed: (booking: BookingSubmission) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialData,
  currency,
  onBookingConfirmed,
}) => {
  const [destinationId, setDestinationId] = useState(initialData?.destinationId || DESTINATIONS[0].id);
  const [vehicleId, setVehicleId] = useState(initialData?.vehicleId || 'noah');
  const [pickup, setPickup] = useState(initialData?.pickup || POPULAR_PICKUP_POINTS[0]);
  const [date, setDate] = useState(
    initialData?.date ||
      (() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
      })()
  );
  const [pickupTime, setPickupTime] = useState(initialData?.pickupTime || '07:30 AM');
  const [passengers, setPassengers] = useState(initialData?.passengers || 4);

  // Customer contact info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [flightNotes, setFlightNotes] = useState('');

  // Confirmation view state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingSubmission | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const currentDest = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];
  const currentVehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[1];

  // Calculate pricing
  const calculateTotalBDT = () => {
    if (initialData?.totalBDT && initialData.destinationId === destinationId && initialData.vehicleId === vehicleId) {
      return initialData.totalBDT;
    }
    let p = 0;
    if (vehicleId === 'sedan') p = currentDest.baseSedanPriceBDT;
    else if (vehicleId === 'noah') p = currentDest.baseNoahPriceBDT;
    else if (vehicleId === 'hiace') p = currentDest.baseHiAcePriceBDT;
    else if (vehicleId === 'prado') p = currentDest.basePradoPriceBDT;
    return p;
  };

  const totalBDT = calculateTotalBDT();

  const formatPrice = (bdt: number) => {
    const rateInfo = CURRENCY_RATES[currency];
    const converted = bdt * rateInfo.rate;
    if (currency === 'BDT') return `${rateInfo.symbol} ${converted.toLocaleString()}`;
    return `${rateInfo.symbol} ${converted.toFixed(0)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `SC-SYL-${randomSuffix}`;

    const newBooking: BookingSubmission = {
      id: bookingCode,
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      customerName: fullName,
      phone,
      email: email || 'Not provided',
      flightNotes: flightNotes || 'Standard hotel pickup',
      destinationId,
      destinationName: currentDest.name,
      vehicleId,
      vehicleName: currentVehicle.name,
      pickup,
      date,
      pickupTime,
      passengers,
      totalBDT,
      currency,
      totalFormatted: formatPrice(totalBDT),
      tripType: initialData?.tripType || 'Day Tour (Round Trip)',
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
  };

  const copyBookingCode = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(
      `Surma Chauffeur Reservation: ${confirmedBooking.id}\nDestination: ${confirmedBooking.destinationName}\nVehicle: ${confirmedBooking.vehicleName}\nDate: ${confirmedBooking.date} at ${confirmedBooking.pickupTime}\nPickup: ${confirmedBooking.pickup}\nTotal: ${confirmedBooking.totalFormatted}`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const generateWhatsAppURL = () => {
    if (!confirmedBooking) return '';
    const message = `Hello Surma Chauffeur! I would like to confirm my private car reservation:\n\n*Booking Code:* ${confirmedBooking.id}\n*Name:* ${confirmedBooking.customerName}\n*Destination:* ${confirmedBooking.destinationName}\n*Vehicle:* ${confirmedBooking.vehicleName} (${confirmedBooking.passengers} passengers)\n*Date & Time:* ${confirmedBooking.date} at ${confirmedBooking.pickupTime}\n*Pickup Point:* ${confirmedBooking.pickup}\n*Total Fare:* ${confirmedBooking.totalFormatted}\n*Special Notes:* ${confirmedBooking.flightNotes}\n\nPlease confirm availability for my tour. Thank you!`;
    return `https://wa.me/8801700000000?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden relative">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-base">
              {confirmedBooking ? 'Reservation Confirmed · Trip Voucher' : 'Reserve Your Private Tourist Vehicle'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-xl font-extrabold text-stone-900">
                Reservation Successfully Created
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Your private car is provisionally held. Our Sylhet dispatch team will contact you via WhatsApp/Phone within 15 minutes.
              </p>
            </div>

            {/* Travel Pass Ticket Layout */}
            <div className="border border-stone-200 rounded-2xl p-5 bg-stone-50/70 relative">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Booking Reference
                  </span>
                  <div className="text-lg font-mono font-bold text-emerald-900">
                    {confirmedBooking.id}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Total Fare (Post-Trip Pay)
                  </span>
                  <div className="text-lg font-bold text-stone-900 tabular-nums">
                    {confirmedBooking.totalFormatted}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400 text-[11px]">Lead Traveler:</span>
                  <div className="font-semibold text-stone-900">{confirmedBooking.customerName}</div>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px]">Phone / WhatsApp:</span>
                  <div className="font-semibold text-stone-900">{confirmedBooking.phone}</div>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px]">Destination:</span>
                  <div className="font-semibold text-stone-900">{confirmedBooking.destinationName}</div>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px]">Vehicle:</span>
                  <div className="font-semibold text-stone-900">{confirmedBooking.vehicleName}</div>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px]">Date &amp; Time:</span>
                  <div className="font-semibold text-stone-900">
                    {confirmedBooking.date} at {confirmedBooking.pickupTime}
                  </div>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px]">Pickup Point:</span>
                  <div className="font-semibold text-stone-900 truncate">
                    {confirmedBooking.pickup}
                  </div>
                </div>
              </div>

              {confirmedBooking.flightNotes && (
                <div className="mt-3 pt-3 border-t border-stone-200 text-xs">
                  <span className="text-stone-400 text-[11px]">Flight / Note:</span>
                  <div className="text-stone-700 italic">{confirmedBooking.flightNotes}</div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <a
                href={generateWhatsAppURL()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm Instantly via WhatsApp Chat</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={copyBookingCode}
                  className="py-2.5 px-3 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? 'Copied Details' : 'Copy Trip Details'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="py-2.5 px-3 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Travel Pass</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
              >
                Done · Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* Form Entry Screen */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Trip Summary Pill-free Banner */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-xs flex items-center justify-between">
              <div>
                <span className="text-stone-500">Destination: </span>
                <span className="font-bold text-stone-900">{currentDest.name.split(' + ')[0]}</span>
                <div className="text-stone-500 mt-0.5">
                  {currentVehicle.name} · {date} at {pickupTime}
                </div>
              </div>
              <div className="text-right">
                <span className="text-stone-500 block text-[11px]">Guaranteed Price</span>
                <span className="font-extrabold text-emerald-900 text-base tabular-nums">
                  {formatPrice(totalBDT)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name (Lead Passenger) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Rahman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1700 000000 or +44 7911..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address (For Confirmation Pass)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Pickup Location in Sylhet *
                </label>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Pickup Time
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="06:30 AM">06:30 AM</option>
                  <option value="07:00 AM">07:00 AM</option>
                  <option value="07:30 AM">07:30 AM</option>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="08:30 AM">08:30 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Passengers
                </label>
                <input
                  type="number"
                  min={1}
                  max={currentVehicle.passengers}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Flight Number / Special Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Flight BG 202 landing at Osmani Airport at 09:40 AM, need 1 baby booster seat, vegetarian lunch recommendation."
                value={flightNotes}
                onChange={(e) => setFlightNotes(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors text-sm"
              >
                Confirm Reservation &amp; Generate Voucher
              </button>
              <p className="text-[11px] text-stone-400 text-center mt-2">
                No deposit needed · Free cancellation up to 4 hours before pickup
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
