-- =====================================================
-- Alucurv — Migrasi Database Awal
-- Jalankan ini di Supabase SQL Editor
-- =====================================================

-- Tabel produk
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text unique not null,
  description  text,
  shape        text not null check (shape in ('bulat', 'lengkung', 'setengah_lingkaran', 'oval', 'custom')),
  specifications jsonb,
  price_label  text,
  price_min    integer,
  images       text[] default '{}',
  is_active    boolean default true,
  is_featured  boolean default false,
  sort_order   integer default 0,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Index untuk query umum
create index if not exists products_is_active_idx on public.products (is_active);
create index if not exists products_shape_idx on public.products (shape);
create index if not exists products_sort_order_idx on public.products (sort_order);

-- Aktifkan Row Level Security
alter table public.products enable row level security;

-- Kebijakan publik: hanya baca produk yang aktif
create policy "Public can read active products"
  on public.products
  for select
  to anon
  using (is_active = true);

-- Kebijakan admin: akses penuh untuk user yang ter-autentikasi
create policy "Authenticated users have full access"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);

-- =====================================================
-- Storage bucket untuk foto produk
-- Jalankan di SQL Editor ATAU buat manual di dashboard
-- =====================================================

-- Buat bucket (jika belum ada via dashboard)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict do nothing;

-- Kebijakan storage: publik bisa baca
create policy "Public read product images"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'product-images');

-- Kebijakan storage: hanya admin yang bisa upload/hapus
create policy "Authenticated can upload product images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated can delete product images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'product-images');

-- =====================================================
-- Data contoh (opsional — hapus jika tidak diperlukan)
-- =====================================================
insert into public.products (name, slug, description, shape, price_label, price_min, is_active, is_featured, sort_order)
values
  (
    'Jendela Bulat Klasik',
    'jendela-bulat-klasik',
    'Jendela bulat aluminium dengan desain klasik yang elegan. Cocok untuk fasad rumah modern dan klasik.',
    'bulat',
    'Mulai dari Rp 2.500.000',
    2500000,
    true, true, 1
  ),
  (
    'Jendela Lengkung (Arch)',
    'jendela-lengkung-arch',
    'Jendela dengan bagian atas melengkung khas arsitektur Eropa. Memberikan kesan mewah pada ruangan.',
    'lengkung',
    'Mulai dari Rp 3.200.000',
    3200000,
    true, true, 2
  ),
  (
    'Jendela Setengah Lingkaran',
    'jendela-setengah-lingkaran',
    'Jendela berbentuk setengah lingkaran, ideal sebagai jendela aksen di atas pintu atau jendela utama.',
    'setengah_lingkaran',
    'Mulai dari Rp 1.800.000',
    1800000,
    true, true, 3
  ),
  (
    'Jendela Oval Custom',
    'jendela-oval-custom',
    'Jendela berbentuk oval dengan ukuran dan finishing sesuai permintaan. Konsultasikan kebutuhan Anda.',
    'oval',
    'Mulai dari Rp 2.800.000',
    2800000,
    true, true, 4
  )
on conflict (slug) do nothing;
