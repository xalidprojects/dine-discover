import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-restaurant.jpg";
import dishImage from "@/assets/dish-signature.jpg";
import chefImage from "@/assets/chef.jpg";
import interiorImage from "@/assets/interior.jpg";

const galleryImages = [
  { src: heroImage, alt: "Elegant dining setup at La Maison", category: "interior" },
  { src: dishImage, alt: "Signature steak dish", category: "food" },
  { src: interiorImage, alt: "Restaurant interior with chandelier", category: "interior" },
  { src: chefImage, alt: "Chef preparing a dish", category: "team" },
  { src: heroImage, alt: "Candlelit dinner setting", category: "interior" },
  { src: dishImage, alt: "Gourmet presentation", category: "food" },
];

const categories = ["all", "food", "interior", "team"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom text-center">
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
              Visual Journey
            </p>
            <h1 className="heading-display text-primary-foreground mb-6">
              Our Gallery
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Explore the beauty of La Maison through our collection of 
              culinary creations, stunning interiors, and memorable moments.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-[60px] z-40 bg-background border-b border-border">
          <div className="container-custom py-4">
            <div className="flex justify-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group opacity-0 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                  onClick={() => setSelectedImage(image.src)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-cream font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-cream text-4xl hover:text-accent transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
