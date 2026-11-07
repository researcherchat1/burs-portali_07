import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { toAsciiSlug } from '../utilities/toAsciiSlug'

const ensureKursSlug: CollectionBeforeChangeHook = ({ data }) => {
  if (!data) return data
  if (typeof data.slug === 'string' && data.slug.trim()) {
    data.slug = toAsciiSlug(data.slug)
  } else if (typeof data.title === 'string' && data.title.trim()) {
    data.slug = toAsciiSlug(data.title)
  }
  return data
}

export const Kurslar: CollectionConfig = {
  slug: 'kurslar',
  labels: {
    singular: 'Kurs',
    plural: 'Kurslar',
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
    university: true,
    language: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'university', 'language', 'updatedAt', '_status'],
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
      name: 'university',
      type: 'text',
      label: 'Universitet / Mənbə',
      required: true,
      admin: {
        description: 'Məs. Harvard University, Cambridge, edX',
      },
    },
    {
      name: 'language',
      type: 'select',
      label: 'Dil',
      required: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'Azərbaycan', value: 'az' },
        { label: 'Русский', value: 'ru' },
        { label: 'Türkçe', value: 'tr' },
        { label: 'Français', value: 'fr' },
        { label: 'Deutsch', value: 'de' },
        { label: 'Español', value: 'es' },
        { label: 'Digər', value: 'other' },
      ],
    },
    {
      name: 'officialLink',
      type: 'text',
      label: 'Rəsmi kurs linki',
      required: true,
      admin: {
        description: 'Pulsuz kursun rəsmi səhifəsi (istifadəçi ora yönləndiriləcək)',
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
    beforeChange: [ensureKursSlug],
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
