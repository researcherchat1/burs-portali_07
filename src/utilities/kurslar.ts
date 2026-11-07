import configPromise from '@payload-config'
import { getPayload, type Where } from 'payload'

import type { Category, Kurslar, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type KursCardData = {
  title: string
  slug: string
  university: string
  language: string
  categoryLabel: string | null
  summary?: string | null
  imageUrl: string | null
}

export type KursListFilters = {
  university?: string
  category?: string
  language?: string
}

export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'az', label: 'Azərbaycan' },
  { value: 'ru', label: 'Русский' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'other', label: 'Digər' },
] as const

export function languageLabel(code: string | null | undefined): string {
  if (!code) return ''
  const found = languageOptions.find((o) => o.value === code)
  return found?.label ?? code
}

export function mapKursToCard(doc: Kurslar): KursCardData | null {
  if (!doc.slug || !doc.title) return null

  const image = typeof doc.image === 'object' && doc.image ? (doc.image as Media) : null
  const category =
    typeof doc.category === 'object' && doc.category ? (doc.category as Category) : null

  return {
    title: doc.title,
    slug: doc.slug,
    university: doc.university,
    language: doc.language,
    categoryLabel: category?.title || null,
    summary: doc.summary,
    imageUrl: image?.url ? getMediaUrl(image.url, image.updatedAt) : null,
  }
}

function buildWhere(filters?: KursListFilters): Where {
  const and: Where[] = [{ _status: { equals: 'published' } }]

  if (filters?.university) {
    and.push({ university: { equals: filters.university } })
  }
  if (filters?.category) {
    and.push({ category: { equals: filters.category } })
  }
  if (filters?.language) {
    and.push({ language: { equals: filters.language } })
  }

  return { and }
}

export async function getPublishedKurslar(
  limit = 100,
  filters?: KursListFilters,
): Promise<KursCardData[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'kurslar',
    depth: 1,
    limit,
    overrideAccess: false,
    pagination: false,
    sort: '-publishedAt',
    where: buildWhere(filters),
  })

  return result.docs
    .map((doc) => mapKursToCard(doc as Kurslar))
    .filter((item): item is KursCardData => Boolean(item))
}

export async function getKursFilterOptions() {
  const payload = await getPayload({ config: configPromise })

  const [kurslar, categories] = await Promise.all([
    payload.find({
      collection: 'kurslar',
      depth: 0,
      limit: 500,
      overrideAccess: false,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { university: true, language: true },
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

  const universities = [
    ...new Set(
      kurslar.docs
        .map((d) => (d as Kurslar).university)
        .filter((u): u is string => Boolean(u?.trim())),
    ),
  ].sort((a, b) => a.localeCompare(b, 'az'))

  const languagesInUse = [
    ...new Set(
      kurslar.docs
        .map((d) => (d as Kurslar).language)
        .filter((l): l is string => Boolean(l?.trim())),
    ),
  ]

  const languages = languageOptions.filter((o) => languagesInUse.includes(o.value))

  return {
    universities,
    categories: categories.docs.map((c) => ({
      id: c.id,
      title: (c as Category).title,
    })),
    languages,
  }
}

export function parseKursFilters(
  params: Record<string, string | string[] | undefined>,
): KursListFilters {
  const one = (key: string) => {
    const v = params[key]
    return typeof v === 'string' && v.trim() ? v.trim() : undefined
  }

  return {
    university: one('university'),
    category: one('category'),
    language: one('language'),
  }
}

export async function getKursBySlug(slug: string): Promise<Kurslar | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'kurslar',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
  })

  return (result.docs[0] as Kurslar) || null
}

export async function getPublishedKursSlugs(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'kurslar',
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: { _status: { equals: 'published' } },
    select: { slug: true },
  })

  return result.docs
    .map((d) => (d as Kurslar).slug)
    .filter((s): s is string => typeof s === 'string' && s.length > 0)
}
