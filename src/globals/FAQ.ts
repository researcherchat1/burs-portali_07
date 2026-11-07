import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

import { revalidateFaq } from './revalidateLanding'

export const FAQ: GlobalConfig = {
  slug: 'faq',
  label: 'FAQ',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateFaq],
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Public-də göstər',
      defaultValue: false,
      admin: {
        description: 'Bağlı olanda /faq səhifəsində suallar görünmür.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Suallar',
      labels: {
        singular: 'Sual',
        plural: 'Suallar',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Sual',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Cavab',
          required: true,
        },
      ],
    },
  ],
}
