import { mockTickets } from '../data/mockTickets'
import HitlConsole from '../components/hitl/HitlConsole'
import { ShieldCheck } from 'lucide-react'

const hitlTickets = mockTickets.filter((t) => t.status === 'Under Review')

export default function HitlPage() {
    return (
        <div className="flex flex-col gap-5 p-6 flex-1">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-600/15 border border-purple-600/20">
                    <ShieldCheck size={18} className="text-purple-400" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-tight">HITL Console</h1>
                    <p className="text-slate-500 text-xs">
                        {hitlTickets.length} ticket{hitlTickets.length !== 1 ? 's' : ''} awaiting human review
                    </p>
                </div>
            </div>

            <HitlConsole ticket={hitlTickets[0] ?? null} />
        </div>
    )
}
