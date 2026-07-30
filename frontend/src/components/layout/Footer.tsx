const FOOTER_LINKS = [
  { label: 'Security & Privacy', href: '#security' },
  { label: 'Terms & Conditions', href: '#terms' },
  { label: 'Data Processing Agreement', href: '#dpa' },
  { label: 'Contact Us', href: '#contact' },
] as const

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="text-sm text-ink-muted">©Trymerra.ai</p>

        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
          aria-label="Footer"
        >
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
