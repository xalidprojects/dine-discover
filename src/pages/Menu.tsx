import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Leaf, Flame, Wheat } from "lucide-react";

type Category = "all" | "starters" | "mains" | "desserts" | "drinks";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: Exclude<Category, "all">;
  dietary?: ("vegan" | "spicy" | "gluten-free")[];
  featured?: boolean;
}

const menuItems: MenuItem[] = [
  // Starters
  {
    id: 1,
    name: "Tuna Tartare",
    description: "Fresh tuna, avocado mousse, citrus vinaigrette, crispy wonton",
    price: "$24",
    category: "starters",
    featured: true,
  },
  {
    id: 2,
    name: "Burrata Salad",
    description: "Creamy burrata, heirloom tomatoes, basil oil, aged balsamic",
    price: "$22",
    category: "starters",
    dietary: ["gluten-free"],
  },
  {
    id: 3,
    name: "French Onion Soup",
    description: "Caramelized onions, rich beef broth, gruyère crouton",
    price: "$18",
    category: "starters",
  },
  {
    id: 4,
    name: "Seared Scallops",
    description: "Pan-seared diver scallops, pea purée, pancetta crisps",
    price: "$28",
    category: "starters",
    dietary: ["gluten-free"],
  },
  // Mains
  {
    id: 5,
    name: "Wagyu Beef Tenderloin",
    description: "8oz A5 wagyu, truffle potato purée, seasonal vegetables, red wine jus",
    price: "$85",
    category: "mains",
    featured: true,
    dietary: ["gluten-free"],
  },
  {
    id: 6,
    name: "Pan-Roasted Duck",
    description: "Crispy duck breast, cherry gastrique, wild rice, braised endive",
    price: "$52",
    category: "mains",
    dietary: ["gluten-free"],
  },
  {
    id: 7,
    name: "Lobster Thermidor",
    description: "Whole Maine lobster, cognac cream sauce, gruyère gratin",
    price: "$78",
    category: "mains",
  },
  {
    id: 8,
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, foraged mushrooms, parmesan, truffle oil",
    price: "$38",
    category: "mains",
    dietary: ["vegan", "gluten-free"],
  },
  {
    id: 9,
    name: "Chilean Sea Bass",
    description: "Miso-glazed sea bass, bok choy, ginger beurre blanc",
    price: "$56",
    category: "mains",
    dietary: ["gluten-free"],
  },
  {
    id: 10,
    name: "Spiced Lamb Rack",
    description: "Herb-crusted lamb, harissa yogurt, couscous, roasted vegetables",
    price: "$62",
    category: "mains",
    dietary: ["spicy"],
  },
  // Desserts
  {
    id: 11,
    name: "Chocolate Soufflé",
    description: "Dark chocolate soufflé, vanilla crème anglaise, gold leaf",
    price: "$18",
    category: "desserts",
    featured: true,
  },
  {
    id: 12,
    name: "Crème Brûlée",
    description: "Classic vanilla bean custard, caramelized sugar, fresh berries",
    price: "$14",
    category: "desserts",
    dietary: ["gluten-free"],
  },
  {
    id: 13,
    name: "Tarte Tatin",
    description: "Caramelized apple tart, calvados ice cream, caramel drizzle",
    price: "$16",
    category: "desserts",
  },
  {
    id: 14,
    name: "Seasonal Sorbet Trio",
    description: "Chef's selection of house-made sorbets",
    price: "$12",
    category: "desserts",
    dietary: ["vegan", "gluten-free"],
  },
  // Drinks
  {
    id: 15,
    name: "Signature Martini",
    description: "Premium vodka, dry vermouth, olive brine, blue cheese olive",
    price: "$18",
    category: "drinks",
  },
  {
    id: 16,
    name: "Old Fashioned",
    description: "Bourbon, angostura bitters, orange peel, luxardo cherry",
    price: "$16",
    category: "drinks",
  },
  {
    id: 17,
    name: "Champagne by the Glass",
    description: "Veuve Clicquot Yellow Label Brut",
    price: "$24",
    category: "drinks",
  },
  {
    id: 18,
    name: "Espresso Martini",
    description: "Vodka, fresh espresso, coffee liqueur, vanilla",
    price: "$17",
    category: "drinks",
  },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "starters", label: "Starters" },
  { key: "mains", label: "Main Courses" },
  { key: "desserts", label: "Desserts" },
  { key: "drinks", label: "Drinks" },
];

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
          <Flame size={12} /> Spicy
        </span>
      );
    case "gluten-free":
      return (
        <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
          <Wheat size={12} /> GF
        </span>
      );
  }
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const categoryOrder: Exclude<Category, "all">[] = ["starters", "mains", "desserts", "drinks"];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom text-center">
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
              Culinary Excellence
            </p>
            <h1 className="heading-display text-primary-foreground mb-6">
              Our Menu
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Each dish is a masterpiece, crafted with the finest seasonal ingredients 
              and inspired by both tradition and innovation.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-[60px] z-40 bg-background border-b border-border">
          <div className="container-custom py-4">
            <div className="flex justify-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            {categoryOrder.map((category) => {
              const items = groupedItems[category];
              if (!items || items.length === 0) return null;

              return (
                <div key={category} className="mb-16 last:mb-0">
                  <h2 className="font-display text-3xl font-semibold text-foreground mb-8 text-center capitalize">
                    {category === "mains" ? "Main Courses" : category}
                  </h2>
                  <div className="divider-gold mb-10" />

                  <div className="space-y-8">
                    {items.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex justify-between items-start gap-4 pb-8 border-b border-border/50 last:border-0 last:pb-0 opacity-0 animate-fade-in ${
                          item.featured ? "bg-accent/5 -mx-6 px-6 py-6 rounded-lg border-accent/20" : ""
                        }`}
                        style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-display text-xl font-semibold text-foreground">
                              {item.name}
                            </h3>
                            {item.featured && (
                              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                                Chef's Choice
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">{item.description}</p>
                          {item.dietary && (
                            <div className="flex gap-2 flex-wrap">
                              {item.dietary.map((d) => (
                                <DietaryIcon key={d} type={d} />
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="font-display text-xl font-semibold text-accent">
                          {item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Note */}
        <section className="pb-16 bg-background">
          <div className="container-custom max-w-2xl text-center">
            <p className="text-muted-foreground text-sm">
              Please inform your server of any allergies or dietary requirements. 
              Prices are subject to change. A discretionary service charge of 12.5% 
              will be added to your bill.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
