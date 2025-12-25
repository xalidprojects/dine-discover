import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InfoSection from "@/components/InfoSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HighlightsSection />
        <TestimonialsSection />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
