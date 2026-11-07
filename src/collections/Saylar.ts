import type { CollectionConfig } from 'payload'

import { isAdminUser } from '../access/musteri'

/**
 * Sayğac anbarı. Səhifə və burs baxışı yazılır. Müraciət klikı hələ yox.
 * Eyni ziyarətçi, eyni növ, eyni hədəf və eyni gün ikinci dəfə saxlanmır.
 */
export const Saylar: CollectionConfig = {
  slug: 'saylar',
  labels: {
    singular: 'Say',
    plural: 'Saylar',
  },
  access: {
    create: isAdminUser,
    delete: isAdminUser,
    read: isAdminUser,
    update: isAdminUser,
  },
  admin: {
    useAsTitle: 'target',
    defaultColumns: ['kind', 'target', 'day', 'visitor', 'updatedAt'],
    description:
      'Səhifə və burs baxışı bura yazılır. Eyni ziyarətçi, eyni hədəf və eyni gün ikinci dəfə saxlanmır. Rəsmi müraciət klikı hələ yazılmır.',
  },
  indexes: [
    {
      unique: true,
      fields: ['kind', 'target', 'day', 'visitor'],
    },
  ],
  fields: [
    {
      name: 'kind',
      type: 'select',
      label: 'Növ',
      required: true,
      options: [
        { label: 'Səhifə baxışı', value: 'page' },
        { label: 'Burs baxışı', value: 'burs' },
        { label: 'Rəsmi müraciət klikı', value: 'muraciet' },
      ],
    },
    {
      name: 'target',
      type: 'text',
      label: 'Hədəf',
      required: true,
      admin: {
        description: 'Səhifə yolu və ya bursun slug-ı. Məsələn /burslar və ya turkiye-teqaudi.',
      },
    },
    {
      name: 'day',
      type: 'text',
      label: 'Gün',
      required: true,
      admin: {
        description: 'Təqvim günü, 2026-10-02 formatında.',
      },
    },
    {
      name: 'visitor',
      type: 'text',
      label: 'Ziyarətçi',
      required: true,
      admin: {
        description: 'Müştəri nömrəsi və ya qonaq açarı.',
      },
    },
  ],
  timestamps: true,
}
