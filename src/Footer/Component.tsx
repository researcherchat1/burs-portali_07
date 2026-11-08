import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { SiteBrand } from '@/features/landing/SiteBrand'
import { Section } from '@/features/landing/Section'
import { getGlobal } from '@/utilities/getGlobals'

import { FooterToday } from './FooterToday'
import { cn } from '@/utilities/ui'

export async function Footer() {
  const year = new Date().getFullYear()

  try {
    const footerData = await getGlobal('footer', 1)
    const brandName = footerData?.brandName || 'Burs Portalı'
    const brandTitle = footerData?.brandColumnTitle ?? 'Marka'
    const description = footerData?.brandDescription || ''
    const columns = footerData?.columns || []
    const columnCount = 1 + columns.length

    return (
      <footer className="mt-auto border-t border-border">
        <Section className="pt-10 pb-8">
          <div
            className={cn(
              'grid grid-cols-1 gap-10 text-left sm:grid-cols-2',
              columnCount >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
            )}
          >
            <div>
              {brandTitle ? <div className="text-base font-semibold">{brandTitle}</div> : null}
              <Link href="/" className={cn('inline-flex', brandTitle && 'mt-3')}>
                <SiteBrand name={brandName} />
              </Link>
              {description ? (
                <p className="mt-3 max-w-xs text-base text-foreground/80">{description}</p>
              ) : null}
            </div>

            {columns.map((column, index) => (
              <div key={column.id || `${column.title}-${index}`}>
                <div className="text-base font-semibold">{column.title}</div>
                <ul className="mt-3 space-y-2 text-base text-foreground/80">
                  {column.links?.map((item, linkIndex) => (
                    <li key={item.id || `${item.link.label}-${linkIndex}`}>
                      <CMSLink {...item.link} className="hover:text-foreground" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 border-t pt-4 text-base text-foreground/80 max-sm:flex-col max-sm:items-start">
            <span>
              © {year} {brandName}. bütün hüquqları qorunur
            </span>
            <FooterToday />
          </div>
        </Section>
      </footer>
    )
  } catch {
    return (
      <footer className="mt-auto border-t border-border py-8 text-center text-base text-foreground/80">
        © {year} Burs Portalı. bütün hüquqları qorunur
      </footer>
    )
  }
}
