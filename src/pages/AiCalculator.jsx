// src/components/AiCalculator.js
import React, { useState, useEffect, useRef } from "react";
import {
  User, Send, Calculator, Clock, Bot, RefreshCcw, MessageCircle,
  Sparkles, DollarSign, TrendingUp, PieChart,
  Shield, Award, Wallet, CreditCard,
  ArrowUpRight, BadgeCheck, Info, Star, Menu,
  ChevronDown, CheckCircle, Zap,
  Brain, Target, BarChart3, Globe, Mic, Image,
  Settings, Search, Plus, ArrowRight, TrendingDown,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickActions from "../components/QuickAction";
import { sendMessageToAPI, handleDownload as apiHandleDownload } from '../utils/api.jsx';
import '../styles/AiCalculator.css';

// Updated LoanManualButton component with console.log
const LoanManualButton = ({ parameters }) => {
  const navigate = useNavigate();

  const handleManualClick = () => {
    if (!parameters) {
      console.error("No parameters available for manual adjustment.");
      return;
    }
    // Log the parameters to the console
    console.log("Loan Parameters:", parameters);
    // Navigate to /manual and pass parameters as state
    navigate('/manual', { state: { ...parameters } });
  };

  return (
    <button
      onClick={handleManualClick}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
      disabled={!parameters}
    >
      <Settings className="h-4 w-4" />
      Manual Adjustment
    </button>
  );
};

// Rest of the AiCalculator component remains unchanged
const AiCalculator = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "Welcome to WealthWise AI! I'm your advanced financial companion, ready to help you navigate the complex world of finance. Whether it's EMI calculations, investment strategies, or financial planning - I've got you covered!",
      timestamp: new Date(Date.now() - 300000),
      suggestions: [
        "Calculate my home loan EMI",
        "Best investment options for 2024",
        "How to improve credit score?",
        "Tax saving strategies"
      ]
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const chatContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Trending topics with dynamic styling
  const trendingTopics = [
    { text: "Mutual Fund SIP strategies", trend: "up", percentage: "+15%" },
    { text: "Fixed deposit vs equity", trend: "down", percentage: "-8%" },
    { text: "Home loan prepayment benefits", trend: "up", percentage: "+23%" },
    { text: "Crypto investment risks", trend: "up", percentage: "+42%" },
    { text: "PPF vs ELSS comparison", trend: "down", percentage: "-5%" },
    { text: "Emergency fund planning", trend: "up", percentage: "+18%" }
  ];

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle Excel file download using the /download endpoint
  const handleDownload = async (filename, dataType, parameters) => {
    try {
      setIsLoading(true);
      await apiHandleDownload(filename, dataType, parameters);
    } catch (error) {
      console.error(`Download Error for ${filename}:`, error.message);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "assistant",
          content: `Sorry, there was an issue downloading the file: ${error.message}. Please try again or contact support.`,
          timestamp: new Date(),
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: currentMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const apiResponse = await sendMessageToAPI(userMessage.content, sessionId);
      
      if (apiResponse.session_id && !sessionId) {
        setSessionId(apiResponse.session_id);
      }

      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: apiResponse.response.message,
        response: apiResponse.response,
        timestamp: new Date(),
        modelUsed: apiResponse.model_used
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: "I apologize, but I'm experiencing connectivity issues. Please try again in a moment.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    setCurrentMessage(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render structured API response content
  const renderStructuredContent = (response) => {
    if (!response) return null;

    const { message, data, additional_info, download_options } = response;
    // Define allowed query types for download button
    const allowedDownloadTypes = ['emi_schedule', 'transaction_history', 'investment_portfolio'];

    return (
      <div className="mt-4 space-y-4">
        {/* Main Content Section */}
        {data && data.content && (
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-4 border border-blue-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <h4 className="text-blue-300 font-semibold text-sm">Analysis</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{data.content}</p>
          </div>
        )}

        {/* Details Section */}
        {data && data.details && Array.isArray(data.details) && data.details.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl p-4 border border-emerald-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <h4 className="text-emerald-300 font-semibold text-sm">Key Insights</h4>
            </div>
            <div className="space-y-3">
              {data.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-xl">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Download Options Section */}
        {download_options &&
          download_options.available &&
          Array.isArray(download_options.data_types) &&
          download_options.data_types.length > 0 &&
          download_options.data_types.some(dataType => allowedDownloadTypes.includes(dataType.type)) && (
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-4 border border-purple-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Download className="h-4 w-4 text-purple-300" />
                <h4 className="text-purple-300 font-semibold text-sm">Download Options</h4>
              </div>
              <div className="space-y-3">
                {download_options.data_types.map((dataType, index) => (
                  allowedDownloadTypes.includes(dataType.type) && (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-xl">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm font-semibold">{dataType.description}</p>
                        <p className="text-gray-400 text-xs">{dataType.contains}</p>
                        <div className="mt-2 flex gap-3">
                          <button
                            onClick={() => handleDownload(dataType.filename, dataType.type, dataType.parameters)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                            disabled={isLoading || !dataType.parameters}
                          >
                            <Download className="h-4 w-4" />
                            Download {download_options.formats && Array.isArray(download_options.formats) && download_options.formats.length > 0 ? download_options.formats[0] : "File"}
                          </button>

                          {dataType.type === 'emi_schedule' && (
                            <LoanManualButton parameters={dataType.parameters} />
                          )}
                        </div>
                        {!dataType.parameters && (
                          <p className="text-red-400 text-xs mt-2">Download parameters not available. Contact support.</p>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

        {/* Additional Info Section */}
        {/* {additional_info && (
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-4 border border-purple-500/20 backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-purple-300 mt-0.5 flex-shrink-0" />
              <p className="text-purple-200 text-sm leading-relaxed">{additional_info}</p>
            </div>
          </div>
        )} */}
      </div>
    );
  };

  const renderMessage = (message) => {
    const isUser = message.type === "user";
    
    return (
      <div key={message.id} className={`flex gap-4 mb-6 ${isUser ? 'flex-row-reverse' : ''} animate-fadeInUp`}>
        <div className={`relative flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/25' 
            : 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-500/25'
        }`}>
          <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm"></div>
          {isUser ? (
            <User className="h-6 w-6 text-white relative z-10" />
          ) : (
            <Bot className="h-6 w-6 text-white relative z-10" />
          )}
          <div className={`absolute -inset-1 rounded-2xl blur-md ${
            isUser ? 'bg-cyan-400/20' : 'bg-emerald-400/20'
          } animate-pulse`}></div>
        </div>

        <div className={`flex-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-3xl px-6 py-4 backdrop-blur-sm border ${
            isUser 
              ? 'bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white border-cyan-400/30 ml-auto shadow-lg shadow-cyan-500/10'
              : message.isError
                ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-200 border-red-500/30 shadow-lg shadow-red-500/10'
                : 'bg-gray-800/80 text-gray-100 border-gray-700/50 shadow-lg shadow-gray-900/20'
          }`}>
            <p className="text-sm leading-relaxed">{message.content}</p>
            
            {!isUser && message.response && renderStructuredContent(message.response)}
            
            {!isUser && message.modelUsed && (
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <Sparkles className="h-3 w-3" />
                <span>Powered by {message.modelUsed}</span>
              </div>
            )}

            {!isUser && message.suggestions && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-3">Try these:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(suggestion)}
                      className="text-left p-3 text-sm text-cyan-300 hover:text-white hover:bg-cyan-500/20 rounded-xl transition-all border border-cyan-500/20 hover:border-cyan-400/40 group"
                    >
                      <div className="flex items-center justify-between">
                        <span>{suggestion}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className={`flex items-center gap-1 mt-2 text-xs text-gray-500 ${
            isUser ? 'justify-end' : 'justify-start'
          }`}>
            <Clock className="h-3 w-3" />
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex h-screen">
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-4 left-4 z-50 p-3 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:bg-gray-700/80 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'} w-80 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800/50 flex flex-col transition-transform duration-300 ${
          isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
        }`}>
          {isMobile && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          <div className="relative z-40 flex flex-col h-full">
            <div className="p-6 border-b border-gray-800/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 relative">
                  <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm"></div>
                  <Brain className="h-8 w-8 text-white relative z-10" />
                  <div className="absolute -inset-1 rounded-2xl blur-md bg-cyan-400/20 animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    WealthWise AI
                  </h1>
                  <p className="text-gray-400 text-sm">Advanced Financial Intelligence</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-emerald-300 font-medium">AI Online</span>
                </div>
                {sessionId && (
                  <div className="text-xs text-gray-500">
                    Session: {sessionId.slice(-6)}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                Quick Actions
              </h3>
              <QuickActions onAction={handleQuickAction} />
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                Trending Topics
              </h3>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(topic.text)}
                    className="w-full text-left p-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all group border border-transparent hover:border-gray-700/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1">{topic.text}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${
                          topic.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {topic.percentage}
                        </span>
                        {topic.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-green-400" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-400" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-gray-900/40 backdrop-blur-sm">
          <div className="p-6 border-b border-gray-800/50 bg-gray-900/60 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Financial Consultation</h2>
                    <p className="text-gray-400 text-sm">AI-powered financial guidance</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-xl border border-blue-500/30">
                  <BadgeCheck className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Verified AI</span>
                </div>
                <div className="text-right hidden md:block">
                  <div className="text-sm font-medium text-white">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-1"
            style={{ maxHeight: 'calc(100vh - 200px)' }}
          >
            {messages.map(renderMessage)}
            
            {isLoading && (
              <div className="flex gap-4 mb-6 animate-fadeInUp">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 relative">
                  <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm"></div>
                  <Bot className="h-6 w-6 text-white relative z-10" />
                  <div className="absolute -inset-1 rounded-2xl blur-md bg-emerald-400/20 animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/80 border border-gray-700/50 rounded-3xl px-6 py-4 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-gray-400 ml-2">AI is analyzing your query...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-800/50 bg-gray-900/60 backdrop-blur-xl">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask me anything about EMI, loans, investments, or financial planning..."
                    className="w-full p-2 pr-12 bg-gray-800/60 border border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none text-white placeholder-gray-400 backdrop-blur-sm transition-all"
                    rows="3"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {currentMessage.length}/1000
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-yellow-400" />
                      <span>Advanced AI</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-green-400" />
                      <span>Secure & Private</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 hidden sm:block">
                    Press Enter to send • Shift+Enter for new line
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className={`p-4 rounded-2xl transition-all ${
                  currentMessage.trim() && !isLoading
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105'
                    : 'bg-gray-800/60 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <RefreshCcw className="h-6 w-6 animate-spin" />
                ) : (
                  <Send className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiCalculator;