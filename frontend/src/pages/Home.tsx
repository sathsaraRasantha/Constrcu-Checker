import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, FileText, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    'AI-powered insurance expertise',
    'Document verification and analysis',
    'Real-time policy recommendations',
    'Secure and compliant processing'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-100 rounded-full">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Welcome to <span className="text-blue-600">InsureAI</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Your intelligent assistant for insurance policy verification and expert consultation. 
          Streamline your workflow with AI-powered document analysis and instant expert guidance.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Features */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* AI Chat Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6">
            <MessageCircle className="h-8 w-8 text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4">AI Chat Assistant</h2>
          <p className="text-slate-600 mb-6">
            Get instant answers to insurance questions, policy clarifications, and expert guidance 
            from our AI-powered assistant trained on insurance industry knowledge.
          </p>
          
          <ul className="space-y-2 mb-8">
            <li className="flex items-center text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Real-time insurance expertise
            </li>
            <li className="flex items-center text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Policy interpretation help
            </li>
            <li className="flex items-center text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Regulatory compliance guidance
            </li>
          </ul>
          
          <Link
            to="/chat"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group"
          >
            Start Chatting
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Document Processing Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-lg mb-6">
            <FileText className="h-8 w-8 text-emerald-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Document Processor</h2>
          <p className="text-slate-600 mb-6">
            Upload and analyze policy documents, contracts, and drafts. Get comprehensive 
            verification reports and recommendations for improvement.
          </p>
          
          <ul className="space-y-2 mb-8">
            <li className="flex items-center text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Automated document analysis
            </li>
            <li className="flex items-center text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Policy compliance checking
            </li>
            <li className="flex items-center text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Detailed verification reports
            </li>
          </ul>
          
          <Link
            to="/documents"
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center group"
          >
            Process Documents
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="bg-slate-100 rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to get started?</h3>
          <p className="text-slate-600 mb-4">
            Choose the tool that best fits your current needs and enhance your insurance workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className="bg-white text-blue-600 py-2 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors border border-blue-200"
            >
              Ask a Question
            </Link>
            <Link
              to="/documents"
              className="bg-white text-emerald-600 py-2 px-6 rounded-lg font-medium hover:bg-emerald-50 transition-colors border border-emerald-200"
            >
              Upload Document
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;