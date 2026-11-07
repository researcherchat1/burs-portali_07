'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@payload-config'

import { clearMusteriCookie, setMusteriCookie } from './session'

export type AuthState = {
  ok: boolean
  message: string
  name?: string
}

function text(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : ''
}

function refreshAuthPages() {
  revalidatePath('/', 'layout')
  revalidatePath('/giris')
  revalidatePath('/qeydiyyat')
  revalidatePath('/kabinet')
}

export async function loginMusteri(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = text(formData.get('email')).toLowerCase()
  const password = text(formData.get('password'))

  if (!email || !password) {
    return { ok: false, message: 'Email və şifrə lazımdır.' }
  }

  try {
    const payload = await getPayload({ config })
    const result = await payload.login({
      collection: 'musteriler',
      data: { email, password },
    })

    if (!result.token || !result.user) {
      return { ok: false, message: 'Email və ya şifrə səhvdir.' }
    }

    await setMusteriCookie(result.token)
    refreshAuthPages()
    return { ok: true, message: 'Giriş oldu.', name: result.user.name }
  } catch {
    return { ok: false, message: 'Email və ya şifrə səhvdir.' }
  }
}

export async function registerMusteri(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = text(formData.get('name'))
  const email = text(formData.get('email')).toLowerCase()
  const password = text(formData.get('password'))
  const confirm = text(formData.get('confirm'))

  if (!name || !email || !password) {
    return { ok: false, message: 'Ad, email və şifrə lazımdır.' }
  }
  if (password.length < 8) {
    return { ok: false, message: 'Şifrə ən az 8 simvol olmalıdır.' }
  }
  if (password !== confirm) {
    return { ok: false, message: 'Şifrələr eyni deyil.' }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'musteriler',
      data: { name, email, password },
      overrideAccess: false,
    })

    const result = await payload.login({
      collection: 'musteriler',
      data: { email, password },
    })

    if (!result.token) {
      return { ok: true, message: 'Hesab yarandı. İndi giriş edin.', name }
    }

    await setMusteriCookie(result.token)
    refreshAuthPages()
    return { ok: true, message: 'Hesab yarandı və giriş oldu.', name }
  } catch {
    return { ok: false, message: 'Bu email artıq qeydiyyatdadır və ya məlumat səhvdir.' }
  }
}

export async function logoutMusteri() {
  await clearMusteriCookie()
  refreshAuthPages()
  redirect('/giris')
}
