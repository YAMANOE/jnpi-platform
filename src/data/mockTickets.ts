import type { Ticket } from '../components/tickets/KanbanBoard'

const future = (minutes: number): Date =>
    new Date(Date.now() + minutes * 60 * 1000)

export const mockTickets: Ticket[] = [
    // New
    {
        id: 'TKT-0041', status: 'New', priority: 'Critical',
        title: 'Urgent: Procurement Threshold Ambiguity in Framework Agreements',
        sector: 'Ministry of Finance', assignee: 'A.Hassan',
        slaDeadline: future(7), messageCount: 3,
        tags: ['Procurement', 'Legal', 'Urgent'],
    },
    {
        id: 'TKT-0042', status: 'New', priority: 'High',
        title: 'Anti-Corruption Disclosure Requirements – Q2 Annual Report',
        sector: 'Public Security', assignee: 'M.Khalil',
        slaDeadline: future(85), messageCount: 1,
        tags: ['Compliance', 'Disclosure'],
    },
    {
        id: 'TKT-0043', status: 'New', priority: 'Normal',
        title: 'Request for clarification on e-signature validity in court filings',
        sector: 'Ministry of Justice', assignee: 'Unassigned',
        slaDeadline: future(240), messageCount: 0,
        tags: ['Digital Transformation', 'Legal'],
    },

    // In Review
    {
        id: 'TKT-0038', status: 'In Review', priority: 'High',
        title: 'Healthcare Data Portability Regulations – cross-ministry transfer',
        sector: 'Ministry of Health', assignee: 'S.Nasser',
        slaDeadline: future(45), messageCount: 6,
        tags: ['Healthcare', 'Data Privacy'],
    },
    {
        id: 'TKT-0039', status: 'In Review', priority: 'Normal',
        title: 'Educational Curriculum Alignment with National Qualification Framework',
        sector: 'Ministry of Education', assignee: 'R.Omar',
        slaDeadline: future(320), messageCount: 2,
        tags: ['Education', 'NQF'],
    },

    // Pending HITL
    {
        id: 'TKT-0035', status: 'Pending HITL', priority: 'Critical',
        title: 'Central Bank Digital Currency (CBDC) Regulatory Framework – Phase II',
        sector: 'Central Bank', assignee: 'K.Mansour',
        slaDeadline: future(22), messageCount: 9,
        tags: ['CBDC', 'FinTech', 'Regulatory'],
    },
    {
        id: 'TKT-0036', status: 'Pending HITL', priority: 'High',
        title: 'Parliamentary Oversight Committee – AI Governance Policy Draft Review',
        sector: 'Parliament', assignee: 'J.Saleh',
        slaDeadline: future(120), messageCount: 4,
        tags: ['AI Governance', 'Parliament'],
    },

    // Resolved
    {
        id: 'TKT-0030', status: 'Resolved', priority: 'Normal',
        title: 'Public Records Access Policy – Freedom of Information Act Alignment',
        sector: 'Ministry of Interior', assignee: 'A.Hassan',
        slaDeadline: future(-60), messageCount: 5,
        tags: ['FOI', 'Records'],
    },
    {
        id: 'TKT-0031', status: 'Resolved', priority: 'High',
        title: 'National Cybersecurity Strategy – Critical Infrastructure Risk Assessment',
        sector: 'Public Security', assignee: 'M.Khalil',
        slaDeadline: future(-120), messageCount: 11,
        tags: ['Cybersecurity', 'Risk'],
    },
]
