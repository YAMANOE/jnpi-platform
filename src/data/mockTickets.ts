import type { Ticket } from '../components/tickets/KanbanBoard'

export const mockTickets: Ticket[] = [
    // New
    {
        id: 'TKT-0041', status: 'New',
        title: 'Procurement Threshold Ambiguity in Framework Agreements',
        sector: 'Ministry of Finance', assignee: 'A. Hassan',
        messageCount: 3, tags: ['Procurement', 'Legal'],
    },
    {
        id: 'TKT-0042', status: 'New',
        title: 'Anti-Corruption Disclosure Requirements – Q2 Annual Report',
        sector: 'Public Security', assignee: 'M. Khalil',
        messageCount: 1, tags: ['Compliance', 'Disclosure'],
    },
    {
        id: 'TKT-0043', status: 'New',
        title: 'E-Signature Validity in Official Court Filings',
        sector: 'Ministry of Justice', assignee: 'Unassigned',
        messageCount: 0, tags: ['Digital', 'Legal'],
    },

    // Under Review
    {
        id: 'TKT-0038', status: 'Under Review',
        title: 'Healthcare Data Portability – Cross-Ministry Transfer Policy',
        sector: 'Ministry of Health', assignee: 'S. Nasser',
        messageCount: 6, tags: ['Healthcare', 'Data Privacy'],
    },
    {
        id: 'TKT-0035', status: 'Under Review',
        title: 'CBDC Regulatory Framework – Phase II Implementation',
        sector: 'Central Bank', assignee: 'K. Mansour',
        messageCount: 9, tags: ['CBDC', 'FinTech'],
    },
    {
        id: 'TKT-0036', status: 'Under Review',
        title: 'Parliamentary AI Governance Policy Draft Review',
        sector: 'Parliament', assignee: 'J. Saleh',
        messageCount: 4, tags: ['AI Governance'],
    },

    // Completed
    {
        id: 'TKT-0030', status: 'Completed',
        title: 'Public Records Access – Freedom of Information Act Alignment',
        sector: 'Ministry of Interior', assignee: 'A. Hassan',
        messageCount: 5, tags: ['FOI', 'Records'],
    },
    {
        id: 'TKT-0031', status: 'Completed',
        title: 'National Cybersecurity Strategy – Risk Assessment',
        sector: 'Public Security', assignee: 'M. Khalil',
        messageCount: 11, tags: ['Cybersecurity'],
    },
    {
        id: 'TKT-0029', status: 'Completed',
        title: 'Educational Curriculum Alignment with NQF Standards',
        sector: 'Ministry of Education', assignee: 'R. Omar',
        messageCount: 3, tags: ['Education', 'NQF'],
    },

    // Rejected
    {
        id: 'TKT-0025', status: 'Rejected',
        title: 'Informal Land Tenure Regularisation Request – Out of Scope',
        sector: 'Ministry of Interior', assignee: 'S. Nasser',
        messageCount: 2, tags: ['Land', 'Out of Scope'],
    },
    {
        id: 'TKT-0022', status: 'Rejected',
        title: 'Private Sector Subsidy Query – Not Covered by Mandate',
        sector: 'Ministry of Finance', assignee: 'K. Mansour',
        messageCount: 1, tags: ['Subsidy'],
    },
]
