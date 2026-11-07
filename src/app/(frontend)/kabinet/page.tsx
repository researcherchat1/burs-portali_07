import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

import { CabinetFrame, type CabinetBursRow } from '@/features/account/CabinetFrame'
import { getSavedBursCards } from '@/features/account/savedBurs'
import { getMusteri } from '@/features/account/session'

export const dynamic = 'force-dynamic'

const levelLabels: Record<string, string> = {
  secondary: 'Orta təhsil',
  bachelor: 'Bakalavr',
  master: 'Magistr',
  phd: 'PhD',
  other: 'Digər',
}

function deadlineLabel(value?: string | null) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function KabinetPage() {
  const musteri = await getMusteri()
  if (!musteri) redirect('/giris')

  const saved = await getSavedBursCards()
  const rows: CabinetBursRow[] = saved.map((burs) => ({
    slug: burs.slug,
    title: burs.title,
    country: burs.country,
    level: levelLabels[burs.educationLevel] || burs.educationLevel,
    categoryLabel: burs.categoryLabel,
    deadlineLabel: deadlineLabel(burs.deadline),
    imageUrl: burs.imageUrl,
  }))

  return <CabinetFrame name={musteri.name} email={musteri.email} rows={rows} />
}

export function generateMetadata(): Metadata {
  return { title: 'Kabinet | Burs Portalı' }
}
