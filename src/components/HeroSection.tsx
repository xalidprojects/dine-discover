import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="La Maison Restoranı zərif yemək təcrübəsi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Tagline */}
          <p 
            className="text-gold uppercase tracking-[0.3em] text-sm md:text-base font-medium opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Zərif Yemək Təcrübəsi
          </p>

          {/* Main Title */}
          <h1 
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-cream leading-tight opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Kulinariya<br />
            <span className="text-gold italic">İncəsənəti</span> və Ənənə
          </h1>

          {/* Description */}
          <p 
            className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Ehtiras, dəqiqlik və ən təzə mövsümi inqrediyentlərlə hazırlanmış 
            əlavəedilməz yemək təcrübəsinə qoşulun.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Button 
              variant="gold" 
              size="xl" 
              asChild
              className="text-base"
            >
              <Link to="/menu">Menyumuza Baxın</Link>
            </Button>
            <Button 
              size="xl" 
              asChild
              className="border-2 border-cream/30 bg-transparent text-cream hover:bg-cream/10 text-base"
            >
              <Link to="/reservations">Masa Rezerv Edin</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="w-6 h-10 rounded-full border-2 border-cream/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-cream/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
