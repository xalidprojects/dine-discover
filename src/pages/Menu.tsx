import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Leaf, Flame, Wheat, Loader2 } from "lucide-react";

interface MenuCategory {
  id: string;
  name_az: string;
  name_en: string;
  display_order: number;
}

interface MenuItem {
  id: string;
  category_id: string;
  name_az: string;
  description_az: string | null;
  price: number;
  is_vegan: boolean;
  is_spicy: boolean;
  is_gluten_free: boolean;
  is_available: boolean;
}

const DietaryIcon = ({ type }: { type: "vegan" | "spicy" | "gluten-free" }) => {
  switch (type) {
    case "vegan":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <Leaf size={12} /> Vegan
        </span>
      );
    case "spicy":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
          <Flame size={12} /> Acı
        </span>
      );
    case "gluten-free":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
          <Wheat size={12} /> Qlütensiz
        </span>
      );
  }
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const [categoriesRes, itemsRes] = await Promise.all([
        supabase.from("menu_categories").select("*").order("display_order"),
        supabase.from("menu_items").select("*").eq("is_available", true),
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (itemsRes.data) setMenuItems(itemsRes.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category_id === activeCategory);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category_id]) {
      acc[item.category_id] = [];
    }
    acc[item.category_id].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom text-center">
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
              Kulinariya Mükəmməlliyi
            </p>
            <h1 className="heading-display text-primary-foreground mb-6">
              Menyumuz
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Hər yemək bir şah əsərdir, ən təzə mövsümi inqrediyentlərlə hazırlanmış 
              və həm ənənə, həm də yenilikçilikdən ilham almışdır.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-[60px] z-40 bg-background border-b border-border">
          <div className="container-custom py-4">
            <div className="flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Hamısı
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.name_az}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : (
              categories.map((category) => {
                const items = groupedItems[category.id];
                if (!items || items.length === 0) return null;

                return (
                  <div key={category.id} className="mb-16 last:mb-0">
                    <h2 className="font-display text-3xl font-semibold text-foreground mb-8 text-center">
                      {category.name_az}
                    </h2>
                    <div className="divider-gold mb-10" />

                    <div className="space-y-8">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-start gap-4 pb-8 border-b border-border/50 last:border-0 last:pb-0 opacity-0 animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-display text-xl font-semibold text-foreground">
                                {item.name_az}
                              </h3>
                            </div>
                            {item.description_az && (
                              <p className="text-muted-foreground mb-3">{item.description_az}</p>
                            )}
                            <div className="flex gap-2 flex-wrap">
                              {item.is_vegan && <DietaryIcon type="vegan" />}
                              {item.is_spicy && <DietaryIcon type="spicy" />}
                              {item.is_gluten_free && <DietaryIcon type="gluten-free" />}
                            </div>
                          </div>
                          <div className="font-display text-xl font-semibold text-accent">
                            {item.price} ₼
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Note */}
        <section className="pb-16 bg-background">
          <div className="container-custom max-w-2xl text-center">
            <p className="text-muted-foreground text-sm">
              Zəhmət olmasa allergiya və ya pəhriz tələblərinizi xidmətçiyə bildirin. 
              Qiymətlər dəyişə bilər. 10% xidmət haqqı hesabınıza əlavə olunacaq.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
