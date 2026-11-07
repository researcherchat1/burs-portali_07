import type { Metadata } from 'next'
import React from 'react'

import { AuthForm } from '@/features/account/AuthForm'
import { getMusteri } from '@/features/account/session'
import { Section } from '@/features/landing/Section'

export const dynamic = 'force-dynamic'

export default async function QeydiyyatPage() {
  const musteri = await getMusteri()

  return (
    <Section
      subtitle="Müştəri"
      title="Qeydiyyat"
      description="Ad, email və şifrə. Hesab verilənlər bazasında saxlanılır."
    >
      <AuthForm mode="register" currentName={musteri?.name} />
    </Section>
  )
}

export function generateMetadata(): Metadata {
  return { title: 'Qeydiyyat | Burs Portalı' }
}
