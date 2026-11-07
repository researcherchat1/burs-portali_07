'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'
import type { languageOptions } from '@/utilities/kurslar'

type CategoryOption = { id: string; title: string }
type LanguageOption = (typeof languageOptions)[number]

type Props = {
  universities: string[]
  categories: CategoryOption[]
  languages: LanguageOption[]
  resultCount: number
}

const selectClass =
  'h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground'

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
        <label className="block text-left text-sm">
          <span className="mb-1 block text-muted-foreground">Universitet / mənbə</span>
          <select
            className={selectClass}
            value={searchParams.get('university') || ''}
            onChange={(e) => apply('university', e.target.value)}
          >
            <option value="">Hamısı</option>
            {props.universities.map((u) => (
              <option key={u} value={u}>
                {u}
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
          <span className="mb-1 block text-muted-foreground">Dil</span>
          <select
            className={selectClass}
            value={searchParams.get('language') || ''}
            onChange={(e) => apply('language', e.target.value)}
          >
            <option value="">Hamısı</option>
            {props.languages.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
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
