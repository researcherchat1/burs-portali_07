import type { Metadata } from 'next'
import React from 'react'

import { FAQSection } from '@/features/landing/FAQSection'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Tez-tez verilən suallar',
}

export default function FaqPage() {
  return <FAQSection />
}
