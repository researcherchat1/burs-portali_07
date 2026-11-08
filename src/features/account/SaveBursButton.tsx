import Link from 'next/link'

import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/utilities/ui'

import { toggleSavedBurs } from './savedBurs'

/** Saxla / çıxar. Giriş yoxdursa /giris. Məlumat DB-dədir. */
export function SaveBursButton(props: {
  slug: string
  saved: boolean
  signedIn: boolean
  className?: string
}) {
  if (!props.signedIn) {
    return (
      <Link
        href="/giris"
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-full', props.className)}
      >
        Saxla
      </Link>
    )
  }

  return (
    <form action={toggleSavedBurs}>
      <input type="hidden" name="slug" value={props.slug} />
      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: props.saved ? 'secondary' : 'outline', size: 'sm' }),
          'w-full',
          props.className,
        )}
      >
        {props.saved ? 'Çıxar' : 'Saxla'}
      </button>
    </form>
  )
}
