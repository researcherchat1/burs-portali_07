import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { KursDetail } from '@/features/landing/KursDetail'
import { getKursBySlug, getPublishedKursSlugs } from '@/utilities/kurslar'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublishedKursSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function KursDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const kurs = await getKursBySlug(decodeURIComponent(slug))

  if (!kurs) notFound()

  return (
    <div className="relative pb-16">
      <KursDetail kurs={kurs} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const kurs = await getKursBySlug(decodeURIComponent(slug))

  if (!kurs) {
    return { title: 'Kurs tapılmadı | Burs Portalı' }
  }

  return {
    title: `${kurs.title} | Burs Portalı`,
    description: kurs.summary || `${kurs.university} — ${kurs.title}`,
  }
}
