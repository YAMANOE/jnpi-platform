import {
    LayoutDashboard,
    ShieldCheck,
    BarChart3,
    Activity,
    Users,
    Zap,
    ChevronRight,
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
    { icon: <LayoutDashboard size={17} />, label: 'Ticket Dashboard', id: 'tickets', badge: 6 },
    { icon: <ShieldCheck size={17} />, label: 'HITL Console', id: 'hitl', badge: 3 },
    { icon: <BarChart3 size={17} />, label: 'System Metrics', id: 'metrics' },
    { icon: <Activity size={17} />, label: 'Audit Viewer', id: 'audit' },
    { icon: <Users size={17} />, label: 'RBAC Management', id: 'rbac' },
]

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
    return (
        <aside className="flex flex-col w-60 min-h-screen bg-[#06101f] border-r border-slate-800/80 shrink-0">

            {/* Brand */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800/80">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg
                        bg-blue-600 shadow-lg shadow-blue-900/50">
                    <Zap size={16} className="text-white" />
                </div>
                <div>
                    <p className="text-white font-bold text-sm tracking-wide">JNPI</p>
                    <p className="text-slate-600 text-[9px] font-semibold tracking-widest uppercase">
                        Admin Console
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                <p className="px-3 py-2 text-[9px] font-bold text-slate-700 uppercase tracking-widest">
                    Operations
                </p>

                {navItems.map((item) => {
                    const isActive = activeView === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium
                transition-all duration-150 group cursor-pointer border
                ${isActive
                                    ? 'bg-blue-600/15 border-blue-600/25 text-blue-400'
                                    : 'border-transparent text-slate-500 hover:text-white hover:bg-slate-800/50'}
              `}
                        >
                            <span className={`shrink-0 transition-colors
                ${isActive ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-300'}`}>
                                {item.icon}
                            </span>

                            <span className="flex-1 text-left">{item.label}</span>

                            {item.badge !== undefined && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full
                  ${isActive
                                        ? 'bg-blue-500/30 text-blue-300'
                                        : 'bg-slate-800 text-slate-500 border border-slate-700/50'}`}>
                                    {item.badge}
                                </span>
                            )}

                            {isActive && (
                                <ChevronRight size={12} className="text-blue-500 shrink-0" />
                            )}
                        </button>
                    )
                })}
            </nav>

            {/* User footer */}
            <div className="p-4 border-t border-slate-800/80">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
                          flex items-center justify-center text-white text-[10px] font-bold shadow">
                        SA
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-[11px] font-semibold truncate">Super Admin</p>
                        <p className="text-slate-600 text-[9px] truncate">admin@jnpi.gov.jo</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow shadow-emerald-400/50 shrink-0" />
                </div>
            </div>
        </aside>
    )
}
