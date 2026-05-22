import { useState } from 'react'
import { ArrowDownUp, Pencil, Search, Trash2 } from 'lucide-react'
import Button from './Button.jsx'
import Input from './Input.jsx'

function readCell(row, column) {
  if (column.accessor) return row[column.accessor]
  if (column.sortValue) return column.sortValue(row)
  return ''
}

export default function DataTable({ columns = [], data = [], onEdit, onDelete, searchPlaceholder = 'Search records...' }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('')
  const [direction, setDirection] = useState('asc')

  let rows = data.filter((row) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()))
  if (sortKey) {
    const column = columns.find((item) => item.key === sortKey)
    rows = [...rows].sort((a, b) => {
      const left = String(readCell(a, column) || '').toLowerCase()
      const right = String(readCell(b, column) || '').toLowerCase()
      return direction === 'asc' ? left.localeCompare(right) : right.localeCompare(left)
    })
  }

  const sort = (column) => {
    if (!column.sortable) return
    setDirection(sortKey === column.key && direction === 'asc' ? 'desc' : 'asc')
    setSortKey(column.key)
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" size={17} />
        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} className="pl-10" />
      </div>
      <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
        <table className="w-full min-w-[760px] border-collapse bg-[var(--surface)] text-left text-sm">
          <thead className="bg-[var(--surface-2)] text-xs uppercase tracking-wide text-[var(--text-2)]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3">
                  <button type="button" className="inline-flex items-center gap-2" onClick={() => sort(column)}>
                    {column.label}
                    {column.sortable && <ArrowDownUp size={13} />}
                  </button>
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--border)] hover:bg-[var(--gold-subtle)]">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-[var(--text)]">
                    {column.render ? column.render(row) : readCell(row, column)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {onEdit && <Button variant="ghost" size="sm" onClick={() => onEdit(row)}><Pencil size={15} />Edit</Button>}
                      {onDelete && <Button variant="danger" size="sm" onClick={() => onDelete(row)}><Trash2 size={15} />Delete</Button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <div className="p-8 text-center text-[var(--text-2)]">No records found.</div>}
      </div>
    </div>
  )
}
