-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create function to check if user has a role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create menu_categories table
CREATE TABLE public.menu_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_az TEXT NOT NULL,
    name_en TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on menu_categories
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;

-- Create menu_items table
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.menu_categories(id) ON DELETE CASCADE NOT NULL,
    name_az TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_az TEXT,
    description_en TEXT,
    price DECIMAL(10, 2) NOT NULL,
    is_vegan BOOLEAN NOT NULL DEFAULT false,
    is_spicy BOOLEAN NOT NULL DEFAULT false,
    is_gluten_free BOOLEAN NOT NULL DEFAULT false,
    image_url TEXT,
    is_available BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on menu_items
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Create reservations table
CREATE TABLE public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests INTEGER NOT NULL,
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reservations
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for menu_categories (public read, admin write)
CREATE POLICY "Anyone can view menu categories"
ON public.menu_categories
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage menu categories"
ON public.menu_categories
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for menu_items (public read, admin write)
CREATE POLICY "Anyone can view menu items"
ON public.menu_items
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage menu items"
ON public.menu_items
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for reservations (public insert, admin read/update)
CREATE POLICY "Anyone can create reservations"
ON public.reservations
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all reservations"
ON public.reservations
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage reservations"
ON public.reservations
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default menu categories
INSERT INTO public.menu_categories (name_az, name_en, display_order) VALUES
('Başlanğıclar', 'Starters', 1),
('Əsas Yeməklər', 'Main Courses', 2),
('Şirniyyatlar', 'Desserts', 3),
('İçkilər', 'Drinks', 4);

-- Insert sample menu items
INSERT INTO public.menu_items (category_id, name_az, name_en, description_az, description_en, price, is_vegan, is_spicy) VALUES
((SELECT id FROM public.menu_categories WHERE name_en = 'Starters'), 'Dovğa', 'Dovga Soup', 'Ənənəvi Azərbaycan yoğurt şorbası', 'Traditional Azerbaijani yogurt soup', 8.00, true, false),
((SELECT id FROM public.menu_categories WHERE name_en = 'Starters'), 'Qutab', 'Qutab', 'Ətli və ya otlu nazik xəmir', 'Thin dough with meat or herbs', 12.00, false, false),
((SELECT id FROM public.menu_categories WHERE name_en = 'Main Courses'), 'Plov', 'Plov', 'Azərbaycan düyü yeməyi ətlə', 'Azerbaijani rice dish with meat', 25.00, false, false),
((SELECT id FROM public.menu_categories WHERE name_en = 'Main Courses'), 'Kabab Lülə', 'Lula Kebab', 'Qoyun əti kabab', 'Minced lamb kebab', 22.00, false, true),
((SELECT id FROM public.menu_categories WHERE name_en = 'Desserts'), 'Pakhlava', 'Pakhlava', 'Azərbaycan ballı şirniyyat', 'Azerbaijani honey pastry', 10.00, false, false),
((SELECT id FROM public.menu_categories WHERE name_en = 'Drinks'), 'Çay', 'Tea', 'Ənənəvi Azərbaycan çayı', 'Traditional Azerbaijani tea', 3.00, true, false);