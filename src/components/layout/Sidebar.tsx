import {
    LayoutDashboard,
    Activity,
    ShieldCheck,
    Users,
    Archive,
    BarChart3,
    ChevronRight,
    Zap,
} from 'lucide-react'

interface NavItem {
    icon: React.ReactNode
    label: string
    id: string
    badge?: number
}

interface SidebarProps {
    activeView: string
    onNavigate: (view: string) => void
}

const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={18} />, label: 'Ticket Dashboard', id: 'tickets', badge: 4 },
    { icon: <ShieldCheck size={18} />, label: 'HITL Console', id: 'hitl', badge: 2 },
    { icon: <BarChart3 size={18} />, label: 'System Metrics', id: 'metrics' },
    { icon: <Activity size={18} />, label: 'Audit Viewer', id: 'audit' },
    { icon: <Users size={18} />, label: 'RBAC / Roles', id: 'rbac' },
    { icon: <Archive size={18} />, label: 'Feedback Archive', id: 'feedback' },
]

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
    return (
        <aside className="flex flex-col w-64 min-h-screen bg-[#080f1e] border-r border-slate-800 shrink-0">
            {/* Brand */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 shadow-lg shadow-blue-900/40">
                    <Zap size={18} className="text-white" />
                </div>
                <div>
                    <p className="text-white font-bold text-sm leading-tight tracking-wide">JNPI</p>
                    <p className="text-slate-500 text-[10px] font-medium tracking-widest uppercase">Admin Console</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
                    Operations
                </p>
                {navItems.map((item) => {
                    const isActive = activeView === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-150 group cursor-pointer
                ${isActive
                                    ? 'bg-blue-600/15 text-blue-400 border border-blue-600/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'}
              `}
                        >
                            <span className={`${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>
                                {item.icon}
                            </span>
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.badge !== undefined && (
                                <span className={`
                  text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  ${isActive ? 'bg-blue-500/30 text-blue-300' : 'bg-slate-700 text-slate-400'}
                `}>
                                    {item.badge}
                                </span>
                            )}
                            {isActive && <ChevronRight size={13} className="text-blue-400 shrink-0" />}
                        </button>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow">
                        SA
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold truncate">Super Admin</p>
                        <p className="text-slate-500 text-[10px] truncate">admin@jnpi.gov.jo</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow shadow-emerald-400/50 shrink-0" />
                </div>
            </div>
        </aside>
    )
}
