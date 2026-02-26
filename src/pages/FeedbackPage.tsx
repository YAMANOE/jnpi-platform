import { Archive, Star, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'

const feedbackItems = [
    { id: 'TKT-0030', sector: 'Ministry of Interior', rating: 5, sentiment: 'positive', comment: 'Extremely accurate and well-cited. Saved us days of research.', date: '2026-02-25' },
    { id: 'TKT-0028', sector: 'Central Bank', rating: 4, sentiment: 'positive', comment: 'Good response but missing a reference to the 2023 circular.', date: '2026-02-24' },
    { id: 'TKT-0025', sector: 'Ministry of Health', rating: 2, sentiment: 'negative', comment: 'The answer was too general. Needs more specific policy citations.', date: '2026-02-23' },
    { id: 'TKT-0022', sector: 'Parliament', rating: 3, sentiment: 'neutral', comment: 'Satisfactory, but response time was too slow for our timeline.', date: '2026-02-22' },
    { id: 'TKT-0019', sector: 'Ministry of Finance', rating: 5, sentiment: 'positive', comment: 'Perfect answer, exactly what we needed. Highly recommend JNPI.', date: '2026-02-20' },
]

const sentimentConfig = {
    positive: { icon: <ThumbsUp size={12} />, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    negative: { icon: <ThumbsDown size={12} />, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
    neutral: { icon: <Minus size={12} />, color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' },
}

export default function FeedbackPage() {
    const avgRating = (feedbackItems.reduce((a, f) => a + f.rating, 0) / feedbackItems.length).toFixed(1)

    return (
        <div className="flex flex-col gap-5 p-6 flex-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-600/15 border border-yellow-600/20">
                        <Archive size={18} className="text-yellow-400" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg tracking-tight">Feedback Archive</h1>
                        <p className="text-slate-500 text-xs">Citizen & ministry satisfaction records</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-300 font-bold text-sm">{avgRating}</span>
                    <span className="text-yellow-600 text-xs">/ 5 avg</span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {feedbackItems.map((f) => {
                    const sc = sentimentConfig[f.sentiment as keyof typeof sentimentConfig]
                    return (
                        <div key={f.id} className="bg-[#0c1424] border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-all">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-blue-400 font-mono text-xs font-bold">{f.id}</span>
                                        <span className="text-slate-600 text-[10px]">{f.sector}</span>
                                        <span className="text-slate-700 text-[10px] ml-auto">{f.date}</span>
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed">"{f.comment}"</p>
                                </div>
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={i < f.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}
                                            />
                                        ))}
                                    </div>
                                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${sc.color}`}>
                                        {sc.icon} {f.sentiment}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
