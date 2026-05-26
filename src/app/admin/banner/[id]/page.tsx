import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SlideForm } from '../SlideForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditSlidePage({ params }: Props) {
  const { id }  = await params
  const supabase = await createClient()
  const { data: slide } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('id', id)
    .single()

  if (!slide) notFound()

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Edit Slide Banner</h1>
      <SlideForm slide={slide} />
    </div>
  )
}
