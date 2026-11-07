import configPromise from '@payload-config'
import { getPayload, type Where } from 'payload'

import type { Burslar, Category, Media } from '@/payload-types'
import type { BursCardData } from '@/features/landing/BursCard'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type BursListFilters = {
  country?: string
  category?: string
  educationLevel?: string
  deadline?: 'upcoming' | 'past'
}

export const educationLevelOptions = [
  { value: 'secondary', label: 'Orta təhsil' },
  { value: 'bachelor', label: 'Bakalavr' },
  { value: 'master', label: 'Magistr' },
  { value: 'phd', label: 'PhD / Doktorantura' },
  { value: 'other', label: 'Digər' },
] as const

export function mapBursToCard(doc: Burslar): BursCardData | null {
  if (!doc.slug || !doc.title) return null

  const image = typeof doc.image === 'object' && doc.image ? (doc.image as Media) : null
  const category =
    typeof doc.category === 'object' && doc.category ? (doc.category as Category) : null

  return {
    title: doc.title,
    slug: doc.slug,
    country: doc.country,
    educationLevel: doc.educationLevel,
    deadline: doc.deadline,
    categoryLabel: category?.title || null,
    summary: doc.summary,
    imageUrl: image?.url ? getMediaUrl(image.url, image.updatedAt) : null,
  }
}

function startOfTodayISO() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

function buildWhere(filters?: BursListFilters): Where {
  const and: Where[] = [{ _status: { equals: 'published' } }]

  if (filters?.country) {
    and.push({ country: { equals: filters.country } })
  }
  if (filters?.category) {
    and.push({ category: { equals: filters.category } })
  }
  if (filters?.educationLevel) {
    and.push({ educationLevel: { equals: filters.educationLevel } })
  }
  if (filters?.deadline === 'upcoming') {
    and.push({ deadline: { greater_than_equal: startOfTodayISO() } })
  }
  if (filters?.deadline === 'past') {
    and.push({ deadline: { less_than: startOfTodayISO() } })
  }

  return { and }
}

export async function getPublishedBurslar(
  limit = 100,
  filters?: BursListFilters,
): Promise<BursCardData[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'burslar',
    depth: 1,
    limit,
    overrideAccess: false,
    pagination: false,
    sort: '-publishedAt',
    where: buildWhere(filters),
  })

  return result.docs
    .map((doc) => mapBursToCard(doc as Burslar))
    .filter((item): item is BursCardData => Boolean(item))
}

/** Filter dropdown options — published burslardan + kateqoriyalar. */
export async function getBursFilterOptions() {
  const payload = await getPayload({ config: configPromise })

  const [burslar, categories] = await Promise.all([
    payload.find({
      collection: 'burslar',
      depth: 0,
      limit: 500,
      overrideAccess: false,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { country: true },
    }),
    payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      pagination: false,
      sort: 'title',
    }),
  ])

  const countries = [
    ...new Set(
      burslar.docs
        .map((d) => (d as Burslar).country)
        .filter((c): c is string => Boolean(c?.trim())),
    ),
  ].sort((a, b) => a.localeCompare(b, 'az'))

  return {
    countries,
    categories: categories.docs.map((c) => ({
      id: c.id,
      title: (c as Category).title,
    })),
    educationLevels: [...educationLevelOptions],
  }
}

export function parseBursFilters(
  params: Record<string, string | string[] | undefined>,
): BursListFilters {
  const one = (key: string) => {
    const v = params[key]
    return typeof v === 'string' && v.trim() ? v.trim() : undefined
  }

  const deadline = one('deadline')
  return {
    country: one('country'),
    category: one('category'),
    educationLevel: one('level'),
    deadline: deadline === 'upcoming' || deadline === 'past' ? deadline : undefined,
  }
}

export async function getBursBySlug(slug: string): Promise<Burslar | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'burslar',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
  })

  return (result.docs[0] as Burslar) || null
}

export async function getPublishedBursSlugs(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'burslar',
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: { _status: { equals: 'published' } },
    select: { slug: true },
  })

  return result.docs
    .map((d) => (d as Burslar).slug)
    .filter((s): s is string => typeof s === 'string' && s.length > 0)
}
