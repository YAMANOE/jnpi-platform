import { useState, useMemo } from 'react'
import FilterBar, { type FilterState } from '../components/tickets/FilterBar'
import KanbanBoard, { type Ticket } from '../components/tickets/KanbanBoard'
import ActivityTimeline from '../components/tickets/ActivityTimeline'
import HitlConsole from '../components/hitl/HitlConsole'
import { mockTickets } from '../data/mockTickets'
import { Kanban } from 'lucide-react'

export default function TicketDashboardPage() {
    const [filters, setFilters] = useState<FilterState>({
        priorities: [],
        sectors: [],
        dateRange: 'all',
    })
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

    const filtered = useMemo(() => {
        return mockTickets.filter((t) => {
            if (filters.priorities.length > 0 && !filters.priorities.includes(t.priority)) return false
            if (filters.sectors.length > 0 && !filters.sectors.includes(t.sector)) return false
            return true
        })
    }, [filters])

    const hitlTicket = selectedTicket?.status === 'Pending HITL' ? selectedTicket : null

    return (
        <div className="flex flex-col gap-5 p-6 flex-1 min-h-0">
            {/* Page header */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600/15 border border-blue-600/20">
                    <Kanban size={18} className="text-blue-400" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-tight">Ticket Dashboard</h1>
                    <p className="text-slate-500 text-xs">
                        {filtered.length} active tickets · Kanban view
                    </p>
                </div>
            </div>

            {/* Filters */}
            <FilterBar filters={filters} onChange={setFilters} />

            {/* Main content: board + right panel */}
            <div className="flex gap-5 flex-1 min-h-0">
                {/* Kanban board */}
                <div className="flex flex-col flex-1 min-w-0 gap-4">
                    <KanbanBoard tickets={filtered} onTicketClick={setSelectedTicket} />
                </div>

                {/* Right side panel: Timeline + HITL when relevant */}
                <div className="flex flex-col gap-4 w-80 shrink-0 overflow-y-auto">
                    <ActivityTimeline />
                    {hitlTicket && (
                        <div className="bg-[#0c1424] border border-purple-500/20 rounded-xl p-5">
                            <HitlConsole ticket={hitlTicket} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
