import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'
import { getSaveState } from '@/features/account/savedBurs'
import { getPublishedBurslar } from '@/utilities/burslar'

import { BursGrid } from './BursGrid'

/** Ana səhifə teaser — published burslar (limit). */
export async function BurslarSection() {
  try {
    const [items, saveState] = await Promise.all([getPublishedBurslar(6), getSaveState()])

    return (
      <>
        <BursGrid
          id="burslar"
          items={items}
          signedIn={saveState.signedIn}
          savedSlugs={saveState.slugs}
          saveClassName="border border-[#c4568c] dark:border-[#c4568c]"
          title="Burslar"
          accentTitle
          description="Tam siyahı üçün bütün burslara baxın."
          descriptionClassName="text-foreground"
          descriptionHref="/burslar"
          emptyMessage="Hələ yayımlanmış burs yoxdur. Admin → Burslar-dan əlavə edib Publish edin."
        />
        <div className="mx-auto max-w-5xl px-3 pb-10 text-center">
          <Link
            href="/burslar"
            className={cn(buttonVariants({ variant: 'outline' }), 'border-[#c4568c] dark:border-[#c4568c]')}
          >
            Bütün burslara bax
          </Link>
        </div>
      </>
    )
  } catch {
    return null
  }
}
