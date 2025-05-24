import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Calculator, 
  PieChart, 
  TrendingUp, 
  CreditCard, 
  FileText, 
  Settings, 
  User, 
  Home,
  DollarSign,
  BarChart3,
  Calendar,
  Target,
  ChevronRight
} from 'lucide-react';
import ManualCalculator from './ManualCalculator';

const Dashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeMenu, setActiveMenu] = useState('calculator');
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const menuItems = [
    { 
      id: 'dashboard', 
      icon: Home, 
      label: 'Dashboard', 
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      description: 'Overview'
    },
    { 
      id: 'calculator', 
      icon: Calculator, 
      label: 'EMI Calculator', 
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      description: 'Calculate EMI'
    },
    { 
      id: 'loans', 
      icon: CreditCard, 
      label: 'My Loans', 
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      description: 'Loan Management'
    },
    { 
      id: 'analytics', 
      icon: BarChart3, 
      label: 'Analytics', 
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      description: 'Data Insights'
    },
    { 
      id: 'reports', 
      icon: FileText, 
      label: 'Reports', 
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-500/10 to-pink-500/10',
      description: 'Financial Reports'
    },
    { 
      id: 'goals', 
      icon: Target, 
      label: 'Financial Goals', 
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-500/10 to-purple-500/10',
      description: 'Set & Track Goals'
    },
  ];

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi;
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - loanAmount;

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-4 -right-4 h-24 w-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <DollarSign className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-blue-100 text-sm mb-1">Total Loans</p>
                  <p className="text-3xl font-bold">₹12,50,000</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-4 -right-4 h-24 w-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Calendar className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-emerald-100 text-sm mb-1">Monthly EMI</p>
                  <p className="text-3xl font-bold">₹45,678</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-4 -right-4 h-24 w-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <CreditCard className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-purple-100 text-sm mb-1">Active Loans</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-4 -right-4 h-24 w-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Target className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-orange-100 text-sm mb-1">Savings Goal</p>
                  <p className="text-3xl font-bold">75%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold mb-6 text-white">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">EMI Payment Processed</p>
                      <p className="text-sm text-gray-400">Home Loan - ₹25,000</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Calculator className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">New Loan Calculation</p>
                      <p className="text-sm text-gray-400">Car Loan - ₹8,00,000</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'calculator':
        return (
          <div className="space-y-8">
            <div>
              < ManualCalculator/>
            </div>
          </div>
        );
        
      case 'loans':
        return (
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-semibold mb-6 text-white">My Active Loans</h3>
              <div className="space-y-6">
                <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-6 hover:bg-gray-700/40 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-white text-lg">Home Loan</h4>
                      <p className="text-sm text-gray-400">HDFC Bank</p>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs border border-emerald-500/30">Active</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Principal</p>
                      <p className="font-semibold text-white">₹25,00,000</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">EMI</p>
                      <p className="font-semibold text-white">₹25,000</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Rate</p>
                      <p className="font-semibold text-white">8.5%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Remaining</p>
                      <p className="font-semibold text-white">15 years</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-6 hover:bg-gray-700/40 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-white text-lg">Car Loan</h4>
                      <p className="text-sm text-gray-400">SBI Bank</p>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs border border-emerald-500/30">Active</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Principal</p>
                      <p className="font-semibold text-white">₹8,00,000</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">EMI</p>
                      <p className="font-semibold text-white">₹15,678</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Rate</p>
                      <p className="font-semibold text-white">9.2%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Remaining</p>
                      <p className="font-semibold text-white">3 years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">
              {menuItems.find(item => item.id === activeMenu)?.label}
            </h3>
            <p className="text-gray-400">This section is under development. Stay tuned for updates!</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      {/* Sidebar */}
      <div className={`bg-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 ease-in-out ${
        sidebarExpanded ? 'w-80' : 'w-20'
      } flex flex-col relative`}>
        {/* Sidebar Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="absolute top-20 left-4 h-32 w-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-4 h-24 w-24 bg-purple-500/10 rounded-full blur-2xl"></div>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50 relative z-10">
          <div className="flex items-center justify-between">
            {sidebarExpanded && (
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="font-bold text-xl text-white">EMI Pro</span>
                  <p className="text-xs text-gray-400">Financial Calculator</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-3 rounded-xl hover:bg-gray-700/50 transition-all duration-200 group border border-gray-700/30"
            >
              {sidebarExpanded ? 
                <X className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" /> : 
                <Menu className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
              }
            </button>
          </div>
        </div>
        
        {/* Menu Items */}
        <nav className="flex-1 py-4 space-y-1 relative z-10">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${item.bgGradient} border border-gray-600/50 shadow-lg`
                    : 'hover:bg-gray-700/30 border border-transparent hover:border-gray-600/30'
                }`}
              >
                <div className={`flex items-center p-4 ${sidebarExpanded ? 'space-x-4' : 'justify-center'}`}>
                  <div className={`relative flex items-center justify-center rounded-xl transition-all duration-300 ${
                    sidebarExpanded ? 'h-12 w-12' : 'h-10 w-10'
                  } ${
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                      : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                  }`}>
                    <IconComponent className={`${sidebarExpanded ? 'h-6 w-6' : 'h-5 w-5'} text-white transition-all duration-300`} />
                    {isActive && (
                      <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                    )}
                  </div>
                  
                  {sidebarExpanded && (
                    <div className="flex-1 text-left">
                      <span className={`font-semibold block transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {item.label}
                      </span>
                      <span className={`text-xs transition-colors duration-200 ${
                        isActive ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'
                      }`}>
                        {item.description}
                      </span>
                    </div>
                  )}
                  
                  {sidebarExpanded && isActive && (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b ${item.gradient} rounded-r-full`}></div>
                )}
              </button>
            );
          })}
        </nav>
        
        {/* User Profile Section */}
        {sidebarExpanded && (
          <div className="p-4 border-t border-gray-700/50 relative z-10">
            <div className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/30">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">John Doe</p>
                  <p className="text-xs text-gray-400">Premium User</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {menuItems.find(item => item.id === activeMenu)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-400 mt-1">
                {activeMenu === 'calculator' ? 'Calculate your EMI and plan your finances' : 
                 activeMenu === 'dashboard' ? 'Welcome back! Here\'s your financial overview' :
                 'Manage your financial journey'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-gray-800"></div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto p-5">
          {renderContent()}
        </main>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #06d6a0);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
          border: 2px solid white;
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #06d6a0);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;