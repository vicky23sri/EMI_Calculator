// src/components/LoanDetailsExtractor.js
import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, DollarSign, Percent, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoanDetailsExtractor = ({ message, isVisible = false }) => {
  const navigate = useNavigate();
  const [extractedValues, setExtractedValues] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: ''
  });
  const [isExtracting, setIsExtracting] = useState(false);

  // Default values when extraction fails
  const DEFAULT_VALUES = {
    loanAmount: '1000000', // 10 lakh default
    interestRate: '8.5',   // 8.5% default
    tenure: '240'          // 20 years default (240 months)
  };

  // Function to extract loan details from the message content
  const extractLoanDetails = (content) => {
    console.log('🔍 Extracting from content:', content);
    
    const details = {
      loanAmount: '',
      interestRate: '',
      tenure: ''
    };

    // Extract loan amount - more patterns
    const amountPatterns = [
      // Direct number patterns
      /(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:lakhs?|lacs?)/i,
      /(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:crores?)/i,
      /(?:rs\.?|₹|rupees?)\s*(\d+(?:,\d+)*(?:\.\d+)?)/i,
      /(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:rs\.?|₹|rupees?)/i,
      // Word patterns
      /(?:amount|loan|principal).*?(\d+(?:,\d+)*(?:\.\d+)?)/i,
      // Simple number extraction
      /(?:^|\s)(\d{4,})(?:\s|$|,)/
    ];

    for (const pattern of amountPatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        let amount = match[1].replace(/,/g, '');
        
        // Handle lakhs/crores conversion
        if (pattern.toString().includes('lakhs?|lacs?')) {
          amount = (parseFloat(amount) * 100000).toString();
        } else if (pattern.toString().includes('crores?')) {
          amount = (parseFloat(amount) * 10000000).toString();
        }
        
        details.loanAmount = amount;
        console.log('💰 Found loan amount:', amount);
        break;
      }
    }

    // Extract interest rate - simplified
    const ratePatterns = [
      /(\d+(?:\.\d+)?)\s*%/,
      /(\d+(?:\.\d+)?)\s*percent/i,
      /rate.*?(\d+(?:\.\d+)?)/i,
      /interest.*?(\d+(?:\.\d+)?)/i
    ];

    for (const pattern of ratePatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        const rate = parseFloat(match[1]);
        // Only accept reasonable interest rates (0.1% to 50%)
        if (rate >= 0.1 && rate <= 50) {
          details.interestRate = match[1];
          console.log('📊 Found interest rate:', match[1]);
          break;
        }
      }
    }

    // Extract tenure - simplified
    const tenurePatterns = [
      /(\d+)\s*(?:years?|yrs?)/i,
      /(\d+)\s*(?:months?|mons?)/i,
      /(?:tenure|period|duration).*?(\d+)/i
    ];

    for (const pattern of tenurePatterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        let tenure = parseInt(match[1]);
        
        // Convert years to months if the pattern matches years
        if (pattern.toString().includes('years?|yrs?')) {
          tenure = tenure * 12;
        }
        
        // Only accept reasonable tenure (1 month to 50 years)
        if (tenure >= 1 && tenure <= 600) {
          details.tenure = tenure.toString();
          console.log('📅 Found tenure:', tenure, 'months');
          break;
        }
      }
    }

    console.log('✅ Extracted details:', details);
    return details;
  };

  // Check if message contains loan-related keywords
  const isLoanRelated = (content) => {
    const loanKeywords = [
      'loan', 'emi', 'mortgage', 'home loan', 'car loan', 'personal loan',
      'education loan', 'business loan', 'interest', 'installment',
      'principal', 'tenure', 'repayment', 'calculate'
    ];
    
    const isRelated = loanKeywords.some(keyword => 
      content.toLowerCase().includes(keyword.toLowerCase())
    );
    
    console.log('🔍 Is loan related:', isRelated, 'for content:', content.substring(0, 100));
    return isRelated;
  };

  // Auto-extract details when component mounts or message changes
  useEffect(() => {
    if (message && message.content && isLoanRelated(message.content)) {
      console.log('🚀 Starting extraction process...');
      setIsExtracting(true);
      
      setTimeout(() => {
        const extracted = extractLoanDetails(message.content);
        
        // Apply defaults for missing values
        const finalValues = {
          loanAmount: extracted.loanAmount || DEFAULT_VALUES.loanAmount,
          interestRate: extracted.interestRate || DEFAULT_VALUES.interestRate,
          tenure: extracted.tenure || DEFAULT_VALUES.tenure
        };
        
        console.log('🎯 Final values with defaults:', finalValues);
        setExtractedValues(finalValues);
        setIsExtracting(false);
      }, 800);
    }
  }, [message]);

  const handleCalculateEMI = () => {
    // Store in sessionStorage
    const loanData = {
      loanAmount: extractedValues.loanAmount,
      interestRate: extractedValues.interestRate,
      tenure: extractedValues.tenure,
      timestamp: new Date().toISOString()
    };
    
    sessionStorage.setItem('extractedLoanData', JSON.stringify(loanData));
    console.log('💾 Stored in sessionStorage:', loanData);
    
    // Navigate to manual page
    navigate('/manual');
  };

  // Only show if message is loan-related and visible
  if (!message || !isVisible || !isLoanRelated(message.content)) {
    return null;
  }

  return (
    <div className="mt-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-4 border border-orange-500/20 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-orange-300" />
        <h4 className="text-orange-300 font-semibold text-sm">Loan Calculator</h4>
      </div>
      
      {isExtracting ? (
        <div className="flex items-center gap-3 p-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-sm text-orange-300">Extracting loan details...</span>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm mb-3">
            🔍 Detected loan calculation request. Ready to calculate EMI!
          </p>
          
          {/* Extracted Values Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-2 p-3 bg-gray-800/30 rounded-xl">
              <DollarSign className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Loan Amount</p>
                <p className="text-sm font-medium text-green-300">
                  ₹{parseFloat(extractedValues.loanAmount).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gray-800/30 rounded-xl">
              <Percent className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Interest Rate</p>
                <p className="text-sm font-medium text-blue-300">
                  {extractedValues.interestRate}% p.a.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gray-800/30 rounded-xl">
              <Calendar className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Tenure</p>
                <p className="text-sm font-medium text-purple-300">
                  {extractedValues.tenure} months ({Math.round(extractedValues.tenure/12)} years)
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleCalculateEMI}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all transform hover:scale-105"
            >
              <Calculator className="h-5 w-5" />
              Calculate EMI Details
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Debug Info */}
          <div className="mt-3 p-3 bg-gray-800/20 border border-gray-700/30 rounded-xl">
            <p className="text-gray-400 text-xs">
              💡 Values auto-detected from your message. Default values applied where needed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanDetailsExtractor;