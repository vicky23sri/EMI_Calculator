// src/components/QuickActions.js
import React from 'react';
import { Calculator, TrendingUp, Shield, Wallet, ArrowRight } from "lucide-react";

const quickActions = [
  {
    title: "EMI Calculator",
    description: "Smart loan calculations",
    icon: <Calculator className="h-6 w-6" />,
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
    glowColor: "shadow-cyan-500/20",
    action: "Calculate EMI for a home loan of 50 lakhs"
  },
  {
    title: "Investment Hub",
    description: "Portfolio optimization",
    icon: <TrendingUp className="h-6 w-6" />,
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    glowColor: "shadow-emerald-500/20",
    action: "Create an investment strategy for me"
  },
  {
    title: "Credit Optimizer",
    description: "Score enhancement",
    icon: <Shield className="h-6 w-6" />,
    gradient: "from-orange-400 via-red-500 to-pink-600",
    glowColor: "shadow-orange-500/20",
    action: "How can I improve my credit score quickly?"
  },
  {
    title: "Tax Planner",
    description: "Smart savings",
    icon: <Wallet className="h-6 w-6" />,
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    glowColor: "shadow-violet-500/20",
    action: "Best tax saving investments under 80C"
  }
];

const QuickActions = ({ onAction }) => {
  return (
    <div className="space-y-3">
      {quickActions.map((action, index) => (
        <button
          key={index}
          onClick={() => onAction(action.action)}
          className={`w-full p-4 bg-gradient-to-r ${action.gradient} rounded-2xl hover:scale-105 transition-all group text-left shadow-lg ${action.glowColor} hover:shadow-xl relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
              {action.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white text-sm">{action.title}</h4>
              <p className="text-xs text-white/80">{action.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;