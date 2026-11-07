'use client'

import { useEffect } from 'react'

import { recordSays, type SayEvent } from './recordSay'

/** Səhifə göründükdən sonra baxışı yazır. Uğursuz olsa səhifə açıq qalır. */
export function RecordSays(props: { events: SayEvent[] }) {
  const key = JSON.stringify(props.events)

  useEffect(() => {
    const path = window.location.pathname
    const onThisPage = props.events.every((event) => {
      if (event.kind === 'page') return path === event.target
      return path === `/burslar/${event.target}`
    })
    if (!onThisPage) return
    void recordSays(props.events)
  }, [key, props.events])

  return null
}
