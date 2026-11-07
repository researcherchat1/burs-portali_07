import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { HomeHero } from '@/features/landing/HomeHero'
import { HomeSideBanners } from '@/features/landing/HomeSideBanners'
import { LandingBlocks } from '@/features/landing/LandingBlocks'
import { RecordSays } from '@/features/saylar/RecordSays'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    .filter(
      (doc): doc is typeof doc & { slug: string } =>
        typeof doc.slug === 'string' && doc.slug.length > 0 && doc.slug !== 'home',
    )
    .map(({ slug }) => ({ slug }))

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const isHome = decodedSlug === 'home'

  const body = (
    <>
      {draft ? null : (
        <RecordSays events={[{ kind: 'page', target: isHome ? '/' : `/${decodedSlug}` }]} />
      )}
      <article className={isHome ? 'pb-8' : 'pt-16 pb-24'}>
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        {isHome ? (
          <HomeHero />
        ) : (
          <>
            <RenderHero {...hero} />
            <RenderBlocks blocks={layout} />
          </>
        )}
      </article>

    </>
  )

  if (!isHome) return body

  return (
    <>
      {body}
      <div className="relative">
        <HomeSideBanners belowHero />
        <LandingBlocks />
      </div>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
