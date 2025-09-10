export enum Priority {
    Critical = 'CRITICAL',
    High = 'HIGH',
    Medium = 'MEDIUM',
    Low = 'LOW',
}

export enum Sentiment {
    Positive = 'POSITIVE',
    Negative = 'NEGATIVE',
    Neutral = 'NEUTRAL',
}

export type ViewType = 'form' | 'processing' | 'analysis' | 'dashboard' | 'detail' | 'analytics';

export interface TicketAnalysis {
    customerName: string;
    originalQuery: string;
    priority: Priority;
    sentiment: Sentiment;
    summary: string;
    suggestedTags: string[];
    suggestedAssignee: string;
    businessImpact: string;
}

export interface Ticket {
    id: string;
    customerName: string;
    description: string;
    priority: Priority;
    status: 'Open' | 'Resolved' | 'In Progress';
    analysis: TicketAnalysis;
}

export interface NewTicketData {
    customerName: string;
    customerEmail: string;
    issueType: string;
    issueDescription: string;
}
