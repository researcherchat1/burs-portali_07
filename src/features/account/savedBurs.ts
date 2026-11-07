'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Burslar, Musteriler } from '@/payload-types'
import { mapBursToCard } from '@/utilities/burslar'
import type { BursCardData } from '@/features/landing/BursCard'

import { getMusteri } from './session'

function idsOf(saved: Musteriler['savedBurs']): string[] {
  if (!saved) return []
  return saved
    .map((item) => (typeof item === 'string' ? item : item?.id))
    .filter((id): id is string => Boolean(id))
}

async function publishedByIds(ids: string[]): Promise<Burslar[]> {
  if (ids.length === 0) return []
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'burslar',
    depth: 1,
    limit: ids.length,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [{ id: { in: ids } }, { _status: { equals: 'published' } }],
    },
  })
  const byId = new Map(result.docs.map((doc) => [doc.id, doc as Burslar]))
  return ids.map((id) => byId.get(id)).filter((doc): doc is Burslar => Boolean(doc))
}

export async function getSavedBursCards(): Promise<BursCardData[]> {
  const musteri = await getMusteri()
  if (!musteri) return []
  const docs = await publishedByIds(idsOf(musteri.savedBurs))
  return docs.map((doc) => mapBursToCard(doc)).filter((item): item is BursCardData => Boolean(item))
}

export async function getSaveState(): Promise<{ signedIn: boolean; slugs: string[] }> {
  const cards = await getSavedBursCards()
  const musteri = await getMusteri()
  if (!musteri) return { signedIn: false, slugs: [] }
  return { signedIn: true, slugs: cards.map((card) => card.slug) }
}

export async function toggleSavedBurs(formData: FormData) {
  const slug = String(formData.get('slug') || '').trim()
  const musteri = await getMusteri()
  if (!musteri) redirect('/giris')
  if (!slug) return

  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'burslar',
    depth: 0,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
  })
  const burs = found.docs[0]
  if (!burs) return

  const current = idsOf(musteri.savedBurs)
  const next = current.includes(burs.id)
    ? current.filter((id) => id !== burs.id)
    : [...current, burs.id]

  await payload.update({
    collection: 'musteriler',
    id: musteri.id,
    data: { savedBurs: next },
    overrideAccess: true,
  })

  revalidatePath('/kabinet')
  revalidatePath('/burslar')
  revalidatePath('/')
  revalidatePath(`/burslar/${slug}`)
}
