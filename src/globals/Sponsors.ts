import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

import { revalidateSponsors } from './revalidateLanding'

export const Sponsors: GlobalConfig = {
  slug: 'sponsors',
  label: 'Sponsors',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateSponsors],
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Public-də göstər',
      defaultValue: false,
      admin: {
        description: 'Bağlı olanda saytda Sponsors section görünmür.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Sponsorlar',
      labels: {
        singular: 'Sponsor',
        plural: 'Sponsorlar',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Ad',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Loqo',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link',
        },
      ],
    },
  ],
}
