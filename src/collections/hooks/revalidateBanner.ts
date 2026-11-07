import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Bannerler } from '@/payload-types'

function revalidateBannerPaths() {
  try {
    revalidatePath('/')
    revalidatePath('/burslar')
    revalidatePath('/burslar/[slug]', 'page')
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (!message.includes('static generation store missing')) throw error
  }
}

export const revalidateBanner: CollectionAfterChangeHook<Bannerler> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating banners after ${doc.name}`)
    revalidateBannerPaths()
  }

  return doc
}

export const revalidateBannerDelete: CollectionAfterDeleteHook<Bannerler> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating banners after delete ${doc?.name ?? ''}`)
    revalidateBannerPaths()
  }

  return doc
}
