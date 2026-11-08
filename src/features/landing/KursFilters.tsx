'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'
import type { languageOptions } from '@/utilities/kurslar'

import { FilterSelect } from './FilterSelect'

type CategoryOption = { id: string; title: string }
type LanguageOption = (typeof languageOptions)[number]

type Props = {
  universities: string[]
  categories: CategoryOption[]
  languages: LanguageOption[]
  resultCount: number
}

/** URL query filter. Saxlama yoxdur; server Payload where ilə işləyir. */
export function KursFilters(props: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const apply = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString())
      if (value) next.set(key, value)
      else next.delete(key)
      const q = next.toString()
      router.push(q ? `/kurslar?${q}` : '/kurslar')
    },
    [router, searchParams],
  )

  const clear = () => router.push('/kurslar')

  const hasFilters = Boolean(
    searchParams.get('university') || searchParams.get('category') || searchParams.get('language'),
  )

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @4xl:grid-cols-3">
        <FilterSelect
          label="Universitet / mənbə"
          value={searchParams.get('university') || ''}
          onChange={(value) => apply('university', value)}
          options={props.universities.map((u) => ({ value: u, label: u }))}
        />
        <FilterSelect
          label="Kateqoriya"
          value={searchParams.get('category') || ''}
          onChange={(value) => apply('category', value)}
          options={props.categories.map((c) => ({ value: c.id, label: c.title }))}
        />
        <FilterSelect
          label="Dil"
          value={searchParams.get('language') || ''}
          onChange={(value) => apply('language', value)}
          options={props.languages.map((l) => ({ value: l.value, label: l.label }))}
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
