import * as RadixSelect from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils.js'

export default function Select({ label, value, onValueChange, options = [], placeholder = 'Select', className = '' }) {
  return (
    <label className="block space-y-2 text-left">
      {label && <span className="text-sm font-medium text-[var(--text-2)]">{label}</span>}
      <RadixSelect.Root value={value} onValueChange={onValueChange}>
        <RadixSelect.Trigger
          className={cn(
            'flex h-12 w-full items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-4 text-left text-[var(--text)] outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-glow)]',
            className,
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon><ChevronDown size={16} /></RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className="z-50 overflow-hidden rounded-md border border-[var(--border-light)] bg-[var(--surface)] text-[var(--text)] shadow-2xl">
            <RadixSelect.Viewport className="p-1">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex cursor-pointer select-none items-center rounded px-8 py-2 text-sm outline-none data-[highlighted]:bg-[var(--gold-subtle)] data-[highlighted]:text-[var(--gold-light)]"
                >
                  <RadixSelect.ItemIndicator className="absolute left-2"><Check size={14} /></RadixSelect.ItemIndicator>
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </label>
  )
}
