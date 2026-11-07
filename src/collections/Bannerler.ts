import type { CollectionConfig } from 'payload'

import { isAdminUser } from '../access/musteri'
import { revalidateBanner, revalidateBannerDelete } from './hooks/revalidateBanner'

/** Admin banner yazısı. Ana səhifədə sol/sağ kənarda görünür. */
export const Bannerler: CollectionConfig = {
  slug: 'bannerler',
  labels: {
    singular: 'Banner',
    plural: 'Bannerlər',
  },
  access: {
    create: isAdminUser,
    delete: isAdminUser,
    read: isAdminUser,
    update: isAdminUser,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'placement', 'side', 'enabled', 'order', 'updatedAt'],
    description:
      'Ana səhifə, Burslar siyahısı və burs detalında sol və sağ kənarda görünür. Hər tərəfdə sıra nömrəsi ən kiçik olan banner çıxır.',
  },
  hooks: {
    afterChange: [revalidateBanner],
    afterDelete: [revalidateBannerDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Ad (daxili)',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Şəkil',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'Klik ünvanı',
      admin: {
        description: 'Bannerə basılanda açılan səhifə. Boş buraxıla bilər.',
      },
    },
    {
      name: 'placement',
      type: 'select',
      label: 'Yer',
      required: true,
      defaultValue: 'home',
      options: [
        { label: 'Ana səhifə', value: 'home' },
        { label: 'Burslar siyahısı', value: 'burslar' },
        { label: 'Burs detalı', value: 'detal' },
      ],
      admin: {
        description: 'Ana səhifə, Burslar siyahısı və Burs detalı saytda görünür.',
      },
    },
    {
      name: 'side',
      type: 'select',
      label: 'Tərəf',
      required: true,
      defaultValue: 'left',
      options: [
        { label: 'Sol', value: 'left' },
        { label: 'Sağ', value: 'right' },
      ],
      admin: {
        description: 'Ana səhifədə sol və ya sağ kənar.',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Saytda göstər',
      defaultValue: false,
      admin: {
        description: 'Sönülü olanda saxlanılır və saytda görünmür.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sıra',
      defaultValue: 0,
      admin: {
        description: 'Kiçik rəqəm əvvəl göstərilir.',
      },
    },
    {
      name: 'startsAt',
      type: 'date',
      label: 'Başlanğıc',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'endsAt',
      type: 'date',
      label: 'Bitmə',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
  ],
  timestamps: true,
}
