import { CheckCircle, Circle, Clock, AlertTriangle, User, Bot, ArrowRight } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
type StepStatus = 'completed' | 'active' | 'pending' | 'error'

interface TimelineStep {
    id: string
    label: string
    description: string
    timestamp: string
    status: StepStatus
    actor: 'system' | 'agent' | 'human'
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const mockSteps: TimelineStep[] = [
    {
        id: '1',
        label: 'Ticket Received',
        description: 'Submission validated and ingested via public portal API.',
        timestamp: '09:14:22 AM',
        status: 'completed',
        actor: 'system',
    },
    {
        id: '2',
        label: 'Auto-Classification',
        description: 'AI classifier assigned priority HIGH and sector "Ministry of Finance".',
        timestamp: '09:14:25 AM',
        status: 'completed',
        actor: 'agent',
    },
    {
        id: '3',
        label: 'Knowledge Retrieval',
        description: 'RAG pipeline retrieved 7 relevant policy chunks with >0.82 similarity.',
        timestamp: '09:14:31 AM',
        status: 'completed',
        actor: 'agent',
    },
    {
        id: '4',
        label: 'Response Generated',
        description: 'LLM synthesized policy-grounded answer with 3 legal citations.',
        timestamp: '09:14:45 AM',
        status: 'completed',
        actor: 'agent',
    },
    {
        id: '5',
        label: 'Escalated to HITL',
        description: 'Confidence score (0.71) below threshold. Routed to human review queue.',
        timestamp: '09:15:02 AM',
        status: 'active',
        actor: 'system',
    },
    {
        id: '6',
        label: 'Human Review',
        description: 'Awaiting reviewer to approve, edit, or reject the generated response.',
        timestamp: '—',
        status: 'pending',
        actor: 'human',
    },
    {
        id: '7',
        label: 'Response Dispatched',
        description: 'Approved response sent to the requester via secure portal notification.',
        timestamp: '—',
        status: 'pending',
        actor: 'system',
    },
]

// ─── Actor Icon ───────────────────────────────────────────────────────────────
function actorIcon(actor: TimelineStep['actor']) {
    if (actor === 'human') return <User size={10} />
    if (actor === 'agent') return <Bot size={10} />
    return <ArrowRight size={10} />
}

const actorColors: Record<TimelineStep['actor'], string> = {
    system: 'bg-slate-600 text-slate-300',
    agent: 'bg-purple-600/60 text-purple-200',
    human: 'bg-blue-600/60 text-blue-200',
}

// ─── Step dot config ──────────────────────────────────────────────────────────
const statusConfig: Record<StepStatus, { dot: string; line: string; label: string }> = {
    completed: {
        dot: 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow shadow-emerald-900/50',
        line: 'bg-emerald-600/40',
        label: 'text-white',
    },
    active: {
        dot: 'border-blue-400 bg-blue-500/20 text-blue-400 shadow shadow-blue-900/60 animate-pulse',
        line: 'bg-slate-700',
        label: 'text-blue-300',
    },
    pending: {
        dot: 'border-slate-600 bg-slate-800 text-slate-600',
        line: 'bg-slate-800',
        label: 'text-slate-600',
    },
    error: {
        dot: 'border-red-500 bg-red-500/10 text-red-400 shadow shadow-red-900/40',
        line: 'bg-red-600/30',
        label: 'text-red-400',
    },
}

// ─── Single Step ──────────────────────────────────────────────────────────────
function TimelineStepItem({ step, isLast }: { step: TimelineStep; isLast: boolean }) {
    const cfg = statusConfig[step.status]

    return (
        <div className="flex gap-4">
            {/* Left: dot + line */}
            <div className="flex flex-col items-center">
                <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${cfg.dot}`}
                >
                    {step.status === 'completed' && <CheckCircle size={14} />}
                    {step.status === 'active' && <Clock size={14} />}
                    {step.status === 'pending' && <Circle size={14} />}
                    {step.status === 'error' && <AlertTriangle size={14} />}
                </div>
                {!isLast && (
                    <div className={`w-0.5 flex-1 mt-1 min-h-8 rounded-full ${cfg.line}`} />
                )}
            </div>

            {/* Right: content */}
            <div className={`flex-1 pb-6 ${isLast ? '' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                    <p className={`text-sm font-semibold ${cfg.label}`}>{step.label}</p>
                    <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium ${actorColors[step.actor]}`}>
                        {actorIcon(step.actor)}
                        {step.actor}
                    </span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mb-1.5">{step.description}</p>
                {step.timestamp !== '—' && (
                    <div className="flex items-center gap-1 text-slate-700 text-[10px] font-mono">
                        <Clock size={9} />
                        {step.timestamp}
                    </div>
                )}
            </div>
        </div>
    )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ActivityTimeline() {
    return (
        <div className="flex flex-col bg-[#0c1424] border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-bold text-sm mb-1">Escalation Timeline</h3>
            <p className="text-slate-600 text-xs mb-6">State machine progress for selected ticket</p>

            <div>
                {mockSteps.map((step, idx) => (
                    <TimelineStepItem key={step.id} step={step} isLast={idx === mockSteps.length - 1} />
                ))}
            </div>
        </div>
    )
}
