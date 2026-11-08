import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'
import { getPublishedKurslar } from '@/utilities/kurslar'

import { KursGrid } from './KursGrid'

/** Ana səhifə teaser — Burslar blokundan sonra. Xəta olarsa səhifəni sındırmır. */
export async function KurslarSection() {
  try {
    const items = await getPublishedKurslar(6)

    return (
      <>
        <KursGrid
          id="kurslar"
          items={items}
          title="Kurslar"
          accentTitle
          description="Tam siyahı üçün bütün kurslara baxın."
          descriptionClassName="text-foreground"
          descriptionHref="/kurslar"
          emptyMessage="Hələ yayımlanmış kurs yoxdur. Admin → Kurslar-dan əlavə edib Publish edin."
        />
        <div className="mx-auto max-w-5xl px-3 pb-10 text-center">
          <Link
            href="/kurslar"
            className={cn(buttonVariants({ variant: 'outline' }), 'border-[#c4568c] dark:border-[#c4568c]')}
          >
            Bütün kurslara bax
          </Link>
        </div>
      </>
    )
  } catch {
    return null
  }
}
