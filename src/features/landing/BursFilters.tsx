'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'
import type { educationLevelOptions } from '@/utilities/burslar'

type CategoryOption = { id: string; title: string }
type LevelOption = (typeof educationLevelOptions)[number]

type Props = {
  countries: string[]
  categories: CategoryOption[]
  educationLevels: LevelOption[]
  resultCount: number
}

const selectClass =
  'h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground'

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
        <label className="block text-left text-sm">
          <span className="mb-1 block text-muted-foreground">Ölkə</span>
          <select
            className={selectClass}
            value={searchParams.get('country') || ''}
            onChange={(e) => apply('country', e.target.value)}
          >
            <option value="">Hamısı</option>
            {props.countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-left text-sm">
          <span className="mb-1 block text-muted-foreground">Kateqoriya</span>
          <select
            className={selectClass}
            value={searchParams.get('category') || ''}
            onChange={(e) => apply('category', e.target.value)}
          >
            <option value="">Hamısı</option>
            {props.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-left text-sm">
          <span className="mb-1 block text-muted-foreground">Təhsil səviyyəsi</span>
          <select
            className={selectClass}
            value={searchParams.get('level') || ''}
            onChange={(e) => apply('level', e.target.value)}
          >
            <option value="">Hamısı</option>
            {props.educationLevels.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-left text-sm">
          <span className="mb-1 block text-muted-foreground">Deadline</span>
          <select
            className={selectClass}
            value={searchParams.get('deadline') || ''}
            onChange={(e) => apply('deadline', e.target.value)}
          >
            <option value="">Hamısı</option>
            <option value="upcoming">Aktiv (gələcək)</option>
            <option value="past">Keçmiş</option>
          </select>
        </label>
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
