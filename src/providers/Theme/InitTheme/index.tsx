'use client'

import React, { useSyncExternalStore } from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

const themeInitScript = `
(function () {
  function getImplicitPreference() {
    var mediaQuery = '(prefers-color-scheme: dark)'
    var mql = window.matchMedia(mediaQuery)
    var hasImplicitPreference = typeof mql.matches === 'boolean'

    if (hasImplicitPreference) {
      return mql.matches ? 'dark' : 'light'
    }

    return null
  }

  function themeIsValid(theme) {
    return theme === 'light' || theme === 'dark'
  }

  var themeToSet = '${defaultTheme}'
  var preference = window.localStorage.getItem('${themeLocalStorageKey}')

  if (themeIsValid(preference)) {
    themeToSet = preference
  } else {
    var implicitPreference = getImplicitPreference()

    if (implicitPreference) {
      themeToSet = implicitPreference
    }
  }

  document.documentElement.setAttribute('data-theme', themeToSet)
})();
`

/** React 19 / Next 16: inline script yalnız SSR + hydration; sonrakı client render null. */
const subscribe = () => () => {}
const getClientSnapshot = () => false
const getServerSnapshot = () => true

export const InitTheme: React.FC = () => {
  const emitScript = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  if (!emitScript) {
    return null
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeInitScript,
      }}
      suppressHydrationWarning
    />
  )
}
