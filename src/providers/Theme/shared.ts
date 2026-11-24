import type { Theme } from './types'

export const themeLocalStorageKey = 'payload-theme'

export const defaultTheme = 'light'

/** false olanda dark mode kodu yerdə qalır, amma heç yerdə tətbiq olunmur. */
export const darkModeEnabled = false

export const getImplicitPreference = (): Theme | null => {
  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasImplicitPreference = typeof mql.matches === 'boolean'

  if (hasImplicitPreference) {
    return mql.matches ? 'dark' : 'light'
  }

  return null
}
