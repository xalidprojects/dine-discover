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
          alt="La Maison restaurant interior"
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
                Opening Hours
              </h3>
              <div className="space-y-2 text-cream/70">
                <p>
                  <span className="text-cream font-medium">Lunch:</span> 12:00 PM - 3:00 PM
                </p>
                <p>
                  <span className="text-cream font-medium">Dinner:</span> 6:00 PM - 11:00 PM
                </p>
                <p className="text-cream/50 text-sm pt-2">Tuesday - Sunday</p>
                <p className="text-gold text-sm">Closed on Mondays</p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              <div className="w-16 h-0.5 bg-gold mx-auto" />
              <h3 className="font-display text-3xl font-semibold text-cream">
                Ready for an<br />
                <span className="text-gold italic">Extraordinary</span> Evening?
              </h3>
              <p className="text-cream/70 max-w-xs mx-auto">
                Book your table now and let us create an unforgettable dining experience for you.
              </p>
              <Button variant="gold" size="xl" asChild>
                <Link to="/reservations">Make a Reservation</Link>
              </Button>
            </div>

            {/* Location */}
            <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-gold text-gold">
                <MapPin size={28} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-cream">
                Find Us
              </h3>
              <div className="space-y-2 text-cream/70">
                <p>123 Gourmet Avenue</p>
                <p>New York, NY 10001</p>
                <p className="pt-2">
                  <a href="tel:+12125551234" className="text-gold hover:underline">
                    (212) 555-1234
                  </a>
                </p>
                <p>
                  <a href="mailto:hello@lamaison.com" className="text-gold hover:underline">
                    hello@lamaison.com
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
