import type { Payload } from 'payload'

import { toAsciiSlug } from '../../utilities/toAsciiSlug'

export const SEED_TAG = '[seed-burs-v1]'

const CATEGORIES = [
  { title: 'STEM', slug: 'stem' },
  { title: 'Humanitar', slug: 'humanitar' },
  { title: 'Biznes', slug: 'biznes' },
  { title: 'Tibb', slug: 'tibb' },
  { title: 'İncəsənət', slug: 'incesenet' },
]

const COUNTRIES = [
  'Türkiyə',
  'Almaniya',
  'ABŞ',
  'Britaniya',
  'Kanada',
  'Fransa',
  'Hollandiya',
  'Polşa',
  'Macarıstan',
  'Yaponiya',
]

const LEVELS = ['secondary', 'bachelor', 'master', 'phd', 'other'] as const

const TITLES = [
  'Türkiyə Cumhuriyyəti Təqaüdü',
  'DAAD Magistr Proqramı',
  'Fulbright Azərbaycan',
  'Chevening Scholarship',
  'Vanier Canada Graduate',
  'Eiffel Excellence Award',
  'Orange Tulip Scholarship',
  'Poland Government Bursary',
  'Stipendium Hungaricum',
  'MEXT Japan Research',
  'Erasmus Mundus Joint Master',
  'AAU STEM Fellowship',
  'Global Health Scholars',
  'Arts Abroad Grant',
  'Business Leaders Fund',
  'Climate Tech Fellowship',
  'Digital Media Residency',
  'Public Policy Scholarship',
  'Engineering Excellence Award',
  'Young Researchers Grant',
]

function daysFromNow(days: number) {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

export async function seedBurslar(payload: Payload) {
  const categoryIds: string[] = []

  for (const cat of CATEGORIES) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
      pagination: false,
      overrideAccess: true,
    })

    if (existing.docs[0]) {
      categoryIds.push(String(existing.docs[0].id))
    } else {
      const created = await payload.create({
        collection: 'categories',
        data: {
          title: cat.title,
          slug: cat.slug,
          generateSlug: false,
        },
        overrideAccess: true,
      })
      categoryIds.push(String(created.id))
    }
  }

  const existingSeed = await payload.find({
    collection: 'burslar',
    where: { summary: { contains: SEED_TAG } },
    limit: 100,
    pagination: false,
    overrideAccess: true,
  })

  for (const doc of existingSeed.docs) {
    await payload.delete({
      collection: 'burslar',
      id: doc.id,
      overrideAccess: true,
    })
  }

  for (let i = 0; i < 20; i++) {
    const title = TITLES[i]
    const country = COUNTRIES[i % COUNTRIES.length]
    const educationLevel = LEVELS[i % LEVELS.length]
    const category = categoryIds[i % categoryIds.length]
    const deadlineOffset = i < 12 ? 15 + i * 7 : -10 - (i - 12) * 5
    const slug = toAsciiSlug(title)

    await payload.create({
      collection: 'burslar',
      data: {
        title,
        slug,
        generateSlug: false,
        country,
        educationLevel,
        category,
        deadline: daysFromNow(deadlineOffset),
        officialLink: `https://example.com/burs/${slug}`,
        summary: `${SEED_TAG} Test burs #${i + 1}: ${country}, ${educationLevel}. Filter və grid yoxlaması üçün.`,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
      overrideAccess: true,
    })
  }

  return {
    categories: categoryIds.length,
    burslar: 20,
    removedOld: existingSeed.docs.length,
  }
}
