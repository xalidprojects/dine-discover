import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, isSameDay, differenceInMinutes } from "date-fns";
import { az } from "date-fns/locale";
import { CalendarIcon, Clock, Users, Check, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const reservationSchema = z.object({
  name: z.string().min(2, "Ad ən azı 2 simvol olmalıdır"),
  email: z.string().email("Düzgün email ünvanı daxil edin"),
  phone: z.string().min(10, "Düzgün telefon nömrəsi daxil edin"),
  date: z.date({ required_error: "Zəhmət olmasa tarix seçin" }),
  time: z.string({ required_error: "Zəhmət olmasa saat seçin" }),
  guests: z.string({ required_error: "Zəhmət olmasa qonaq sayını seçin" }),
  specialRequests: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8+"];

const Reservations = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const selectedDate = form.watch("date");

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return timeSlots;

    const now = new Date();
    const isToday = isSameDay(selectedDate, now);

    if (!isToday) return timeSlots;

    // Bu gün üçün yalnız 4 saat sonrakı vaxtları göstər
    return timeSlots.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hours, minutes, 0, 0);

      return differenceInMinutes(slotTime, now) >= 240;
    });
  };

  const availableTimeSlots = getAvailableTimeSlots();

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      const selectedDateStr = format(data.date, "yyyy-MM-dd");

      const { data: existingReservations, error: fetchError } = await supabase
        .from("reservations")
        .select("reservation_time")
        .eq("reservation_date", selectedDateStr)
        .neq("status", "cancelled");

      if (fetchError) throw fetchError;

      const [selH, selM] = data.time.split(":").map(Number);
      const selectedDateTime = new Date(data.date);
      selectedDateTime.setHours(selH, selM, 0, 0);

      const hasConflict = (existingReservations ?? []).some((res) => {
        const existing = String(res.reservation_time ?? "");
        const existingHHMM = existing.slice(0, 5);

        // Eyni saat artıq tutulubsa, rezerv ETMƏ
        if (existingHHMM === data.time) return true;

        // Eyni gün üçün minimum 4 saat ara şərti
        const [exH, exM] = existingHHMM.split(":").map(Number);
        if (Number.isNaN(exH) || Number.isNaN(exM)) return false;

        const existingDateTime = new Date(data.date);
        existingDateTime.setHours(exH, exM, 0, 0);

        return Math.abs(differenceInMinutes(selectedDateTime, existingDateTime)) < 240;
      });

      if (hasConflict) {
        toast({
          title: "Vaxt doludur",
          description:
            "Bu vaxt artıq rezerv olunub və ya eyni gün üçün 4 saat ara qaydasına düşmür. Zəhmət olmasa başqa vaxt seçin.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("reservations").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        reservation_date: selectedDateStr,
        reservation_time: data.time,
        guests: parseInt(data.guests.replace("+", "")),
        special_requests: data.specialRequests || null,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Rezervasiya Təsdiqləndi!",
        description: `${format(data.date, "d MMMM yyyy", { locale: az })} tarixində saat ${data.time}-da görüşəcəyik.`,
      });
    } catch (error) {
      toast({
        title: "Xəta",
        description: "Rezervasiya göndərilərkən xəta baş verdi. Yenidən cəhd edin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom max-w-2xl text-center">
            <div className="bg-card rounded-xl p-12 shadow-lg border border-border">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                <Check size={40} />
              </div>
              <h1 className="heading-section text-foreground mb-4">
                Rezervasiya Təsdiqləndi!
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                La Maison-u seçdiyiniz üçün təşəkkür edirik. Bütün detallarla 
                təsdiq emaili göndərdik. Sizi gözləyirik!
              </p>
              <Button
                variant="gold"
                size="lg"
                onClick={() => setIsSubmitted(false)}
              >
                Başqa Rezervasiya Et
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom text-center">
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
              Masa Rezervasiyası
            </p>
            <h1 className="heading-display text-primary-foreground mb-6">
              Masanızı Rezerv Edin
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Unudulmaz yemək təcrübəsi üçün yerinizi təmin edin. 
              8-dən çox qonaq üçün zəhmət olmasa birbaşa bizə zəng edin.
            </p>
          </div>
        </section>

        {/* Reservation Form */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-2xl">
            <Alert className="mb-8 border-accent/50 bg-accent/10">
              <AlertCircle className="h-4 w-4 text-accent" />
              <AlertDescription className="text-foreground">
                <strong>Diqqət:</strong> Rezervasiya üçün 4 saat vaxt limiti var. 
                Eyni gün üçün rezervasiyalar arasında minimum 4 saat ara olmalıdır.
              </AlertDescription>
            </Alert>

            <div className="bg-card rounded-xl p-8 md:p-12 shadow-lg border border-border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Ad Soyad</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Adınız Soyadınız"
                            {...field}
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Telefon Nömrəsi</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+994 50 123 45 67"
                              {...field}
                              className="bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Date */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-foreground">Tarix</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal bg-background",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "d MMMM yyyy", { locale: az }) : "Tarix seçin"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today || date.getDay() === 1; // Bazar ertəsi bağlıdır
                              }}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Time & Guests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Saat</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Saat seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableTimeSlots.length > 0 ? (
                                availableTimeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="none" disabled>
                                  Bu gün üçün mövcud vaxt yoxdur
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Qonaq Sayı</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Qonaq sayı seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {guestOptions.map((num) => (
                                <SelectItem key={num} value={num}>
                                  {num} {num === "1" ? "Qonaq" : "Qonaq"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Special Requests */}
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Xüsusi İstəklər (İstəyə bağlı)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Pəhriz məhdudiyyətləri, xüsusi münasibətlər, oturma üstünlükləri..."
                            className="bg-background min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    variant="gold" 
                    size="xl" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Göndərilir..." : "Rezervasiyanı Təsdiqlə"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="pb-16 bg-background">
          <div className="container-custom max-w-2xl text-center">
            <p className="text-muted-foreground text-sm">
              Rezervasiyalar sifariş vaxtından 15 dəqiqə sonraya qədər saxlanılır. 
              Ləğv etmək və ya dəyişiklik üçün ən azı 24 saat əvvəl bizə zəng edin.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reservations;
