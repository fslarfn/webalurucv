import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Client tanpa cookies untuk baca data publik (products, hero_slides).
// Halaman yang memakainya bisa di-cache/ISR — createClient dari server.ts
// memanggil cookies() sehingga memaksa render dinamis per request.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
