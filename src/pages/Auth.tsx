import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const authSchema = z.object({
  email: z.string().email("Düzgün email ünvanı daxil edin"),
  password: z.string().min(6, "Şifrə ən azı 6 simvol olmalıdır"),
});

type AuthFormData = z.infer<typeof authSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/admin");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Giriş xətası",
              description: "Email və ya şifrə yanlışdır.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Xəta",
              description: error.message,
              variant: "destructive",
            });
          }
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Qeydiyyat xətası",
              description: "Bu email artıq qeydiyyatdan keçib.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Xəta",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Qeydiyyat uğurlu!",
            description: "Hesabınız yaradıldı.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Xəta",
        description: "Bir xəta baş verdi. Yenidən cəhd edin.",
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
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom text-center">
            <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
              Admin Panel
            </p>
            <h1 className="heading-display text-primary-foreground mb-6">
              {isLogin ? "Daxil ol" : "Qeydiyyat"}
            </h1>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom max-w-md">
            <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="admin@example.com"
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Şifrə</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLogin ? "Daxil ol" : "Qeydiyyatdan keç"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-accent hover:underline text-sm"
                >
                  {isLogin
                    ? "Hesabınız yoxdur? Qeydiyyatdan keçin"
                    : "Hesabınız var? Daxil olun"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
