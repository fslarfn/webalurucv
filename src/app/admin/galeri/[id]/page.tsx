import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { GalleryForm } from '../GalleryForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditGaleriPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: item } = await supabase
    .from('gallery_projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!item) notFound()

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Edit Foto Proyek</h1>
      <GalleryForm item={item} />
    </div>
  )
}
