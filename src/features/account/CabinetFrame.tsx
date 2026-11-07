'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'

import { logoutMusteri } from './actions'
import { toggleSavedBurs } from './savedBurs'

export type CabinetBursRow = {
  slug: string
  title: string
  country: string
  level: string
  categoryLabel?: string | null
  deadlineLabel?: string | null
  imageUrl?: string | null
}

const activeItem =
  'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'

export function CabinetFrame(props: { name: string; email: string; rows: CabinetBursRow[] }) {
  const [tab, setTab] = useState<'profil' | 'saved'>('saved')

  return (
    <div className="flex w-full flex-col gap-4 px-4 py-4 md:min-h-[calc(100vh-8rem)] md:flex-row md:px-6">
      <aside className="flex w-full shrink-0 flex-col rounded-2xl border border-border bg-background p-5 md:w-72">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground">Kabinet</p>
        <nav className="mt-4 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setTab('profil')}
            className={cn(
              'rounded-lg px-3 py-3 text-left text-base',
              tab === 'profil' ? activeItem : 'hover:bg-muted',
            )}
          >
            Profil
          </button>
          <button
            type="button"
            onClick={() => setTab('saved')}
            className={cn(
              'rounded-lg px-3 py-3 text-left text-base',
              tab === 'saved' ? activeItem : 'hover:bg-muted',
            )}
          >
            Saxlanmış burslar
            <span className="ml-2 text-xs opacity-80">{props.rows.length}</span>
          </button>
        </nav>
        <form action={logoutMusteri} className="mt-6 md:mt-auto">
          <button
            type="submit"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full')}
          >
            Çıxış
          </button>
        </form>
      </aside>

      <section className="flex min-h-[70vh] min-w-0 flex-1 flex-col rounded-2xl border border-border bg-background p-6 md:p-8">
        <header className="mb-8 flex items-center justify-between gap-3 border-b border-border pb-5">
          <h1 className="text-3xl font-bold">{tab === 'profil' ? 'Profil' : 'Saxlanmış burslar'}</h1>
          <p className="truncate text-sm text-muted-foreground">{props.name}</p>
        </header>

        {tab === 'profil' ? (
          <dl className="max-w-lg space-y-4">
            <div>
              <dt className="text-sm text-muted-foreground">Ad</dt>
              <dd className="mt-1 text-lg font-semibold">{props.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Email</dt>
              <dd className="mt-1">{props.email}</dd>
            </div>
          </dl>
        ) : props.rows.length === 0 ? (
          <p className="text-muted-foreground">Hələ saxlanmış burs yoxdur.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {props.rows.map((row) => (
              <li
                key={row.slug}
                className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-52">
                  {row.imageUrl ? (
                    <Image src={row.imageUrl} alt={row.title} fill className="object-cover" sizes="144px" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      Şəkil yoxdur
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/burslar/${row.slug}`} className="text-xl font-semibold hover:underline">
                    {row.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.country}
                    {row.categoryLabel ? ` · ${row.categoryLabel}` : ''} · {row.level}
                  </p>
                  {row.deadlineLabel ? (
                    <p className="mt-1 text-sm text-muted-foreground">Son tarix: {row.deadlineLabel}</p>
                  ) : null}
                </div>
                <form action={toggleSavedBurs} className="sm:shrink-0">
                  <input type="hidden" name="slug" value={row.slug} />
                  <button
                    type="submit"
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full sm:w-auto')}
                  >
                    Çıxar
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
