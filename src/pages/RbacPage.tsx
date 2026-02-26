import { useState } from 'react'
import { Users, CheckCircle } from 'lucide-react'

const roles = ['Super Admin', 'Admin', 'Reviewer', 'Analyst', 'Viewer']

const users = [
    { name: 'Amal Hassan', email: 'a.hassan@jnpi.jo', role: 'Super Admin', active: true },
    { name: 'Mohammad Khalil', email: 'm.khalil@jnpi.jo', role: 'Reviewer', active: true },
    { name: 'Sara Nasser', email: 's.nasser@jnpi.jo', role: 'Analyst', active: true },
    { name: 'Rami Omar', email: 'r.omar@jnpi.jo', role: 'Viewer', active: false },
    { name: 'Khaled Mansour', email: 'k.mansour@jnpi.jo', role: 'Admin', active: true },
]

export default function RbacPage() {
    const [userRoles, setUserRoles] = useState<Record<string, string>>(
        Object.fromEntries(users.map((u) => [u.email, u.role]))
    )

    return (
        <div className="flex flex-col gap-5 p-6 flex-1">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-600/15 border border-rose-600/20">
                    <Users size={18} className="text-rose-400" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-tight">RBAC / Role Management</h1>
                    <p className="text-slate-500 text-xs">Assign and manage user roles across the platform</p>
                </div>
            </div>

            <div className="bg-[#0c1424] border border-slate-800 rounded-xl overflow-hidden">
                <div className="grid grid-cols-[1fr_1fr_auto_80px] gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-5 py-3 border-b border-slate-800">
                    <span>User</span><span>Email</span><span>Role</span><span>Status</span>
                </div>
                {users.map((u) => (
                    <div
                        key={u.email}
                        className="grid grid-cols-[1fr_1fr_auto_80px] gap-4 items-center px-5 py-4 border-b border-slate-800/50 hover:bg-slate-800/20 transition-all"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                {u.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <span className="text-slate-200 text-xs font-medium">{u.name}</span>
                        </div>
                        <span className="text-slate-500 text-xs font-mono">{u.email}</span>
                        <select
                            value={userRoles[u.email]}
                            onChange={(e) => setUserRoles((prev) => ({ ...prev, [u.email]: e.target.value }))}
                            className="px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-xs focus:outline-none focus:border-blue-500"
                        >
                            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <div className={`flex items-center gap-1.5 text-[10px] font-medium ${u.active ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {u.active ? <CheckCircle size={11} /> : <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />}
                            {u.active ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
