import { ChevronDown } from 'lucide-react'
import React from 'react'

import { darkModeEnabled } from '../shared'

const themeScript = `
(function () {
  if (!${darkModeEnabled}) {
    document.documentElement.setAttribute('data-theme', 'light')
    return
  }

  var sel = document.getElementById('burs-theme')
  if (!sel || sel.getAttribute('data-bound') === 'yes') return
  sel.setAttribute('data-bound', 'yes')
  var key = 'payload-theme'
  var stored = window.localStorage.getItem(key)
  sel.value = stored === 'light' || stored === 'dark' ? stored : 'auto'
  function apply(next) {
    if (next === 'light' || next === 'dark') {
      window.localStorage.setItem(key, next)
      document.documentElement.setAttribute('data-theme', next)
      return
    }
    window.localStorage.removeItem(key)
    var dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }
  sel.addEventListener('change', function () { apply(sel.value) })
})()
`

export const ThemeSelector: React.FC = () => {
  return (
    <label className="relative inline-flex items-center text-sm text-muted-foreground">
      <select
        id="burs-theme"
        aria-label="Select a theme"
        defaultValue="auto"
        className="h-9 cursor-pointer appearance-none bg-transparent py-1 pr-6 outline-none"
      >
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-0 size-4 opacity-50" />
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </label>
  )
}
