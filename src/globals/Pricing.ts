import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

import { revalidatePricing } from './revalidateLanding'

export const Pricing: GlobalConfig = {
  slug: 'pricing',
  label: 'Pricing',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidatePricing],
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Public-də göstər',
      defaultValue: false,
      admin: {
        description: 'Bağlı olanda saytda Pricing section görünmür.',
      },
    },
    {
      name: 'sectionSubtitle',
      type: 'text',
      label: 'Alt başlıq',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Başlıq',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Təsvir',
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Planlar',
      labels: {
        singular: 'Plan',
        plural: 'Planlar',
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
          name: 'price',
          type: 'text',
          label: 'Qiymət',
          required: true,
          admin: {
            description: 'Məs: 0, 79 AZN, Pulsuz',
          },
        },
        {
          name: 'features',
          type: 'array',
          label: 'Xüsusiyyətlər',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Düymə mətni',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'Düymə linki',
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          label: 'Vurğulanmış plan',
          defaultValue: false,
        },
      ],
    },
  ],
}
