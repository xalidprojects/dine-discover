import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aynur Məmmədova",
    role: "Qida Tənqidçisi",
    content: "Əladır! Hər yeməkdə detallara olan diqqət heyrətamizdir. La Maison fine dining üçün yeni standart qoyub.",
    rating: 5,
  },
  {
    id: 2,
    name: "Elçin Həsənov",
    role: "Daimi Qonaq",
    content: "İçəri daxil olduğunuz andan başqa bir dünyaya aparılırsınız. Atmosfer, xidmət və əsası yemək - hamısı əla!",
    rating: 5,
  },
  {
    id: 3,
    name: "Leyla Əliyeva",
    role: "Şərab Həvəskarı",
    content: "Şərab cütləşdirmə mükəmməl idi. Sommelienin tövsiyələri hər kursu tamamlayırdı. Həqiqətən unudulmaz axşam.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
            Rəylər
          </p>
          <h2 className="heading-section text-foreground mb-4">
            Qonaqlarımız Nə Deyir
          </h2>
          <div className="divider-gold mt-6" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card-elegant p-8 relative opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-6">
                <p className="font-display text-lg font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
