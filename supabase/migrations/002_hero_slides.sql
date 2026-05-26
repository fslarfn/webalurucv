-- =====================================================
-- Alucurv — Migrasi: Tabel hero_slides
-- Jalankan ini di Supabase SQL Editor
-- =====================================================

create table if not exists public.hero_slides (
  id           uuid        primary key default gen_random_uuid(),
  image_url    text        not null,
  judul        text,
  link_tujuan  text        not null default '/katalog',
  urutan       integer     not null default 0,
  is_active    boolean     not null default true,
  created_at   timestamptz not null default now()
);

create index if not exists hero_slides_is_active_idx on public.hero_slides (is_active);
create index if not exists hero_slides_urutan_idx    on public.hero_slides (urutan);

alter table public.hero_slides enable row level security;

-- Publik hanya bisa membaca slide yang aktif (konsisten dengan tabel products)
create policy "Public can read active slides"
  on public.hero_slides
  for select
  to anon
  using (is_active = true);

-- Admin (authenticated) akses penuh — sama persis dengan pola tabel products
create policy "Authenticated users have full access"
  on public.hero_slides
  for all
  to authenticated
  using (true)
  with check (true);

-- =====================================================
-- Storage bucket untuk foto hero/banner
-- =====================================================

insert into storage.buckets (id, name, public)
  values ('hero-images', 'hero-images', true)
  on conflict do nothing;

-- Publik hanya bisa membaca
create policy "Public read hero images"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'hero-images');

-- Hanya admin yang bisa upload
create policy "Authenticated can upload hero images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'hero-images');

-- Hanya admin yang bisa hapus
create policy "Authenticated can delete hero images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'hero-images');
