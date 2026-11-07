import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { toAsciiSlug } from '../utilities/toAsciiSlug'

const ensureBursSlug: CollectionBeforeChangeHook = ({ data }) => {
  if (!data) return data
  if (typeof data.slug === 'string' && data.slug.trim()) {
    data.slug = toAsciiSlug(data.slug)
  } else if (typeof data.title === 'string' && data.title.trim()) {
    data.slug = toAsciiSlug(data.title)
  }
  return data
}

export const Burslar: CollectionConfig = {
  slug: 'burslar',
  labels: {
    singular: 'Burs',
    plural: 'Burslar',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    country: true,
    educationLevel: true,
    deadline: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'country', 'educationLevel', 'deadline', 'updatedAt', '_status'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlıq',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Şəkil',
    },
    slugField({
      name: 'slug',
      useAsSlug: 'title',
      required: true,
    }),
    {
      name: 'country',
      type: 'text',
      label: 'Ölkə',
      required: true,
    },
    {
      name: 'educationLevel',
      type: 'select',
      label: 'Təhsil səviyyəsi',
      required: true,
      options: [
        { label: 'Orta təhsil', value: 'secondary' },
        { label: 'Bakalavr', value: 'bachelor' },
        { label: 'Magistr', value: 'master' },
        { label: 'PhD / Doktorantura', value: 'phd' },
        { label: 'Digər', value: 'other' },
      ],
    },
    {
      name: 'deadline',
      type: 'date',
      label: 'Son müraciət tarixi (deadline)',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Müraciət üçün son tarix — filter və kartda göstəriləcək',
      },
    },
    {
      name: 'officialLink',
      type: 'text',
      label: 'Rəsmi link',
      required: true,
      admin: {
        description: 'Müraciət üçün rəsmi səhifə (istifadəçi ora yönləndiriləcək)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Kateqoriya',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Qısa təsvir',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Yayımlanma tarixi',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [ensureBursSlug],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
    },
    maxPerDoc: 50,
  },
}
