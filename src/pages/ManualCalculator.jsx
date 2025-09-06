import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Added import for useLocation
import {
  CreditCard,
  Calendar,
  BarChart3,
  DollarSign,
  Percent,
  ArrowRight,
  Home,
  Car,
  Briefcase,
  Smartphone,
  PieChart,
  TrendingUp,
  Check,
  Info
} from "lucide-react";

const ManualCalculator = () => {
  // Access navigation state
  const location = useLocation();

  // State for form inputs
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [tenureType, setTenureType] = useState("years"); 
  const [loanType, setLoanType] = useState("home");
  const [downPayment, setDownPayment] = useState(0);
  const [processingFee, setProcessingFee] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // State for calculated results
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amortizationData, setAmortizationData] = useState([]);
  const [activeTab, setActiveTab] = useState("summary");

  // Initialize state with passed parameters on mount
  useEffect(() => {
    console.log("location.state:", location.state); // Log the entire location.state for debugging
    if (location.state) {
      // Correct property names based on your console log
      const { principal, rate, tenure } = location.state;
      
      // Log the destructured values with correct names
      console.log("Destructured Values from location.state:", {
        principal,
        rate,
        tenure
      });
      
      // Update state with passed parameters if they exist and are valid
      if (principal !== undefined && !isNaN(principal)) {
        setLoanAmount(Number(principal));
      } else {
        console.warn("principal is undefined or invalid:", principal);
      }
      
      if (rate !== undefined && !isNaN(rate)) {
        setInterestRate(Number(rate));
      } else {
        console.warn("rate is undefined or invalid:", rate);
      }
      
      if (tenure !== undefined && !isNaN(tenure)) {
        // tenure is already in months (240), convert to years if >= 12
        if (tenure >= 12) {
          setLoanTenure(Math.round(tenure / 12));
          setTenureType("years");
        } else {
          setLoanTenure(tenure);
          setTenureType("months");
        }
      } else {
        console.warn("tenure is undefined or invalid:", tenure);
      }
    } else {
      console.warn("location.state is null or undefined");
    }
  }, [location.state]);

  // Calculate EMI and related values whenever inputs change
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, tenureType, downPayment, processingFee]);

  const handleLoanTypeChange = (type) => {
    setLoanType(type);
    // Set default values based on loan type
    switch (type) {
      case "home":
        setInterestRate(8.5);
        setLoanTenure(20);
        setTenureType("years");
        setProcessingFee(1);
        break;
      case "car":
        setInterestRate(9.5);
        setLoanTenure(7);
        setTenureType("years");
        setProcessingFee(1.5);
        break;
      case "personal":
        setInterestRate(12);
        setLoanTenure(5);
        setTenureType("years");
        setProcessingFee(2);
        break;
      case "education":
        setInterestRate(11);
        setLoanTenure(8);
        setTenureType("years");
        setProcessingFee(1);
        break;
    }
  };

  const calculateEMI = () => {
    // Calculate loan amount after down payment
    const principalAmount = loanAmount - downPayment;
    
    // Convert annual interest rate to monthly rate
    const monthlyInterestRate = interestRate / 12 / 100;
    
    // Convert tenure to months if in years
    const tenureInMonths = tenureType === "years" ? loanTenure * 12 : loanTenure;
    
    // Calculate EMI
    const calculatedEmi = 
      principalAmount * 
      monthlyInterestRate * 
      Math.pow(1 + monthlyInterestRate, tenureInMonths) / 
      (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);
    
    // Calculate total payment and interest
    const totalPayment = calculatedEmi * tenureInMonths;
    const calculatedTotalInterest = totalPayment - principalAmount;
    
    // Processing fee amount
    const processingFeeAmount = (principalAmount * processingFee) / 100;
    
    // Set state with calculated values
    setEmi(calculatedEmi);
    setTotalInterest(calculatedTotalInterest);
    setTotalAmount(totalPayment + processingFeeAmount);
    
    // Generate amortization schedule
    generateAmortizationSchedule(principalAmount, monthlyInterestRate, tenureInMonths, calculatedEmi);
  };

  const generateAmortizationSchedule = (principal, monthlyRate, tenure, monthlyPayment) => {
    let balance = principal;
    let schedule = [];
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    
    for (let month = 1; month <= tenure; month++) {
      const interestForThisMonth = balance * monthlyRate;
      const principalForThisMonth = monthlyPayment - interestForThisMonth;
      
      balance -= principalForThisMonth;
      if (balance < 0) balance = 0;
      
      totalInterestPaid += interestForThisMonth;
      totalPrincipalPaid += principalForThisMonth;
      
      if (month <= 24 || month === tenure || month % 12 === 0) {
        schedule.push({
          month,
          payment: monthlyPayment,
          principalPayment: principalForThisMonth,
          interestPayment: interestForThisMonth,
          balance,
          totalInterestPaid,
          totalPrincipalPaid
        });
      }
    }
    
    setAmortizationData(schedule);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format percentage
  const formatPercent = (value) => {
    return value.toFixed(2) + '%';
  };

  // Calculate amortization chart data
  const getChartData = () => {
    // Simplified for visualization - just return some key months 
    return amortizationData.filter((_, index) => index % 5 === 0 || index === amortizationData.length - 1);
  };

  // Get loan term in user-friendly format
  const getLoanTermText = () => {
    if (tenureType === "years") {
      return `${loanTenure} Years (${loanTenure * 12} Months)`;
    } else {
      return `${loanTenure} Months (${(loanTenure / 12).toFixed(1)} Years)`;
    }
  };

  // Get icon based on loan type
  const getLoanTypeIcon = () => {
    switch (loanType) {
      case "home": return <Home className="w-6 h-6 text-emerald-500" />;
      case "car": return <Car className="w-6 h-6 text-blue-500" />;
      case "personal": return <Briefcase className="w-6 h-6 text-purple-500" />;
      case "education": return <Smartphone className="w-6 h-6 text-cyan-500" />;
      default: return <CreditCard className="w-6 h-6 text-emerald-500" />;
    }
  };

  // Get class based on loan type
  const getLoanTypeClass = () => {
    switch (loanType) {
      case "home": return "from-emerald-600 to-teal-600";
      case "car": return "from-blue-600 to-indigo-600";
      case "personal": return "from-purple-600 to-pink-600";
      case "education": return "from-cyan-600 to-sky-600";
      default: return "from-emerald-600 to-teal-600";
    }
  };

  // Create visual bar chart for breakdown
  const BreakdownBar = () => {
    const principalPercentage = (loanAmount - downPayment) / totalAmount * 100;
    const interestPercentage = totalInterest / totalAmount * 100;
    const processingFeePercentage = ((loanAmount - downPayment) * processingFee / 100) / totalAmount * 100;
    
    return (
      <div className="w-full h-8 rounded-full overflow-hidden flex mb-4">
        <div 
          className="h-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white"
          style={{ width: `${principalPercentage}%` }}
        >
          {principalPercentage > 10 ? `${principalPercentage.toFixed(1)}%` : ""}
        </div>
        <div 
          className="h-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white"
          style={{ width: `${interestPercentage}%` }}
        >
          {interestPercentage > 10 ? `${interestPercentage.toFixed(1)}%` : ""}
        </div>
        <div 
          className="h-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white"
          style={{ width: `${processingFeePercentage}%` }}
        >
          {processingFeePercentage > 5 ? `${processingFeePercentage.toFixed(1)}%` : ""}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-10">
      <div className="w-full container px-4 relative animate-fade-in">
        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-56 h-56 bg-gradient-to-br from-purple-800 to-blue-800 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-gradient-to-br from-emerald-700 to-cyan-700 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        
        <div className="relative backdrop-blur-3xl bg-black/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Glowing border effect */}
          <div className="absolute inset-0 border-2 border-white/10 rounded-3xl pointer-events-none shadow-[0_0_15px_rgba(16,185,129,0.2)]"></div>
          
          {/* Glass reflection effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>
          
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-5">
                <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${getLoanTypeClass()} flex items-center justify-center shadow-2xl shadow-emerald-900/30`}>
                  {getLoanTypeIcon()}
                </div>
              </div>
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">EMI Calculator</h2>
              <p className="text-gray-400">Calculate loan EMI, total interest payable, and payment schedule</p>
            </div>

            {/* Loan Type Selection */}
            <div className="grid hidden grid-cols-4 gap-3 mb-8">
              <button 
                onClick={() => handleLoanTypeChange("home")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${loanType === "home" ? "border-emerald-500 bg-emerald-900/20" : "border-gray-700 bg-gray-900/30 hover:bg-gray-800/40"}`}
              >
                <Home className={`w-6 h-6 mb-2 ${loanType === "home" ? "text-emerald-500" : "text-gray-400"}`} />
                <span className={`text-sm font-medium ${loanType === "home" ? "text-emerald-500" : "text-gray-300"}`}>Home</span>
              </button>
              <button 
                onClick={() => handleLoanTypeChange("car")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${loanType === "car" ? "border-blue-500 bg-blue-900/20" : "border-gray-700 bg-gray-900/30 hover:bg-gray-800/40"}`}
              >
                <Car className={`w-6 h-6 mb-2 ${loanType === "car" ? "text-blue-500" : "text-gray-400"}`} />
                <span className={`text-sm font-medium ${loanType === "car" ? "text-blue-500" : "text-gray-300"}`}>Car</span>
              </button>
              <button 
                onClick={() => handleLoanTypeChange("personal")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${loanType === "personal" ? "border-purple-500 bg-purple-900/20" : "border-gray-700 bg-gray-900/30 hover:bg-gray-800/40"}`}
              >
                <Briefcase className={`w-6 h-6 mb-2 ${loanType === "personal" ? "text-purple-500" : "text-gray-400"}`} />
                <span className={`text-sm font-medium ${loanType === "personal" ? "text-purple-500" : "text-gray-300"}`}>Personal</span>
              </button>
              <button 
                onClick={() => handleLoanTypeChange("education")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${loanType === "education" ? "border-cyan-500 bg-cyan-900/20" : "border-gray-700 bg-gray-900/30 hover:bg-gray-800/40"}`}
              >
                <Smartphone className={`w-6 h-6 mb-2 ${loanType === "education" ? "text-cyan-500" : "text-gray-400"}`} />
                <span className={`text-sm font-medium ${loanType === "education" ? "text-cyan-500" : "text-gray-300"}`}>Education</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Left panel - Inputs */}
           
            </div>
            <div className="md:col-span-2 space-y-6">
                {/* Loan Amount Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <DollarSign className="w-4 h-4 mr-2 text-emerald-500" />
                    Loan Amount
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="10000"
                      max="10000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">₹10K</span>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-center"
                      />
                      <span className="text-xs text-gray-500">₹1Cr</span>
                    </div>
                  </div>
                </div>

                {/* Interest Rate Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <Percent className="w-4 h-4 mr-2 text-emerald-500" />
                    Interest Rate (% per annum)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">1%</span>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-center"
                        step="0.1"
                      />
                      <span className="text-xs text-gray-500">30%</span>
                    </div>
                  </div>
                </div>

                {/* Loan Tenure Input */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                    Loan Tenure
                    <div className="flex ml-6">
                        <button
                            className={`px-3 py-1 text-xs rounded-l-md ${tenureType === "years" ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-300"} transition-colors duration-200`}
                            onClick={() => setTenureType("years")}
                        >
                            Yrs
                        </button>
                        <button
                            className={`px-3 py-1 text-xs rounded-r-md ${tenureType === "months" ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-300"} transition-colors duration-200`}
                            onClick={() => setTenureType("months")}
                        >
                            Mos
                        </button>
                    </div>
                  </label>
                  <div className="flex space-x-4">
                    <div className="relative flex-1">
                      <input
                        type="range"
                        min={tenureType === "years" ? "1" : "1"}
                        max={tenureType === "years" ? "30" : "360"}
                        step="1"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">{tenureType === "years" ? "1yr" : "1mo"}</span>
                        <input
                          type="number"
                          value={loanTenure}
                          onChange={(e) => setLoanTenure(Number(e.target.value))}
                          className="w-16 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-center"
                        />
                        <span className="text-xs text-gray-500">{tenureType === "years" ? "30yrs" : "360mo"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  <ArrowRight className={`w-4 h-4 mr-2 transition-transform ${showAdvanced ? "rotate-90" : ""}`} />
                  {showAdvanced ? "Hide" : "Show"} Advanced Options
                </button>

                {/* Advanced Options */}
                {showAdvanced && (
                  <div className="space-y-4 pt-2 border-t border-gray-800 animate-fade-in">
                    {/* Down Payment */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-300">
                        <DollarSign className="w-4 h-4 mr-2 text-emerald-500" />
                        Down Payment
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max={loanAmount * 0.9}
                          step="10000"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">₹0</span>
                          <input
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-center"
                          />
                          <span className="text-xs text-gray-500">
                            {formatCurrency(loanAmount * 0.9)}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>0%</span>
                        <span>{((downPayment / loanAmount) * 100).toFixed(1)}% of loan amount</span>
                        <span>90%</span>
                      </div>
                    </div>

                    {/* Processing Fee */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-300">
                        <Percent className="w-4 h-4 mr-2 text-emerald-500" />
                        Processing Fee (%)
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={processingFee}
                          onChange={(e) => setProcessingFee(Number(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">0%</span>
                          <input
                            type="number"
                            value={processingFee}
                            onChange={(e) => setProcessingFee(Number(e.target.value))}
                            className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-center"
                            step="0.1"
                          />
                          <span className="text-xs text-gray-500">5%</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        Amount: {formatCurrency((loanAmount - downPayment) * processingFee / 100)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            {/* Right panel - Results */}
            <div className="pt-10 space-y-6">
                {/* Main Result Display */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                  {/* Decorative element */}
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 rounded-full blur-xl"></div>
                  
                  <div className="relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h3 className="text-gray-400 font-medium">Monthly EMI</h3>
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-white">{formatCurrency(emi)}</span>
                          <span className="ml-2 text-sm text-gray-500">per month</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 bg-black/30 px-4 py-2 rounded-lg">
                        <div className="text-sm text-gray-400">Loan Term</div>
                        <div className="text-base font-medium text-white">{getLoanTermText()}</div>
                      </div>
                    </div>

                    {/* Navigation tabs */}
                    <div className="flex border-b border-gray-700 mb-6">
                      <button 
                        onClick={() => setActiveTab("summary")}
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "summary" ? "border-emerald-500 text-emerald-500" : "border-transparent text-gray-400 hover:text-gray-300"}`}
                      >
                        Summary
                      </button>
                      <button 
                        onClick={() => setActiveTab("breakdown")}
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "breakdown" ? "border-emerald-500 text-emerald-500" : "border-transparent text-gray-400 hover:text-gray-300"}`}
                      >
                        Breakdown
                      </button>
                      <button 
                        onClick={() => setActiveTab("schedule")}
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "schedule" ? "border-emerald-500 text-emerald-500" : "border-transparent text-gray-400 hover:text-gray-300"}`}
                      >
                        Schedule
                      </button>
                    </div>

                    {/* Summary Tab */}
                    {activeTab === "summary" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center mr-3">
                              <DollarSign className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-400">Principal Amount</div>
                              <div className="text-lg font-semibold text-white">{formatCurrency(loanAmount - downPayment)}</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-orange-900/50 flex items-center justify-center mr-3">
                              <TrendingUp className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-400">Total Interest</div>
                              <div className="text-lg font-semibold text-white">{formatCurrency(totalInterest)}</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                              <CreditCard className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-400">Total Amount</div>
                              <div className="text-lg font-semibold text-white">{formatCurrency(totalAmount)}</div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Metrics */}
                        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                            <div className="text-xs text-gray-400">Processing Fee</div>
                            <div className="text-base font-medium text-white">
                              {formatCurrency((loanAmount - downPayment) * processingFee / 100)}
                            </div>
                          </div>
                          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                            <div className="text-xs text-gray-400">Interest to Principal Ratio</div>
                            <div className="text-base font-medium text-white">
                            {(totalInterest / (loanAmount - downPayment)).toFixed(2)}</div>
                          </div>
                          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                            <div className="text-xs text-gray-400">Monthly Installment %</div>
                            <div className="text-base font-medium text-white">
                              {((emi / (loanAmount - downPayment)) * 100).toFixed(2)}%
                            </div>
                          </div>
                          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                            <div className="text-xs text-gray-400">Interest Rate</div>
                            <div className="text-base font-medium text-white">
                              {formatPercent(interestRate)} <span className="text-xs text-gray-500">per annum</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Breakdown Tab */}
                    {activeTab === "breakdown" && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium text-gray-400">Cost Breakdown</h4>
                            <div className="text-sm text-gray-400">Total: {formatCurrency(totalAmount)}</div>
                          </div>
                          <BreakdownBar />
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                              <span>Principal ({formatCurrency(loanAmount - downPayment)})</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                              <span>Interest ({formatCurrency(totalInterest)})</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                              <span>Processing Fee ({formatCurrency((loanAmount - downPayment) * processingFee / 100)})</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                          <div className="text-sm font-medium text-gray-300 mb-3">Payment Distribution</div>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Principal Amount</span>
                                <span className="text-white font-medium">{formatCurrency(loanAmount - downPayment)}</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-1.5">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Total Interest</span>
                                <span className="text-white font-medium">{formatCurrency(totalInterest)}</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-1.5">
                                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(totalInterest / (loanAmount - downPayment)) * 100}%` }}></div>
                              </div>
                              <div className="text-xs text-gray-500 text-right">
                                {((totalInterest / (loanAmount - downPayment)) * 100).toFixed(1)}% of principal
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Processing Fee</span>
                                <span className="text-white font-medium">{formatCurrency((loanAmount - downPayment) * processingFee / 100)}</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${processingFee}%` }}></div>
                              </div>
                              <div className="text-xs text-gray-500 text-right">
                                {processingFee}% of principal
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                          <div className="flex items-center mb-3">
                            <Info className="w-4 h-4 text-blue-400 mr-2" />
                            <span className="text-sm font-medium text-gray-300">Loan Insights</span>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start text-xs">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                You will pay {formatCurrency(totalInterest)} as interest over {tenureType === "years" ? `${loanTenure} years` : `${loanTenure} months`}, which is {((totalInterest / (loanAmount - downPayment)) * 100).toFixed(1)}% of your principal amount.
                              </span>
                            </li>
                            <li className="flex items-start text-xs">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                Your monthly installment ({formatCurrency(emi)}) is {((emi / (loanAmount - downPayment)) * 100).toFixed(2)}% of your principal amount.
                              </span>
                            </li>
                            <li className="flex items-start text-xs">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                Processing fee of {formatCurrency((loanAmount - downPayment) * processingFee / 100)} ({processingFee}%) is charged upfront.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Schedule Tab */}
                    {activeTab === "schedule" && (
                      <div className="space-y-6">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Principal</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Interest</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Balance</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {amortizationData.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-800/30" : "bg-gray-900/30"}>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                                    <div className="font-medium text-white">#{data.month}</div>
                                    <div className="text-xs text-gray-400">
                                      {formatCurrency(data.payment)}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-emerald-400">
                                    {formatCurrency(data.principalPayment)}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-orange-400">
                                    {formatCurrency(data.interestPayment)}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                    {formatCurrency(data.balance)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                          <div className="text-sm font-medium text-gray-300 mb-3">Payment Schedule Notes</div>
                          <ul className="space-y-2">
                            <li className="flex items-start text-xs">
                              <Info className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                In the beginning of your loan term, most of your EMI payment goes towards interest.
                              </span>
                            </li>
                            <li className="flex items-start text-xs">
                              <Info className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                The table shows key payments in your loan schedule. First year payments are shown in detail, followed by annual summaries.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Disclaimer */}
                <div className="text-xs text-gray-500 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                  <p className="mb-1">Disclaimer: This calculator is for illustrative purposes only. Actual loan offers may vary based on credit score, income, and other factors. Processing fees, interest rates, and other terms may differ between financial institutions.</p>
                  <p>Always consult with your financial advisor or lender for personalized advice.</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualCalculator;