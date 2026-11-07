/**
 * CLI: pnpm seed:kurslar
 * Yalnız summary-də [seed-kurs-v1] olan kursları yeniləyir.
 */
import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

import { seedKurslar } from '../endpoints/seed/kurslar'

async function main() {
  const payload = await getPayload({ config })
  const result = await seedKurslar(payload)
  payload.logger.info(`Seed OK: ${JSON.stringify(result)}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
