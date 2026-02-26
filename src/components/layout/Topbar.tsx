import { Bell, Search, RefreshCw } from 'lucide-react'

interface TopbarProps {
    onBellClick: () => void
    notificationCount: number
}

export default function Topbar({ onBellClick, notificationCount }: TopbarProps) {
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-GB', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    })

    return (
        <header className="flex items-center justify-between px-6 py-3.5 bg-[#0a1020] border-b border-slate-800 shrink-0">
            {/* Left: search */}
            <div className="relative flex items-center w-72">
                <Search size={14} className="absolute left-3 text-slate-500 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search tickets, agents, policies…"
                    className="w-full pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700/60 rounded-lg text-sm text-slate-300
                     placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all"
                />
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
                <span className="text-slate-600 text-xs hidden lg:block">{dateStr}</span>

                <button
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
                    title="Refresh"
                >
                    <RefreshCw size={16} />
                </button>

                {/* Notification Bell */}
                <button
                    onClick={onBellClick}
                    className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    title="Notifications"
                >
                    <Bell size={18} />
                    {notificationCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold
                             flex items-center justify-center shadow shadow-red-900/60 animate-pulse">
                            {notificationCount}
                        </span>
                    )}
                </button>

                {/* Status pill */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-medium">All Systems Operational</span>
                </div>
            </div>
        </header>
    )
}
