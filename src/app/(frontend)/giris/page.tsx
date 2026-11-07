import type { Metadata } from 'next'
import React from 'react'

import { AuthForm } from '@/features/account/AuthForm'
import { getMusteri } from '@/features/account/session'
import { Section } from '@/features/landing/Section'

export const dynamic = 'force-dynamic'

export default async function GirisPage() {
  const musteri = await getMusteri()

  return (
    <Section subtitle="Müştəri" title="Giriş" description="Email və şifrə ilə daxil olun.">
      <AuthForm mode="login" currentName={musteri?.name} />
    </Section>
  )
}

export function generateMetadata(): Metadata {
  return { title: 'Giriş | Burs Portalı' }
}
