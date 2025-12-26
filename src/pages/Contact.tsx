import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, Check, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().min(2, "Ad ən azı 2 simvol olmalıdır"),
  email: z.string().email("Düzgün email ünvanı daxil edin"),
  phone: z.string().optional(),
  message: z.string().min(20, "Mesaj ən azı 20 simvol olmalıdır"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Ünvan",
    lines: ["Neftçilər prospekti 123", "Bakı, Azərbaycan"],
  },
  {
    icon: Phone,
    title: "Telefon",
    lines: ["+994 50 123 45 67", "+994 12 456 78 90"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@lamaison.az", "rezervasiya@lamaison.az"],
  },
  {
    icon: Clock,
    title: "İş Saatları",
    lines: ["Çr - Bz: 12:00 - 15:00, 18:00 - 23:00", "Bazar ertəsi bağlıdır"],
  },
];

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Mesaj Göndərildi!",
        description: "Ən qısa zamanda sizinlə əlaqə saxlayacağıq.",
      });
    } catch (error) {
      toast({
        title: "Xəta",
        description: "Mesaj göndərilə bilmədi. Zəhmət olmasa yenidən cəhd edin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom text-center">
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
              Əlaqə
            </p>
            <h1 className="heading-display text-primary-foreground mb-6">
              Bizimlə Əlaqə
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Sizdən eşitmək istərdik. Menyumuz haqqında sualınız olsun, 
              özəl tədbir planlaşdırmaq istəyin, ya da sadəcə salam demək istəyin.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="text-center p-6 rounded-lg bg-card border border-border opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-4">
                    <info.icon size={24} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {info.title}
                  </h3>
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-muted-foreground text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="heading-section text-foreground mb-8">
                  Mesaj Göndərin
                </h2>

                {isSubmitted ? (
                  <div className="bg-card rounded-xl p-12 text-center border border-border">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                      <Check size={32} />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                      Təşəkkür Edirik!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Mesajınız uğurla göndərildi. 
                      24 saat ərzində cavab verəcəyik.
                    </p>
                    <Button
                      variant="gold"
                      onClick={() => {
                        setIsSubmitted(false);
                        form.reset();
                      }}
                    >
                      Başqa Mesaj Göndər
                    </Button>
                  </div>
                ) : (
                  <div className="bg-card rounded-xl p-8 border border-border">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Ad</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Adınız"
                                    {...field}
                                    className="bg-background"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="email@example.com"
                                    {...field}
                                    className="bg-background"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Telefon (opsional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+994 50 123 45 67"
                                  {...field}
                                  className="bg-background"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Mesaj</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Mesajınız..."
                                  className="bg-background min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading}>
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send size={18} />}
                          {isLoading ? "Göndərilir..." : "Mesajı Göndər"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                )}
              </div>

              {/* Map */}
              <div>
                <h2 className="heading-section text-foreground mb-8">
                  Bizi Tapın
                </h2>
                <div className="bg-card rounded-xl overflow-hidden border border-border h-[400px] lg:h-full min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4177077455!2d49.86751931525387!3d40.40926677936442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1635786994961!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="La Maison Məkanı"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
