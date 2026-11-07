import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

import { revalidateHero } from './revalidateLanding'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateHero],
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Public-də göstər',
      defaultValue: true,
      admin: {
        description: 'Bağlı olanda ana səhifədə slayd görünmür.',
      },
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slaydlar',
      maxRows: 3,
      labels: {
        singular: 'Slayd',
        plural: 'Slaydlar',
      },
      admin: {
        description: 'Ən çox 3 slayd. Sıra ana səhifədəki keçid sırasıdır.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Başlıq',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Alt yazı',
          required: true,
        },
        {
          name: 'note',
          type: 'textarea',
          label: 'Əlavə sətir',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Arxa fon şəkli',
          admin: {
            description: 'Boş olanda arxa fon tünd qalır. Şəkil əvvəlcə Media-ya yüklənir.',
          },
        },
      ],
    },
  ],
}
