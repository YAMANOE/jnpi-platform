import { useState } from 'react'
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FilterState {
    sectors: string[]
    dateRange: string
}

interface FilterBarProps {
    filters: FilterState
    onChange: (f: FilterState) => void
}

// ─── Options ──────────────────────────────────────────────────────────────────
const SECTOR_OPTIONS = [
    'Ministry of Finance',
    'Ministry of Health',
    'Ministry of Education',
    'Ministry of Interior',
    'Ministry of Justice',
    'Public Security',
    'Central Bank',
    'Parliament',
]

const DATE_OPTIONS = [
    { label: 'Last 24 hours', value: '24h' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'All time', value: 'all' },
]

// ─── Multi-select Dropdown ────────────────────────────────────────────────────
function MultiSelectDropdown({
    label,
    options,
    selected,
    onToggle,
}: {
    label: string
    options: string[]
    selected: string[]
    onToggle: (val: string) => void
}) {
    const [open, setOpen] = useState(false)
    const hasSelection = selected.length > 0

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className={`
          flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all
          ${hasSelection || open
                        ? 'bg-blue-500/15 border-blue-500/35 text-blue-300'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-200'}
        `}
            >
                {label}
                {hasSelection && (
                    <span className="px-1.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[9px] font-bold leading-none">
                        {selected.length}
                    </span>
                )}
                <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
                    <div className="absolute top-full mt-2 left-0 z-30 w-56
                          bg-[#0f1b2d] border border-slate-700/70 rounded-xl
                          shadow-2xl shadow-black/50 overflow-hidden">
                        {options.map((opt) => {
                            const isSelected = selected.includes(opt)
                            return (
                                <button
                                    key={opt}
                                    onClick={() => onToggle(opt)}
                                    className={`
                    w-full flex items-center gap-3 px-4 py-2.5 text-xs text-left transition-all
                    ${isSelected
                                            ? 'bg-blue-600/20 text-blue-300'
                                            : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}
                  `}
                                >
                                    <span className={`
                    w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 transition-all
                    ${isSelected ? 'bg-blue-500 border-blue-400' : 'border-slate-600'}
                  `}>
                                        {isSelected && <span className="text-white text-[9px] leading-none">✓</span>}
                                    </span>
                                    {opt}
                                </button>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

// ─── Date Dropdown ────────────────────────────────────────────────────────────
function DateDropdown({
    value,
    onChange,
}: {
    value: string
    onChange: (v: string) => void
}) {
    const [open, setOpen] = useState(false)
    const selected = DATE_OPTIONS.find((d) => d.value === value)
    const hasSelection = value !== 'all'

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className={`
          flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all
          ${hasSelection || open
                        ? 'bg-blue-500/15 border-blue-500/35 text-blue-300'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-200'}
        `}
            >
                {selected?.label ?? 'Date Range'}
                <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
                    <div className="absolute top-full mt-2 left-0 z-30 w-44
                          bg-[#0f1b2d] border border-slate-700/70 rounded-xl
                          shadow-2xl shadow-black/50 overflow-hidden">
                        {DATE_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => { onChange(opt.value); setOpen(false) }}
                                className={`
                  w-full text-left px-4 py-2.5 text-xs transition-all
                  ${value === opt.value
                                        ? 'bg-blue-600/20 text-blue-300'
                                        : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}
                `}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

// ─── Chip ─────────────────────────────────────────────────────────────────────
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full
                     bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[10px] font-medium">
            {label}
            <button onClick={onRemove} className="text-blue-400/70 hover:text-white transition-colors">
                <X size={10} />
            </button>
        </span>
    )
}

// ─── Main FilterBar ───────────────────────────────────────────────────────────
export default function FilterBar({ filters, onChange }: FilterBarProps) {
    const toggleSector = (s: string) => {
        const next = filters.sectors.includes(s)
            ? filters.sectors.filter((x) => x !== s)
            : [...filters.sectors, s]
        onChange({ ...filters, sectors: next })
    }

    const activeChips = [
        ...filters.sectors.map((s) => ({
            label: s,
            remove: () => toggleSector(s),
        })),
        ...(filters.dateRange !== 'all'
            ? [{
                label: DATE_OPTIONS.find((d) => d.value === filters.dateRange)?.label ?? '',
                remove: () => onChange({ ...filters, dateRange: 'all' }),
            }]
            : []),
    ]

    const hasFilters = activeChips.length > 0

    return (
        <div className="flex flex-col gap-3 bg-[#0c1424] border border-slate-800/80 rounded-xl px-5 py-4">
            <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-slate-600 mr-1">
                    <SlidersHorizontal size={13} />
                    <span className="text-[11px] font-semibold text-slate-500">Filter</span>
                </div>

                <DateDropdown
                    value={filters.dateRange}
                    onChange={(v) => onChange({ ...filters, dateRange: v })}
                />

                <MultiSelectDropdown
                    label="Sector / Industry"
                    options={SECTOR_OPTIONS}
                    selected={filters.sectors}
                    onToggle={toggleSector}
                />

                {hasFilters && (
                    <button
                        onClick={() => onChange({ sectors: [], dateRange: 'all' })}
                        className="ml-auto text-[10px] text-slate-600 hover:text-red-400 transition-colors font-medium"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {activeChips.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-0.5">
                    <span className="text-slate-700 text-[10px]">Active:</span>
                    {activeChips.map((chip, i) => (
                        <Chip key={i} label={chip.label} onRemove={chip.remove} />
                    ))}
                </div>
            )}
        </div>
    )
}
