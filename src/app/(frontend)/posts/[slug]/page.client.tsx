'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { darkModeEnabled } from '@/providers/Theme/shared'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    if (!darkModeEnabled) return
    setHeaderTheme('dark')
  }, [setHeaderTheme])
  return <React.Fragment />
}

export default PageClient
