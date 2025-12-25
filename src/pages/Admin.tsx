import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit, LogOut, UtensilsCrossed, Calendar } from "lucide-react";
import { format } from "date-fns";
import { az } from "date-fns/locale";

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
  name_en: string;
  description_az: string | null;
  description_en: string | null;
  price: number;
  is_vegan: boolean;
  is_spicy: boolean;
  is_gluten_free: boolean;
  is_available: boolean;
}

interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  special_requests: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<"menu" | "reservations">("menu");
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Form state for new menu item
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    category_id: "",
    name_az: "",
    name_en: "",
    description_az: "",
    description_en: "",
    price: "",
    is_vegan: false,
    is_spicy: false,
    is_gluten_free: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const [categoriesRes, itemsRes, reservationsRes] = await Promise.all([
        supabase.from("menu_categories").select("*").order("display_order"),
        supabase.from("menu_items").select("*").order("created_at"),
        supabase.from("reservations").select("*").order("reservation_date", { ascending: true }),
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (itemsRes.data) setMenuItems(itemsRes.data);
      if (reservationsRes.data) setReservations(reservationsRes.data);
    } catch (error) {
      toast({
        title: "Xəta",
        description: "Məlumatlar yüklənərkən xəta baş verdi.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleAddMenuItem = async () => {
    if (!formData.category_id || !formData.name_az || !formData.price) {
      toast({
        title: "Xəta",
        description: "Zəhmət olmasa bütün tələb olunan sahələri doldurun.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingItem) {
        const { error } = await supabase
          .from("menu_items")
          .update({
            category_id: formData.category_id,
            name_az: formData.name_az,
            name_en: formData.name_en,
            description_az: formData.description_az || null,
            description_en: formData.description_en || null,
            price: parseFloat(formData.price),
            is_vegan: formData.is_vegan,
            is_spicy: formData.is_spicy,
            is_gluten_free: formData.is_gluten_free,
          })
          .eq("id", editingItem.id);

        if (error) throw error;
        toast({ title: "Uğurlu", description: "Yemək yeniləndi." });
      } else {
        const { error } = await supabase.from("menu_items").insert({
          category_id: formData.category_id,
          name_az: formData.name_az,
          name_en: formData.name_en,
          description_az: formData.description_az || null,
          description_en: formData.description_en || null,
          price: parseFloat(formData.price),
          is_vegan: formData.is_vegan,
          is_spicy: formData.is_spicy,
          is_gluten_free: formData.is_gluten_free,
        });

        if (error) throw error;
        toast({ title: "Uğurlu", description: "Yeni yemək əlavə edildi." });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      toast({
        title: "Xəta",
        description: "Əməliyyat zamanı xəta baş verdi.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm("Bu yeməyi silmək istədiyinizə əminsiniz?")) return;

    try {
      const { error } = await supabase.from("menu_items").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Uğurlu", description: "Yemək silindi." });
      fetchData();
    } catch (error) {
      toast({
        title: "Xəta",
        description: "Silmə zamanı xəta baş verdi.",
        variant: "destructive",
      });
    }
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      category_id: item.category_id,
      name_az: item.name_az,
      name_en: item.name_en,
      description_az: item.description_az || "",
      description_en: item.description_en || "",
      price: item.price.toString(),
      is_vegan: item.is_vegan,
      is_spicy: item.is_spicy,
      is_gluten_free: item.is_gluten_free,
    });
    setIsDialogOpen(true);
  };

  const handleUpdateReservationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("reservations")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Uğurlu", description: "Rezervasiya statusu yeniləndi." });
      fetchData();
    } catch (error) {
      toast({
        title: "Xəta",
        description: "Status yeniləmə zamanı xəta baş verdi.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      category_id: "",
      name_az: "",
      name_en: "",
      description_az: "",
      description_en: "",
      price: "",
      is_vegan: false,
      is_spicy: false,
      is_gluten_free: false,
    });
    setEditingItem(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom text-center">
            <h1 className="heading-section text-foreground mb-4">İcazə yoxdur</h1>
            <p className="text-muted-foreground mb-8">
              Admin panelinə daxil olmaq üçün admin səlahiyyətləriniz olmalıdır.
            </p>
            <Button variant="gold" onClick={handleSignOut}>
              Çıxış
            </Button>
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
        <section className="pt-32 pb-8 bg-primary">
          <div className="container-custom">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-2">
                  İdarəetmə
                </p>
                <h1 className="heading-display text-primary-foreground">
                  Admin Panel
                </h1>
              </div>
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleSignOut}
              >
                <LogOut size={18} className="mr-2" />
                Çıxış
              </Button>
            </div>
          </div>
        </section>

        <section className="py-8 bg-background border-b border-border">
          <div className="container-custom">
            <div className="flex gap-4">
              <Button
                variant={activeTab === "menu" ? "gold" : "outline"}
                onClick={() => setActiveTab("menu")}
              >
                <UtensilsCrossed size={18} className="mr-2" />
                Menyu
              </Button>
              <Button
                variant={activeTab === "reservations" ? "gold" : "outline"}
                onClick={() => setActiveTab("reservations")}
              >
                <Calendar size={18} className="mr-2" />
                Rezervasiyalar
              </Button>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            {isLoadingData ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : activeTab === "menu" ? (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="heading-section text-foreground">Menyu Əşyaları</h2>
                  <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) resetForm();
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="gold">
                        <Plus size={18} className="mr-2" />
                        Yeni Yemək
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>
                          {editingItem ? "Yeməyi Redaktə Et" : "Yeni Yemək Əlavə Et"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <label className="text-sm font-medium text-foreground">
                            Kateqoriya *
                          </label>
                          <Select
                            value={formData.category_id}
                            onValueChange={(value) =>
                              setFormData({ ...formData, category_id: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Kateqoriya seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.name_az}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground">
                              Ad (AZ) *
                            </label>
                            <Input
                              value={formData.name_az}
                              onChange={(e) =>
                                setFormData({ ...formData, name_az: e.target.value })
                              }
                              placeholder="Plov"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">
                              Ad (EN)
                            </label>
                            <Input
                              value={formData.name_en}
                              onChange={(e) =>
                                setFormData({ ...formData, name_en: e.target.value })
                              }
                              placeholder="Pilaf"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">
                            Təsvir (AZ)
                          </label>
                          <Textarea
                            value={formData.description_az}
                            onChange={(e) =>
                              setFormData({ ...formData, description_az: e.target.value })
                            }
                            placeholder="Ənənəvi Azərbaycan yeməyi..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">
                            Təsvir (EN)
                          </label>
                          <Textarea
                            value={formData.description_en}
                            onChange={(e) =>
                              setFormData({ ...formData, description_en: e.target.value })
                            }
                            placeholder="Traditional Azerbaijani dish..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">
                            Qiymət (AZN) *
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) =>
                              setFormData({ ...formData, price: e.target.value })
                            }
                            placeholder="25.00"
                          />
                        </div>
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="vegan"
                              checked={formData.is_vegan}
                              onCheckedChange={(checked) =>
                                setFormData({ ...formData, is_vegan: !!checked })
                              }
                            />
                            <label htmlFor="vegan" className="text-sm">
                              Vegan
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="spicy"
                              checked={formData.is_spicy}
                              onCheckedChange={(checked) =>
                                setFormData({ ...formData, is_spicy: !!checked })
                              }
                            />
                            <label htmlFor="spicy" className="text-sm">
                              Acı
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="gluten"
                              checked={formData.is_gluten_free}
                              onCheckedChange={(checked) =>
                                setFormData({ ...formData, is_gluten_free: !!checked })
                              }
                            />
                            <label htmlFor="gluten" className="text-sm">
                              Qlütensiz
                            </label>
                          </div>
                        </div>
                        <Button
                          variant="gold"
                          className="w-full"
                          onClick={handleAddMenuItem}
                        >
                          {editingItem ? "Yadda Saxla" : "Əlavə Et"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ad</TableHead>
                        <TableHead>Kateqoriya</TableHead>
                        <TableHead>Qiymət</TableHead>
                        <TableHead>Etiketlər</TableHead>
                        <TableHead className="text-right">Əməliyyatlar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menuItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name_az}</TableCell>
                          <TableCell>
                            {categories.find((c) => c.id === item.category_id)?.name_az}
                          </TableCell>
                          <TableCell>{item.price} AZN</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {item.is_vegan && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                  Vegan
                                </span>
                              )}
                              {item.is_spicy && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                  Acı
                                </span>
                              )}
                              {item.is_gluten_free && (
                                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                                  Qlütensiz
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditMenuItem(item)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteMenuItem(item.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {menuItems.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            Heç bir yemək tapılmadı
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="heading-section text-foreground mb-8">Rezervasiyalar</h2>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ad</TableHead>
                        <TableHead>Əlaqə</TableHead>
                        <TableHead>Tarix</TableHead>
                        <TableHead>Saat</TableHead>
                        <TableHead>Qonaq</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Əməliyyatlar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservations.map((res) => (
                        <TableRow key={res.id}>
                          <TableCell className="font-medium">{res.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{res.phone}</p>
                              <p className="text-muted-foreground">{res.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {format(new Date(res.reservation_date), "d MMM yyyy", { locale: az })}
                          </TableCell>
                          <TableCell>{res.reservation_time}</TableCell>
                          <TableCell>{res.guests} nəfər</TableCell>
                          <TableCell>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                res.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : res.status === "cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {res.status === "confirmed"
                                ? "Təsdiqlənib"
                                : res.status === "cancelled"
                                ? "Ləğv edilib"
                                : "Gözləyir"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Select
                              value={res.status}
                              onValueChange={(value) =>
                                handleUpdateReservationStatus(res.id, value)
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Gözləyir</SelectItem>
                                <SelectItem value="confirmed">Təsdiqlə</SelectItem>
                                <SelectItem value="cancelled">Ləğv et</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                      {reservations.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            Heç bir rezervasiya tapılmadı
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
