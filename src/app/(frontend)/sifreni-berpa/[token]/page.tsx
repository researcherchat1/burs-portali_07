import type { Metadata } from 'next'
import React from 'react'

import { NewPasswordForm } from '@/features/account/PasswordResetForms'
import { Section } from '@/features/landing/Section'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ token: string }>
}

export default async function SifreniBerpaPage({ params: paramsPromise }: Args) {
  const { token } = await paramsPromise
  const value = decodeURIComponent(token)
  const valid = /^[a-f0-9]{20,128}$/i.test(value)

  return (
    <Section subtitle="Müştəri" title="Yeni şifrə" description="Yeni şifrəni iki dəfə yazın.">
      {valid ? (
        <NewPasswordForm token={value} />
      ) : (
        <p className="text-center text-sm text-destructive">Link etibarlı deyil və ya vaxtı bitib.</p>
      )}
    </Section>
  )
}

export function generateMetadata(): Metadata {
  return { title: 'Yeni şifrə | Burs Portalı' }
}
