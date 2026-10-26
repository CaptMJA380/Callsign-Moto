import React, { useState } from 'react';
import { VariantType } from './types/product';
import { Order } from './types/order';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/hero/Hero';
import { VariantComparison } from './components/variants/VariantComparison';
import { CustomizerSection } from './components/customizer/CustomizerSection';
import { BuiltForYourRide } from './components/lifestyle/BuiltForYourRide';
import { HowItWorks } from './components/howItWorks/HowItWorks';
import { FAQ } from './components/faq/FAQ';
import { FinalCTA } from './components/hero/FinalCTA';
import { Footer } from './components/navbar/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderSuccessModal } from './components/checkout/OrderSuccessModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const [activeVariant, setActiveVariant] = useState<VariantType>('TRICOLOUR_EDITION');

  const handleVariantSelectFromComparison = (v: VariantType) => {
    setActiveVariant(v);
  };

  const handleOrderSuccess = (order: Order) => {
    setConfirmedOrder(order);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F8FAFC] transition-colors duration-300 relative">
      {/* Scenic Indian Terrain Background (Motorcycle Rider's POV Perspective) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/assets/rider-pov-ladakh.jpg"
          alt="Indian terrain from bike rider perspective"
          className="w-full h-full object-cover object-top opacity-40 dark:opacity-60 filter contrast-110 animate-rider-motion"
        />
        {/* Subtle cinematic gradient vignette allowing the mountain scenery & road to show through clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F5F7]/70 to-[#F5F5F7]/95 dark:from-black/30 dark:via-black/70 dark:to-black/90 pointer-events-none" />
      </div>

      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        {/* Section 2: Hero */}
        <Hero />

        {/* Section 3: Product Lineup (Editions) */}
        <VariantComparison onSelectVariant={handleVariantSelectFromComparison} />

        {/* Section 4: Interactive Studio Customizer */}
        <CustomizerSection
          selectedVariantId={activeVariant}
          onVariantChange={setActiveVariant}
        />

        {/* Section 5: Built for Your Ride (Jacket & Bike Context) */}
        <BuiltForYourRide />

        {/* Section 6: How It Works */}
        <HowItWorks />

        {/* Section 7: FAQ */}
        <FAQ />

        {/* Section 8: Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Full Checkout Modal with Indian Address Form & Location */}
      <CheckoutModal onOrderSuccess={handleOrderSuccess} />

      {/* Order Success & Confetti Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Admin Security & Dashboard Portal */}
      {isAdminOpen && (
        isAuthenticated ? (
          <AdminDashboard onClose={() => setIsAdminOpen(false)} />
        ) : (
          <AdminLogin
            onSuccess={() => setIsAdminOpen(true)}
            onCancel={() => setIsAdminOpen(false)}
          />
        )
      )}
    </div>
  );
};

export default App;
