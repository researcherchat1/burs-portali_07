import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { SaveBursButton } from '@/features/account/SaveBursButton'
import { cn } from '@/utilities/ui'

const educationLevelLabels: Record<string, string> = {
  secondary: 'Orta təhsil',
  bachelor: 'Bakalavr',
  master: 'Magistr',
  phd: 'PhD',
  other: 'Digər',
}

export type BursCardData = {
  title: string
  slug: string
  country: string
  educationLevel: string
  deadline?: string | null
  categoryLabel?: string | null
  summary?: string | null
  imageUrl?: string | null
  /** Default: `/burslar/${slug}` */
  href?: string
}

function formatDeadline(value?: string | null) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('az-AZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** SaaS FeatureCard → burs kartı (next-intl / demo icon budanıb). */
export const BursCard = (props: {
  burs: BursCardData
  className?: string
  signedIn?: boolean
  saved?: boolean
}) => {
  const { burs, className, signedIn = false, saved = false } = props
  const href = burs.href || `/burslar/${burs.slug}`
  const level = educationLevelLabels[burs.educationLevel] || burs.educationLevel
  const deadline = formatDeadline(burs.deadline)

  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background text-left',
        className,
      )}
    >
      <Link
        href={href}
        className="group flex flex-1 flex-col transition-colors hover:bg-muted/30"
      >
        <div className="relative aspect-[16/10] w-full bg-muted">
          {burs.imageUrl ? (
            <Image
              src={burs.imageUrl}
              alt={burs.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Şəkil yoxdur
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
            <span className="rounded-md border border-border px-2 py-0.5">{burs.country}</span>
            {burs.categoryLabel ? (
              <span className="rounded-md border border-border px-2 py-0.5">{burs.categoryLabel}</span>
            ) : null}
            <span className="rounded-md border border-border px-2 py-0.5">{level}</span>
          </div>

          <div className="mt-3 text-lg font-bold leading-snug group-hover:underline">{burs.title}</div>

          <div className="my-3 w-8 border-t border-border" />

          {burs.summary ? (
            <p className="line-clamp-3 text-sm text-muted-foreground">{burs.summary}</p>
          ) : null}

          {deadline ? (
            <div className="mt-auto pt-4 text-sm text-muted-foreground">
              Son tarix: <span className="font-medium text-foreground">{deadline}</span>
            </div>
          ) : (
            <div className="mt-auto pt-4" />
          )}
        </div>
      </Link>

      <div className="px-5 pb-5">
        <SaveBursButton slug={burs.slug} saved={saved} signedIn={signedIn} />
      </div>
    </div>
  )
}
