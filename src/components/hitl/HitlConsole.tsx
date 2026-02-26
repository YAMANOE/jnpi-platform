import { useState } from 'react'
import { CheckCircle, XCircle, Bot, User, Edit3 } from 'lucide-react'
import type { Ticket } from '../tickets/KanbanBoard'

// ─── Chat history mock ────────────────────────────────────────────────────────
interface ChatMessage {
    role: 'user' | 'ai'
    content: string
}

const chatHistory: ChatMessage[] = [
    {
        role: 'user',
        content:
            'Good morning. We are preparing our Q3 budget submission and need formal guidance on the threshold limits for direct purchase under the current procurement regulations.',
    },
    {
        role: 'ai',
        content:
            'Good morning. Under Jordan\'s Public Procurement Law No. 32 of 2009, the direct purchase threshold is set at JD 1,000 for goods and JD 2,000 for services. Would you like me to clarify whether these limits apply to framework agreements as well?',
    },
    {
        role: 'user',
        content:
            'Yes, exactly — we specifically need to know if the JD 1,000 limit applies to framework agreements or only to spot purchases. We also need to know if a recent cabinet decision has updated these figures.',
    },
    {
        role: 'ai',
        content:
            'Understood. Let me check whether Cabinet Decision No. 8881 of 2020 or any subsequent directive has amended these thresholds specifically for framework agreements. One moment while I retrieve the relevant policy instruments.',
    },
]

const finalQuestion =
    'Could you provide a formal, citable policy interpretation clarifying whether the JD 1,000 direct purchase threshold under Procurement Law No. 32/2009 applies to framework agreements or exclusively to spot purchases — and whether Cabinet Decision No. 8881/2020 has superseded this limit?'

const aiDraftAnswer = `Based on a comprehensive review of the applicable policy instruments, the following formal interpretation is provided:

**Regulatory Basis:**
Procurement Law No. 32 of 2009, Article 14, Section (B), as supplemented by Cabinet Decision No. 8881 of 2020, establishes the direct purchase thresholds applicable to all executive government entities.

**Policy Interpretation:**
The JD 1,000 threshold for goods applies exclusively to individual spot purchases and does not extend to framework agreement call-offs. Framework agreements, once ratified by the Higher Procurement Committee, are governed separately under Articles 18–21 and carry distinct ceiling provisions.

Cabinet Decision No. 8881/2020 did not supersede the base thresholds but introduced an inflationary adjustment schedule reviewed biannually. As of the latest review cycle, these figures remain in effect.

**Cited Sources:**
1. Procurement Law No. 32/2009 — Article 14, Section (B)
2. Cabinet Decision No. 8881 of 2020 — Annex III
3. HPC Circular 2023-04: Framework Agreement Governance Guidelines`

// ─── Component ────────────────────────────────────────────────────────────────
interface HitlConsoleProps {
    ticket: Ticket | null
}

export default function HitlConsole({ ticket }: HitlConsoleProps) {
    const [answer, setAnswer] = useState(aiDraftAnswer)
    const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null)

    // Empty state
    if (!ticket) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center select-none">
                <Edit3 size={28} className="text-slate-800 mb-3" />
                <p className="text-slate-700 text-sm font-medium">No ticket selected</p>
                <p className="text-slate-800 text-xs mt-1">
                    Click any ticket card to open the review console
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h2 className="text-white font-bold text-base tracking-tight">Human Review Console</h2>
                    <p className="text-slate-500 text-xs mt-0.5">
                        Reviewing AI draft for{' '}
                        <span className="text-blue-400 font-mono">{ticket.id}</span>
                        {' '}· {ticket.sector}
                    </p>
                </div>

                {decision && (
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold
              ${decision === 'approved'
                                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                : 'bg-red-500/15 border-red-500/30 text-red-400'}`}
                    >
                        {decision === 'approved'
                            ? <><CheckCircle size={13} /> Submitted & Dispatched</>
                            : <><XCircle size={13} /> Rejected</>}
                    </div>
                )}
            </div>

            {/* Split screen */}
            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">

                {/* LEFT — Chat History */}
                <div className="flex flex-col bg-[#0c1424] border border-slate-700/50 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-800 shrink-0 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <h3 className="text-slate-300 text-[11px] font-semibold uppercase tracking-widest">
                            Chat History
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4
                          scrollbar-thin scrollbar-thumb-slate-800">
                        {/* Prior messages */}
                        {chatHistory.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                {/* Avatar */}
                                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5
                  ${msg.role === 'user'
                                        ? 'bg-slate-700 text-slate-300'
                                        : 'bg-blue-600/30 text-blue-400'}
                `}>
                                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                                </div>

                                {/* Bubble */}
                                <div
                                    className={`
                    max-w-[80%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed
                    ${msg.role === 'user'
                                            ? 'bg-slate-800/70 text-slate-300 rounded-tl-none border border-slate-700/40'
                                            : 'bg-blue-600/10 text-blue-200 rounded-tr-none border border-blue-600/20'}
                  `}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {/* Final user question — highlighted */}
                        <div className="pt-2 border-t border-slate-800">
                            <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest mb-2.5">
                                Final Question
                            </p>
                            <div className="flex gap-2.5">
                                <div className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                                    <User size={12} />
                                </div>
                                <div className="flex-1 px-3.5 py-2.5 rounded-xl rounded-tl-none text-xs leading-relaxed
                                bg-amber-500/10 text-amber-200 border border-amber-500/25">
                                    {finalQuestion}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Answer Editor */}
                <div className="flex flex-col bg-[#0c1424] border border-slate-700/50 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-800 shrink-0 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500" />
                            <h3 className="text-slate-300 text-[11px] font-semibold uppercase tracking-widest">
                                Official Response
                            </h3>
                        </div>
                        <span className="text-slate-700 text-[10px]">
                            {answer.trim().length} chars
                        </span>
                    </div>

                    <div className="flex-1 flex flex-col px-4 py-4 gap-4 min-h-0">
                        {/* Rich-text editor (textarea) */}
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={!!decision}
                            placeholder="Type the official response here…"
                            className="
                flex-1 w-full min-h-0 resize-none
                bg-slate-900/50 border border-slate-700/40 rounded-xl
                px-4 py-3 text-slate-200 text-xs leading-relaxed
                placeholder-slate-700
                focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200
                font-[inherit]
              "
                        />

                        {/* Action buttons */}
                        {!decision ? (
                            <div className="flex items-center gap-3 shrink-0">
                                <button
                                    onClick={() => setDecision('rejected')}
                                    className="
                    flex-1 flex items-center justify-center gap-2
                    py-2.5 rounded-lg border border-red-500/30 text-red-400 text-sm font-semibold
                    hover:bg-red-500/10 transition-all duration-150
                  "
                                >
                                    <XCircle size={15} />
                                    Reject
                                </button>
                                <button
                                    onClick={() => setDecision('approved')}
                                    className="
                    flex-1 flex items-center justify-center gap-2
                    py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold
                    hover:bg-blue-500 shadow-lg shadow-blue-900/40 transition-all duration-150
                  "
                                >
                                    <CheckCircle size={15} />
                                    Approve & Submit
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => { setDecision(null); setAnswer(aiDraftAnswer) }}
                                className="w-full py-2.5 rounded-lg border border-slate-700 text-slate-500 text-xs font-medium
                           hover:border-slate-600 hover:text-slate-300 transition-all"
                            >
                                Reset Review
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
