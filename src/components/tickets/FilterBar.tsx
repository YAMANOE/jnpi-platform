import { useState, useRef } from 'react'
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FilterState {
    priorities: string[]
    sectors: string[]
    dateRange: string
}

interface FilterBarProps {
    filters: FilterState
    onChange: (f: FilterState) => void
}

// ─── Options ──────────────────────────────────────────────────────────────────
const PRIORITY_OPTIONS = ['Critical', 'High', 'Normal']
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

// ─── Dropdown (reusable) ──────────────────────────────────────────────────────
interface MultiSelectDropdownProps {
    label: string
    options: string[]
    selected: string[]
    onToggle: (val: string) => void
}

function MultiSelectDropdown({ label, options, selected, onToggle }: MultiSelectDropdownProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((o) => !o)}
                className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all
          ${open || selected.length > 0
                        ? 'bg-blue-500/15 border-blue-500/40 text-blue-300'
                        : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-200'}
        `}
            >
                {label}
                {selected.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[9px] font-bold">
                        {selected.length}
                    </span>
                )}
                <ChevronDown
                    size={12}
                    className={`transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div className="absolute top-full mt-1.5 left-0 z-30 w-52 bg-[#0f1b2d] border border-slate-700 rounded-xl shadow-xl shadow-black/50 overflow-hidden">
                    {options.map((opt) => {
                        const isSelected = selected.includes(opt)
                        return (
                            <button
                                key={opt}
                                onClick={() => onToggle(opt)}
                                className={`
                  w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs transition-all text-left
                  ${isSelected
                                        ? 'bg-blue-600/20 text-blue-300'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
                            >
                                <span
                                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 transition-all
                    ${isSelected ? 'bg-blue-500 border-blue-400' : 'border-slate-600'}`}
                                >
                                    {isSelected && <span className="text-white text-[9px] font-bold">✓</span>}
                                </span>
                                {opt}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

// ─── Date range selector ──────────────────────────────────────────────────────
interface DateSelectorProps {
    value: string
    onChange: (v: string) => void
}

function DateSelector({ value, onChange }: DateSelectorProps) {
    const [open, setOpen] = useState(false)
    const selected = DATE_OPTIONS.find((d) => d.value === value)

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all
          ${value !== 'all'
                        ? 'bg-blue-500/15 border-blue-500/40 text-blue-300'
                        : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-200'}
        `}
            >
                {selected?.label ?? 'Date Range'}
                <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute top-full mt-1.5 left-0 z-30 w-44 bg-[#0f1b2d] border border-slate-700 rounded-xl shadow-xl shadow-black/50 overflow-hidden">
                    {DATE_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setOpen(false) }}
                            className={`
                w-full text-left px-3.5 py-2.5 text-xs transition-all
                ${value === opt.value
                                    ? 'bg-blue-600/20 text-blue-300'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Active Chip ──────────────────────────────────────────────────────────────
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/20 border border-blue-500/30
                     text-blue-300 text-[10px] font-medium animate-in fade-in">
            {label}
            <button
                onClick={onRemove}
                className="text-blue-400 hover:text-white transition-colors"
            >
                <X size={10} />
            </button>
        </span>
    )
}

// ─── Main FilterBar ───────────────────────────────────────────────────────────
export default function FilterBar({ filters, onChange }: FilterBarProps) {
    const toggle = (field: 'priorities' | 'sectors', val: string) => {
        const list = filters[field]
        onChange({
            ...filters,
            [field]: list.includes(val) ? list.filter((x) => x !== val) : [...list, val],
        })
    }

    const activeChips: { label: string; remove: () => void }[] = [
        ...filters.priorities.map((p) => ({
            label: p,
            remove: () => toggle('priorities', p),
        })),
        ...filters.sectors.map((s) => ({
            label: s,
            remove: () => toggle('sectors', s),
        })),
        ...(filters.dateRange !== 'all'
            ? [{
                label: DATE_OPTIONS.find((d) => d.value === filters.dateRange)?.label ?? '',
                remove: () => onChange({ ...filters, dateRange: 'all' }),
            }]
            : []),
    ]

    const clearAll = () => onChange({ priorities: [], sectors: [], dateRange: 'all' })

    return (
        <div className="flex flex-col gap-3 bg-[#0c1424] border border-slate-800 rounded-xl px-5 py-4">
            {/* Controls row */}
            <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-slate-500 mr-1">
                    <SlidersHorizontal size={14} />
                    <span className="text-xs font-medium">Filters</span>
                </div>

                <MultiSelectDropdown
                    label="Priority"
                    options={PRIORITY_OPTIONS}
                    selected={filters.priorities}
                    onToggle={(v) => toggle('priorities', v)}
                />

                <MultiSelectDropdown
                    label="Sector / Industry"
                    options={SECTOR_OPTIONS}
                    selected={filters.sectors}
                    onToggle={(v) => toggle('sectors', v)}
                />

                <DateSelector
                    value={filters.dateRange}
                    onChange={(v) => onChange({ ...filters, dateRange: v })}
                />

                {activeChips.length > 0 && (
                    <button
                        onClick={clearAll}
                        className="ml-auto text-[10px] text-slate-500 hover:text-red-400 transition-colors font-medium"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Active chip row */}
            {activeChips.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-600 text-[10px]">Active:</span>
                    {activeChips.map((chip, i) => (
                        <Chip key={i} label={chip.label} onRemove={chip.remove} />
                    ))}
                </div>
            )}
        </div>
    )
}
