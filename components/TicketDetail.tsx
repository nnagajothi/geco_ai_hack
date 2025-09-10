import React from 'react';
import type { Ticket } from '../types';
import { Priority, Sentiment } from '../types';

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
}

const getPillClasses = (type: 'priority' | 'sentiment' | 'status', value: string) => {
    const base = 'px-3 py-1 text-xs font-bold rounded-full inline-block text-white';
    if (type === 'priority') {
        switch (value) {
            case Priority.Critical: return `${base} bg-priority-critical`;
            case Priority.High: return `${base} bg-priority-high`;
            case Priority.Medium: return `${base} bg-priority-medium`;
            case Priority.Low: return `${base} bg-priority-low`;
        }
    }
    if (type === 'sentiment') {
         switch (value) {
            case Sentiment.Positive: return `${base} bg-sentiment-positive`;
            case Sentiment.Negative: return `${base} bg-sentiment-negative`;
            case Sentiment.Neutral: return `${base} bg-sentiment-neutral`;
        }
    }
     if (type === 'status') {
         switch (value) {
            case 'Open': return `${base} bg-blue-500`;
            case 'In Progress': return `${base} bg-yellow-500`;
            case 'Resolved': return `${base} bg-gray-500`;
        }
    }
    return `${base} bg-gray-400`;
}

const MetricCard: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-slide-in-up">
        <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">{title}</h4>
        <div className="text-gray-900 font-semibold">{children}</div>
    </div>
);

const AiInsight: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 animate-slide-in-up" style={{ animationDelay: '200ms'}}>
        <h4 className="font-bold text-blue-800">{title}</h4>
        <p className="text-blue-700 text-sm mt-1">{children}</p>
    </div>
);


const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onBack }) => {
  const { analysis } = ticket;
  return (
    <section className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-4xl mx-auto animate-fade-in">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Ticket Details: {ticket.id}</h2>
                <p className="text-sm text-gray-500">Analysis for ticket from {analysis.customerName}</p>
            </div>
            <button onClick={onBack} className="text-sm text-brand-primary font-medium hover:underline">
                &larr; Back to Dashboard
            </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Original Query</h4>
            <p className="text-gray-700 text-sm">{analysis.originalQuery}</p>
        </div>

      <div className="space-y-4 mb-6">
        <AiInsight title="Ticket Summary">
            {analysis.summary}
        </AiInsight>
        <AiInsight title="Business Impact">
            {analysis.businessImpact}
        </AiInsight>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Status">
            <span className={getPillClasses('status', ticket.status)}>{ticket.status}</span>
        </MetricCard>
        <MetricCard title="Priority">
            <span className={getPillClasses('priority', analysis.priority)}>{analysis.priority}</span>
        </MetricCard>
        <MetricCard title="Sentiment">
            <span className={getPillClasses('sentiment', analysis.sentiment)}>{analysis.sentiment}</span>
        </MetricCard>
        <MetricCard title="Suggested Assignee">
            <p className="text-lg">{analysis.suggestedAssignee}</p>
        </MetricCard>
      </div>
       <div className="mt-4">
         <MetricCard title="Suggested Tags">
            <div className="flex flex-wrap gap-1">
                {analysis.suggestedTags.map(tag => (
                    <span key={tag} className="bg-brand-primary/10 text-brand-primary text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        </MetricCard>
       </div>
    </section>
  );
};

export default TicketDetail;
