import React from 'react'

import type { Hero, Media } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import { HeroSlideshow, type HeroSlide } from './HeroSlideshow'

function toSlide(item: NonNullable<Hero['slides']>[number]): HeroSlide | null {
  const title = item.title?.trim()
  const subtitle = item.subtitle?.trim()
  if (!title || !subtitle) return null

  const image = item.image && typeof item.image === 'object' ? (item.image as Media) : null

  return {
    title,
    subtitle,
    note: item.note?.trim() || null,
    imageUrl: image?.url ? getMediaUrl(image.url, image.updatedAt) : null,
  }
}

export async function HomeHero() {
  try {
    const data = (await getGlobal('hero', 1)) as Hero
    if (!data?.enabled) return null

    const slides = (data.slides || []).map(toSlide).filter((item): item is HeroSlide => Boolean(item))
    if (!slides.length) return null

    return <HeroSlideshow slides={slides} />
  } catch {
    return null
  }
}
