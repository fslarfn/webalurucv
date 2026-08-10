-- =====================================================
-- Alucurv — Migrasi: Tabel gallery_projects (Galeri Proyek)
-- Jalankan ini di Supabase SQL Editor
-- =====================================================

create table if not exists public.gallery_projects (
  id           uuid        primary key default gen_random_uuid(),
  image_url    text        not null,
  judul        text        not null,
  lokasi       text,
  keterangan   text,
  urutan       integer     not null default 0,
  is_active    boolean     not null default true,
  created_at   timestamptz not null default now()
);

create index if not exists gallery_projects_is_active_idx on public.gallery_projects (is_active);
create index if not exists gallery_projects_urutan_idx    on public.gallery_projects (urutan);

alter table public.gallery_projects enable row level security;

-- Publik hanya bisa membaca item yang aktif (konsisten dengan tabel lain)
create policy "Public can read active gallery"
  on public.gallery_projects
  for select
  to anon
  using (is_active = true);

-- Admin (authenticated) akses penuh
create policy "Authenticated users have full access to gallery"
  on public.gallery_projects
  for all
  to authenticated
  using (true)
  with check (true);

-- =====================================================
-- Storage bucket untuk foto galeri proyek
-- =====================================================

insert into storage.buckets (id, name, public)
  values ('gallery-images', 'gallery-images', true)
  on conflict do nothing;

create policy "Public read gallery images"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'gallery-images');

create policy "Authenticated can upload gallery images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'gallery-images');

create policy "Authenticated can delete gallery images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'gallery-images');
