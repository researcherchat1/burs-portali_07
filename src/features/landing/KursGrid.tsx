import React from 'react'

import type { KursCardData } from '@/utilities/kurslar'

import { KursCard } from './KursCard'
import { Section } from './Section'

type Props = {
  items: KursCardData[]
  title?: string
  subtitle?: string
  accentTitle?: boolean
  description?: string
  descriptionClassName?: string
  descriptionHref?: string
  id?: string
  emptyMessage?: string
  className?: string
}

export const KursGrid = (props: Props) => {
  const {
    items,
    title = 'Kurslar',
    subtitle,
    accentTitle = false,
    description,
    descriptionClassName,
    descriptionHref,
    id = 'kurslar',
    emptyMessage = 'Hal-hazırda yayımlanmış kurs yoxdur.',
    className,
  } = props

  return (
    <Section
      id={id}
      title={title}
      subtitle={subtitle}
      accentTitle={accentTitle}
      description={description}
      descriptionClassName={descriptionClassName}
      descriptionHref={descriptionHref}
      className={className}
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
          {items.map((kurs) => (
            <KursCard key={kurs.slug} kurs={kurs} />
          ))}
        </div>
      )}
    </Section>
  )
}
