'use client'

import { House } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'

import { CenteredMenu } from './CenteredMenu'
import { Section } from './Section'
import { SiteBrand } from './SiteBrand'

export function Navbar(props: { signedIn?: boolean }) {
  const rightMenu = props.signedIn ? (
    <li>
      <Link className={buttonVariants({ variant: 'outline', size: 'sm' })} href="/kabinet">
        Kabinet
      </Link>
    </li>
  ) : (
    <>
      <li>
        <Link className={buttonVariants({ size: 'sm' })} href="/qeydiyyat">
          Qeydiyyat
        </Link>
      </li>
      <li>
        <Link className={buttonVariants({ variant: 'outline', size: 'sm' })} href="/giris">
          Giriş
        </Link>
      </li>
    </>
  )

  return (
    <Section className="px-3 py-6">
      <CenteredMenu logo={<SiteBrand />} rightMenu={rightMenu}>
        <li>
          <Link href="/" aria-label="Əsas">
            <House className="size-5" aria-hidden />
          </Link>
        </li>
        <li>
          <Link href="/haqqimizda">Haqqımızda</Link>
        </li>
        <li>
          <Link href="/burslar">Burslar</Link>
        </li>
        <li>
          <Link href="/kurslar">Kurslar</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
        <li>
          <Link href="/elaqe">Əlaqə</Link>
        </li>
      </CenteredMenu>
    </Section>
  )
}
