import * as Toast from '@radix-ui/react-toast'

export default function AdminToast({ open, onOpenChange, title, description, variant = 'success' }) {
  const color = variant === 'error' ? 'border-red-500/40 bg-red-950/90 text-red-100' : 'border-[var(--gold-dark)] bg-[var(--surface)] text-[var(--text)]'
  return (
    <Toast.Provider swipeDirection="right" duration={3000}>
      <Toast.Root open={open} onOpenChange={onOpenChange} className={`fixed bottom-5 right-5 z-[100] w-[min(92vw,360px)] rounded-lg border p-4 shadow-2xl ${color}`}>
        <Toast.Title className="font-semibold">{title}</Toast.Title>
        {description && <Toast.Description className="mt-1 text-sm text-[var(--text-2)]">{description}</Toast.Description>}
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  )
}
