import { cookies } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { Musteriler } from '@/payload-types'

/** Admin `payload-token` kukisindən ayrıdır. */
export const MUSTERI_COOKIE = 'musteri-token'

const cookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7,
}

export async function setMusteriCookie(token: string) {
  const store = await cookies()
  store.set(MUSTERI_COOKIE, token, cookieOptions)
}

export async function clearMusteriCookie() {
  const store = await cookies()
  store.delete(MUSTERI_COOKIE)
}

export async function getMusteri(): Promise<Musteriler | null> {
  const store = await cookies()
  const token = store.get(MUSTERI_COOKIE)?.value
  if (!token) return null

  const payload = await getPayload({ config })
  const headers = new Headers()
  headers.set('Authorization', `JWT ${token}`)

  const { user } = await payload.auth({
    headers,
    canSetHeaders: false,
  })

  if (!user || user.collection !== 'musteriler') return null
  return user
}
