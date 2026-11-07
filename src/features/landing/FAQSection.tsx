import { ChevronRightIcon } from 'lucide-react'
import React from 'react'

import type { Faq } from '@/payload-types'
import { getGlobal } from '@/utilities/getGlobals'

import { Section } from './Section'

export async function FAQSection() {
  try {
    const data = (await getGlobal('faq', 0)) as Faq

    if (!data?.enabled) {
      return null
    }

    const items = data.items || []

    if (!items.length) {
      return null
    }

    return (
      <Section id="faq" title="Tez-tez verilən suallar" className="py-16">
        <div className="w-full">
          {items.map((item, index) => (
            <details key={item.id || `${item.question}-${index}`} className="group border-b last:border-b-0">
              <summary
                className="
                  flex w-full cursor-pointer list-none items-start justify-between gap-4 py-5
                  text-left text-lg font-medium [&::-webkit-details-marker]:hidden
                "
              >
                {item.question}
                <ChevronRightIcon
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                />
              </summary>
              <p className="pb-4 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>
    )
  } catch {
    return null
  }
}
