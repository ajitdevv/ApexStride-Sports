alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.inventory enable row level security;
alter table public.product_collections enable row level security;
alter table public.addresses enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.promotions enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'staff')
      and is_active = true
  );
$$;

create policy "Public can view active categories"
on public.categories
for select
using (status = 'active' or public.is_admin());

create policy "Public can view active brands"
on public.brands
for select
using (status = 'active' or public.is_admin());

create policy "Public can view active collections"
on public.collections
for select
using (status = 'active' or public.is_admin());

create policy "Public can view active products"
on public.products
for select
using (status = 'active' or public.is_admin());

create policy "Public can view product images"
on public.product_images
for select
using (
  exists (
    select 1
    from public.products
    where public.products.id = product_images.product_id
      and (public.products.status = 'active' or public.is_admin())
  )
);

create policy "Public can view active variants"
on public.product_variants
for select
using (
  exists (
    select 1
    from public.products
    where public.products.id = product_variants.product_id
      and (public.products.status = 'active' or public.is_admin())
  )
);

create policy "Users can view their own profile"
on public.profiles
for select
using (id = auth.uid() or public.is_admin());

create policy "Users can update their own profile"
on public.profiles
for update
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy "Users manage their own addresses"
on public.addresses
for all
using (profile_id = auth.uid() or public.is_admin())
with check (profile_id = auth.uid() or public.is_admin());

create policy "Users manage their own carts"
on public.carts
for all
using (profile_id = auth.uid() or public.is_admin())
with check (profile_id = auth.uid() or public.is_admin());

create policy "Users manage their own cart items"
on public.cart_items
for all
using (
  exists (
    select 1
    from public.carts
    where public.carts.id = cart_items.cart_id
      and (public.carts.profile_id = auth.uid() or public.is_admin())
  )
)
with check (
  exists (
    select 1
    from public.carts
    where public.carts.id = cart_items.cart_id
      and (public.carts.profile_id = auth.uid() or public.is_admin())
  )
);

create policy "Users can view their own orders"
on public.orders
for select
using (profile_id = auth.uid() or public.is_admin());

create policy "Users can view their own order items"
on public.order_items
for select
using (
  exists (
    select 1
    from public.orders
    where public.orders.id = order_items.order_id
      and (public.orders.profile_id = auth.uid() or public.is_admin())
  )
);

create policy "Admins manage catalog content"
on public.categories
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage brands"
on public.brands
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage collections"
on public.collections
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage products"
on public.products
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage product images"
on public.product_images
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage product variants"
on public.product_variants
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage inventory"
on public.inventory
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage product collections"
on public.product_collections
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins manage promotions"
on public.promotions
for all
using (public.is_admin())
with check (public.is_admin());
