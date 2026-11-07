import type { Access } from 'payload'

const collectionOf = (user: unknown): string | undefined => {
  if (!user || typeof user !== 'object' || !('collection' in user)) return undefined
  const value = (user as { collection?: unknown }).collection
  return typeof value === 'string' ? value : undefined
}

/** Payload admin istifadəçisi (`users`). Müştəri hesabı deyil. */
export const isAdminUser: Access = ({ req: { user } }) => {
  return collectionOf(user) === 'users'
}

/** Admin hamısını görür; müştəri yalnız öz yazısını. */
export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (collectionOf(user) === 'users') return true
  return {
    id: {
      equals: user.id,
    },
  }
}
