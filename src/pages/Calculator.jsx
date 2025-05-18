import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EMIPage from "./Emi";
import {
  Calculator,
  ChevronRight,
  CreditCard,
  DollarSign,
  Home,
  PieChart,
  BarChart,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  Star
} from "lucide-react";

const EMICalculator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [hoverButton, setHoverButton] = useState(null);

  // Animation for features
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleFeatures([0, 1, 2, 3]);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // FAQ accordion logic
  const [activeFaq, setActiveFaq] = useState(null);

  const faqItems = [
    {
      question: "What is an EMI?",
      answer: "EMI stands for Equated Monthly Installment. It's the fixed amount you pay each month towards repaying your loan. It includes both principal and interest components."
    },
    {
      question: "How is EMI calculated?",
      answer: "EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the principal amount, r is the monthly interest rate, and n is the loan tenure in months."
    },
    {
      question: "What factors affect my EMI amount?",
      answer: "The principal loan amount, interest rate, and loan tenure are the three main factors that affect your EMI. A higher loan amount or interest rate increases your EMI, while a longer tenure reduces it."
    },
    {
      question: "Which is better: lower EMI or shorter loan tenure?",
      answer: "It depends on your financial situation. Lower EMIs make monthly payments more manageable but increase the total interest paid over time. Shorter tenures mean higher EMIs but lower overall interest costs."
    }
  ];

  const advantages = [
    {
      icon: <Clock className="h-6 w-6 text-indigo-400" />,
      title: "Predictable Payments",
      description: "Know exactly how much you need to pay each month, making budgeting easier"
    },
    {
      icon: <PieChart className="h-6 w-6 text-indigo-400" />,
      title: "Financial Planning",
      description: "Plan your finances better with fixed monthly payments throughout the loan term"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-indigo-400" />,
      title: "Build Credit Score",
      description: "Regular EMI payments can help improve your credit score over time"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-indigo-400" />,
      title: "Asset Acquisition",
      description: "Purchase high-value assets without paying the entire amount upfront"
    }
  ];

  const disadvantages = [
    {
      icon: <AlertCircle className="h-6 w-6 text-red-400" />,
      title: "Interest Burden",
      description: "You end up paying more than the actual value of the asset due to interest"
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-red-400" />,
      title: "Long-term Commitment",
      description: "You're committed to paying EMIs for the entire loan tenure, which can be several years"
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-red-400" />,
      title: "Prepayment Penalties",
      description: "Some loans have penalties for paying off the loan before the tenure ends"
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-red-400" />,
      title: "Financial Strain",
      description: "High EMIs can strain your monthly budget and affect your financial flexibility"
    }
  ];

  // Tab labels
  const tabs = ["About EMI", "Advantages", "Disadvantages", "Calculate"];

  // Animation for the hero section
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.2)_0,rgba(59,130,246,0.1)_25%,rgba(0,0,0,0)_50%)] pt-16 pb-16">
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-indigo-800/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,25,35,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(25,25,35,0.8)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_70%)] opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className={`relative mb-16 transition-all duration-1000 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative backdrop-blur-xl bg-black/40 border border-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl">
            {/* Glowing border effect */}
            <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-3xl pointer-events-none shadow-[0_0_30px_rgba(79,70,229,0.3)]"></div>

            {/* Glass reflection effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"></div>
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-indigo-400/40 via-indigo-500/20 to-transparent"></div>

            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <div className="inline-flex items-center justify-center mb-5 relative">
                  <div className="absolute inset-0 bg-indigo-600/20 blur-2xl rounded-full"></div>
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-2xl shadow-indigo-700/40 relative z-10">
                    <Calculator className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent pb-2 animate-text-shimmer">
                  Smart EMI Calculator
                </h1>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Take control of your finances with our advanced EMI calculator. Plan your loans, track payments, and make informed financial decisions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate('/manual')}
                    onMouseEnter={() => setHoverButton('manual')}
                    onMouseLeave={() => setHoverButton(null)}
                    className="relative group px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium transition-all duration-300 shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50"
                  >
                    <span className="relative z-10 flex items-center">
                      Manual Calculator
                      <ChevronRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${hoverButton === 'manual' ? 'translate-x-1' : ''}`} />
                    </span>
                  </button>
                  <button
                    onClick={() => navigate('/ai')}
                    onMouseEnter={() => setHoverButton('ai')}
                    onMouseLeave={() => setHoverButton(null)}
                    className="relative group px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-medium transition-all duration-300 shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50"
                  >
                    <span className="relative z-10 flex items-center">
                      AI Assistant
                      <Sparkles className={`ml-2 h-5 w-5 transition-all duration-300 ${hoverButton === 'ai' ? 'scale-110' : ''}`} />
                    </span>
                  </button>
                </div>
              </div>

              <div className="md:w-1/2 relative">
                <div className="aspect-square w-full max-w-md mx-auto relative">
                  {/* Animated chart visualization */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 flex justify-around items-end p-6">
                      {[1, 0.7, 1.3, 0.9, 1.1, 0.8, 1.2].map((height, index) => (
                        <div
                          key={index}
                          className="w-1/12 bg-gradient-to-t from-indigo-600 to-blue-400 rounded-t-sm"
                          style={{
                            height: `${height * 100}%`,
                            animation: `grow 2s ease-out ${index * 0.2}s forwards`,
                            opacity: 0,
                            transform: 'scaleY(0)',
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Circular progress indicator */}
                    <div className="absolute top-6 left-6 w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50" cy="50" r="45"
                          fill="none"
                          stroke="rgba(99, 102, 241, 0.2)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50" cy="50" r="45"
                          fill="none"
                          stroke="rgba(99, 102, 241, 1)"
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset="100"
                          className="origin-center -rotate-90"
                          style={{ animation: "progressCircle 2s ease-out forwards" }}
                        />
                        <text
                          x="50" y="55"
                          textAnchor="middle"
                          fill="white"
                          fontSize="16"
                          fontWeight="bold"
                          className="animate-fadeIn"
                        >
                          65%
                        </text>
                      </svg>
                    </div>

                    {/* Dollar signs floating animation */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-indigo-400 opacity-0"
                        style={{
                          right: `${10 + (i * 15)}%`,
                          top: '70%',
                          animation: `float 10s linear ${i * 1.5}s infinite`
                        }}
                      >
                        <DollarSign className="h-6 w-6" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fadeIn">
          <EMIPage />
        </div>


        {/* Tabs navigation */}
        {/* <div className={`mb-8 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="backdrop-blur-md bg-black/30 rounded-2xl p-2 border border-indigo-500/20 shadow-lg">
            <div className="flex flex-wrap">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-3 text-sm md:text-base font-medium rounded-xl transition-all duration-300 ${activeTab === index
                    ? "bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-indigo-900/30"
                    } flex-1 text-center`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div> */}

        {/* Tab content */}
        <div className={`transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* <div className="backdrop-blur-xl bg-black/40 border border-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl p-8">
         
            {activeTab === 0 && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent mb-6">
                  Understanding EMI Calculations
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      EMI (Equated Monthly Installment) is the fixed payment amount you make each month towards repaying a loan. It's designed to make loan repayment manageable by breaking down the total amount into equal monthly payments.
                    </p>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Each EMI payment comprises two parts: principal amount and interest amount. In the initial months, a larger portion goes towards interest, while in later months, more goes towards reducing the principal.
                    </p>
                    <div className="mb-6 p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/30">
                      <h3 className="text-xl font-semibold text-indigo-400 mb-2">The EMI Formula</h3>
                      <p className="text-gray-300 italic">
                        EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
                      </p>
                      <ul className="mt-2 text-gray-400 space-y-1">
                        <li>P = Principal loan amount</li>
                        <li>r = Monthly interest rate (Annual rate ÷ 12 ÷ 100)</li>
                        <li>n = Loan tenure in months</li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-blue-900/30 rounded-2xl"></div>
                    <div className="relative p-6 rounded-2xl border border-indigo-500/30">
                      <h3 className="text-xl font-semibold text-indigo-400 mb-4">Factors Affecting Your EMI</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 h-5 w-5 text-indigo-500">
                            <DollarSign className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Loan Amount</h4>
                            <p className="text-gray-400 text-sm">Higher loan amounts result in higher EMIs</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 h-5 w-5 text-indigo-500">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Interest Rate</h4>
                            <p className="text-gray-400 text-sm">Higher interest rates increase your EMI amount</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 h-5 w-5 text-indigo-500">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Loan Tenure</h4>
                            <p className="text-gray-400 text-sm">Longer tenures reduce EMI but increase total interest paid</p>
                          </div>
                        </li>
                      </ul>

                      <div className="mt-6 flex justify-center">
                        <div className="relative w-48 h-48">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              cx="50" cy="50" r="45"
                              fill="none"
                              stroke="#1e3a8a"
                              strokeWidth="10"
                            />
                            <circle
                              cx="50" cy="50" r="45"
                              fill="none"
                              stroke="#4f46e5"
                              strokeWidth="10"
                              strokeDasharray="283"
                              strokeDashoffset="169.8"
                              className="origin-center -rotate-90"
                            />
                            <text
                              x="50" y="45"
                              textAnchor="middle"
                              fill="white"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              EMI
                            </text>
                            <text
                              x="50" y="65"
                              textAnchor="middle"
                              fill="white"
                              fontSize="8"
                            >
                              DISTRIBUTION
                            </text>
                          </svg>
                          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 text-xs">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-indigo-600 rounded-full mr-1"></div>
                              <span className="text-gray-300">Principal (60%)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-900 rounded-full mr-1"></div>
                              <span className="text-gray-300">Interest (40%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent mb-6">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                      <div
                        key={index}
                        className="border border-indigo-500/20 rounded-xl overflow-hidden transition-all duration-300"
                      >
                        <button
                          className="w-full p-4 flex justify-between items-center text-left bg-indigo-900/20 hover:bg-indigo-900/30 transition-colors"
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        >
                          <span className="font-medium text-white">{faq.question}</span>
                          <ChevronRight
                            className={`h-5 w-5 text-indigo-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-90' : ''}`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 p-4' : 'max-h-0'
                            }`}
                        >
                          <p className="text-gray-300">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent mb-6">
                  Advantages of EMI-Based Loans
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      EMI-based loans offer numerous benefits that make them a popular choice for financing large purchases or investments. Here are some key advantages:
                    </p>
                    <div className="grid grid-cols-1 gap-6">
                      {advantages.map((item, index) => (
                        <div
                          key={index}
                          className={`p-5 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/30 to-blue-900/20 backdrop-blur-sm transition-all duration-500 transform ${visibleFeatures.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        >
                          <div className="flex items-start">
                            <div className="mr-4 p-2 bg-indigo-900/50 rounded-lg">
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                              <p className="text-gray-300 text-sm">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-6 p-5 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 to-blue-900/30">
                      <h3 className="text-xl font-semibold text-indigo-400 mb-3">Strategic Benefits</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">Access to larger amounts than might be available through savings</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">Option to choose a repayment period that suits your financial situation</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">Protection against inflation for long-term purchases</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">Tax benefits on certain types of loans (e.g., home loans)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-blue-900/30 to-indigo-900/30">
                      <h3 className="text-xl font-semibold text-indigo-400 mb-3">Case Study: Home Loan</h3>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Loan Amount</span>
                          <span className="text-white font-medium">$300,000</span>
                        </div>
                        <div className="w-full bg-gray-700/30 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Interest Rate</span>
                          <span className="text-white font-medium">4.5% p.a.</span>
                        </div>
                        <div className="w-full bg-gray-700/30 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Tenure</span>
                          <span className="text-white font-medium">20 years</span>
                        </div>
                        <div className="w-full bg-gray-700/30 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full" style={{ width: '66%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-6 p-3 bg-indigo-900/30 rounded-lg border border-indigo-500/20">
                        <div>
                          <p className="text-sm text-gray-400">Monthly EMI</p>
                          <p className="text-xl font-bold text-white">$1,897.95</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total Interest</p>
                          <p className="text-lg font-medium text-indigo-400">$155,507.80</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent mb-6">
                  Potential Drawbacks of EMIs
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      While EMIs make large purchases accessible, they also come with certain disadvantages that borrowers should carefully consider before committing:
                    </p>
                    <div className="grid grid-cols-1 gap-6">
                      {disadvantages.map((item, index) => (
                        <div
                          key={index}
                          className={`p-5 rounded-xl border border-red-500/30 bg-gradient-to-br from-red-900/20 to-indigo-900/20 backdrop-blur-sm transition-all duration-500 transform ${visibleFeatures.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                          <div className="flex items-start">
                            <div className="mr-4 p-2 bg-red-900/50 rounded-lg">
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                              <p className="text-gray-300 text-sm">{item.description}</p>
                            </div>
                          </div>
                        </div>))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-6 p-5 rounded-xl border border-red-500/30 bg-gradient-to-br from-red-900/30 to-indigo-900/20">
                      <h3 className="text-xl font-semibold text-red-400 mb-3">Common Misconceptions</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">"Zero-interest EMIs" often include processing fees and other hidden charges</span>
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">Lower EMIs don't always mean better financial decisions</span>
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">Taking multiple EMI loans can severely impact your credit score if not managed properly</span>
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">EMIs can create a false sense of affordability for items beyond your actual budget</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl border border-red-500/30 bg-gradient-to-br from-indigo-900/30 to-red-900/20">
                      <h3 className="text-xl font-semibold text-red-400 mb-3">Long-Term Financial Impact</h3>
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <div className="mr-3 w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-gray-300">EMIs can consume 30-50% of monthly income</span>
                        </div>
                        <div className="w-full bg-gray-700/30 rounded-full h-2">
                          <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <div className="mr-3 w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-gray-300">Reduces financial flexibility for emergencies</span>
                        </div>
                        <div className="w-full bg-gray-700/30 rounded-full h-2">
                          <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <div className="mr-3 w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-gray-300">Can delay important financial goals like retirement savings</span>
                        </div>
                        <div className="w-full bg-gray-700/30 rounded-full h-2">
                          <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-6 p-3 bg-red-900/20 rounded-lg border border-red-500/20">
                        <div>
                          <p className="text-sm text-gray-400">Recommended EMI Cap</p>
                          <p className="text-xl font-bold text-white">30%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">of Monthly Income</p>
                          <p className="text-lg font-medium text-red-400">for all loans combined</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent mb-6">
                  Calculate Your EMI
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <EMICalculatorForm />
                  </div>
                  <div>
                    <div className="backdrop-blur-md bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30 h-full">
                      <h3 className="text-xl font-semibold text-indigo-400 mb-4">EMI Breakdown</h3>
                      <EMIResults />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div> */}

          {/* FAQ Section */}
          {/* <div className="mt-12">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="border border-indigo-500/20 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    className="w-full p-4 flex justify-between items-center text-left bg-indigo-900/20 hover:bg-indigo-900/30 transition-colors"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <ChevronRight
                      className={`h-5 w-5 text-indigo-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-90' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 p-4' : 'max-h-0'
                      }`}
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grow {
          from {
            opacity: 0;
            transform: scaleY(0);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }
        
        @keyframes progressCircle {
          from {
            stroke-dashoffset: 283;
          }
          to {
            stroke-dashoffset: 100;
          }
        }
        
        @keyframes float {
          0% {
            opacity: 0;
            transform: translateY(0px);
          }
          10% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateY(-100px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// EMI Calculator Form Component
const EMICalculatorForm = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTenure, setLoanTenure] = useState(5);
  const [loanType, setLoanType] = useState("personal");

  // Update calculated values
  useEffect(() => {
    calculateEMI(loanAmount, interestRate, loanTenure);
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = (principal, rate, time) => {

  };

  const handleSliderChange = (setter) => (e) => {
    setter(parseFloat(e.target.value));
  };

  return (
    <div className="backdrop-blur-md bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-white">Loan Type</label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${loanType === "personal"
              ? "bg-indigo-600 border-indigo-400"
              : "bg-indigo-900/40 border-indigo-500/30 hover:bg-indigo-900/60"
              } border text-center`}
            onClick={() => setLoanType("personal")}
          >
            <CreditCard className="h-5 w-5 mb-1 text-indigo-300" />
            <span className="text-sm text-gray-200">Personal</span>
          </button>
          <button
            className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${loanType === "home"
              ? "bg-indigo-600 border-indigo-400"
              : "bg-indigo-900/40 border-indigo-500/30 hover:bg-indigo-900/60"
              } border text-center`}
            onClick={() => setLoanType("home")}
          >
            <Home className="h-5 w-5 mb-1 text-indigo-300" />
            <span className="text-sm text-gray-200">Home</span>
          </button>
          <button
            className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${loanType === "car"
              ? "bg-indigo-600 border-indigo-400"
              : "bg-indigo-900/40 border-indigo-500/30 hover:bg-indigo-900/60"
              } border text-center`}
            onClick={() => setLoanType("car")}
          >
            <DollarSign className="h-5 w-5 mb-1 text-indigo-300" />
            <span className="text-sm text-gray-200">Car</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-white">Loan Amount</label>
          <span className="text-indigo-300 font-medium">${loanAmount.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={loanAmount}
          onChange={handleSliderChange(setLoanAmount)}
          className="w-full h-2 bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">$1,000</span>
          <span className="text-xs text-gray-400">$1,000,000</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-white">Interest Rate (% p.a.)</label>
          <span className="text-indigo-300 font-medium">{interestRate}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={interestRate}
          onChange={handleSliderChange(setInterestRate)}
          className="w-full h-2 bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">1%</span>
          <span className="text-xs text-gray-400">20%</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-white">Loan Tenure (years)</label>
          <span className="text-indigo-300 font-medium">{loanTenure} {loanTenure === 1 ? 'year' : 'years'}</span>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={loanTenure}
          onChange={handleSliderChange(setLoanTenure)}
          className="w-full h-2 bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">1 year</span>
          <span className="text-xs text-gray-400">30 years</span>
        </div>
      </div>

      <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50 flex items-center justify-center">
        <Calculator className="h-5 w-5 mr-2" />
        Calculate EMI
      </button>
    </div>
  );
};

// EMI Results Component
const EMIResults = () => {
  // This would typically receive results via props or access a global state
  const monthlyEMI = 2012.46;
  const totalAmount = 120747.60;
  const totalInterest = 20747.60;
  const principal = 100000;

  // Sample data for the chart
  const paymentBreakdown = [
    { name: "Principal", value: principal, color: "#4f46e5" },
    { name: "Interest", value: totalInterest, color: "#1e3a8a" }
  ];

  return (
    <div>
      <div className="mb-8 p-4 bg-indigo-600/20 rounded-lg border border-indigo-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Monthly EMI</p>
            <p className="text-3xl font-bold text-white">${monthlyEMI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-indigo-600/30 flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-indigo-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
          <p className="text-sm text-gray-400 mb-1">Total Principal</p>
          <p className="text-lg font-semibold text-white">${principal.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
          <p className="text-sm text-gray-400 mb-1">Total Interest</p>
          <p className="text-lg font-semibold text-indigo-400">${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3">Payment Breakdown</p>
        <div className="relative h-6 w-full rounded-full overflow-hidden bg-indigo-900/30">
          <div
            className="absolute top-0 left-0 h-full bg-indigo-600"
            style={{ width: `${(principal / totalAmount) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-full mr-1"></div>
            <span className="text-gray-300">Principal ({Math.round((principal / totalAmount) * 100)}%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-900 rounded-full mr-1"></div>
            <span className="text-gray-300">Interest ({Math.round((totalInterest / totalAmount) * 100)}%)</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/30 mb-6">
        <p className="text-sm text-gray-400 mb-1">Total Amount Payable</p>
        <p className="text-xl font-bold text-white">${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>

      <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50 flex items-center justify-center">
        <Sparkles className="h-5 w-5 mr-2" />
        Get Personalized Advice
      </button>
    </div>
  );
};

export default EMICalculator;