import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidatePricing: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating pricing`)
    revalidateTag('global_pricing', 'max')
  }
  return doc
}

export const revalidateFaq: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating faq`)
    revalidateTag('global_faq', { expire: 0 })
  }
  return doc
}

export const revalidateSponsors: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating sponsors`)
    revalidateTag('global_sponsors', 'max')
  }
  return doc
}

export const revalidateHero: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating hero`)
    revalidateTag('global_hero', { expire: 0 })
  }
  return doc
}
