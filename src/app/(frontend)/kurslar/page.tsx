import type { Metadata } from 'next'
import React, { Suspense } from 'react'

import { KursCard } from '@/features/landing/KursCard'
import { KursFilters } from '@/features/landing/KursFilters'
import { Section } from '@/features/landing/Section'
import { getKursFilterOptions, getPublishedKurslar, parseKursFilters } from '@/utilities/kurslar'

export const dynamic = 'force-dynamic'

type Args = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function KurslarPage({ searchParams: searchParamsPromise }: Args) {
  const searchParams = await searchParamsPromise
  const filters = parseKursFilters(searchParams)

  const [items, options] = await Promise.all([
    getPublishedKurslar(100, filters),
    getKursFilterOptions(),
  ])

  return (
    <div className="relative pt-8 pb-16">
      <Section
        id="kurslar-list"
        subtitle="Kataloq"
        title="Kurslar"
        description="Filter seçəndə aşağıdakı grid yalnız uyğun kursları göstərir."
      >
        <Suspense fallback={<p className="mb-8 text-center text-muted-foreground">Filter yüklənir…</p>}>
          <KursFilters
            universities={options.universities}
            categories={options.categories}
            languages={options.languages}
            resultCount={items.length}
          />
        </Suspense>

        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Bu filterə uyğun kurs tapılmadı. Filtrləri dəyişin və ya Admin-dən kurs əlavə edin.
          </p>
        ) : (
          <div
            className="
              grid grid-cols-1 gap-x-3 gap-y-8
              @md:grid-cols-2
              @4xl:grid-cols-3
            "
          >
            {items.map((kurs) => (
              <KursCard key={kurs.slug} kurs={kurs} />
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Kurslar | Burs Portalı',
    description: 'Pulsuz universitet və platforma kursları',
  }
}
