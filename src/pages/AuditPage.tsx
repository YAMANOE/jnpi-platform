import { Activity } from 'lucide-react'

const logs = [
    { time: '09:14:45', user: 'admin@jnpi.gov.jo', action: 'Approved ticket TKT-0038 response', level: 'info' },
    { time: '09:10:12', user: 'system', action: 'Auto-escalated TKT-0035 to HITL queue', level: 'warn' },
    { time: '09:05:33', user: 'k.mansour@jnpi.jo', action: 'Logged in from 192.168.1.44', level: 'info' },
    { time: '08:55:01', user: 'system', action: 'RAG re-index completed (2,314 chunks)', level: 'success' },
    { time: '08:40:22', user: 'admin@jnpi.gov.jo', action: 'RBAC role "Reviewer" assigned to S.Nasser', level: 'info' },
    { time: '08:30:00', user: 'system', action: 'Scheduled maintenance window initiated', level: 'warn' },
]

const levelStyle: Record<string, string> = {
    info: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    warn: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    success: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    error: 'text-red-400 bg-red-500/10 border-red-500/20',
}

export default function AuditPage() {
    return (
        <div className="flex flex-col gap-5 p-6 flex-1">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-600/15 border border-indigo-600/20">
                    <Activity size={18} className="text-indigo-400" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-tight">Audit Viewer</h1>
                    <p className="text-slate-500 text-xs">Immutable audit log of all platform actions</p>
                </div>
            </div>

            <div className="bg-[#0c1424] border border-slate-800 rounded-xl overflow-hidden">
                <div className="grid grid-cols-[110px_1fr_auto] gap-0 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-5 py-3 border-b border-slate-800">
                    <span>Time</span>
                    <span>Action</span>
                    <span>Level</span>
                </div>
                {logs.map((log, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[110px_1fr_auto] gap-4 items-center px-5 py-3 border-b border-slate-800/50 hover:bg-slate-800/20 transition-all"
                    >
                        <span className="font-mono text-[10px] text-slate-600">{log.time}</span>
                        <div>
                            <p className="text-slate-300 text-xs">{log.action}</p>
                            <p className="text-slate-600 text-[10px]">{log.user}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase ${levelStyle[log.level]}`}>
                            {log.level}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
