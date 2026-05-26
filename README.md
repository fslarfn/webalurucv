# Alucurv — Website E-Commerce Jendela Aluminium Custom

Website Next.js untuk workshop jendela aluminium Alucurv, melayani area Jabodetabek.

---

## Setup Cepat

### 1. Install dependencies

```bash
npm install
```

### 2. Setup Supabase

#### 2a. Buat project Supabase
1. Buka [supabase.com](https://supabase.com) → Sign In → **New project**
2. Pilih nama project: `alucurv`, pilih region **Southeast Asia (Singapore)**
3. Tunggu project selesai dibuat (~2 menit)

#### 2b. Jalankan migrasi database
1. Di dashboard Supabase, buka **SQL Editor**
2. Klik **New query**
3. Salin seluruh isi file `supabase/migrations/001_initial.sql`
4. Klik **Run**

#### 2c. Ambil credentials
1. Di dashboard: **Settings** → **API**
2. Salin:
   - **Project URL** (format: `https://xxxx.supabase.co`)
   - **anon public** key (bukan service_role!)

### 3. Konfigurasi environment

Salin file contoh dan isi dengan credentials Anda:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SITE_URL=https://alucurv.vercel.app
```

### 4. Jalankan lokal

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Membuat Akun Admin

> **Penting:** Jangan buat akun admin lewat kode. Buat manual via dashboard Supabase untuk keamanan.

1. Di dashboard Supabase, buka **Authentication** → **Users**
2. Klik **Add user** → **Create new user**
3. Masukkan email dan password Anda
4. Klik **Create user**
5. Login di `https://alucurv.vercel.app/admin/login` dengan email & password tersebut

> Untuk mengubah password: **Authentication** → **Users** → klik user → **Send password reset**

---

## Deploy ke Vercel

### 1. Push ke GitHub (opsional tapi disarankan)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/alucurv.git
git push -u origin main
```

### 2. Deploy
1. Buka [vercel.com](https://vercel.com) → **New Project**
2. Import repository GitHub Anda (atau drag & drop folder proyek)
3. Di bagian **Environment Variables**, tambahkan ketiga variabel dari `.env.local`
4. Klik **Deploy**

### 3. Update NEXT_PUBLIC_SITE_URL
Setelah deploy, Vercel memberi URL seperti `alucurv.vercel.app`. Update variabel `NEXT_PUBLIC_SITE_URL` di Vercel dashboard dengan URL tersebut, lalu **Redeploy**.

---

## Mengelola Produk

1. Buka `https://namadomain.com/admin`
2. Login dengan akun admin
3. Menu **Produk** → **Tambah Produk** untuk menambah produk baru
4. Upload foto, isi deskripsi, harga, dan spesifikasi
5. Centang **Aktif** agar tampil di katalog publik
6. Centang **Produk Unggulan** agar tampil di beranda

### Format Spesifikasi
Di form produk, isi spesifikasi dengan format satu baris per item:
```
Material: Aluminium 6063
Kaca: Kaca bening 5mm
Finishing: Powder coating putih
Ketebalan profil: 1.2mm
```

---

## Kustomisasi

| Yang ingin diubah | File yang diedit |
|---|---|
| Nomor WhatsApp | `src/lib/constants.ts` → `WA_NUMBER` |
| Alamat workshop | `src/lib/constants.ts` → `WORKSHOP_ADDRESS` |
| Testimoni pelanggan | `src/components/home/Testimonials.tsx` |
| Warna brand | `tailwind.config.ts` |
| Logo | Ganti `/public/logo.png`, update `Header.tsx` |
| Jam operasional | `src/lib/constants.ts` → `OPERATING_HOURS` |

---

## Struktur Folder Singkat

```
src/
├── app/
│   ├── (public)/     ← halaman publik (beranda, katalog, dll)
│   └── admin/        ← panel admin (dilindungi login)
├── components/
│   ├── layout/       ← Header, Footer, WhatsApp FAB
│   ├── home/         ← section beranda
│   └── product/      ← kartu & galeri produk
└── lib/
    ├── constants.ts  ← nomor WA, alamat, area pengiriman
    ├── whatsapp.ts   ← generator link wa.me
    └── supabase/     ← client Supabase
```
