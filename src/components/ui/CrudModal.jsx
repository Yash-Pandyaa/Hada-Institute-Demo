import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export default function CrudModal({ title, isOpen, onClose, children }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-[var(--border-light)] bg-[var(--surface)] p-6 shadow-2xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Dialog.Title className="text-2xl">{title}</Dialog.Title>
            <Dialog.Close className="rounded-md p-2 text-[var(--text-2)] hover:bg-[var(--surface-2)] hover:text-[var(--gold-light)]">
              <X size={18} />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
