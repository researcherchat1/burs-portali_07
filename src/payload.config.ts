import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Musteriler } from './collections/Musteriler'
import { Users } from './collections/Users'
import { Bannerler } from './collections/Bannerler'
import { Saylar } from './collections/Saylar'
import { Burslar } from './collections/Burslar'
import { Kurslar } from './collections/Kurslar'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { FAQ } from './globals/FAQ'
import { Hero } from './globals/Hero'
import { Pricing } from './globals/Pricing'
import { Sponsors } from './globals/Sponsors'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function brevoEmail() {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  const from = process.env.SMTP_FROM?.trim()
  const port = Number(process.env.SMTP_PORT)
  if (!host || !user || !pass || !from || !Number.isFinite(port)) return undefined

  return nodemailerAdapter({
    defaultFromAddress: from,
    defaultFromName: process.env.SMTP_FROM_NAME?.trim() || 'Burslar platform',
    skipVerify: true,
    transportOptions: {
      host,
      port,
      secure: false,
      auth: { user, pass },
    },
  })
}

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL,
  }),
  collections: [Pages, Posts, Burslar, Kurslar, Media, Categories, Users, Musteriler, Bannerler, Saylar],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Pricing, FAQ, Sponsors, Hero],
  plugins,
  email: brevoEmail(),
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user && (req.user as { collection?: string }).collection === 'users') return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
