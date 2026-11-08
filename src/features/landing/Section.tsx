import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

export const Section = (props: {
  children: React.ReactNode
  title?: string
  subtitle?: string
  description?: string
  className?: string
  id?: string
  accentTitle?: boolean
  descriptionClassName?: string
  descriptionHref?: string
}) => (
  <div id={props.id} className={cn('@container px-3 py-16', props.className)}>
    {(props.title || props.subtitle || props.description) && (
      <div className="mx-auto mb-12 max-w-3xl text-center">
        {props.subtitle && (
          <div
            className="
            bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
            bg-clip-text text-sm font-bold text-transparent
          "
          >
            {props.subtitle}
          </div>
        )}

        {props.title && (
          <div
            className={cn(
              'mt-1 text-3xl font-bold',
              props.accentTitle &&
                'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent',
            )}
          >
            {props.title}
          </div>
        )}

        {props.description && props.descriptionHref ? (
          <Link
            href={props.descriptionHref}
            className={cn(
              'mt-4 inline-flex rounded-md border-2 border-foreground/20 px-5 py-2 text-lg text-foreground transition-colors hover:border-foreground/45',
              props.descriptionClassName,
            )}
          >
            {props.description}
          </Link>
        ) : (
          props.description && (
            <div className={cn('mt-2 text-lg text-muted-foreground', props.descriptionClassName)}>
              {props.description}
            </div>
          )
        )}
      </div>
    )}

    <div className="mx-auto max-w-5xl">{props.children}</div>
  </div>
)
