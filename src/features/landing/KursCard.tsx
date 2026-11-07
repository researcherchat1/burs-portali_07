import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'
import { languageLabel, type KursCardData } from '@/utilities/kurslar'

export type { KursCardData }

/** Burs kartının kurs variantı. Saxla düyməsi bu mərhələdə yoxdur. */
export const KursCard = (props: { kurs: KursCardData; className?: string }) => {
  const { kurs, className } = props
  const href = `/kurslar/${kurs.slug}`
  const language = languageLabel(kurs.language)

  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background text-left',
        className,
      )}
    >
      <Link href={href} className="group flex flex-1 flex-col transition-colors hover:bg-muted/30">
        <div className="relative aspect-[16/10] w-full bg-muted">
          {kurs.imageUrl ? (
            <Image
              src={kurs.imageUrl}
              alt={kurs.title}
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
            <span className="rounded-md border border-border px-2 py-0.5">{kurs.university}</span>
            {kurs.categoryLabel ? (
              <span className="rounded-md border border-border px-2 py-0.5">{kurs.categoryLabel}</span>
            ) : null}
            {language ? (
              <span className="rounded-md border border-border px-2 py-0.5">{language}</span>
            ) : null}
          </div>

          <div className="mt-3 text-lg font-bold leading-snug group-hover:underline">{kurs.title}</div>

          <div className="my-3 w-8 border-t border-border" />

          {kurs.summary ? (
            <p className="line-clamp-3 text-sm text-muted-foreground">{kurs.summary}</p>
          ) : (
            <div className="mt-auto" />
          )}
        </div>
      </Link>
    </div>
  )
}
