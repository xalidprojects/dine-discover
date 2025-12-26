import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { name: "Ana Səhifə", path: "/" },
  { name: "Menyu", path: "/menu" },
  { name: "Rezervasiya", path: "/reservations" },
  { name: "Haqqımızda", path: "/about" },
  { name: "Qalereya", path: "/gallery" },
  { name: "Əlaqə", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className={`font-display text-2xl md:text-3xl font-semibold transition-colors ${
              isScrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            <span className="text-primary-foreground">La</span>{" "}
            <span className="text-accent">Maison</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-accent ${
                location.pathname === link.path ? "text-accent" : "text-accent/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {isAdmin && (
            <Link
              to="/admin"
              className={`p-2 rounded-full transition-colors hover:bg-accent/20 ${
                isScrolled ? "text-accent" : "text-accent"
              }`}
              title="Admin Panel"
            >
              <Heart size={24} fill="currentColor" />
            </Link>
          )}
          <Button variant="gold" size="lg" asChild>
            <Link to="/reservations">Masa Rezerv Et</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 transition-colors ${
            isScrolled ? "text-foreground" : "text-primary-foreground"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menyu aç/bağla"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[60px] bg-background/98 backdrop-blur-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6 pb-20">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xl font-display font-medium transition-all duration-300 hover:text-accent ${
                location.pathname === link.path ? "text-accent" : "text-accent/80"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-xl font-display font-medium text-accent hover:text-accent/80 transition-all duration-300"
            >
              <Heart size={24} fill="currentColor" />
              Admin Panel
            </Link>
          )}
          <Button variant="gold" size="xl" className="mt-4" asChild>
            <Link to="/reservations">Masa Rezerv Et</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
