import React from 'react'

import type { Pricing } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { PricingCard } from './PricingCard'
import { Section } from './Section'

export async function PricingSection() {
  try {
    const data = (await getCachedGlobal('pricing', 0)()) as Pricing

    if (!data?.enabled) {
      return null
    }

    const plans = data.plans || []

    return (
      <Section
        id="pricing"
        subtitle={data.sectionSubtitle || undefined}
        title={data.sectionTitle || undefined}
        description={data.sectionDescription || undefined}
      >
        {plans.length === 0 ? null : (
          <div
            className="
            grid grid-cols-1 gap-x-6 gap-y-8
            @xl:grid-cols-2
            @4xl:grid-cols-3
          "
          >
            {plans.map((plan) => (
              <PricingCard key={plan.id || plan.name} plan={plan} />
            ))}
          </div>
        )}
      </Section>
    )
  } catch {
    return null
  }
}
