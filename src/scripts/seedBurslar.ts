/**
 * CLI: pnpm seed:burslar
 */
import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

import { seedBurslar } from '../endpoints/seed/burslar'

async function main() {
  const payload = await getPayload({ config })
  const result = await seedBurslar(payload)
  payload.logger.info(`Seed OK: ${JSON.stringify(result)}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
