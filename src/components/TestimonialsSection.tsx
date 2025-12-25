import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Food Critic",
    content: "An extraordinary culinary experience. The attention to detail in every dish is remarkable. La Maison has set a new standard for fine dining.",
    rating: 5,
  },
  {
    id: 2,
    name: "James Thompson",
    role: "Regular Guest",
    content: "From the moment you walk in, you're transported to another world. The ambiance, the service, and most importantly, the food - all exceptional.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Wine Enthusiast",
    content: "The wine pairing was absolutely divine. The sommelier's recommendations perfectly complemented each course. A truly memorable evening.",
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
            Testimonials
          </p>
          <h2 className="heading-section text-foreground mb-4">
            What Our Guests Say
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
