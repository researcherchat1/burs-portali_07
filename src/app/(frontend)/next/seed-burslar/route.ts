import config from '@payload-config'
import { getPayload } from 'payload'

import { seedBurslar } from '@/endpoints/seed/burslar'

export const maxDuration = 60

/** Dev-only seed: GET /next/seed-burslar */
export async function GET(): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Forbidden in production.', { status: 403 })
  }

  try {
    const payload = await getPayload({ config })
    const result = await seedBurslar(payload)
    return Response.json({ success: true, ...result })
  } catch (e) {
    console.error(e)
    return Response.json(
      { success: false, error: e instanceof Error ? e.message : 'seed failed' },
      { status: 500 },
    )
  }
}
