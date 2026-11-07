/**
 * CLI: pnpm seed:burslar-banners
 * /burslar üçün sol və sağ nümunə banner. Admin Bannerlər siyahısında da görünür.
 */
import 'dotenv/config'

import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import sharp from 'sharp'

const samples = [
  { name: 'Nümunə — Burslar sol', side: 'left' as const, color: '#4f46e5', label: 'SOL' },
  { name: 'Nümunə — Burslar sağ', side: 'right' as const, color: '#db2777', label: 'SAG' },
]

async function png(label: string, color: string) {
  const svg = `<svg width="528" height="720" xmlns="http://www.w3.org/2000/svg">
    <rect width="528" height="720" rx="24" fill="${color}"/>
    <text x="264" y="340" text-anchor="middle" fill="#ffffff" font-size="64" font-family="Arial, sans-serif">${label}</text>
    <text x="264" y="410" text-anchor="middle" fill="#ffffff" font-size="28" font-family="Arial, sans-serif">BURSAR</text>
  </svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function ensureBanner(
  payload: Payload,
  sample: (typeof samples)[number],
) {
  const existing = await payload.find({
    collection: 'bannerler',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { name: { equals: sample.name } },
  })

  if (existing.docs[0]) {
    payload.logger.info(`Artıq var: ${sample.name}`)
    return
  }

  const data = await png(sample.label, sample.color)
  const media = await payload.create({
    collection: 'media',
    data: { alt: sample.name },
    file: {
      name: `burslar-banner-${sample.side}.png`,
      data,
      mimetype: 'image/png',
      size: data.length,
    },
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  await payload.create({
    collection: 'bannerler',
    data: {
      name: sample.name,
      image: media.id,
      placement: 'burslar',
      side: sample.side,
      enabled: true,
      order: 0,
    },
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  payload.logger.info(`Yaradıldı: ${sample.name}`)
}

async function main() {
  const payload = await getPayload({ config })
  for (const sample of samples) {
    await ensureBanner(payload, sample)
  }
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
