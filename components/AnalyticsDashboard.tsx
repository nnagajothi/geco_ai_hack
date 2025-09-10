import React from 'react';

const DashboardCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-white p-5 rounded-xl shadow-lg animate-slide-in-up ${className}`}>
        <h3 className="text-lg font-bold text-brand-secondary mb-3">{title}</h3>
        {children}
    </div>
);

const AiInsight: React.FC<{ title: string; children: React.ReactNode, icon: string }> = ({ title, children, icon }) => (
    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 flex items-start space-x-3">
        <div className="text-2xl">{icon}</div>
        <div>
            <h4 className="font-bold text-blue-800">{title}</h4>
            <p className="text-blue-700 text-sm mt-1">{children}</p>
        </div>
    </div>
);

const ParameterControl: React.FC<{label: string, value: string, options: string[]}> = ({label, value, options}) => (
    <div>
        <label className="block text-sm font-medium text-gray-600">{label}</label>
        <select defaultValue={value} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md">
            {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
    </div>
)

const AnalyticsDashboard: React.FC = () => {
  return (
    <section className="animate-fade-in space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DashboardCard title="Tune AI Parameters" className="lg:col-span-1">
                <div className="space-y-4">
                    <ParameterControl label="Prioritization Model" value="Urgency-Aware v2.1" options={['Urgency-Aware v2.1', 'Balanced v1.8']}/>
                    <ParameterControl label="Sentiment Analysis Sensitivity" value="High" options={['High', 'Medium', 'Low']}/>
                    <ParameterControl label="Burnout Prediction Threshold" value="85% Workload" options={['75% Workload', '85% Workload', '95% Workload']}/>
                    <p className="text-xs text-gray-500 mt-2">Note: These are for demonstration purposes. Changes won't affect live data.</p>
                </div>
            </DashboardCard>

             <DashboardCard title="AI Performance Overview" className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold">Routing Accuracy</h4>
                        <p className="text-3xl font-bold text-green-600 mt-1">97.2%</p>
                        <p className="text-xs text-gray-500">+1.5% this week</p>
                    </div>
                     <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold">Avg. Time Saved per Ticket</h4>
                        <p className="text-3xl font-bold text-green-600 mt-1">4.2 min</p>
                        <p className="text-xs text-gray-500">vs. manual triage</p>
                    </div>
                </div>
                {/* Dummy chart placeholder */}
                <div className="mt-4 h-32 flex items-center justify-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-lg text-brand-secondary font-semibold">
                    [ Chart: AI vs Manual Resolution Time ]
                </div>
            </DashboardCard>
        </div>
        
        <DashboardCard title="🎯 AI Recommendations" className="!bg-gradient-to-r !from-indigo-50 !to-purple-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AiInsight title="Next Ticket Assignments" icon="👥">
                    Assign next CRITICAL ticket to <strong>Jane Doe (Tier 3)</strong>.
                    <br />Assign next Billing ticket to <strong>John Smith (Billing)</strong>.
                    <br />Assign next Feature Request to <strong>Emily White (Product)</strong>.
                </AiInsight>
                <AiInsight title="Workload Balancing" icon="⚖️">
                    <strong>Tier 3 team is at 98% capacity.</strong> Consider temporarily assigning a high-performing Tier 2 agent (e.g., Alex Ray) to assist with non-critical escalations to prevent burnout.
                </AiInsight>
                 <AiInsight title="Team Availability" icon="🗓️">
                   <strong>Michael Brown (Tier 2)</strong> is on week off. The AI has automatically adjusted routing to distribute their usual workload among other Tier 2 agents.
                </AiInsight>
            </div>
        </DashboardCard>

    </section>
  );
};

export default AnalyticsDashboard;
