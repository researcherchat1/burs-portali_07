import type { Metadata } from 'next'
import React from 'react'

import { ForgotPasswordForm } from '@/features/account/PasswordResetForms'
import { Section } from '@/features/landing/Section'

export const dynamic = 'force-dynamic'

export default function SifreniUnutdumPage() {
  return (
    <Section
      subtitle="Müştəri"
      title="Şifrəni unutdum"
      description="Qeydiyyatda yazdığınız emaili daxil edin."
    >
      <ForgotPasswordForm />
    </Section>
  )
}

export function generateMetadata(): Metadata {
  return { title: 'Şifrəni unutdum | Burs Portalı' }
}
