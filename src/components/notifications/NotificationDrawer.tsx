import { X, Bell, CheckCircle, AlertTriangle, Info, Clock } from 'lucide-react'

interface Notification {
    id: string
    type: 'alert' | 'success' | 'info' | 'warning'
    title: string
    body: string
    time: string
    unread: boolean
}

interface NotificationDrawerProps {
    open: boolean
    onClose: () => void
}

const mockNotifications: Notification[] = [
    {
        id: '1', type: 'alert', unread: true,
        title: 'SLA Breach Imminent',
        body: 'Ticket #TKT-0041 (Critical) expires in 7 minutes. Immediate action required.',
        time: '2 min ago',
    },
    {
        id: '2', type: 'success', unread: true,
        title: 'HITL Review Approved',
        body: 'Agent response for ticket #TKT-0038 was approved and dispatched to the user.',
        time: '14 min ago',
    },
    {
        id: '3', type: 'warning', unread: true,
        title: 'New High-Priority Ticket',
        body: 'Ticket #TKT-0042 from Ministry of Finance sector has been auto-escalated.',
        time: '31 min ago',
    },
    {
        id: '4', type: 'info', unread: false,
        title: 'Scheduled Maintenance',
        body: 'System maintenance window starts at 02:00 AM. Expect 15 min downtime.',
        time: '2 hr ago',
    },
    {
        id: '5', type: 'success', unread: false,
        title: 'Model Refresh Completed',
        body: 'Knowledge base re-indexed successfully. 2,314 new chunks added.',
        time: '5 hr ago',
    },
]

const typeConfig = {
    alert: { icon: <AlertTriangle size={15} />, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    success: { icon: <CheckCircle size={15} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    warning: { icon: <AlertTriangle size={15} />, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    info: { icon: <Info size={15} />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
}

export default function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`
          fixed top-0 right-0 h-full w-96 z-50 bg-[#0c1424] border-l border-slate-800
          flex flex-col shadow-2xl shadow-black/60
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <Bell size={17} className="text-blue-400" />
                        <h2 className="text-white font-semibold text-sm">Notification Center</h2>
                        <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">3 New</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-all"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Notifications list */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
                    {mockNotifications.map((n) => {
                        const cfg = typeConfig[n.type]
                        return (
                            <div
                                key={n.id}
                                className={`
                  relative rounded-xl border p-4 cursor-pointer transition-all duration-150
                  hover:border-slate-600 group
                  ${n.unread
                                        ? `${cfg.bg} ${cfg.border}`
                                        : 'bg-slate-800/30 border-slate-700/40 opacity-70'}
                `}
                            >
                                {n.unread && (
                                    <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-blue-400" />
                                )}
                                <div className="flex gap-3">
                                    <div className={`mt-0.5 shrink-0 ${cfg.color}`}>{cfg.icon}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-xs font-semibold mb-0.5 group-hover:text-blue-300 transition-colors">
                                            {n.title}
                                        </p>
                                        <p className="text-slate-400 text-xs leading-relaxed">{n.body}</p>
                                        <div className="flex items-center gap-1 mt-2 text-slate-600 text-[10px]">
                                            <Clock size={10} />
                                            <span>{n.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-slate-800 shrink-0">
                    <button className="w-full py-2.5 rounded-lg text-xs font-medium text-blue-400 border border-blue-500/25
                             hover:bg-blue-500/10 transition-all">
                        Mark All as Read
                    </button>
                </div>
            </div>
        </>
    )
}
