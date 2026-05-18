insert into storage.buckets (id, name, public)
values
  ('product-media', 'product-media', true),
  ('brand-assets', 'brand-assets', true),
  ('category-media', 'category-media', true),
  ('campaign-assets', 'campaign-assets', false)
on conflict (id) do nothing;

create policy "Public can read product media"
on storage.objects
for select
using (bucket_id in ('product-media', 'brand-assets', 'category-media'));

create policy "Admins manage product media"
on storage.objects
for all
using (
  bucket_id in ('product-media', 'brand-assets', 'category-media', 'campaign-assets')
  and public.is_admin()
)
with check (
  bucket_id in ('product-media', 'brand-assets', 'category-media', 'campaign-assets')
  and public.is_admin()
);
