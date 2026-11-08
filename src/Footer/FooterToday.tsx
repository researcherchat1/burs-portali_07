'use client'

const months = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avqust',
  'sentyabr',
  'oktyabr',
  'noyabr',
  'dekabr',
] as const

/** Ziyarətçinin öz kompüterindəki gün. */
export function FooterToday() {
  const now = new Date()
  const label = `Bu gün: ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`

  return (
    <span className="sm:mr-16" suppressHydrationWarning>
      {label}
    </span>
  )
}
