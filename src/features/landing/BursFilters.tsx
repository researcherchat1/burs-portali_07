'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'
import type { educationLevelOptions } from '@/utilities/burslar'

import { FilterSelect } from './FilterSelect'

type CategoryOption = { id: string; title: string }
type LevelOption = (typeof educationLevelOptions)[number]

type Props = {
  countries: string[]
  categories: CategoryOption[]
  educationLevels: LevelOption[]
  resultCount: number
}

/** URL query filter — localStorage yox; server Payload where ilə işləyir. */
export function BursFilters(props: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const apply = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString())
      if (value) next.set(key, value)
      else next.delete(key)
      const q = next.toString()
      router.push(q ? `/burslar?${q}` : '/burslar')
    },
    [router, searchParams],
  )

  const clear = () => router.push('/burslar')

  const hasFilters = Boolean(
    searchParams.get('country') ||
      searchParams.get('category') ||
      searchParams.get('level') ||
      searchParams.get('deadline'),
  )

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @4xl:grid-cols-4">
        <FilterSelect
          label="Ölkə"
          value={searchParams.get('country') || ''}
          onChange={(value) => apply('country', value)}
          options={props.countries.map((c) => ({ value: c, label: c }))}
        />
        <FilterSelect
          label="Kateqoriya"
          value={searchParams.get('category') || ''}
          onChange={(value) => apply('category', value)}
          options={props.categories.map((c) => ({ value: c.id, label: c.title }))}
        />
        <FilterSelect
          label="Təhsil səviyyəsi"
          value={searchParams.get('level') || ''}
          onChange={(value) => apply('level', value)}
          options={props.educationLevels.map((l) => ({ value: l.value, label: l.label }))}
        />
        <FilterSelect
          label="Deadline"
          value={searchParams.get('deadline') || ''}
          onChange={(value) => apply('deadline', value)}
          options={[
            { value: 'upcoming', label: 'Aktiv (gələcək)' },
            { value: 'past', label: 'Keçmiş' },
          ]}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>{props.resultCount} nəticə</span>
        {hasFilters ? (
          <button
            type="button"
            onClick={clear}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Filtrləri təmizlə
          </button>
        ) : null}
      </div>
    </div>
  )
}
