import React, { useState } from 'react';
import type { NewTicketData } from '../types';

interface TicketFormProps {
  onSubmit: (data: NewTicketData) => void;
  error: string | null;
}

const sampleTickets = [
    {
        name: "Sarah Chen",
        email: "sarah.chen@techcorp.com",
        type: "technical",
        description: "Our production system went down 30 minutes ago and we're losing customers. The dashboard shows error 500 on all API endpoints. This is extremely urgent as it's affecting our entire business operations. We have a major client presentation in 2 hours and need this fixed immediately!"
    },
    {
        name: "Michael Rodriguez",
        email: "m.rodriguez@startup.io",
        type: "billing",
        description: "I was charged twice for my subscription this month. Can someone please look into this and process a refund? I've been a loyal customer for 2 years."
    },
    {
        name: "David Park",
        email: "david@smallbiz.com", 
        type: "account",
        description: "I love your product but I'm thinking of upgrading my plan. Can someone walk me through the enterprise features?"
    }
];

const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState({
    customerName: 'Sarah Chen',
    customerEmail: 'sarah.chen@techcorp.com',
    issueType: 'technical',
    issueDescription: "Our production system went down 30 minutes ago and we're losing customers. The dashboard shows error 500 on all API endpoints. This is extremely urgent as it's affecting our entire business operations. We have a major client presentation in 2 hours and need this fixed immediately!",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleRandomize = () => {
    const randomTicket = sampleTickets[Math.floor(Math.random() * sampleTickets.length)];
    setFormData({
        customerName: randomTicket.name,
        customerEmail: randomTicket.email,
        issueType: randomTicket.type,
        issueDescription: randomTicket.description
    });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <section id="customer-portal" className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Submit Support Ticket</h2>
        <button onClick={handleRandomize} className="text-sm text-brand-primary font-medium hover:underline">
            Load Sample
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input type="text" id="customerName" value={formData.customerName} onChange={handleChange} required className="w-full p-2 border-2 border-gray-200 rounded-md focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="customerEmail" value={formData.customerEmail} onChange={handleChange} required className="w-full p-2 border-2 border-gray-200 rounded-md focus:ring-brand-primary focus:border-brand-primary" />
          </div>
        </div>
        <div>
          <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
          <select id="issueType" value={formData.issueType} onChange={handleChange} required className="w-full p-2 border-2 border-gray-200 rounded-md focus:ring-brand-primary focus:border-brand-primary">
            <option value="billing">Billing & Payments</option>
            <option value="technical">Technical Support</option>
            <option value="account">Account Management</option>
            <option value="product">Product Inquiry</option>
          </select>
        </div>
        <div>
          <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-1">Describe Your Issue</label>
          <textarea id="issueDescription" rows={5} value={formData.issueDescription} onChange={handleChange} required className="w-full p-2 border-2 border-gray-200 rounded-md focus:ring-brand-primary focus:border-brand-primary"></textarea>
        </div>
        <button type="submit" className="w-full sm:w-auto sm:float-right bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-200">
          Submit & Analyze
        </button>
      </form>
    </section>
  );
};

export default TicketForm;
