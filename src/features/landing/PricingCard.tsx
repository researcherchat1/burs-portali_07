import React from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'

import { PricingFeatureItem } from './PricingFeatureItem'

type Plan = {
  name: string
  price: string
  features?: { text: string; id?: string | null }[] | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  highlighted?: boolean | null
}

export const PricingCard = (props: { plan: Plan }) => {
  const { plan } = props
  const href = plan.buttonUrl || '#'
  const label = plan.buttonLabel || 'Başla'

  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-xl border border-border px-6 py-8 text-center',
        plan.highlighted && 'border-primary ring-1 ring-primary/20',
      )}
    >
      <div className="text-lg font-semibold">{plan.name}</div>

      <div className="mt-3 flex items-end justify-center gap-1">
        <div className="text-5xl font-bold tracking-tight">{plan.price}</div>
      </div>

      <div className="mt-5">
        {plan.buttonUrl ? (
          <a className={cn(buttonVariants({ size: 'sm' }), 'w-full')} href={href}>
            {label}
          </a>
        ) : (
          <span className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }), 'w-full')}>
            {label}
          </span>
        )}
      </div>

      {plan.features && plan.features.length > 0 ? (
        <ul className="mt-8 flex-1 space-y-3 text-left">
          {plan.features.map((feature) => (
            <PricingFeatureItem key={feature.id || feature.text}>{feature.text}</PricingFeatureItem>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
