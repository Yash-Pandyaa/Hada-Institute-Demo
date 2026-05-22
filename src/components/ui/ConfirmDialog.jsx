import * as AlertDialog from '@radix-ui/react-alert-dialog'
import Button from './Button.jsx'

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Confirm action', description }) {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--border-light)] bg-[var(--surface)] p-6 shadow-2xl">
          <AlertDialog.Title className="text-2xl">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-3 text-[var(--text-2)]">{description}</AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild><Button variant="ghost" onClick={onClose}>Cancel</Button></AlertDialog.Cancel>
            <AlertDialog.Action asChild><Button variant="danger" onClick={onConfirm}>Confirm</Button></AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
