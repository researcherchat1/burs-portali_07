import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandColumnTitle',
      type: 'text',
      label: 'Marka sütununun başlığı',
      defaultValue: 'Marka',
    },
    {
      name: 'brandName',
      type: 'text',
      label: 'Saytın adı',
      defaultValue: 'Burs Portalı',
    },
    {
      name: 'brandDescription',
      type: 'textarea',
      label: 'Bir cümləlik təsvir',
      defaultValue: 'Burs elanlarını bir yerdə tap, oxu və rəsmi səhifədən müraciət et.',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Sütunlar',
      labels: {
        singular: 'Sütun',
        plural: 'Sütunlar',
      },
      admin: {
        initCollapsed: true,
        description:
          'Marka sütunu sabitdir. Buraya Hüquqi, Sosial və sonrakı sütunlar əlavə olunur. Sütunun altına link, siyahıya yeni sütun əlavə et.',
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Başlıq',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Linklər',
          labels: {
            singular: 'Link',
            plural: 'Linklər',
          },
          admin: {
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
  versions: false,
}
