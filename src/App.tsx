import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MeetDoctor } from './components/MeetDoctor';
import { TechnologySection } from './components/TechnologySection';
import { SmileGallery } from './components/SmileGallery';
import { MembershipFinancing } from './components/MembershipFinancing';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactFooter } from './components/ContactFooter';
import { AppointmentModal } from './components/AppointmentModal';
import { MobileBottomBar } from './components/MobileBottomBar';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedBookingService, setSelectedBookingService] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedBookingService(serviceName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedBookingService(undefined);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 flex flex-col antialiased selection:bg-[#D4AF37]/20 selection:text-slate-900 pb-14 sm:pb-0">
      {/* 1. Header with Top Bar Contract */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* 2. Hero Section */}
      <main className="flex-1">
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 3. Comprehensive Clinical Services */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* 4. Meet Dr. Zelka Licina, DDS */}
        <MeetDoctor onOpenBooking={handleOpenBooking} />

        {/* 5. 3D Digital Technology Suite & Interactive Viewer */}
        <TechnologySection />

        {/* 6. Documented Clinical Smile Transformations */}
        <SmileGallery />

        {/* 7. In-House My Dental Membership & 0% Financing */}
        <MembershipFinancing onOpenBooking={handleOpenBooking} />

        {/* 8. Verified Patient Testimonials & Studio Lounge */}
        <TestimonialsSection />
      </main>

      {/* 9. FAQs, Location, Hours & Footer */}
      <ContactFooter onOpenBooking={handleOpenBooking} />

      {/* 10. Slim Mobile Action Bar */}
      <MobileBottomBar onOpenBooking={handleOpenBooking} />

      {/* 11. Interactive Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={selectedBookingService}
      />
    </div>
  );
}
