import { Link } from "react-router-dom";
import { Award, Leaf, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import signatureDish from "@/assets/dish-signature.jpg";

const highlights = [
  {
    icon: Award,
    title: "Michelin Starred",
    description: "Recognized for culinary excellence",
  },
  {
    icon: Leaf,
    title: "Farm to Table",
    description: "Fresh, seasonal ingredients daily",
  },
  {
    icon: ChefHat,
    title: "Master Chefs",
    description: "World-renowned culinary team",
  },
];

const HighlightsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <img
                src={signatureDish}
                alt="Signature dish at La Maison"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 rounded-lg shadow-lg">
              <p className="font-display text-2xl font-bold">20+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
                Our Story
              </p>
              <h2 className="heading-section text-foreground mb-6">
                A Culinary Journey<br />Like No Other
              </h2>
              <p className="text-body mb-6">
                At La Maison, we believe that dining is an art form. Each dish tells a story, 
                crafted with meticulous attention to detail and a deep respect for culinary traditions. 
                Our chefs combine time-honored techniques with innovative creativity to deliver 
                an unforgettable gastronomic experience.
              </p>
              <p className="text-body">
                From the carefully curated ingredients sourced from local farms to the 
                elegant presentation that graces your table, every element is designed to 
                delight your senses and create lasting memories.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {highlights.map((item, index) => (
                <div 
                  key={item.title} 
                  className="text-center opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-3">
                    <item.icon size={24} />
                  </div>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <Button variant="gold" size="lg" asChild>
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
