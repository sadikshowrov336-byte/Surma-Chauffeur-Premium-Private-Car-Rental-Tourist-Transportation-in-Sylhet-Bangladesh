import React from 'react';
import { X, Calendar, Clock, MapPin, Car, Phone, Trash2, MessageCircle, Share2, Copy } from 'lucide-react';
import { BookingSubmission } from './BookingModal';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingSubmission[];
  onCancelBooking: (id: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Your Active Reservations</h3>
              <p className="text-xs text-stone-500">Stored safely on this device</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bookings List */}
          <div className="p-5 space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-12 text-stone-400">
                <Car className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No reservations found yet.</p>
                <p className="text-xs mt-1">Use the Fare Calculator to plan your first tour.</p>
              </div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                    <span className="text-xs font-mono font-bold text-emerald-900">
                      {b.id}
                    </span>
                    <span className="text-xs font-bold text-stone-900 tabular-nums">
                      {b.totalFormatted}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-stone-900 text-sm">
                      {b.destinationName}
                    </div>
                    <div className="text-stone-600">
                      Vehicle: <span className="font-medium text-stone-800">{b.vehicleName}</span>
                    </div>
                    <div className="text-stone-600">
                      Date &amp; Time:{' '}
                      <span className="font-medium text-stone-800">
                        {b.date} at {b.pickupTime}
                      </span>
                    </div>
                    <div className="text-stone-600 truncate">
                      Pickup: <span className="font-medium text-stone-800">{b.pickup}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                    <a
                      href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                        `Hi Surma Chauffeur, inquiry on booking reference ${b.id}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Dispatch</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onCancelBooking(b.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      title="Cancel reservation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-5 border-t border-stone-200 bg-stone-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800 transition-colors"
          >
            Close My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};
