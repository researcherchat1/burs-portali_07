/**
 * CLI: pnpm admin:create
 * Email və şifrə mühitdən gəlir, faylda saxlanmır.
 */
import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME?.trim() || 'Admin'

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL və ADMIN_PASSWORD lazımdır')
  }
  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD ən az 8 simvol olmalıdır')
  }

  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (existing.docs[0]) {
    await payload.update({
      id: existing.docs[0].id,
      collection: 'users',
      data: { name, password },
      overrideAccess: true,
    })
    payload.logger.info(`Admin şifrəsi yeniləndi: ${email}`)
  } else {
    await payload.create({
      collection: 'users',
      data: { email, name, password },
      overrideAccess: true,
    })
    payload.logger.info(`Admin yaradıldı: ${email}`)
  }

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
