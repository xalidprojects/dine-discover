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
    title: "Mükəmməllik",
    description: "Hər yeməkdə, hər xidmətdə, hər təcrübədə mükəmməlliyə can atırıq.",
  },
  {
    icon: Heart,
    title: "Ehtiras",
    description: "Kulinariya sənətinə olan sevgimiz yaratdığımız hər şeyi idarə edir.",
  },
  {
    icon: Users,
    title: "Qonaqpərvərlik",
    description: "Hər qonağı ailə kimi hiss etdirmək ən böyük sevincimizdir.",
  },
  {
    icon: Utensils,
    title: "Yenilikçilik",
    description: "Ənənəni yaradıcılıqla birləşdirərək sürpriz və sevinc yaradırıq.",
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
              Bizim Hekayəmiz
            </p>
            <h1 className="heading-display text-primary-foreground mb-6">
              La Maison Haqqında
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              İyirmi ildən artıq kulinariya mükəmməlliyi mirası, 
              hər yeməyin ehtiras və ustalıq hekayəsi danışdığı yer.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="heading-section text-foreground">
                  <span className="text-accent italic">Kulinariya Mükəmməlliyi</span><br />
                  Səyahəti
                </h2>
                <p className="text-body">
                  2004-cü ildə qurulan La Maison, Fransız mətbəxinə ehtirasla bağlı iki uşaqlıq 
                  dostunun paylaşdığı bir xəyal olaraq başladı. Bakının mərkəzindəki kiçik 
                  bistro kimi başlayan şey, şəhərin ən məşhur fine dining məkanlarından 
                  birinə çevrildi.
                </p>
                <p className="text-body">
                  Fəlsəfəmiz sadədir: ən yaxşı inqrediyentləri əldə edin, kulinariya 
                  ənənələrinə hörmət edin və daim yenilik edin. Mətbəximizdən çıxan 
                  hər yemək bu öhdəliyin təsdiqidir - klassik texnikaların və 
                  müasir yaradıcılığın ahəngdar birləşməsi.
                </p>
                <p className="text-body">
                  İllər ərzində çoxsaylı mükafatlarla, o cümlədən Michelin ulduzu və 
                  James Beard Fondunun tanınması ilə şərəfləndik. Lakin ən böyük 
                  nailiyyətimiz qonaqlarımızın üzündəki təbəssümlər və yaratmağa 
                  kömək etdiyimiz xatirələr olaraq qalır.
                </p>
              </div>
              <div className="relative">
                <img
                  src={interiorImage}
                  alt="La Maison interyeri"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg">
                  <p className="font-display text-4xl font-bold">20+</p>
                  <p className="text-sm">İl Mükəmməllik</p>
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
                Fəlsəfəmiz
              </p>
              <h2 className="heading-section text-foreground">
                Yaşadığımız Dəyərlər
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
                  alt="Baş Aşpaz"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium">
                  Aşpazımızla Tanış Olun
                </p>
                <h2 className="heading-section text-foreground">
                  Baş Aşpaz Kamran Hüseynov
                </h2>
                <p className="text-body">
                  Üç qitədə 25 ildən artıq kulinariya təcrübəsi ilə Baş Aşpaz 
                  Kamran Hüseynov La Maison-un mətbəxinə unikal perspektiv gətirir. 
                  Paris və Tokionun əfsanəvi mətbəxlərində təlim keçmiş o, 
                  klassik Fransız texnikalarını qlobal təsirlərlə birləşdirir.
                </p>
                <p className="text-body">
                  "Yemək bişirmək sadəcə insanları doyurmaq deyil - sevinc, 
                  əlaqə və heyrət anları yaratmaqdır. Hər boşqab bir hekayə 
                  danışmaq və kiminsə ürəyinə toxunmaq üçün fürsətdir."
                </p>
                <p className="font-display text-lg italic text-foreground">
                  — Baş Aşpaz Kamran Hüseynov
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary text-center">
          <div className="container-custom max-w-3xl">
            <h2 className="heading-section text-primary-foreground mb-6">
              La Maison-u Kəşf Edin
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Unudulmaz kulinariya səyahətinə qoşulun. 
              Masanızı indi rezerv edin və La Maison-un niyə Bakının 
              ən sevilən yemək məkanlarından biri olduğunu kəşf edin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="xl" asChild>
                <Link to="/reservations">Masa Rezerv Edin</Link>
              </Button>
              <Button
                size="xl"
                asChild
                className="border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/menu">Menyumuza Baxın</Link>
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
