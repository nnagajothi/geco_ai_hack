import React, { useState } from 'react';
import type { NewTicketData, Ticket, TicketAnalysis, ViewType } from './types';
import { analyzeTicket } from './services/geminiService';
import { MOCK_TICKETS } from './constants';

import Header from './components/Header';
import TicketForm from './components/TicketForm';
import ProcessingView from './components/ProcessingView';
import AnalysisView from './components/AnalysisView';
import BusinessDashboard from './components/BusinessDashboard';
import TicketDetail from './components/TicketDetail';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const App: React.FC = () => {
    const [view, setView] = useState<ViewType>('form');
    const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
    const [currentAnalysis, setCurrentAnalysis] = useState<TicketAnalysis | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmitTicket = async (data: NewTicketData) => {
        setView('processing');
        setError(null);
        try {
            const analysisResult = await analyzeTicket(data);
            setCurrentAnalysis(analysisResult);
            setView('analysis');
        } catch (err) {
            setError('Failed to analyze the ticket. Please try again.');
            setView('form');
        }
    };

    const handleContinueToDashboard = () => {
        if (!currentAnalysis) return;

        const newTicket: Ticket = {
            id: `T-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            customerName: currentAnalysis.customerName,
            description: `${currentAnalysis.summary.substring(0, 30)}...`,
            priority: currentAnalysis.priority,
            status: 'Open',
            analysis: currentAnalysis,
        };
        
        setTickets(prevTickets => [newTicket, ...prevTickets]);
        setCurrentAnalysis(null);
        setView('dashboard');
    };

    const handleSelectTicket = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setView('detail');
    };

    const handleBackToDashboard = () => {
        setSelectedTicket(null);
        setView('dashboard');
    };

    const handleNavigate = (targetView: ViewType) => {
        setView(targetView);
        // Reset transient states when navigating away
        setSelectedTicket(null);
        setCurrentAnalysis(null);
        setError(null);
    }
    
    const getNavTabClass = (tabView: ViewType) => {
        const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white";
        const isActive = view === tabView || (view === 'detail' && tabView === 'dashboard');
        return isActive 
            ? `${baseClasses} bg-white text-brand-primary shadow-md`
            : `${baseClasses} text-white hover:bg-white/20`;
    }

    const renderContent = () => {
        switch (view) {
            case 'form':
                return <TicketForm onSubmit={handleSubmitTicket} error={error} />;
            case 'processing':
                return <ProcessingView />;
            case 'analysis':
                return currentAnalysis ? <AnalysisView analysis={currentAnalysis} onContinue={handleContinueToDashboard} /> : null;
            case 'dashboard':
                return <BusinessDashboard tickets={tickets} onSelectTicket={handleSelectTicket} />;
            case 'detail':
                return selectedTicket ? <TicketDetail ticket={selectedTicket} onBack={handleBackToDashboard} /> : null;
            case 'analytics':
                return <AnalyticsDashboard />;
            default:
                return <TicketForm onSubmit={handleSubmitTicket} error={error} />;
        }
    };

    return (
        <div className="min-h-screen font-sans text-gray-800 flex flex-col">
            <div className="bg-gradient-to-br from-brand-primary to-brand-secondary sticky top-0 z-10 shadow-lg">
                <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Header />
                    <nav className="flex justify-center space-x-2 sm:space-x-4 pb-4">
                        <button onClick={() => handleNavigate('form')} className={getNavTabClass('form')}>
                            Customer Portal
                        </button>
                        <button onClick={() => handleNavigate('dashboard')} className={getNavTabClass('dashboard')}>
                            Dashboard
                        </button>
                        <button onClick={() => handleNavigate('analytics')} className={getNavTabClass('analytics')}>
                           AI Analytics
                        </button>
                    </nav>
                </main>
            </div>

            <div className="flex-grow bg-gray-100">
                 <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                    {renderContent()}
                </div>
            </div>
            
            <footer className="bg-gray-800 text-center p-4 text-white text-sm">
                <p>&copy; {new Date().getFullYear()} Smart Support. All Rights Reserved. Designed by Akash Das.</p>
            </footer>
        </div>
    );
};

export default App;
