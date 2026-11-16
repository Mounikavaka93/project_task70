export function HeartIcon({ filled = false, pulse = false, onDone }) {
  return (
    <svg
      viewBox="0 0 24 24"
      onAnimationEnd={onDone}
      className={`h-5 w-5 ${pulse ? 'heart-pop' : ''} ${filled ? 'fill-clay text-clay' : 'fill-none text-ink'}`}
      aria-hidden="true"
    >
      <path
        d="M12 20.2s-6.8-4.2-6.8-8.7A3.7 3.7 0 0 1 12 8.6a3.7 3.7 0 0 1 6.8 2.9c0 4.5-6.8 8.7-6.8 8.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="11" r="1.8" fill="currentColor" />
    </svg>
  )
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M8 3.8h2.2l1.2 3-1.6 1a12 12 0 0 0 5.4 5.4l1-1.6 3 1.2V17a2 2 0 0 1-2.2 2A15.2 15.2 0 0 1 5 6a2 2 0 0 1 2-2.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
