import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import NotificationDrawer from './components/notifications/NotificationDrawer'
import TicketDashboardPage from './pages/TicketDashboardPage'
import HitlPage from './pages/HitlPage'
import MetricsPage from './pages/MetricsPage'
import AuditPage from './pages/AuditPage'
import RbacPage from './pages/RbacPage'

type View = 'tickets' | 'hitl' | 'metrics' | 'audit' | 'rbac'

function renderView(view: View) {
  switch (view) {
    case 'tickets': return <TicketDashboardPage />
    case 'hitl': return <HitlPage />
    case 'metrics': return <MetricsPage />
    case 'audit': return <AuditPage />
    case 'rbac': return <RbacPage />
  }
}

export default function App() {
  const [view, setView] = useState<View>('tickets')
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen bg-[#06101f] overflow-hidden">
      <Sidebar activeView={view} onNavigate={(v) => setView(v as View)} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          onBellClick={() => setDrawerOpen(true)}
          notificationCount={3}
        />
        <main className="flex-1 overflow-y-auto">
          {renderView(view)}
        </main>
      </div>

      <NotificationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  )
}
