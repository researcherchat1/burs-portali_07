'use server'

import config from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

import { getMusteri } from '@/features/account/session'

const VISITOR_COOKIE = 'ziyaretci-id'

const cookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 365,
}

export type SayEvent = {
  kind: 'page' | 'burs'
  target: string
}

function todayKey() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function cleanTarget(value: string) {
  const target = value.trim()
  if (!target || target.length > 200 || target.includes('..')) return null
  return target
}

async function visitorKey() {
  const musteri = await getMusteri()
  if (musteri?.id) return `m:${musteri.id}`

  const store = await cookies()
  const existing = store.get(VISITOR_COOKIE)?.value
  if (existing && existing.length <= 80) return existing

  const created = crypto.randomUUID()
  store.set(VISITOR_COOKIE, created, cookieOptions)
  return created
}

async function targetAllowed(
  payload: Awaited<ReturnType<typeof getPayload>>,
  event: SayEvent,
) {
  if (event.kind === 'burs') {
    if (event.target.startsWith('/') || event.target.includes('/')) return false
    const found = await payload.find({
      collection: 'burslar',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: {
        and: [{ slug: { equals: event.target } }, { _status: { equals: 'published' } }],
      },
    })
    return Boolean(found.docs[0])
  }

  if (event.target === '/' || event.target === '/burslar') return true
  if (
    event.target.startsWith('/admin') ||
    event.target.startsWith('/giris') ||
    event.target.startsWith('/qeydiyyat') ||
    event.target.startsWith('/kabinet')
  ) {
    return false
  }

  if (event.target.startsWith('/burslar/')) {
    const slug = event.target.slice('/burslar/'.length)
    if (!slug || slug.includes('/')) return false
    return targetAllowed(payload, { kind: 'burs', target: slug })
  }

  const slug = event.target.startsWith('/') ? event.target.slice(1) : ''
  if (!slug || slug.includes('/')) return false

  const page = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
  })
  return Boolean(page.docs[0])
}

/** Səhifə və burs baxışını yazır. Xəta səhifəni dayandırmır. */
export async function recordSays(events: SayEvent[]) {
  try {
    if (!Array.isArray(events) || events.length === 0 || events.length > 3) return

    const payload = await getPayload({ config })
    const visitor = await visitorKey()
    const day = todayKey()

    for (const raw of events) {
      if (raw.kind !== 'page' && raw.kind !== 'burs') continue
      const target = cleanTarget(raw.target)
      if (!target) continue
      const event = { kind: raw.kind, target }
      if (!(await targetAllowed(payload, event))) continue

      const existing = await payload.find({
        collection: 'saylar',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        where: {
          and: [
            { kind: { equals: event.kind } },
            { target: { equals: event.target } },
            { day: { equals: day } },
            { visitor: { equals: visitor } },
          ],
        },
      })
      if (existing.docs[0]) continue

      await payload.create({
        collection: 'saylar',
        data: {
          kind: event.kind,
          target: event.target,
          day,
          visitor,
        },
        overrideAccess: true,
      })
    }
  } catch {
    return
  }
}
