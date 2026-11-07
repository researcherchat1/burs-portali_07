import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { SaveBursButton } from '@/features/account/SaveBursButton'
import type { Burslar, Category, Media } from '@/payload-types'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'
import { educationLevelOptions } from '@/utilities/burslar'
import { getMediaUrl } from '@/utilities/getMediaUrl'

function formatDeadline(value?: string | null) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('az-AZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BursDetail(props: { burs: Burslar; signedIn?: boolean; saved?: boolean }) {
  const { burs } = props
  const image = typeof burs.image === 'object' && burs.image ? (burs.image as Media) : null
  const category =
    typeof burs.category === 'object' && burs.category ? (burs.category as Category) : null
  const imageUrl = image?.url ? getMediaUrl(image.url, image.updatedAt) : null
  const level =
    educationLevelOptions.find((o) => o.value === burs.educationLevel)?.label || burs.educationLevel
  const deadline = formatDeadline(burs.deadline)

  return (
    <article className="mx-auto max-w-3xl px-3 py-10">
      <Link href="/burslar" className="text-sm text-muted-foreground hover:text-foreground">
        ← Bütün burslar
      </Link>

      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={burs.title}
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
        <span className="rounded-md border border-border px-2 py-0.5">{burs.country}</span>
        {category?.title ? (
          <span className="rounded-md border border-border px-2 py-0.5">{category.title}</span>
        ) : null}
        <span className="rounded-md border border-border px-2 py-0.5">{level}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{burs.title}</h1>

      {deadline ? (
        <p className="mt-3 text-muted-foreground">
          Son müraciət tarixi:{' '}
          <span className="font-medium text-foreground">{deadline}</span>
        </p>
      ) : null}

      {burs.summary ? (
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{burs.summary}</p>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={burs.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: 'lg' }))}
        >
          Rəsmi müraciət
        </a>
        <SaveBursButton slug={burs.slug} saved={Boolean(props.saved)} signedIn={Boolean(props.signedIn)} />
        <Link href="/burslar" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
          Siyahıya qayıt
        </Link>
      </div>
    </article>
  )
}
