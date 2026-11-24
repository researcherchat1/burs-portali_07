'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useRef } from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'

import { loginMusteri, logoutMusteri, registerMusteri, type AuthState } from './actions'

const initial: AuthState = { ok: false, message: '' }

const inputClass =
  'mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground'

export function AuthForm(props: {
  mode: 'login' | 'register'
  currentName?: string | null
}) {
  const action = props.mode === 'login' ? loginMusteri : registerMusteri
  const [state, formAction, pending] = useActionState(action, initial)
  const router = useRouter()
  const refreshed = useRef(false)

  useEffect(() => {
    if (state.ok && !refreshed.current) {
      refreshed.current = true
      router.refresh()
      router.push('/kabinet')
    }
  }, [router, state.ok])

  if (props.currentName) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-border p-6 text-center">
        <p className="text-lg font-semibold">Giriş olundu</p>
        <p className="mt-2 text-muted-foreground">{props.currentName}</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/kabinet" className={cn(buttonVariants())}>
            Kabinetə keç
          </Link>
          <form action={logoutMusteri}>
            <button className={cn(buttonVariants({ variant: 'outline' }), 'w-full')} type="submit">
              Çıxış
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4 text-left">
      {props.mode === 'register' ? (
        <label className="block text-sm">
          Ad
          <input className={inputClass} name="name" type="text" required autoComplete="name" />
        </label>
      ) : null}

      <label className="block text-sm">
        Email
        <input className={inputClass} name="email" type="email" required autoComplete="email" />
      </label>

      <label className="block text-sm">
        Şifrə
        <input
          className={inputClass}
          name="password"
          type="password"
          required
          minLength={props.mode === 'register' ? 8 : undefined}
          autoComplete={props.mode === 'login' ? 'current-password' : 'new-password'}
        />
      </label>

      {props.mode === 'register' ? (
        <label className="block text-sm">
          Şifrəni təsdiqlə
          <input
            className={inputClass}
            name="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </label>
      ) : null}

      {state.message ? (
        <p className={cn('text-sm', state.ok ? 'text-foreground' : 'text-destructive')}>
          {state.message}
          {state.ok && state.name ? ` ${state.name}` : ''}
        </p>
      ) : null}

      <button className={cn(buttonVariants(), 'w-full')} type="submit" disabled={pending}>
        {pending ? 'Gözləyin…' : props.mode === 'login' ? 'Giriş' : 'Qeydiyyat'}
      </button>

      {props.mode === 'login' ? (
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/sifreni-unutdum" className="underline">
            Şifrəni unutmusan?
          </Link>
        </p>
      ) : null}

      <p className="text-center text-sm text-muted-foreground">
        {props.mode === 'login' ? (
          <Link href="/qeydiyyat" className="underline">
            Hesabın yoxdur? Qeydiyyat
          </Link>
        ) : (
          <Link href="/giris" className="underline">
            Artıq hesabın var? Giriş
          </Link>
        )}
      </p>
    </form>
  )
}
