import type { Payload } from 'payload'

import { toAsciiSlug } from '../../utilities/toAsciiSlug'

export const SEED_TAG = '[seed-kurs-v1]'

const CATEGORIES = [
  { title: 'STEM', slug: 'stem' },
  { title: 'Humanitar', slug: 'humanitar' },
  { title: 'Biznes', slug: 'biznes' },
  { title: 'Tibb', slug: 'tibb' },
  { title: 'İncəsənət', slug: 'incesenet' },
]

type Language = 'en' | 'az' | 'ru' | 'tr' | 'fr' | 'de' | 'es' | 'other'

const COURSES: {
  title: string
  university: string
  language: Language
  categorySlug: string
  officialLink: string
}[] = [
  {
    title: 'CS50: Introduction to Computer Science',
    university: 'Harvard University',
    language: 'en',
    categorySlug: 'stem',
    officialLink: 'https://cs50.harvard.edu/x/',
  },
  {
    title: 'CS50 Python: Introduction to Programming',
    university: 'Harvard University',
    language: 'en',
    categorySlug: 'stem',
    officialLink: 'https://cs50.harvard.edu/python/',
  },
  {
    title: 'Introduction to Computer Science and Programming',
    university: 'MIT',
    language: 'en',
    categorySlug: 'stem',
    officialLink: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
  },
  {
    title: 'Machine Learning',
    university: 'Stanford University',
    language: 'en',
    categorySlug: 'stem',
    officialLink: 'https://www.coursera.org/learn/machine-learning',
  },
  {
    title: 'Financial Markets',
    university: 'Yale University',
    language: 'en',
    categorySlug: 'biznes',
    officialLink: 'https://www.coursera.org/learn/financial-markets-global',
  },
  {
    title: 'Cambridge Digital Skills',
    university: 'University of Cambridge',
    language: 'en',
    categorySlug: 'humanitar',
    officialLink: 'https://www.cam.ac.uk/',
  },
  {
    title: 'Climate Change: The Science',
    university: 'University of Oxford',
    language: 'en',
    categorySlug: 'stem',
    officialLink: 'https://www.conted.ox.ac.uk/',
  },
  {
    title: 'Art of the Western World',
    university: 'edX',
    language: 'en',
    categorySlug: 'incesenet',
    officialLink: 'https://www.edx.org/',
  },
]

export async function seedKurslar(payload: Payload) {
  const categoryIds = new Map<string, string>()

  for (const cat of CATEGORIES) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
      pagination: false,
      overrideAccess: true,
    })

    if (existing.docs[0]) {
      categoryIds.set(cat.slug, String(existing.docs[0].id))
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
      categoryIds.set(cat.slug, String(created.id))
    }
  }

  const existingSeed = await payload.find({
    collection: 'kurslar',
    where: { summary: { contains: SEED_TAG } },
    limit: 100,
    pagination: false,
    overrideAccess: true,
  })

  for (const doc of existingSeed.docs) {
    await payload.delete({
      collection: 'kurslar',
      id: doc.id,
      overrideAccess: true,
    })
  }

  for (const course of COURSES) {
    const category = categoryIds.get(course.categorySlug)
    if (!category) continue

    const slug = toAsciiSlug(course.title)

    await payload.create({
      collection: 'kurslar',
      data: {
        title: course.title,
        slug,
        generateSlug: false,
        university: course.university,
        language: course.language,
        category,
        officialLink: course.officialLink,
        summary: `${SEED_TAG} Nümunə pulsuz kurs: ${course.university}. Canlı məzmun admin-dən əvəz olunur.`,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
      overrideAccess: true,
    })
  }

  return {
    categories: categoryIds.size,
    kurslar: COURSES.length,
    removedOld: existingSeed.docs.length,
  }
}
