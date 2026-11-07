import Image from 'next/image'
import React from 'react'

import { getSideBanners, type HomeSideBanner, type SideBannerPlacement } from './homeSideBanners'

const slotWidth = 240
const slotHeight = 560

function SideBanner(props: { banner: HomeSideBanner; belowHero?: boolean }) {
  const { banner, belowHero } = props
  const top = belowHero ? 'top-0' : 'top-28'
  const image = (
    <Image
      src={banner.imageUrl}
      alt={banner.name}
      width={slotWidth}
      height={slotHeight}
      sizes={`${slotWidth}px`}
      className="h-[560px] w-[240px] rounded-xl border border-border bg-background object-cover"
    />
  )

  return (
    <aside
      className={
        banner.side === 'left'
          ? `pointer-events-none absolute ${top} bottom-16 left-[max(0.75rem,calc(50%-48rem))] hidden w-[240px] min-[1440px]:block`
          : `pointer-events-none absolute ${top} bottom-16 right-[max(0.75rem,calc(50%-48rem))] hidden w-[240px] min-[1440px]:block`
      }
    >
      <div className="pointer-events-auto sticky top-28">
        {banner.href ? (
          <a
            href={banner.href}
            target={banner.external ? '_blank' : undefined}
            rel={banner.external ? 'noopener noreferrer' : undefined}
          >
            {image}
          </a>
        ) : (
          image
        )}
      </div>
    </aside>
  )
}

/** Sol və sağ kənar. Uyğun banner yoxdursa heç nə çəkmir. */
export async function HomeSideBanners(props: { placement?: SideBannerPlacement; belowHero?: boolean }) {
  const { left, right } = await getSideBanners(props.placement ?? 'home')
  if (!left && !right) return null

  return (
    <>
      {left ? <SideBanner banner={left} belowHero={props.belowHero} /> : null}
      {right ? <SideBanner banner={right} belowHero={props.belowHero} /> : null}
    </>
  )
}
