import React from 'react'

export type HeroSlide = {
  title: string
  subtitle: string
  note?: string | null
  imageUrl?: string | null
}

const accentWord = /(pulsuz)/i

const heroScript = `
(function () {
  var root = document.getElementById('burs-hero')
  if (!root || root.getAttribute('data-bound') === 'yes') return
  root.setAttribute('data-bound', 'yes')

  var slides = [].slice.call(root.querySelectorAll('[data-hero-slide]'))
  var dots = [].slice.call(root.querySelectorAll('[data-hero-dot]'))
  var index = 0
  var timer = 0

  function show(next) {
    index = next
    slides.forEach(function (el, i) {
      if (i === next) el.removeAttribute('hidden')
      else el.setAttribute('hidden', '')
    })
    dots.forEach(function (el, i) {
      if (i === next) el.setAttribute('aria-current', 'true')
      else el.removeAttribute('aria-current')
    })
  }

  function start() {
    if (timer) window.clearInterval(timer)
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer = window.setInterval(function () {
      show((index + 1) % slides.length)
    }, 8000)
  }

  dots.forEach(function (el, i) {
    el.addEventListener('click', function () {
      show(i)
      start()
    })
  })

  start()
})()
`

function SlideTitle(props: { title: string }) {
  const parts = props.title.split(accentWord)

  return (
    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
      {parts.map((part, index) =>
        part.toLowerCase() === 'pulsuz' ? (
          <span
            key={`${part}-${index}`}
            className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            {part}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </h1>
  )
}

export function HeroSlideshow(props: { slides: HeroSlide[] }) {
  const { slides } = props
  if (!slides.length) return null

  return (
    <section
      id="burs-hero"
      aria-label="Burs Portalı"
      aria-roledescription="carousel"
      className="relative mt-10 overflow-hidden bg-neutral-950 min-[1440px]:mx-[max(0.75rem,calc(50%-48rem))] min-[1440px]:rounded-xl"
    >
      {slides.map((slide, index) => (
        <div key={`${slide.title}-${index}`} data-hero-slide hidden={index !== 0 ? true : undefined} className="relative">
          {slide.imageUrl ? <img alt="" className="absolute inset-0 size-full object-cover" src={slide.imageUrl} /> : null}
          <div aria-hidden className="absolute inset-0 bg-black/60" />
          <div className="relative mx-auto flex min-h-[28rem] max-w-4xl flex-col items-center justify-center px-6 py-24 pb-28 text-center md:min-h-[32rem] md:py-32">
            <SlideTitle title={slide.title} />
            <p className="mt-5 max-w-3xl text-lg text-white/90 md:text-xl">{slide.subtitle}</p>
            {slide.note ? <p className="mt-3 max-w-3xl text-base text-white/80 md:text-lg">{slide.note}</p> : null}
          </div>
        </div>
      ))}

      {slides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={`${slide.title}-dot-${index}`}
              type="button"
              data-hero-dot={index}
              aria-label={`Slayd ${index + 1}`}
              aria-current={index === 0 ? 'true' : undefined}
              className="h-2.5 w-2.5 rounded-full border border-[#c4568c] bg-white/45 transition-all hover:bg-white/70 aria-current:w-8 aria-current:bg-white"
            />
          ))}
        </div>
      ) : null}

      <script dangerouslySetInnerHTML={{ __html: heroScript }} />
    </section>
  )
}
