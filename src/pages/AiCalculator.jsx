
import React, { useState, useEffect, useRef } from "react";
import {
  User, Send, Calculator, Clock, Bot, RefreshCcw, PieChart, ChevronRight,
  Sparkles, Coins, DollarSign, Zap, TrendingUp, ChartBar, Gift,
  Shield, Award, FileText, BriefcaseBusiness, Wallet, CreditCard,
  ArrowUpRight, ArrowDownCircle, BadgeCheck, BarChart4
} from "lucide-react";

const AiFinancialChat = () => {
  // Predefined questions with categories
  const questionCategories = [
    {
      name: "EMI Basics",
      icon: <Calculator className="h-4 w-4 text-emerald-300" />,
      color: "from-emerald-600/40 to-emerald-500/40",
      borderColor: "border-emerald-500/40",
      hoverColor: "hover:from-emerald-600/60 hover:to-emerald-500/60",
      questions: [
        "What is EMI?",
        "Calculate my EMI",
        "Explain loan tenure",
        "Explain amortization"
      ]
    },
    {
      name: "Loan Strategy",
      icon: <ChartBar className="h-4 w-4 text-blue-300" />,
      color: "from-blue-600/40 to-blue-500/40",
      borderColor: "border-blue-500/40",
      hoverColor: "hover:from-blue-600/60 hover:to-blue-500/60",
      questions: [
        "How can I reduce my interest payments?",
        "What happens if I prepay my loan?",
        "Is fixed or floating interest rate better?",
        "Best time to refinance?"
      ]
    },
    {
      name: "Financial Planning",
      icon: <Wallet className="h-4 w-4 text-purple-300" />,
      color: "from-purple-600/40 to-purple-500/40",
      borderColor: "border-purple-500/40",
      hoverColor: "hover:from-purple-600/60 hover:to-purple-500/60",
      questions: [
        "How to improve my credit score?",
        "Should I take a longer loan tenure?",
        "Down payment tips",
        "Compare home vs car loan"
      ]
    },
    {
      name: "Market Insights",
      icon: <TrendingUp className="h-4 w-4 text-amber-300" />,
      color: "from-amber-600/40 to-amber-500/40",
      borderColor: "border-amber-500/40",
      hoverColor: "hover:from-amber-600/60 hover:to-amber-500/60",
      questions: [
        "How does inflation affect my loan?",
        "Current interest rate trends",
        "Market forecast for home loans",
        "Best investment while repaying loans"
      ]
    }
  ];

  // Flatten questions for search
  const predefinedQuestions = questionCategories.flatMap(category =>
    category.questions.map(q => ({ text: q, category: category.name }))
  );

  // Initial welcome message
  const [messages, setMessages] = useState([
    {
      type: "system",
      content: "Hello! I'm your AI financial assistant. Ask me anything about EMI calculations, loans, or financial planning. You can select a question from the suggestions or type your own.",
      timestamp: new Date()
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState(predefinedQuestions);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [theme, setTheme] = useState("dark"); // dark, light, blue
  const [uiMode, setUiMode] = useState("chat"); // chat, calculator
  const [messageCount, setMessageCount] = useState(0);
  const [showFeatureHighlight, setShowFeatureHighlight] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Filter questions when search term changes
  useEffect(() => {
    console.log("Filtered Questions:", filteredQuestions.length);
    const filtered = predefinedQuestions.filter(q =>
      q.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === "all" || q.category === activeCategory)
    );
    setFilteredQuestions(filtered);
  }, [searchTerm, activeCategory]);

  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Hide scroll hint after a while
  useEffect(() => {
    if (showScrollHint) {
      const timer = setTimeout(() => {
        setShowScrollHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showScrollHint]);

  // Hide feature highlight after a few messages
  useEffect(() => {
    if (messageCount > 3) {
      setShowFeatureHighlight(false);
    }
  }, [messageCount]);

  // Handle quick question selection
  const handleQuickQuestion = (question) => {
    setCurrentMessage(question);
    document.getElementById('message-input')?.focus();
  };

  // Handle user message submission
  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      type: "user",
      content: currentMessage,
      timestamp: new Date()
    }]);

    setMessageCount(prev => prev + 1);

    // Show loading state
    setIsLoading(true);

    // Process query and generate response
    setTimeout(() => {
      const query = currentMessage.toLowerCase();
      const newResponse = processUserQuery(query);

      // Add system response
      setMessages(prev => [...prev, {
        type: "system",
        content: newResponse,
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 1500);

    setCurrentMessage("");
  };

  // Process user query and generate appropriate response
  const processUserQuery = (query) => {
    query = query.toLowerCase();

    // EMI explanation
    if (query.includes("what is emi") || query.includes("explain emi")) {
      return "EMI (Equated Monthly Installment) is the fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs consist of both principal and interest components, allowing you to repay your loan in manageable monthly payments. The EMI formula is:\n\nEMI = P × r × (1 + r)^n / ((1 + r)^n - 1)\n\nWhere:\nP = Principal loan amount\nr = Monthly interest rate\nn = Number of monthly installments";
    }

    // Show current calculation
    else if (query.includes("calculate") || query.includes("show emi") || query.includes("my emi")) {
      return "Based on your inputs:\n\nLoan Amount: $100,000\nInterest Rate: 8.5%\nLoan Tenure: 5 years\n\nYour monthly EMI would be $2,052.60\nTotal interest payment: $23,156.00\nTotal amount payable: $123,156.00\n\nWould you like to see a year-by-year breakdown of your payments?";
    }

    // Interest explanation
    else if (query.includes("interest") || query.includes("rate") || query.includes("reduce")) {
      return "Interest is the cost of borrowing money, expressed as a percentage rate over a period of time. The current interest rate you've set is 8.5%.\n\nReducing your interest rate by just 1% could save you approximately $2,743.85 over the life of your loan.\n\nWays to reduce interest payments include:\n• Improving your credit score\n• Negotiating with lenders\n• Making larger down payments\n• Refinancing when rates drop\n• Making partial prepayments regularly";
    }

    // Prepayment advice
    else if (query.includes("prepay") || query.includes("early payment")) {
      return "Making prepayments can significantly reduce your overall interest burden. By prepaying just 10% of your loan amount annually, you could reduce your loan tenure by approximately 30% and save substantially on interest payments.\n\nBenefits of prepayment:\n• Reduced total interest outgo\n• Shorter loan tenure\n• Improved debt-to-income ratio\n\nAlways check if your loan has any prepayment penalties before making extra payments. Some lenders charge 2-4% of the prepaid amount as penalty.";
    }

    // Loan tenure explanation
    else if (query.includes("tenure") || query.includes("duration") || query.includes("term")) {
      return "Loan tenure refers to the period over which you repay your loan. Longer tenures mean lower monthly payments but higher total interest costs. Shorter tenures mean higher monthly payments but lower overall interest.\n\nFor example, on a $100,000 loan at 8.5%:\n• 5-year term: $2,052.60/month with $23,156 total interest\n• 10-year term: $1,237.52/month with $48,502 total interest\n• 15-year term: $985.46/month with $77,382 total interest\n\nThe ideal tenure balances affordable monthly payments with reasonable total interest costs.";
    }

    // Fixed vs floating
    else if (query.includes("fixed") || query.includes("floating")) {
      return "Fixed interest rates remain constant throughout the loan tenure, providing predictable payments but typically start higher.\n\nFloating rates change with market conditions - they may initially be lower but carry the risk of increasing later.\n\nFixed rates are better when:\n• Current rates are low\n• You prefer payment stability\n• Your budget is tight and can't handle payment increases\n\nFloating rates might save money when:\n• Interest rates are declining\n• You plan to prepay the loan early\n• You can handle some payment volatility";
    }

    // Credit score advice
    else if (query.includes("credit score") || query.includes("credit rating")) {
      return "To improve your credit score:\n\n1. Pay bills on time, every time\n2. Reduce credit utilization below 30%\n3. Don't close old credit accounts\n4. Limit new credit applications\n5. Regularly monitor your credit report for errors\n6. Diversify your credit mix\n7. Settle outstanding debts\n8. Avoid maxing out credit cards\n\nA higher credit score can help you secure loans with lower interest rates, potentially saving thousands over the life of a loan. For example, improving your score from 670 to 740 could reduce your mortgage rate by 0.5%, saving $100+ monthly on a $300,000 loan.";
    }

    // Inflation
    else if (query.includes("inflation")) {
      return "Inflation affects loans in several ways:\n\n• For borrowers with fixed-rate loans, inflation is generally beneficial as you repay the loan with money that's worth less than when you borrowed it.\n\n• For variable-rate loans, rates may increase with inflation, raising your EMI.\n\n• Inflation often leads to increased interest rates as central banks try to control rising prices.\n\n• High inflation periods may be good times to consider locking in fixed-rate loans before rates rise further.\n\nWhen planning long-term loans, it's wise to consider potential inflation impacts on your repayment capacity and build in some buffer in your budget.";
    }

    // Amortization
    else if (query.includes("amortization")) {
      return "Amortization is the process of spreading out a loan into a series of fixed payments over time. Each payment goes toward both principal and interest, with earlier payments primarily covering interest and later payments covering more principal.\n\nKey points about amortization:\n• In the early years of a loan, most of your payment goes toward interest\n• As time passes, more of each payment goes toward reducing the principal\n• An amortization schedule shows exactly how much principal and interest you pay each month\n• Extra payments toward principal can significantly change your amortization schedule and save on interest\n\nWould you like me to generate a sample amortization schedule for your loan?";
    }

    // Default response
    else {
      return "I can help you understand loan calculations, EMIs, interest rates, and more. Try asking questions like 'What is EMI?', 'Show me my EMI calculation', or 'How can I reduce my interest payments?'\n\nYou can also explore specific topics like loan prepayment, credit score improvement, or choosing between fixed and floating interest rates.";
    }
  };

  // Render typing indicator
  const renderTypingIndicator = () => {
    return (
      <div className="flex justify-start mb-4">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-2 shadow-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="bg-gray-800/70 text-gray-200 rounded-2xl rounded-tl-none border border-gray-700/50 px-4 py-3 ml-1 shadow-md backdrop-blur-sm">
              <div className="flex space-x-1.5">
                <div className="h-2.5 w-2.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
                <div className="h-2.5 w-2.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "200ms" }}></div>
                <div className="h-2.5 w-2.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "400ms" }}></div>
              </div>
            </div>
            <div className="text-xs text-gray-500 ml-3 mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(new Date())}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Icon background effect component
  const IconBackgroundEffect = ({ children }) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover:blur-xl transition-all duration-300 opacity-80 group-hover:opacity-100"></div>
      <div className="relative">{children}</div>
    </div>
  );

  // The main UI
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 bg-[radial-gradient(ellipse_at_top,rgba(40,160,150,0.15)_0,rgba(30,64,175,0.15)_50%,rgba(0,0,0,0)_80%)] pt-16">
      <div className="container mx-auto px-4 py-6 lg:py-10 relative flex flex-col h-screen max-w-6xl">

        {/* Floating particles background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full blur-sm"
              style={{
                width: `${Math.random() * 5 + 1}px`,
                height: `${Math.random() * 5 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-particle ${Math.random() * 10 + 20}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            ></div>
          ))}
        </div>

        {/* Interactive orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
        </div>

        <div className="w-full relative flex flex-col z-10">
          {/* App header */}
          <div className="text-center mb-6">
            <div className="inline-block relative">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 inline-block">
                WealthWise AI
              </h1>
              <div className="absolute -top-2 -right-8 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full transform rotate-12 font-bold flex items-center">
                <Sparkles className="h-3 w-3 mr-0.5" />
                PRO
              </div>
            </div>
            <div className="text-gray-300 text-sm mt-1 max-w-md mx-auto">Your intelligent financial companion for smarter money decisions</div>
          </div>

          <div className="relative flex-1 flex flex-col md:flex-row gap-4 h-full">
            {/* Main chat interface */}
            <div className="flex-1 h-full min-h-0 flex flex-col backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Glowing border effect */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-2xl pointer-events-none shadow-[0_0_30px_rgba(16,185,129,0.25)]"></div>

              {/* Glass reflection effects */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>

              {/* Chat Header */}
              <div className="p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-700/40 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mr-3 shadow-lg relative group">
                    <div className="absolute inset-0 rounded-xl bg-emerald-500 blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <Calculator className="h-6 w-6 text-white relative z-10" />
                    <div className="absolute -inset-0.5 rounded-xl border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg flex items-center">
                      Financial Advisor
                      <span className="ml-2 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center">
                        <BadgeCheck className="h-3 w-3 mr-0.5" />
                        AI-Powered
                      </span>
                    </h3>
                    <div className="flex items-center text-xs text-emerald-400">
                      <span className="h-2 w-2 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
                      Available 24/7
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="hidden md:block">
                    <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg px-3 py-1 border border-blue-500/30">
                      <div className="text-white font-medium">{new Date().toLocaleDateString([], { month: 'long', day: 'numeric' })}</div>
                      <div className="text-xs text-blue-300">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>

                  {/* Stats buttons */}
                  <div className="bg-gray-800/60 rounded-lg border border-gray-700/50 flex overflow-hidden">
                    <button className="px-3 py-1.5 text-sm text-white hover:bg-blue-500/20 transition-colors">
                      <span className="hidden md:inline">View </span>Stats
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div
  ref={chatContainerRef}
  className="overflow-y-auto p-4 space-y-1 bg-gradient-to-b from-gray-900/40 to-gray-900/80"
  style={{
    height: '70vh', // Static height (adjust as needed)
    maxHeight: '300px', // Maximum height to prevent overflow on smaller screens
    scrollBehavior: 'smooth',
  }}
>
  {/* Feature highlight */}
  {showFeatureHighlight && (
    <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-500/30 p-3 mb-6 relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        onClick={() => setShowFeatureHighlight(false)}
      >
        ✕
      </button>
      <h4 className="text-blue-300 font-medium mb-1 flex items-center">
        <Sparkles className="h-4 w-4 mr-1" />
        New Financial Intelligence Features
      </h4>
      <p className="text-gray-300 text-sm">
        Explore our enhanced AI advisor with personalized recommendations, real-time market insights, and interactive loan calculations.
      </p>
      <div className="flex gap-2 mt-2">
        <button className="px-3 py-1 bg-blue-500/30 rounded-lg text-blue-300 text-xs hover:bg-blue-500/50 transition-colors">
          Take Tour
        </button>
        <button className="px-3 py-1 bg-gray-800/50 rounded-lg text-gray-300 text-xs hover:bg-gray-800/70 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  )}

  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex mb-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
      style={{
        animation: 'fade-in-up 0.3s ease-out forwards',
        animationDelay: `${index * 50}ms`,
        opacity: 0,
      }}
    >
      <div className="flex items-start max-w-[85%]">
        {msg.type !== 'user' && (
          <div className="px-3 py-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-2 shadow-lg relative group">
            <div className="absolute inset-0 bg-blue-500/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Bot className="h-5 w-5 text-white relative z-10" />
          </div>
        )}
        <div>
          <div
            className={`rounded-2xl px-4 py-3 shadow-md backdrop-blur-sm ${
              msg.type === 'user'
                ? 'bg-gradient-to-r from-emerald-600/90 to-emerald-500/90 text-white rounded-tr-none ml-2 border border-emerald-400/30'
                : 'bg-gradient-to-r from-gray-800/90 to-gray-800/80 text-gray-200 rounded-tl-none border border-gray-700/50 ml-1'
            }`}
          >
            <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
          </div>
          <div className={`text-xs text-gray-500 mt-1 flex items-center ${msg.type === 'user' ? 'justify-end mr-2' : 'ml-3'}`}>
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(msg.timestamp)} • {formatDate(msg.timestamp)}
          </div>
        </div>
        {msg.type === 'user' && (
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center ml-2 shadow-lg relative group">
            <div className="absolute inset-0 bg-emerald-500/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <User className="h-5 w-5 text-white relative z-10" />
          </div>
        )}
      </div>
    </div>
  ))}
  {isLoading && renderTypingIndicator()}
</div>

              {/* Category pills */}
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-t border-gray-700/40 py-2 pl-4 pr-2 overflow-x-auto flex gap-2 no-scrollbar">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex items-center ${activeCategory === "all"
                    ? "bg-blue-500/70 text-white border border-blue-400/50"
                    : "bg-gray-800/70 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50"
                    }`}
                >
                  All Topics
                </button>

                {questionCategories.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex items-center ${activeCategory === category.name
                      ? "bg-blue-500/70 text-white border border-blue-400/50"
                      : "bg-gray-800/70 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50"
                      }`}
                  >
                    <span className="mr-1.5">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Question carousel */}
              <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 px-5 border-t border-gray-700/40">
                <div
                  ref={carouselRef}
                  className="overflow-x-hidden py-3 px-4 snap-x snap-mandatory touch-pan-x scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 relative"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div
                    className={`flex gap-2 ${isPaused ? '' : 'animate-infinite-scroll'}`}
                    style={{
                      display: 'flex',
                      width: 'max-content', // Ensure content width is sufficient
                    }}
                  >
                    {/* Duplicate questions to create seamless loop */}
                    {[...filteredQuestions, ...filteredQuestions].map((item, idx) => {
                      const category = questionCategories.find(cat => cat.name === item.category);
                      return (
                        <div
                          key={`${item.text}-${idx}`} // Unique key for duplicated items
                          onClick={() => handleQuickQuestion(item.text)}
                          className={`snap-start whitespace-nowrap px-4 py-2 bg-gradient-to-r ${category?.color || 'from-blue-600/40 to-indigo-600/40'} text-white text-sm rounded-lg ${category?.borderColor || 'border-blue-500/40'} border cursor-pointer hover:bg-blue-600/60 transition-all hover:scale-105 flex-shrink-0 shadow-lg hover:shadow-blue-500/20 hover:border-blue-400/60 backdrop-blur-sm group relative min-w-[200px]`}
                        >
                          <div className="absolute inset-0 bg-blue-400/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="relative z-10 flex items-center">
                            {category?.icon || <Sparkles className="h-3.5 w-3.5 mr-1.5 text-blue-300" />}
                            <span className="ml-1.5">{item.text}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Gradient fade effects */}
                <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-gray-900/90 to-transparent pointer-events-none z-0"></div>
                <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-gray-900/90 to-transparent pointer-events-none z-0"></div>
              </div>
              {/* Chat Input - Enhanced */}
              <div className="p-4 border-t border-gray-700/30 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md">
                <div className="flex flex-col">
                  <div className="flex items-center rounded-xl bg-gradient-to-r from-gray-800/90 to-gray-700/80 border border-gray-600/30 overflow-hidden shadow-lg group hover:border-gray-500/50 transition-all duration-300 relative">
                    {/* Input glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/10 via-blue-600/10 to-purple-600/10 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-gradient-x"></div>

                    <input
                      id="message-input"
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask anything about EMI, loans, or financial planning..."
                      className="flex-1 px-5 py-4 bg-transparent text-white focus:outline-none relative z-10 placeholder-gray-400"
                    />
                    <button
                      onClick={handleSendMessage}
                      className={`h-12 w-12 flex items-center justify-center mx-2 rounded-full transition-all duration-300 relative z-10 ${currentMessage.trim()
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                        : 'text-gray-500'}`}
                      disabled={!currentMessage.trim()}
                    >
                      <Send className={`h-5 w-5 ${currentMessage.trim() ? 'animate-pulse' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Mobile features */}
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center text-gray-300 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-emerald-300">
                    <BarChart4 className="h-4 w-4 mr-1.5 text-blue-400" />
                    Smart Financial Analysis
                  </div>

                  <div className="flex items-center justify-center flex-wrap gap-4 mt-4">
                    <div className="flex items-center text-gray-300 text-xs hover:text-emerald-300 transition-colors group">
                      <IconBackgroundEffect>
                        <RefreshCcw className="h-4 w-4 mr-1.5 text-emerald-500 group-hover:text-emerald-300 transition-colors" />
                      </IconBackgroundEffect>
                      <span className="hidden sm:inline">Real-time</span> Calculations
                    </div>
                    <div className="flex items-center text-gray-300 text-xs hover:text-blue-300 transition-colors group">
                      <IconBackgroundEffect>
                        <PieChart className="h-4 w-4 mr-1.5 text-blue-500 group-hover:text-blue-300 transition-colors" />
                      </IconBackgroundEffect>
                      <span className="hidden sm:inline">Interactive</span> Insights
                    </div>
                    <div className="flex items-center text-gray-300 text-xs hover:text-purple-300 transition-colors group">
                      <IconBackgroundEffect>
                        <Sparkles className="h-4 w-4 mr-1.5 text-purple-500 group-hover:text-purple-300 transition-colors" />
                      </IconBackgroundEffect>
                      <span className="hidden sm:inline">Personalized</span> Advice
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating mobile action button - only visible on mobile */}
      {isMobile && (
        <div className="fixed bottom-6 right-6 z-20">
          <button className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Calculator className="h-6 w-6 text-white" />
          </button>
        </div>
      )}

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll 60s linear infinite; /* Increased from 30s to 60s */
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}
      </style>
    </div>
  );
};

export default AiFinancialChat;