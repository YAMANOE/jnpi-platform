import { useState, useEffect } from 'react'
import { Clock, MessageSquare, Tag, ChevronRight, User } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
export type Priority = 'Critical' | 'High' | 'Normal'
export type TicketStatus = 'New' | 'In Review' | 'Pending HITL' | 'Resolved'

export interface Ticket {
    id: string
    title: string
    sector: string
    priority: Priority
    status: TicketStatus
    assignee: string
    slaDeadline: Date   // absolute deadline
    messageCount: number
    tags: string[]
}

// ─── Priority config ──────────────────────────────────────────────────────────
const priorityConfig: Record<Priority, { label: string; dot: string; badge: string }> = {
    Critical: {
        label: 'Critical',
        dot: 'bg-red-500',
        badge: 'bg-red-500/15 text-red-400 border-red-500/30',
    },
    High: {
        label: 'High',
        dot: 'bg-amber-500',
        badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    },
    Normal: {
        label: 'Normal',
        dot: 'bg-emerald-500',
        badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
}

// ─── SLA Countdown ────────────────────────────────────────────────────────────
function SlaTimer({ deadline }: { deadline: Date }) {
    const [remaining, setRemaining] = useState<number>(deadline.getTime() - Date.now())

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(deadline.getTime() - Date.now())
        }, 1000)
        return () => clearInterval(interval)
    }, [deadline])

    const isBreached = remaining <= 0
    const isCritical = remaining > 0 && remaining < 10 * 60 * 1000 // < 10 min

    const totalMs = Math.max(0, remaining)
    const h = Math.floor(totalMs / 3_600_000)
    const m = Math.floor((totalMs % 3_600_000) / 60_000)
    const s = Math.floor((totalMs % 60_000) / 1_000)

    const label = isBreached
        ? 'SLA Breached'
        : `${h > 0 ? `${h}h ` : ''}${m}m ${s}s`

    return (
        <div
            className={`
        flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono font-semibold border
        ${isBreached
                    ? 'bg-red-600/20 text-red-400 border-red-600/30 animate-pulse'
                    : isCritical
                        ? 'bg-orange-500/15 text-orange-400 border-orange-500/25 animate-pulse'
                        : 'bg-slate-700/50 text-slate-400 border-slate-600/30'}
      `}
        >
            <Clock size={10} className="shrink-0" />
            {label}
        </div>
    )
}

// ─── Kanban Card ──────────────────────────────────────────────────────────────
interface TicketCardProps {
    ticket: Ticket
    onClick: (t: Ticket) => void
}

function TicketCard({ ticket, onClick }: TicketCardProps) {
    const pc = priorityConfig[ticket.priority]

    return (
        <div
            onClick={() => onClick(ticket)}
            className="bg-[#0f1b2d] border border-slate-700/50 rounded-xl p-4 group cursor-pointer
                 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/20
                 hover:-translate-y-0.5 transition-all duration-200"
        >
            {/* Top row: priority badge + ID */}
            <div className="flex items-center justify-between mb-3">
                <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full border ${pc.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                    {pc.label}
                </span>
                <span className="text-slate-600 text-[10px] font-mono">{ticket.id}</span>
            </div>

            {/* Title */}
            <h4 className="text-white text-xs font-semibold leading-snug mb-2.5 group-hover:text-blue-300 transition-colors line-clamp-2">
                {ticket.title}
            </h4>

            {/* Sector tag */}
            <div className="flex items-center gap-1 mb-3">
                <Tag size={10} className="text-slate-600" />
                <span className="text-slate-500 text-[10px]">{ticket.sector}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
                {ticket.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-700/60 text-slate-400 border border-slate-600/40"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer: SLA + meta */}
            <div className="flex items-center justify-between pt-2.5 border-t border-slate-700/40">
                <SlaTimer deadline={ticket.slaDeadline} />

                <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                        <MessageSquare size={10} />
                        {ticket.messageCount}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                        <User size={10} />
                        <span>{ticket.assignee}</span>
                    </div>
                    <ChevronRight size={11} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                </div>
            </div>
        </div>
    )
}

// ─── Column ───────────────────────────────────────────────────────────────────
interface KanbanColumnProps {
    title: TicketStatus
    tickets: Ticket[]
    onTicketClick: (t: Ticket) => void
}

const columnConfig: Record<TicketStatus, { accent: string; bg: string; header: string }> = {
    'New': { accent: 'border-t-blue-500', bg: 'bg-blue-500/5', header: 'text-blue-400' },
    'In Review': { accent: 'border-t-amber-500', bg: 'bg-amber-500/5', header: 'text-amber-400' },
    'Pending HITL': { accent: 'border-t-purple-500', bg: 'bg-purple-500/5', header: 'text-purple-400' },
    'Resolved': { accent: 'border-t-emerald-500', bg: 'bg-emerald-500/5', header: 'text-emerald-400' },
}

function KanbanColumn({ title, tickets, onTicketClick }: KanbanColumnProps) {
    const cfg = columnConfig[title]
    return (
        <div className={`flex flex-col rounded-xl border border-slate-700/50 border-t-2 ${cfg.accent} ${cfg.bg} min-w-0`}>
            {/* Column Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/40">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${cfg.header}`}>{title}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400">
                    {tickets.length}
                </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3 p-3 overflow-y-auto max-h-[calc(100vh-280px)]">
                {tickets.length === 0 ? (
                    <div className="text-center py-8 text-slate-700 text-xs">No tickets</div>
                ) : (
                    tickets.map((t) => (
                        <TicketCard key={t.id} ticket={t} onClick={onTicketClick} />
                    ))
                )}
            </div>
        </div>
    )
}

// ─── Main Kanban Board export ─────────────────────────────────────────────────
interface KanbanBoardProps {
    tickets: Ticket[]
    onTicketClick: (t: Ticket) => void
}

const COLUMNS: TicketStatus[] = ['New', 'In Review', 'Pending HITL', 'Resolved']

export default function KanbanBoard({ tickets, onTicketClick }: KanbanBoardProps) {
    return (
        <div className="grid grid-cols-4 gap-4 flex-1 min-h-0">
            {COLUMNS.map((col) => (
                <KanbanColumn
                    key={col}
                    title={col}
                    tickets={tickets.filter((t) => t.status === col)}
                    onTicketClick={onTicketClick}
                />
            ))}
        </div>
    )
}
