import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Download, X } from 'lucide-react';

interface ProcessingResult {
  score: number;
  issues: Array<{ severity: 'high' | 'medium' | 'low'; message: string }>;
  recommendations: string[];
  summary: string;
}

const DocumentProcessor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ProcessingResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const processDocument = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    // Simulate document processing
    setTimeout(() => {
      const mockResults: ProcessingResult = {
        score: 85,
        issues: [
          { severity: 'high', message: 'Missing required clause for liability coverage in section 3.2' },
          { severity: 'medium', message: 'Premium calculation formula may not comply with state regulations' },
          { severity: 'low', message: 'Consider updating beneficiary designation format' }
        ],
        recommendations: [
          'Add comprehensive liability coverage clause with current state-mandated language',
          'Review premium calculation methodology with actuarial standards',
          'Update beneficiary section to include contingent beneficiaries',
          'Consider adding digital signature provisions for modern compliance'
        ],
        summary: 'Overall document structure is solid with good coverage terms. Primary concerns relate to liability coverage completeness and premium calculation compliance. Recommended changes would improve regulatory compliance and customer protection.'
      };
      
      setResults(mockResults);
      setIsProcessing(false);
    }, 3000);
  };

  const resetProcessor = () => {
    setSelectedFile(null);
    setResults(null);
    setIsProcessing(false);
  };

  const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-emerald-100 rounded-full">
              <FileText className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Document Processor</h1>
          <p className="text-slate-600">
            Upload your insurance policy drafts for AI-powered verification and compliance analysis
          </p>
        </div>

        {/* Upload Section */}
        {!selectedFile && !results && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-emerald-400 bg-emerald-50' 
                : 'border-slate-300 hover:border-slate-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Upload Policy Document
            </h3>
            <p className="text-slate-600 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            
            <input
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer inline-block"
            >
              Choose File
            </label>
            
            <p className="text-xs text-slate-500 mt-4">
              Supported formats: PDF, DOC, DOCX, TXT (Max size: 10MB)
            </p>
          </div>
        )}

        {/* File Selected */}
        {selectedFile && !results && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-slate-600" />
                <div>
                  <p className="font-medium text-slate-900">{selectedFile.name}</p>
                  <p className="text-sm text-slate-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={resetProcessor}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={processDocument}
                disabled={isProcessing}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing Document...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Analyze Document</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Score */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-slate-50 px-6 py-3 rounded-lg">
                <span className="text-slate-600">Compliance Score:</span>
                <span className={`text-2xl font-bold ${getScoreColor(results.score)}`}>
                  {results.score}/100
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-3">Analysis Summary</h3>
              <p className="text-slate-700 leading-relaxed">{results.summary}</p>
            </div>

            {/* Issues */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Issues Found ({results.issues.length})
              </h3>
              <div className="space-y-3">
                {results.issues.map((issue, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-xs uppercase font-medium px-2 py-1 rounded-full bg-white">
                        {issue.severity}
                      </span>
                      <p className="flex-1">{issue.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Recommendations
              </h3>
              <div className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-green-800">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
              <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
              <button
                onClick={resetProcessor}
                className="flex items-center justify-center space-x-2 bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span>Process Another Document</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentProcessor;