'use server'

import { getPayload } from 'payload'

import config from '@payload-config'

export type ResetState = {
  ok: boolean
  message: string
}

const sent = 'Əgər bu email bizdə varsa, bərpa məktubu göndərildi.'
const badLink = 'Link etibarlı deyil və ya vaxtı bitib.'

function text(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : ''
}

function tokenError(error: unknown) {
  if (!error || typeof error !== 'object' || !('message' in error)) return false
  return typeof error.message === 'string' && error.message.toLowerCase().includes('token')
}

export async function requestPasswordReset(_prev: ResetState, formData: FormData): Promise<ResetState> {
  const email = text(formData.get('email')).toLowerCase()
  if (!email) return { ok: false, message: 'Email lazımdır.' }

  try {
    const payload = await getPayload({ config })
    await payload.forgotPassword({
      collection: 'musteriler',
      data: { email },
      overrideAccess: true,
    })
    return { ok: true, message: sent }
  } catch {
    return { ok: false, message: 'Yenidən cəhd edin.' }
  }
}

export async function confirmPasswordReset(_prev: ResetState, formData: FormData): Promise<ResetState> {
  const token = text(formData.get('token'))
  const password = text(formData.get('password'))
  const confirm = text(formData.get('confirm'))

  if (!/^[a-f0-9]{20,128}$/i.test(token)) return { ok: false, message: badLink }
  if (password.length < 8) return { ok: false, message: 'Şifrə ən az 8 simvol olmalıdır.' }
  if (password !== confirm) return { ok: false, message: 'Şifrələr eyni deyil.' }

  try {
    const payload = await getPayload({ config })
    await payload.resetPassword({
      collection: 'musteriler',
      data: { token, password },
      overrideAccess: true,
    })
    return { ok: true, message: 'Şifrə yeniləndi.' }
  } catch (error) {
    if (tokenError(error)) return { ok: false, message: badLink }
    return { ok: false, message: 'Yenidən cəhd edin.' }
  }
}
