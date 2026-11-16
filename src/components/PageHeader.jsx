export default function PageHeader({ eyebrow, title, text }) {
  return (
    <header className="border-b border-line bg-cream">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-clay">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">{title}</h1>
        {text ? <p className="mt-4 max-w-xl text-lg text-ink-soft">{text}</p> : null}
      </div>
    </header>
  )
}
