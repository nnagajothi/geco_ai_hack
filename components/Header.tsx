import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center text-white py-4 mb-4">
        <h1 className="text-4xl font-bold tracking-tight text-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
            Smart Support
        </h1>
        <p className="text-lg opacity-90 mt-1">
            AI-Powered Customer Ticket Prioritization & Routing
        </p>
    </header>
  );
};

export default Header;
