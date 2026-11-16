import { useEffect, useRef, useState } from 'react'
import Photo from './Photo'

export default function Gallery({ images, title }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const touchX = useRef(0)
  const last = images.length

  function show(index) {
    setActive((index + last) % last)
  }

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'ArrowRight') setActive((index) => (index + 1) % last)
      if (event.key === 'ArrowLeft') setActive((index) => (index - 1 + last) % last)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, last])

  return (
    <div className="mt-6">
      <div
        className="relative overflow-hidden bg-sand"
        onTouchStart={(event) => {
          touchX.current = event.changedTouches[0].clientX
        }}
        onTouchEnd={(event) => {
          const delta = event.changedTouches[0].clientX - touchX.current
          if (delta > 48) show(active - 1)
          if (delta < -48) show(active + 1)
        }}
      >
        <Photo
          key={images[active]}
          id={images[active]}
          alt={`${title}, photo ${active + 1} of ${last}`}
          width={1800}
          eager
          className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:max-h-[640px]"
        />
        <div className="absolute bottom-3 left-3 bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
          {active + 1} / {last}
        </div>
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button type="button" className="bg-cream/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em]" onClick={() => show(active - 1)}>
            Prev
          </button>
          <button type="button" className="bg-cream/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em]" onClick={() => show(active + 1)}>
            Next
          </button>
          <button type="button" className="bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream" onClick={() => setOpen(true)}>
            Expand
          </button>
        </div>
      </div>

      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {images.map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => show(index)}
            aria-label={`Show photo ${index + 1}`}
            aria-current={index === active}
            className={`h-20 w-28 shrink-0 overflow-hidden border-2 transition ${index === active ? 'border-clay' : 'border-transparent opacity-80 hover:opacity-100'}`}
          >
            <Photo id={id} alt="" width={400} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photos`}
          onClick={() => setOpen(false)}
        >
          <div className="mb-4 flex items-center justify-between text-cream">
            <p className="text-xs uppercase tracking-[0.18em]">
              {active + 1} / {last}
            </p>
            <button
              type="button"
              autoFocus
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center gap-3" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="hidden bg-cream px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink sm:inline" onClick={() => show(active - 1)}>
              Prev
            </button>
            <Photo
              id={images[active]}
              alt={`${title}, photo ${active + 1} of ${last}`}
              width={2000}
              eager
              className="max-h-[75vh] max-w-full object-contain"
            />
            <button type="button" className="hidden bg-cream px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink sm:inline" onClick={() => show(active + 1)}>
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
