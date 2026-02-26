import { useState } from 'react'
import { Users, CheckCircle, Shield } from 'lucide-react'

// ─── Only "Admin" and "Auditor" roles ─────────────────────────────────────────
const ROLES = ['Admin', 'Auditor'] as const
type Role = typeof ROLES[number]

const ROLE_CONFIG: Record<Role, { color: string; bg: string; border: string; desc: string }> = {
    Admin: {
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/25',
        desc: 'Full read/write access. Can review, approve, and manage tickets.',
    },
    Auditor: {
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/25',
        desc: 'Read-only access to tickets, audit logs, and system metrics.',
    },
}

const INITIAL_USERS = [
    { name: 'Amal Hassan', email: 'a.hassan@jnpi.jo', role: 'Admin' as Role, active: true },
    { name: 'Mohammad Khalil', email: 'm.khalil@jnpi.jo', role: 'Auditor' as Role, active: true },
    { name: 'Sara Nasser', email: 's.nasser@jnpi.jo', role: 'Admin' as Role, active: true },
    { name: 'Rami Omar', email: 'r.omar@jnpi.jo', role: 'Auditor' as Role, active: false },
    { name: 'Khaled Mansour', email: 'k.mansour@jnpi.jo', role: 'Admin' as Role, active: true },
    { name: 'Jasmine Saleh', email: 'j.saleh@jnpi.jo', role: 'Auditor' as Role, active: true },
]



// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RbacPage() {
    const [userRoles, setUserRoles] = useState<Record<string, Role>>(
        Object.fromEntries(INITIAL_USERS.map((u) => [u.email, u.role]))
    )

    const adminCount = Object.values(userRoles).filter((r) => r === 'Admin').length
    const auditorCount = Object.values(userRoles).filter((r) => r === 'Auditor').length

    return (
        <div className="flex flex-col gap-6 p-6 flex-1">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600/15 border border-blue-600/20">
                    <Users size={18} className="text-blue-400" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-tight">RBAC Management</h1>
                    <p className="text-slate-500 text-xs">Manage Admin and Auditor role assignments</p>
                </div>
            </div>

            {/* Role overview cards */}
            <div className="grid grid-cols-2 gap-4">
                {ROLES.map((role) => {
                    const cfg = ROLE_CONFIG[role]
                    const count = role === 'Admin' ? adminCount : auditorCount
                    return (
                        <div key={role} className={`rounded-xl border p-5 ${cfg.bg} ${cfg.border}`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 rounded-lg ${cfg.bg} border ${cfg.border}`}>
                                    <Shield size={16} className={cfg.color} />
                                </div>
                                <span className={`text-2xl font-bold ${cfg.color}`}>{count}</span>
                            </div>
                            <p className={`font-bold text-sm mb-1 ${cfg.color}`}>{role}</p>
                            <p className="text-slate-500 text-[11px] leading-relaxed">{cfg.desc}</p>
                        </div>
                    )
                })}
            </div>

            {/* User table */}
            <div className="bg-[#0c1424] border border-slate-800 rounded-xl overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_1fr_140px_90px] gap-4
                        px-5 py-3 border-b border-slate-800
                        text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    <span>Member</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Status</span>
                </div>

                {/* Rows */}
                {INITIAL_USERS.map((u) => {
                    const currentRole = userRoles[u.email]
                    return (
                        <div
                            key={u.email}
                            className="grid grid-cols-[1fr_1fr_140px_90px] gap-4 items-center
                         px-5 py-4 border-b border-slate-800/50
                         hover:bg-slate-800/20 transition-all"
                        >
                            {/* Name + avatar */}
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-700
                                flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                                    {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </div>
                                <span className="text-slate-200 text-xs font-medium">{u.name}</span>
                            </div>

                            {/* Email */}
                            <span className="text-slate-500 text-xs font-mono truncate">{u.email}</span>

                            {/* Role selector — only Admin / Auditor */}
                            <div className="flex items-center gap-2">
                                {ROLES.map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => setUserRoles((prev) => ({ ...prev, [u.email]: role }))}
                                        className={`
                      px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all
                      ${currentRole === role
                                                ? `${ROLE_CONFIG[role].bg} ${ROLE_CONFIG[role].border} ${ROLE_CONFIG[role].color}`
                                                : 'bg-transparent border-slate-700/50 text-slate-600 hover:border-slate-600 hover:text-slate-400'}
                    `}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>

                            {/* Status */}
                            <div className={`flex items-center gap-1.5 text-[10px] font-medium
                              ${u.active ? 'text-emerald-400' : 'text-slate-600'}`}>
                                {u.active
                                    ? <CheckCircle size={11} />
                                    : <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />}
                                {u.active ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
