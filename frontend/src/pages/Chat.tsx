import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI insurance assistant. I can help you with policy questions, compliance issues, and industry best practices. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${inputMessage}". As an AI insurance assistant, I can help with policy analysis, compliance questions, and industry guidance. For production use, this would connect to your AI backend service to provide comprehensive insurance expertise.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 h-[calc(100vh-200px)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">AI Insurance Assistant</h1>
              <p className="text-sm text-slate-600">Ask me anything about insurance policies and regulations</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-full ${
                message.sender === 'user' ? 'bg-blue-100' : 'bg-slate-100'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-5 w-5 text-blue-600" />
                ) : (
                  <Bot className="h-5 w-5 text-slate-600" />
                )}
              </div>
              
              <div className={`flex-1 max-w-xs md:max-w-md ${
                message.sender === 'user' ? 'text-right' : ''
              }`}>
                <div className={`inline-block p-4 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-100 rounded-full">
                <Bot className="h-5 w-5 text-slate-600" />
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader className="h-4 w-4 animate-spin text-slate-600" />
                  <span className="text-sm text-slate-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-slate-200">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about insurance policies, regulations, or compliance..."
              className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          
          <div className="mt-3">
            <p className="text-xs text-slate-500 text-center">
              This AI assistant is designed for insurance professionals. Always verify important information with official sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;