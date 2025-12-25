import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-3xl font-semibold">
              La <span className="text-accent">Maison</span>
            </h3>
            <p className="text-primary-foreground/70 leading-relaxed">
              Ənənə və yenilikçiliyin qovuşduğu unikal kulinariya səyahəti. 
              Ən yaxşı fine dining təcrübəsini yaşayın.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-xl font-semibold">Sürətli Keçidlər</h4>
            <nav className="flex flex-col gap-3">
              {[
                { name: "Ana Səhifə", path: "/" },
                { name: "Menyumuz", path: "/menu" },
                { name: "Rezervasiya", path: "/reservations" },
                { name: "Haqqımızda", path: "/about" },
                { name: "Qalereya", path: "/gallery" },
                { name: "Əlaqə", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-xl font-semibold">Əlaqə</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  Neftçilər prospekti 123<br />
                  Bakı, Azərbaycan
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-accent flex-shrink-0" />
                <a href="tel:+994501234567" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  +994 50 123 45 67
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-accent flex-shrink-0" />
                <a href="mailto:hello@lamaison.az" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  hello@lamaison.az
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-xl font-semibold">İş Saatları</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/70">
                  <p className="font-medium text-primary-foreground">Nahar</p>
                  <p>Çr - Bz: 12:00 - 15:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/70">
                  <p className="font-medium text-primary-foreground">Şam</p>
                  <p>Çr - Bz: 18:00 - 23:00</p>
                </div>
              </div>
              <p className="text-primary-foreground/50 text-sm pt-2">
                Bazar ertəsi bağlıdır
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {currentYear} La Maison. Bütün hüquqlar qorunur.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/50">
              <a href="#" className="hover:text-accent transition-colors">
                Gizlilik Siyasəti
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                İstifadə Şərtləri
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
