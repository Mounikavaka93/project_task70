import InquiryForm from '../components/InquiryForm'
import { MailIcon, PhoneIcon, PinIcon } from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { brand, offices } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { telHref } from '../utils/format'

export default function Contact() {
  useDocumentTitle('Contact Us · Kittiwake')

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Write the desk, or call it."
        text="Tell us whether you are buying, renting, selling, or looking for a commercial space. A person answers."
      />
      <section className="mx-auto grid w-full max-w-7xl items-start gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
        <div className="border border-line bg-cream p-5 sm:p-8">
          <h2 className="font-serif text-3xl">Send a message</h2>
          <p className="mt-2 text-sm text-ink-soft">Name, email, phone, and a note are enough to start.</p>
          <div className="mt-6">
            <InquiryForm showInterest submitLabel="Send message" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-line bg-cream p-5">
            <h2 className="font-serif text-2xl">Hours and desk</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              {brand.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 text-sm">
              <a className="flex items-center gap-2 hover:text-clay" href={telHref(brand.phone)}>
                <PhoneIcon /> {brand.phone}
              </a>
              <a className="flex items-center gap-2 hover:text-clay" href={`mailto:${brand.email}`}>
                <MailIcon /> {brand.email}
              </a>
            </div>
          </div>

          {offices.map((office) => (
            <article key={office.city} className="border border-line p-5">
              <div className="flex items-center gap-2 text-clay">
                <PinIcon />
                <h2 className="font-serif text-2xl text-ink">{office.city}</h2>
              </div>
              <address className="mt-3 text-sm not-italic leading-relaxed text-ink-soft">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a className="mt-3 inline-flex text-sm underline underline-offset-4" href={telHref(office.phone)}>
                {office.phone}
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
