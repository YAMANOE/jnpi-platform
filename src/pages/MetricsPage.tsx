import { BarChart3, TrendingUp, Server, Zap, Clock, AlertTriangle } from 'lucide-react'

interface MetricCardProps {
    label: string
    value: string
    sub: string
    icon: React.ReactNode
    trend?: 'up' | 'down' | 'neutral'
    color: string
}

function MetricCard({ label, value, sub, icon, color }: MetricCardProps) {
    return (
        <div className="bg-[#0c1424] border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${color}`}>{icon}</div>
                <TrendingUp size={14} className="text-emerald-400" />
            </div>
            <p className="text-white text-2xl font-bold mb-0.5">{value}</p>
            <p className="text-slate-400 text-xs font-medium">{label}</p>
            <p className="text-slate-600 text-[10px] mt-1">{sub}</p>
        </div>
    )
}

const metrics: MetricCardProps[] = [
    { label: 'Total Tickets (30d)', value: '1,247', sub: '+12% vs last month', icon: <BarChart3 size={16} className="text-blue-400" />, color: 'bg-blue-600/15 border border-blue-600/20', trend: 'up' },
    { label: 'Avg. Resolution Time', value: '3.2h', sub: 'SLA target: 4h', icon: <Clock size={16} className="text-emerald-400" />, color: 'bg-emerald-600/15 border border-emerald-600/20', trend: 'up' },
    { label: 'SLA Breaches (7d)', value: '3', sub: '-62% vs last week', icon: <AlertTriangle size={16} className="text-amber-400" />, color: 'bg-amber-600/15 border border-amber-600/20', trend: 'down' },
    { label: 'AI Auto-Resolved', value: '82.4%', sub: 'No human review required', icon: <Zap size={16} className="text-purple-400" />, color: 'bg-purple-600/15 border border-purple-600/20', trend: 'up' },
    { label: 'System Uptime (30d)', value: '99.97%', sub: 'All microservices healthy', icon: <Server size={16} className="text-teal-400" />, color: 'bg-teal-600/15 border border-teal-600/20', trend: 'neutral' },
    { label: 'Active Agents', value: '6 / 6', sub: 'All agents online', icon: <Zap size={16} className="text-indigo-400" />, color: 'bg-indigo-600/15 border border-indigo-600/20', trend: 'neutral' },
]

export default function MetricsPage() {
    return (
        <div className="flex flex-col gap-5 p-6 flex-1">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-600/15 border border-teal-600/20">
                    <BarChart3 size={18} className="text-teal-400" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-tight">System Metrics</h1>
                    <p className="text-slate-500 text-xs">Platform health & performance overview</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
            </div>

            {/* Placeholder chart area */}
            <div className="flex-1 bg-[#0c1424] border border-slate-700/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                    <BarChart3 size={40} className="text-slate-800 mx-auto mb-3" />
                    <p className="text-slate-700 text-sm font-medium">Ticket Volume Chart</p>
                    <p className="text-slate-800 text-xs">Charting library integration placeholder</p>
                </div>
            </div>
        </div>
    )
}
