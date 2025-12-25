import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import interiorImage from "@/assets/interior.jpg";

const InfoSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={interiorImage}
          alt="La Maison restoran interyeri"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Opening Hours */}
            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold text-gold">
                <Clock size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-cream">
                İş Saatları
              </h3>
              <div className="space-y-2 text-cream/70">
                <p>
                  <span className="text-cream font-medium">Nahar:</span> 12:00 - 15:00
                </p>
                <p>
                  <span className="text-cream font-medium">Şam:</span> 18:00 - 23:00
                </p>
                <p className="text-cream/50 text-sm pt-2">Çərşənbə - Bazar</p>
                <p className="text-gold text-sm">Bazar ertəsi bağlıdır</p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              <div className="w-16 h-0.5 bg-gold mx-auto" />
              <h3 className="font-display text-3xl font-semibold text-cream">
                <span className="text-gold italic">Əlavəolunmaz</span> Bir<br />
                Axşama Hazırsınız?
              </h3>
              <p className="text-cream/70 max-w-xs mx-auto">
                İndi masanızı sifariş edin və sizin üçün unudulmaz yemək təcrübəsi yaradaq.
              </p>
              <Button variant="gold" size="xl" asChild>
                <Link to="/reservations">Rezervasiya Et</Link>
              </Button>
            </div>

            {/* Location */}
            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold text-gold">
                <MapPin size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-cream">
                Bizi Tapın
              </h3>
              <div className="space-y-2 text-cream/70">
                <p>Neftçilər prospekti 123</p>
                <p>Bakı, Azərbaycan</p>
                <p className="pt-2">
                  <a href="tel:+994501234567" className="text-gold hover:underline">
                    +994 50 123 45 67
                  </a>
                </p>
                <p>
                  <a href="mailto:hello@lamaison.az" className="text-gold hover:underline">
                    hello@lamaison.az
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
