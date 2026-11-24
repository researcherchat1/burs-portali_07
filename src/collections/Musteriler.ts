import type { CollectionConfig } from 'payload'

import { passwordResetUrl } from '@/features/account/resetUrl'

import { anyone } from '../access/anyone'
import { adminOrSelf, isAdminUser } from '../access/musteri'

/**
 * İctimai müştəri hesabı. Admin paneli `users` kolleksiyasında qalır.
 * Bu kolleksiyanın istifadəçisi `/admin` aça bilməz (`access.admin: false`).
 */
export const Musteriler: CollectionConfig = {
  slug: 'musteriler',
  labels: {
    singular: 'Müştəri',
    plural: 'Müştərilər',
  },
  auth: {
    forgotPassword: {
      generateEmailSubject: () => 'Şifrəni bərpa et',
      generateEmailHTML: ({ token }) => {
        const url = passwordResetUrl(token || '')
        return `<p>Şifrənizi yeniləmək üçün linkə keçin.</p><p><a href="${url}">${url}</a></p><p>Link təxminən 1 saat etibarlıdır. Bu istəyi siz göndərməmisinizsə, məktubu nəzərə almayın.</p>`
      },
    },
  },
  access: {
    admin: () => false,
    create: anyone,
    delete: isAdminUser,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'updatedAt'],
    description: 'Sayt müştəriləri. Admin girişi Users kolleksiyasındadır.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Ad',
      required: true,
    },
    {
      name: 'savedBurs',
      type: 'relationship',
      relationTo: 'burslar',
      hasMany: true,
      label: 'Saxlanmış burslar',
      admin: {
        description: 'Müştərinin kabinetində görünən burslar. Verilənlər bazasında saxlanılır.',
      },
    },
  ],
  timestamps: true,
}
