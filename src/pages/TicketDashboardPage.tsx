import { useState, useMemo } from 'react'
import FilterBar, { type FilterState } from '../components/tickets/FilterBar'
import KanbanBoard, { type Ticket } from '../components/tickets/KanbanBoard'
import ActivityTimeline from '../components/tickets/ActivityTimeline'
import HitlConsole from '../components/hitl/HitlConsole'
import { mockTickets } from '../data/mockTickets'
import { LayoutDashboard } from 'lucide-react'

export default function TicketDashboardPage() {
    const [filters, setFilters] = useState<FilterState>({
        sectors: [],
        dateRange: 'all',
    })
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

    const filtered = useMemo(() => {
        return mockTickets.filter((t) => {
            if (filters.sectors.length > 0 && !filters.sectors.includes(t.sector)) return false
            return true
        })
    }, [filters])

    return (
        <div className="flex flex-col gap-5 p-6 flex-1 min-h-0">
            {/* Page header */}
            <div className="flex items-center gap-3 shrink-0">
                <div className="p-2 rounded-lg bg-blue-600/15 border border-blue-600/20">
                    <LayoutDashboard size={17} className="text-blue-400" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-tight">Ticket Dashboard</h1>
                    <p className="text-slate-500 text-xs">
                        {filtered.length} tickets · Kanban view
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="shrink-0">
                <FilterBar filters={filters} onChange={setFilters} />
            </div>

            {/* Board + side panel */}
            <div className="flex gap-5 flex-1 min-h-0 overflow-hidden">
                {/* Kanban */}
                <div className="flex-1 min-w-0 overflow-hidden">
                    <KanbanBoard tickets={filtered} onTicketClick={setSelectedTicket} />
                </div>

                {/* Right panel */}
                <div className="flex flex-col gap-4 w-80 shrink-0 overflow-y-auto
                        scrollbar-thin scrollbar-thumb-slate-800">
                    <ActivityTimeline />

                    {selectedTicket && (
                        <div className="bg-[#0c1424] border border-blue-500/15 rounded-xl p-5 flex-1">
                            <HitlConsole ticket={selectedTicket} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
