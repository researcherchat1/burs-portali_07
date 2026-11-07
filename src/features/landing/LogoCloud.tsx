import React from 'react'

export const LogoCloud = (props: { text?: string; children: React.ReactNode }) => (
  <>
    {props.text ? (
      <div className="text-center text-sm font-semibold text-muted-foreground">{props.text}</div>
    ) : null}

    <div
      className={`
        mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-6
        [&_a]:opacity-60
        [&_a:hover]:opacity-100
        [&_img]:max-h-12 [&_img]:w-auto [&_img]:object-contain
      `}
    >
      {props.children}
    </div>
  </>
)
