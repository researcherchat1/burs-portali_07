import React from 'react'

import { BursCard, type BursCardData } from './BursCard'
import { Section } from './Section'

type Props = {
  items: BursCardData[]
  title?: string
  subtitle?: string
  accentTitle?: boolean
  descriptionClassName?: string
  descriptionHref?: string
  description?: string
  id?: string
  emptyMessage?: string
  className?: string
  signedIn?: boolean
  savedSlugs?: string[]
  saveClassName?: string
}

/** SaaS Features grid — Payload burs siyahısı üçün shell (Dilim C data bağlayacaq). */
export const BursGrid = (props: Props) => {
  const {
    items,
    title = 'Burslar',
    subtitle,
    description,
    id = 'burslar',
    emptyMessage = 'Hal-hazırda yayımlanmış burs yoxdur.',
    className,
    accentTitle = false,
    descriptionClassName,
    descriptionHref,
    signedIn = false,
    savedSlugs = [],
    saveClassName,
  } = props
  const saved = new Set(savedSlugs)

  return (
    <Section
      id={id}
      title={title}
      subtitle={subtitle}
      description={description}
      className={className}
      accentTitle={accentTitle}
      descriptionClassName={descriptionClassName}
      descriptionHref={descriptionHref}
    >
      {items.length === 0 ? (
        <p className="text-center text-muted-foreground">{emptyMessage}</p>
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
              signedIn={signedIn}
              saved={saved.has(burs.slug)}
              saveClassName={saveClassName}
            />
          ))}
        </div>
      )}
    </Section>
  )
}
