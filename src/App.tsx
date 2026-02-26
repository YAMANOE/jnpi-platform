import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import NotificationDrawer from './components/notifications/NotificationDrawer'
import TicketDashboardPage from './pages/TicketDashboardPage'
import HitlPage from './pages/HitlPage'
import MetricsPage from './pages/MetricsPage'
import AuditPage from './pages/AuditPage'
import RbacPage from './pages/RbacPage'
import FeedbackPage from './pages/FeedbackPage'

type View = 'tickets' | 'hitl' | 'metrics' | 'audit' | 'rbac' | 'feedback'

function renderView(view: View) {
  switch (view) {
    case 'tickets': return <TicketDashboardPage />
    case 'hitl': return <HitlPage />
    case 'metrics': return <MetricsPage />
    case 'audit': return <AuditPage />
    case 'rbac': return <RbacPage />
    case 'feedback': return <FeedbackPage />
  }
}

export default function App() {
  const [view, setView] = useState<View>('tickets')
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex h-screen w-screen bg-[#080f1e] overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeView={view} onNavigate={(v) => setView(v as View)} />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          onBellClick={() => setDrawerOpen(true)}
          notificationCount={3}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {renderView(view)}
        </main>
      </div>

      {/* Notification drawer */}
      <NotificationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  )
}
