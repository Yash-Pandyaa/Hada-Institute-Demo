export default function SectionHeader({ title, subtitle, align = 'center', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : 'text-left'} mb-10 max-w-3xl ${className}`}>
      <h2 className="text-4xl font-semibold md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-[var(--text-2)]">{subtitle}</p>}
      <div className={`${align === 'center' ? 'mx-auto' : ''} mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent`} />
    </div>
  )
}
