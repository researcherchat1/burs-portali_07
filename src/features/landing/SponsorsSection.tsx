import React from 'react'

import type { Media, Sponsor } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import { LogoCloud } from './LogoCloud'
import { Section } from './Section'

export async function SponsorsSection() {
  try {
    const data = (await getCachedGlobal('sponsors', 1)()) as Sponsor

    if (!data?.enabled) {
      return null
    }

    const items = data.items || []
    if (items.length === 0) {
      return null
    }

    return (
      <Section id="sponsors">
        <LogoCloud text="Sponsorlar">
          {items.map((item) => {
            const logo = typeof item.logo === 'object' && item.logo ? (item.logo as Media) : null
            const src = getMediaUrl(logo?.url, logo?.updatedAt)
            const content = src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={item.name}
                className="h-10 w-auto max-w-[140px] object-contain"
              />
            ) : (
              <span className="text-sm font-medium">{item.name}</span>
            )

            if (item.url) {
              return (
                <a
                  key={item.id || item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              )
            }

            return <div key={item.id || item.name}>{content}</div>
          })}
        </LogoCloud>
      </Section>
    )
  } catch {
    return null
  }
}
