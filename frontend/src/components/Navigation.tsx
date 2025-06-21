import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, MessageCircle, FileText, Home } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-bold">InsureAI</span>
          </Link>
          
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/chat"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/chat') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>AI Chat</span>
            </Link>
            
            <Link
              to="/documents"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/documents') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;