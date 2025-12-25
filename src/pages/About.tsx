import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Users, Heart, Utensils } from "lucide-react";
import chefImage from "@/assets/chef.jpg";
import interiorImage from "@/assets/interior.jpg";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We pursue perfection in every dish, every service, every experience.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Our love for culinary arts drives everything we create.",
  },
  {
    icon: Users,
    title: "Hospitality",
    description: "Making every guest feel like family is our greatest joy.",
  },
  {
    icon: Utensils,
    title: "Innovation",
    description: "Blending tradition with creativity to surprise and delight.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom text-center">
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
              Our Story
            </p>
            <h1 className="heading-display text-primary-foreground mb-6">
              About La Maison
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              A legacy of culinary excellence spanning two decades, 
              where every meal tells a story of passion and craftsmanship.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="heading-section text-foreground">
                  A Journey of<br />
                  <span className="text-accent italic">Culinary Excellence</span>
                </h2>
                <p className="text-body">
                  Founded in 2004, La Maison began as a dream shared by two childhood friends 
                  with a passion for French cuisine. What started as a small bistro in the 
                  heart of New York has grown into one of the city's most celebrated fine 
                  dining destinations.
                </p>
                <p className="text-body">
                  Our philosophy is simple: source the finest ingredients, respect culinary 
                  traditions, and never stop innovating. Every dish that leaves our kitchen 
                  is a testament to this commitment—a harmonious blend of classic techniques 
                  and contemporary creativity.
                </p>
                <p className="text-body">
                  Over the years, we've been honored with numerous accolades, including a 
                  Michelin star and recognition from the James Beard Foundation. But our 
                  greatest achievement remains the smiles on our guests' faces and the 
                  memories we help create.
                </p>
              </div>
              <div className="relative">
                <img
                  src={interiorImage}
                  alt="La Maison interior"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg">
                  <p className="font-display text-4xl font-bold">20+</p>
                  <p className="text-sm">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-card">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
                Our Philosophy
              </p>
              <h2 className="heading-section text-foreground">
                Values We Live By
              </h2>
              <div className="divider-gold mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="text-center p-8 rounded-lg bg-background border border-border opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                    <value.icon size={28} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chef Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src={chefImage}
                  alt="Executive Chef"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium">
                  Meet Our Chef
                </p>
                <h2 className="heading-section text-foreground">
                  Chef Marcus Beaumont
                </h2>
                <p className="text-body">
                  With over 25 years of culinary experience across three continents, 
                  Chef Marcus Beaumont brings a unique perspective to La Maison's kitchen. 
                  Trained in the legendary kitchens of Paris and Tokyo, he combines 
                  classical French techniques with global influences.
                </p>
                <p className="text-body">
                  "Cooking is not just about feeding people—it's about creating moments 
                  of joy, connection, and wonder. Every plate is an opportunity to tell 
                  a story and touch someone's heart."
                </p>
                <p className="font-display text-lg italic text-foreground">
                  — Chef Marcus Beaumont
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary text-center">
          <div className="container-custom max-w-3xl">
            <h2 className="heading-section text-primary-foreground mb-6">
              Experience La Maison
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Join us for an unforgettable culinary journey. 
              Reserve your table today and discover why La Maison 
              is one of New York's most beloved dining destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="xl" asChild>
                <Link to="/reservations">Reserve a Table</Link>
              </Button>
              <Button
                size="xl"
                asChild
                className="border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/menu">View Our Menu</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
