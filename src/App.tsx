import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FareCalculator } from './components/FareCalculator';
import { DestinationExplorer } from './components/DestinationExplorer';
import { FleetSection } from './components/FleetSection';
import { CustomItineraryBuilder } from './components/CustomItineraryBuilder';
import { ChauffeursTrust } from './components/ChauffeursTrust';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal, BookingSubmission } from './components/BookingModal';
import { MyBookingsDrawer } from './components/MyBookingsDrawer';
import { CurrencyKey } from './data/sylhetData';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyKey>('BDT');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Selected parameters to pass into Calculator or Modal
  const [activeDestinationId, setActiveDestinationId] = useState<string>('sada-pathor-ratargul');
  const [activeVehicleId, setActiveVehicleId] = useState<string>('noah');

  // Modal initial payload
  const [modalInitialData, setModalInitialData] = useState<{
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
  }>({});

  // Local saved bookings
  const [savedBookings, setSavedBookings] = useState<BookingSubmission[]>(() => {
    try {
      const stored = localStorage.getItem('surma_chauffeur_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleBookingConfirmed = (booking: BookingSubmission) => {
    const updated = [booking, ...savedBookings];
    setSavedBookings(updated);
    try {
      localStorage.setItem('surma_chauffeur_bookings', JSON.stringify(updated));
    } catch {
      // storage error fallback
    }
    showToast(`Reservation ${booking.id} created successfully!`);
  };

  const handleCancelBooking = (id: string) => {
    const updated = savedBookings.filter((b) => b.id !== id);
    setSavedBookings(updated);
    try {
      localStorage.setItem('surma_chauffeur_bookings', JSON.stringify(updated));
    } catch {
      // storage error fallback
    }
    showToast(`Reservation ${id} cancelled.`);
  };

  const handleQuickBookFromHero = (params: {
    destinationId: string;
    vehicleId: string;
    pickup: string;
    date: string;
    passengers: number;
  }) => {
    setActiveDestinationId(params.destinationId);
    setActiveVehicleId(params.vehicleId);
    setModalInitialData({
      destinationId: params.destinationId,
      vehicleId: params.vehicleId,
      pickup: params.pickup,
      date: params.date,
      passengers: params.passengers,
    });
    setIsBookingModalOpen(true);
  };

  const handleSelectDestinationFromCard = (destId: string) => {
    setActiveDestinationId(destId);
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVehicleFromCard = (vehId: string) => {
    setActiveVehicleId(vehId);
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToBookingFromCalculator = (bookingData: {
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
  }) => {
    setModalInitialData(bookingData);
    setIsBookingModalOpen(true);
  };

  const handleBookCustomPlan = (customSummary: {
    stops: string[];
    hours: number;
    estimatedFareBDT: number;
  }) => {
    setModalInitialData({
      destinationId: 'sylhet-city-heritage',
      vehicleId: activeVehicleId || 'noah',
      totalBDT: customSummary.estimatedFareBDT,
      tripType: 'round',
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-stone-700 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation (§2) */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onOpenBooking={() => {
          setModalInitialData({
            destinationId: activeDestinationId,
            vehicleId: activeVehicleId,
          });
          setIsBookingModalOpen(true);
        }}
        savedBookingsCount={savedBookings.length}
        onOpenSavedBookings={() => setIsMyBookingsOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onQuickBook={handleQuickBookFromHero}
          onExploreDestinations={() => {
            const destSection = document.getElementById('destinations');
            if (destSection) destSection.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Curated Tourist Circuits */}
        <DestinationExplorer
          currency={currency}
          onSelectDestination={handleSelectDestinationFromCard}
        />

        {/* Interactive Fare Calculator */}
        <FareCalculator
          currency={currency}
          setCurrency={setCurrency}
          initialDestinationId={activeDestinationId}
          initialVehicleId={activeVehicleId}
          onProceedToBooking={handleProceedToBookingFromCalculator}
        />

        {/* Tourist Vehicle Fleet */}
        <FleetSection onSelectVehicle={handleSelectVehicleFromCard} />

        {/* Interactive Custom Day Planner */}
        <CustomItineraryBuilder
          currency={currency}
          onBookCustomPlan={handleBookCustomPlan}
        />

        {/* Verified Drivers Trust Section */}
        <ChauffeursTrust />

        {/* Testimonials & Proof */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer (§1.B & §2) */}
      <Footer />

      {/* Booking Form & Digital Pass Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialData={modalInitialData}
        currency={currency}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Saved Bookings Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={savedBookings}
        onCancelBooking={handleCancelBooking}
      />

      {/* Floating WhatsApp Quick Connect Button */}
      <a
        href="https://wa.me/8801700000000?text=Hello%20Surma%20Chauffeur%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20car%20in%20Sylhet."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Chat with Sylhet Dispatch
        </span>
      </a>
    </div>
  );
}
