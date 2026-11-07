import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Bannerler, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type HomeSide = 'left' | 'right'

export type HomeSideBanner = {
  id: string
  name: string
  imageUrl: string
  width: number
  height: number
  href: string | null
  external: boolean
  side: HomeSide
  order: number
}

function dayKey(value: string | Date) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** Başlanğıc və bitmə günləri daxil olmaqla. Boş tarix məhdudiyyət sayılmır. */
export function isBannerActive(
  banner: { startsAt?: string | null; endsAt?: string | null },
  today = new Date(),
) {
  const todayKey = dayKey(today)
  if (!todayKey) return false

  if (banner.startsAt) {
    const start = dayKey(banner.startsAt)
    if (start && start > todayKey) return false
  }

  if (banner.endsAt) {
    const end = dayKey(banner.endsAt)
    if (end && end < todayKey) return false
  }

  return true
}

/** http(s) və saytdaxili yol. Digər ünvanlar kliksiz şəkil kimi qalır. */
export function safeBannerHref(raw?: string | null): { href: string; external: boolean } | null {
  if (!raw) return null
  const value = raw.trim()
  if (!value) return null

  if (value.startsWith('/') && !value.startsWith('//')) {
    return { href: value, external: false }
  }

  try {
    const url = new URL(value)
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      return { href: url.toString(), external: true }
    }
  } catch {
    return null
  }

  return null
}

export function pickHomeSideBanners(items: HomeSideBanner[]): {
  left: HomeSideBanner | null
  right: HomeSideBanner | null
} {
  const sorted = [...items].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))

  return {
    left: sorted.find((item) => item.side === 'left') ?? null,
    right: sorted.find((item) => item.side === 'right') ?? null,
  }
}

export type SideBannerPlacement = 'home' | 'burslar' | 'detal'

function mapBanner(doc: Bannerler, placement: SideBannerPlacement): HomeSideBanner | null {
  if (doc.placement !== placement || !doc.enabled) return null
  if (doc.side !== 'left' && doc.side !== 'right') return null
  if (!isBannerActive(doc)) return null

  const image = typeof doc.image === 'object' && doc.image ? (doc.image as Media) : null
  if (!image?.url) return null

  const link = safeBannerHref(doc.url)

  const width = image.width && image.width > 0 ? image.width : 3
  const height = image.height && image.height > 0 ? image.height : 4

  return {
    id: doc.id,
    name: doc.name,
    imageUrl: getMediaUrl(image.url, image.updatedAt),
    width,
    height,
    href: link?.href ?? null,
    external: link?.external ?? false,
    side: doc.side,
    order: typeof doc.order === 'number' ? doc.order : 0,
  }
}

export async function getSideBanners(placement: SideBannerPlacement): Promise<{
  left: HomeSideBanner | null
  right: HomeSideBanner | null
}> {
  const empty = { left: null, right: null }

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'bannerler',
      depth: 1,
      limit: 50,
      overrideAccess: true,
      pagination: false,
      sort: 'order',
      where: {
        and: [{ placement: { equals: placement } }, { enabled: { equals: true } }],
      },
    })

    return pickHomeSideBanners(
      result.docs.flatMap((doc) => {
        const banner = mapBanner(doc, placement)
        return banner ? [banner] : []
      }),
    )
  } catch {
    return empty
  }
}

export async function getHomeSideBanners() {
  return getSideBanners('home')
}
