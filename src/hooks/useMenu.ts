'use client'

import { useState } from 'react'

export const useMenu = (defaultOpen: boolean = false) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(defaultOpen)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)
  const openMenu = () => setIsMenuOpen(true)

  return { isMenuOpen, openMenu, closeMenu, toggleMenu }
}
