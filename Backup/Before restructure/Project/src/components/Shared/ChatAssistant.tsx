
import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg shadow-green-600/30 flex items-center justify-center transition-transform hover:scale-105 z-40 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50 animate-in slide-in-from-bottom-10">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-green-600 rounded-t-2xl">
            <div className="flex items-center text-white">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="font-semibold">Smart Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 max-w-[85%]">
                Hello! I'm your farm assistant. Ask me anything about your soil report or crop diseases. 🌾
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-green-600 p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-white max-w-[85%]">
                What fertilizer should I use for wheat?
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Type a question..."
                className="w-full pl-4 pr-10 py-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
              />
              <button className="absolute right-2 top-2 p-1 text-green-600 hover:bg-green-50 rounded-lg">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
