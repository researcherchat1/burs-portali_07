'use client'

import Link from 'next/link'
import { useActionState } from 'react'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'

import { confirmPasswordReset, requestPasswordReset, type ResetState } from './passwordReset'

const initial: ResetState = { ok: false, message: '' }

const inputClass =
  'mt-1 h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground'

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, initial)

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4 text-left">
      <label className="block text-sm">
        Email
        <input className={inputClass} name="email" type="email" required autoComplete="email" />
      </label>

      {state.message ? (
        <p className={cn('text-sm', state.ok ? 'text-foreground' : 'text-destructive')}>{state.message}</p>
      ) : null}

      <button className={cn(buttonVariants(), 'w-full')} type="submit" disabled={pending}>
        {pending ? 'Gözləyin…' : 'Məktubu göndər'}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/giris" className="underline">
          Girişə qayıt
        </Link>
      </p>
    </form>
  )
}

export function NewPasswordForm(props: { token: string }) {
  const [state, formAction, pending] = useActionState(confirmPasswordReset, initial)

  if (state.ok) {
    return (
      <div className="mx-auto max-w-md space-y-4 text-center">
        <p className="text-sm text-foreground">{state.message}</p>
        <Link href="/giris" className={cn(buttonVariants(), 'w-full')}>
          Girişə qayıt
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4 text-left">
      <input name="token" type="hidden" value={props.token} />

      <label className="block text-sm">
        Yeni şifrə
        <input
          className={inputClass}
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </label>

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

      {state.message ? <p className="text-sm text-destructive">{state.message}</p> : null}

      <button className={cn(buttonVariants(), 'w-full')} type="submit" disabled={pending}>
        {pending ? 'Gözləyin…' : 'Şifrəni yadda saxla'}
      </button>
    </form>
  )
}
