import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import type { Category, Kurslar, Media } from '@/payload-types'
import { languageLabel } from '@/utilities/kurslar'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'

function externalHref(url: string) {
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export function KursDetail(props: { kurs: Kurslar }) {
  const { kurs } = props
  const image = typeof kurs.image === 'object' && kurs.image ? (kurs.image as Media) : null
  const category =
    typeof kurs.category === 'object' && kurs.category ? (kurs.category as Category) : null
  const imageUrl = image?.url ? getMediaUrl(image.url, image.updatedAt) : null
  const language = languageLabel(kurs.language)

  return (
    <article className="mx-auto max-w-3xl px-3 py-10">
      <Link href="/kurslar" className="text-sm text-muted-foreground hover:text-foreground">
        ← Bütün kurslar
      </Link>

      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={kurs.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Şəkil yoxdur
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        <span className="rounded-md border border-border px-2 py-0.5">{kurs.university}</span>
        {category?.title ? (
          <span className="rounded-md border border-border px-2 py-0.5">{category.title}</span>
        ) : null}
        {language ? (
          <span className="rounded-md border border-border px-2 py-0.5">{language}</span>
        ) : null}
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{kurs.title}</h1>

      {kurs.summary ? (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{kurs.summary}</p>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={externalHref(kurs.officialLink)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: 'lg' }))}
        >
          Kursa keç
        </a>
        <Link href="/kurslar" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
          Siyahıya qayıt
        </Link>
      </div>
    </article>
  )
}
