import React from 'react';
import type { Ticket } from '../types';
import { Priority } from '../types';

interface BusinessDashboardProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
}

const getPriorityPill = (priority: Priority) => {
    const base = 'font-bold text-xs mr-2';
    switch (priority) {
        case Priority.Critical: return `${base} text-priority-critical`;
        case Priority.High: return `${base} text-priority-high`;
        case Priority.Medium: return `${base} text-priority-medium`;
        case Priority.Low: return `${base} text-priority-low`;
    }
}
const getPriorityBorder = (priority: Priority) => {
    switch (priority) {
        case Priority.Critical: return 'border-l-priority-critical';
        case Priority.High: return 'border-l-priority-high';
        case Priority.Medium: return 'border-l-priority-medium';
        case Priority.Low: return 'border-l-priority-low';
    }
}

const DashboardCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-5 rounded-xl shadow-lg animate-slide-in-up">
        <h3 className="text-lg font-bold text-brand-secondary mb-3">{title}</h3>
        {children}
    </div>
);

const AiInsight: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-3">
        <h4 className="font-bold text-blue-800">{title}</h4>
        <p className="text-blue-700 text-sm mt-1">{children}</p>
    </div>
);

const TicketList: React.FC<{tickets: Ticket[], onSelectTicket: (ticket: Ticket) => void}> = ({tickets, onSelectTicket}) => (
    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
        {tickets.map(ticket => (
            <button 
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className={`w-full text-left p-2 border-l-4 rounded-r-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary ${getPriorityBorder(ticket.priority)}`}
                aria-label={`View details for ticket ${ticket.id} from ${ticket.customerName}`}
            >
                <p className="text-sm font-semibold truncate"><span className={getPriorityPill(ticket.priority)}>{ticket.priority}</span>{ticket.customerName}</p>
                <p className="text-xs text-gray-500 truncate">{ticket.description}</p>
            </button>
        ))}
    </div>
)


const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ tickets, onSelectTicket }) => {
    const openTickets = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress');
    const resolvedTickets = tickets.filter(t => t.status === 'Resolved');
  
  return (
    <section id="business-dashboard" className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="Today's Metrics">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Total Tickets:</span><span className="font-bold text-lg">{tickets.length}</span></div>
                     <div className="flex justify-between"><span>Open Tickets:</span><span className="font-bold text-lg">{openTickets.length}</span></div>
                    <div className="flex justify-between"><span>Avg Response:</span><span className="font-bold text-lg">7.5 min</span></div>
                    <div className="flex justify-between"><span>CSAT:</span><span className="font-bold text-lg text-green-600">94.8%</span></div>
                </div>
            </DashboardCard>
            
            <div className="lg:col-span-2 space-y-6">
                <DashboardCard title="Priority Queue (Open Tickets)">
                   <TicketList tickets={openTickets} onSelectTicket={onSelectTicket} />
                </DashboardCard>
                 <DashboardCard title="Recently Resolved">
                   <TicketList tickets={resolvedTickets} onSelectTicket={onSelectTicket} />
                </DashboardCard>
            </div>

            <DashboardCard title="Team Workload">
                <div className="space-y-2 text-sm">
                    <div>Tier 1 (4): <span className="font-bold text-green-600">65% ●●●○○</span></div>
                    <div>Tier 2 (3): <span className="font-bold text-yellow-500">80% ●●●●○</span></div>
                    <div>Tier 3 (2): <span className="font-bold text-red-600">98% ●●●●●</span></div>
                </div>
            </DashboardCard>
        </div>

        <div className="mt-6 bg-white p-5 rounded-xl shadow-lg animate-slide-in-up" style={{animationDelay: '200ms'}}>
             <h3 className="text-lg font-bold text-brand-secondary mb-3">🎯 Predictive Insights</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AiInsight title="Peak Hour Prediction">Expecting 40% traffic spike between 2-4 PM based on historical patterns.</AiInsight>
                <AiInsight title="Escalation Alert">2 more critical issues likely this afternoon - recommend prepping Tier 3 team.</AiInsight>
                <AiInsight title="Customer Risk">3 enterprise accounts showing frustration patterns - proactive outreach recommended.</AiInsight>
             </div>
        </div>
    </section>
  );
};

export default BusinessDashboard;
