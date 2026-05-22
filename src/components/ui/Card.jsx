import { cn } from '../../lib/utils.js'

export default function Card({ children, className = '', as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={cn(
        'glass rounded-lg p-5 transition duration-300 hover:border-[var(--gold-dark)] hover:shadow-[0_0_30px_var(--gold-glow)]',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
