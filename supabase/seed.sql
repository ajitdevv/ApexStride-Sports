insert into public.categories (name, slug, description, status, sort_order)
values
  ('Recovery', 'recovery', 'Premium recovery tools and performance restoration gear.', 'active', 1),
  ('Hydration', 'hydration', 'Smart hydration accessories for training and competition.', 'active', 2),
  ('Training Support', 'training-support', 'Supportive gear for lifting, conditioning, and movement prep.', 'active', 3)
on conflict (slug) do nothing;

insert into public.brands (name, slug, description, status)
values
  ('ApexStride', 'apexstride', 'Core private-label performance accessories.', 'active')
on conflict (slug) do nothing;

insert into public.collections (name, slug, description, status)
values
  ('Launch Essentials', 'launch-essentials', 'Flagship collection for the first storefront merchandising pass.', 'active')
on conflict (slug) do nothing;

insert into public.products (category_id, brand_id, name, slug, short_description, description, status, featured, base_price, compare_at_price)
select
  c.id,
  b.id,
  'Elite Wrist Support',
  'elite-wrist-support',
  'Stabilized support for heavy training days.',
  'Placeholder launch product used to validate storefront structure, pricing fields, media relations, and variant modeling.',
  'active',
  true,
  1899,
  2199
from public.categories c
cross join public.brands b
where c.slug = 'training-support'
  and b.slug = 'apexstride'
on conflict (slug) do nothing;
