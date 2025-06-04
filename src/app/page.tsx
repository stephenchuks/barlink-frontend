// src/app/page.tsx
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PromotionsCarousel from '@/components/PromotionsCarousel';
import Footer from '@/components/Footer';
import PageLayout from '@/components/PageLayout';

export default function HomePage() {
  return (
    <PageLayout>
      <Header />
      <main>
        <HeroSection />
        <PromotionsCarousel />
        {/* Future: <OrderStatusPreview /> for returning users */}
      </main>
      <Footer />
    </PageLayout>
  );
}
