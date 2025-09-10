import React, { useState, useEffect } from 'react';

const messages = [
  "Connecting to AI model...",
  "Analyzing ticket sentiment and urgency...",
  "Identifying keywords and context...",
  "Assessing business impact...",
  "Generating routing recommendation...",
  "Finalizing analysis...",
];

const ProcessingView: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="processing" className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto text-center animate-fade-in">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin mx-auto"></div>
        <h3 className="text-2xl font-bold mt-6 text-gray-800">AI Analysis in Progress...</h3>
        <p className="text-gray-500 mt-2 transition-opacity duration-500">{message}</p>
    </section>
  );
};

export default ProcessingView;
