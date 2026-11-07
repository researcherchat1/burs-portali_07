import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { BursDetail } from '@/features/landing/BursDetail'
import { HomeSideBanners } from '@/features/landing/HomeSideBanners'
import { RecordSays } from '@/features/saylar/RecordSays'
import { getSaveState } from '@/features/account/savedBurs'
import { getBursBySlug, getPublishedBursSlugs } from '@/utilities/burslar'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublishedBursSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BursDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const [burs, saveState] = await Promise.all([getBursBySlug(decodedSlug), getSaveState()])

  if (!burs) notFound()

  return (
    <div className="relative pb-16">
      <HomeSideBanners placement="detal" />
      <RecordSays
        events={[
          { kind: 'page', target: `/burslar/${burs.slug}` },
          { kind: 'burs', target: burs.slug },
        ]}
      />
      <BursDetail burs={burs} signedIn={saveState.signedIn} saved={saveState.slugs.includes(burs.slug)} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const burs = await getBursBySlug(decodeURIComponent(slug))

  if (!burs) {
    return { title: 'Burs tapılmadı | Burs Portalı' }
  }

  return {
    title: `${burs.title} | Burs Portalı`,
    description: burs.summary || `${burs.country} — ${burs.title}`,
  }
}
