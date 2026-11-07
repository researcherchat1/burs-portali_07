import React from 'react'

import { BurslarSection } from './BurslarSection'
import { KurslarSection } from './KurslarSection'
import { PricingSection } from './PricingSection'
import { SponsorsSection } from './SponsorsSection'

/** Landing blokları: burslar, kurslar + (enabled) sponsors/pricing. FAQ ayrıca /faq səhifəsindədir. */
export async function LandingBlocks() {
  return (
    <>
      <BurslarSection />
      <KurslarSection />
      <SponsorsSection />
      <PricingSection />
    </>
  )
}
