import type { Metadata } from 'next'
import React, { Suspense } from 'react'

import { getSaveState } from '@/features/account/savedBurs'
import { BursCard } from '@/features/landing/BursCard'
import { BursFilters } from '@/features/landing/BursFilters'
import { HomeSideBanners } from '@/features/landing/HomeSideBanners'
import { RecordSays } from '@/features/saylar/RecordSays'
import { Section } from '@/features/landing/Section'
import {
  getBursFilterOptions,
  getPublishedBurslar,
  parseBursFilters,
} from '@/utilities/burslar'

export const dynamic = 'force-dynamic'

type Args = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function BurslarPage({ searchParams: searchParamsPromise }: Args) {
  const searchParams = await searchParamsPromise
  const filters = parseBursFilters(searchParams)

  const [items, options, saveState] = await Promise.all([
    getPublishedBurslar(100, filters),
    getBursFilterOptions(),
    getSaveState(),
  ])
  const saved = new Set(saveState.slugs)

  return (
    <div className="relative pt-8 pb-16">
      <HomeSideBanners placement="burslar" />
      <RecordSays events={[{ kind: 'page', target: '/burslar' }]} />
      <Section
        id="burslar-list"
        subtitle="Kataloq"
        title="Burslar"
        description="Filter seçəndə aşağıdakı grid yalnız uyğun bursları göstərir."
      >
        <Suspense fallback={<p className="mb-8 text-center text-muted-foreground">Filter yüklənir…</p>}>
          <BursFilters
            countries={options.countries}
            categories={options.categories}
            educationLevels={options.educationLevels}
            resultCount={items.length}
          />
        </Suspense>

        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Bu filterə uyğun burs tapılmadı. Filtrləri dəyişin və ya Admin-dən burs əlavə edin.
          </p>
        ) : (
          <div
            className="
              grid grid-cols-1 gap-x-3 gap-y-8
              @md:grid-cols-2
              @4xl:grid-cols-3
            "
          >
            {items.map((burs) => (
              <BursCard
                key={burs.slug}
                burs={burs}
                signedIn={saveState.signedIn}
                saved={saved.has(burs.slug)}
              />
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Burslar | Burs Portalı',
    description: 'Təqaüd və burs elanları',
  }
}
