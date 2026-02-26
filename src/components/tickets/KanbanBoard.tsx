import { MessageSquare, User, ChevronRight, Tag } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
export type TicketStatus = 'New' | 'Under Review' | 'Completed' | 'Rejected'

export interface Ticket {
    id: string
    title: string
    sector: string
    status: TicketStatus
    assignee: string
    messageCount: number
    tags: string[]
}

// ─── Column config ────────────────────────────────────────────────────────────
const COLUMNS: TicketStatus[] = ['New', 'Under Review', 'Completed', 'Rejected']

const columnConfig: Record<TicketStatus, {
    accent: string; headerText: string; dot: string; cardHover: string
}> = {
    'New': {
        accent: 'border-t-blue-500',
        headerText: 'text-blue-400',
        dot: 'bg-blue-500',
        cardHover: 'hover:border-blue-500/40 hover:shadow-blue-900/20',
    },
    'Under Review': {
        accent: 'border-t-amber-400',
        headerText: 'text-amber-400',
        dot: 'bg-amber-400',
        cardHover: 'hover:border-amber-400/40 hover:shadow-amber-900/20',
    },
    'Completed': {
        accent: 'border-t-emerald-500',
        headerText: 'text-emerald-400',
        dot: 'bg-emerald-500',
        cardHover: 'hover:border-emerald-500/40 hover:shadow-emerald-900/20',
    },
    'Rejected': {
        accent: 'border-t-red-500',
        headerText: 'text-red-400',
        dot: 'bg-red-500',
        cardHover: 'hover:border-red-500/40 hover:shadow-red-900/20',
    },
}

// ─── Ticket Card ──────────────────────────────────────────────────────────────
function TicketCard({
    ticket,
    onClick,
    status,
}: {
    ticket: Ticket
    onClick: (t: Ticket) => void
    status: TicketStatus
}) {
    const cfg = columnConfig[status]

    return (
        <div
            onClick={() => onClick(ticket)}
            className={`
        group cursor-pointer
        bg-[#0f1b2d] border border-slate-700/50 rounded-xl p-4
        hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200
        ${cfg.cardHover}
      `}
        >
            {/* ID row */}
            <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                    <span className="text-slate-600 text-[10px] font-mono">{ticket.id}</span>
                </div>
                <ChevronRight size={11} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
            </div>

            {/* Title */}
            <h4 className="text-white text-xs font-semibold leading-snug mb-3
                     group-hover:text-blue-200 transition-colors line-clamp-3">
                {ticket.title}
            </h4>

            {/* Sector */}
            <div className="flex items-center gap-1 mb-3">
                <Tag size={9} className="text-slate-600 shrink-0" />
                <span className="text-slate-500 text-[10px] truncate">{ticket.sector}</span>
            </div>

            {/* Tags */}
            {ticket.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {ticket.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-1.5 py-0.5 rounded text-[9px] font-medium
                         bg-slate-800/80 text-slate-500 border border-slate-700/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2.5 border-t border-slate-800">
                <div className="flex items-center gap-1 text-slate-600 text-[10px]">
                    <MessageSquare size={10} />
                    <span>{ticket.messageCount}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600 text-[10px]">
                    <User size={10} />
                    <span className="truncate max-w-[80px]">{ticket.assignee}</span>
                </div>
            </div>
        </div>
    )
}

// ─── Column ───────────────────────────────────────────────────────────────────
function KanbanColumn({
    status,
    tickets,
    onTicketClick,
}: {
    status: TicketStatus
    tickets: Ticket[]
    onTicketClick: (t: Ticket) => void
}) {
    const cfg = columnConfig[status]

    return (
        <div className={`
      flex flex-col rounded-xl border border-slate-700/50 border-t-2 ${cfg.accent}
      bg-[#080f1e]/60 min-w-0
    `}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800">
                <h3 className={`text-[11px] font-bold uppercase tracking-widest ${cfg.headerText}`}>
                    {status}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700/50">
                    {tickets.length}
                </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2.5 p-3 overflow-y-auto max-h-[calc(100vh-300px)]
                      scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {tickets.length === 0 ? (
                    <div className="py-10 text-center text-slate-800 text-[11px] select-none">
                        No tickets
                    </div>
                ) : (
                    tickets.map((t) => (
                        <TicketCard key={t.id} ticket={t} onClick={onTicketClick} status={status} />
                    ))
                )}
            </div>
        </div>
    )
}

// ─── Main Kanban Board ────────────────────────────────────────────────────────
interface KanbanBoardProps {
    tickets: Ticket[]
    onTicketClick: (t: Ticket) => void
}

export default function KanbanBoard({ tickets, onTicketClick }: KanbanBoardProps) {
    return (
        <div className="grid grid-cols-4 gap-4 flex-1 min-h-0">
            {COLUMNS.map((col) => (
                <KanbanColumn
                    key={col}
                    status={col}
                    tickets={tickets.filter((t) => t.status === col)}
                    onTicketClick={onTicketClick}
                />
            ))}
        </div>
    )
}
