import type { Ticket, TicketAnalysis } from './types';
import { Priority, Sentiment } from './types';

const mockAnalysis1: TicketAnalysis = {
    customerName: 'Mark Johnson',
    originalQuery: 'My payment failed but I was still charged. This is the second time this has happened and support was slow last time. I need this fixed now!',
    priority: Priority.High,
    sentiment: Sentiment.Negative,
    summary: 'Customer is reporting a recurring payment processing failure where they were charged despite the transaction failing.',
    suggestedTags: ['Billing', 'Payment Failure', 'Repeat Issue'],
    suggestedAssignee: 'Billing Specialist',
    businessImpact: 'High risk of customer churn due to repeat billing issues and previous poor support experience.'
};

const mockAnalysis2: TicketAnalysis = {
    customerName: 'Lisa Wang',
    originalQuery: 'I was wondering if it\'s possible to export our analytics data to a custom BI tool? It\'s not a dealbreaker but would be a great help for our team.',
    priority: Priority.Medium,
    sentiment: Sentiment.Neutral,
    summary: 'Customer is making a feature inquiry about the possibility of exporting analytics data to a third-party BI tool.',
    suggestedTags: ['Feature Request', 'Analytics', 'Data Export'],
    suggestedAssignee: 'Product Support',
    businessImpact: 'Low immediate impact, but a valuable feature suggestion that could enhance the product for enterprise clients.'
};

const mockAnalysis3: TicketAnalysis = {
    customerName: 'Tom Wilson',
    originalQuery: 'Hi, I can\'t seem to find the button to reset my password. Can you help?',
    priority: Priority.Low,
    sentiment: Sentiment.Neutral,
    summary: 'User is requesting assistance with a standard password reset procedure.',
    suggestedTags: ['Password Reset', 'Account Access', 'How-To'],
    suggestedAssignee: 'Tier 1 Support',
    businessImpact: 'Minimal business impact. Standard, low-complexity user support request.'
};

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'T-KDE83H',
    customerName: 'Mark Johnson',
    description: 'Payment processing failure...',
    priority: Priority.High,
    status: 'Open',
    analysis: mockAnalysis1,
  },
  {
    id: 'T-NCL29A',
    customerName: 'Lisa Wang',
    description: 'Feature request clarification...',
    priority: Priority.Medium,
    status: 'Open',
    analysis: mockAnalysis2,
  },
  {
    id: 'T-PLQ67D',
    customerName: 'Tom Wilson',
    description: 'Password reset help...',
    priority: Priority.Low,
    status: 'Resolved',
    analysis: mockAnalysis3,
  },
];
