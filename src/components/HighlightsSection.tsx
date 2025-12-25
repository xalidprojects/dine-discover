import { Link } from "react-router-dom";
import { Award, Leaf, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import signatureDish from "@/assets/dish-signature.jpg";

const highlights = [
  {
    icon: Award,
    title: "Michelin Ulduzlu",
    description: "Kulinariya mükəmməlliyi ilə tanınır",
  },
  {
    icon: Leaf,
    title: "Fermadan Süfrəyə",
    description: "Hər gün təzə, mövsümi inqrediyentlər",
  },
  {
    icon: ChefHat,
    title: "Usta Aşpazlar",
    description: "Dünya şöhrətli kulinariya komandası",
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
                alt="La Maison-un imza yeməyi"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-4 rounded-lg shadow-lg">
              <p className="font-display text-2xl font-bold">20+</p>
              <p className="text-sm">İl Mükəmməllik</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
                Bizim Hekayəmiz
              </p>
              <h2 className="heading-section text-foreground mb-6">
                Misilsiz Bir<br />Kulinariya Səyahəti
              </h2>
              <p className="text-body mb-6">
                La Maison-da inanırıq ki, yemək bir sənət formasıdır. Hər yemək bir hekayə 
                danışır, diqqətli detallara və kulinariya ənənələrinə dərin hörmətlə 
                hazırlanır. Aşpazlarımız zamanla sınaqdan keçmiş texnikaları yenilikçi 
                yaradıcılıqla birləşdirir.
              </p>
              <p className="text-body">
                Yerli fermalardan diqqətlə seçilmiş inqrediyentlərdən tutmuş 
                masanızı bəzəyən zərif təqdimatadək, hər element hisslərinizi 
                sevindirmək üçün dizayn edilmişdir.
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
              <Link to="/about">Hekayəmizi Kəşf Edin</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
