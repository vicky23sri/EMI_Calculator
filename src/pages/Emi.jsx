import React, { useState, useEffect } from 'react';
import { DollarSign, BarChart, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EMICalculatorForm = () => {
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(4.5);
  const [tenure, setTenure] = useState(20);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative backdrop-blur-2xl rounded-3xl p-12 border border-indigo-600/40 shadow-2xl hover:shadow-indigo-600/30 transition-all duration-500 overflow-hidden"
    >
      <h3 className="relative text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-400 mb-10 z-10">
        EMI Calculator
      </h3>
      <div className="relative space-y-10 z-10">
        {[
          { label: 'Loan Amount ($)', value: principal, setValue: setPrincipal },
          { label: 'Interest Rate (% p.a.)', value: rate, setValue: setRate, step: '0.1' },
          { label: 'Tenure (Years)', value: tenure, setValue: setTenure },
        ].map((field, idx) => (
          <motion.div
            key={idx}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.3, duration: 0.6 }}
          >
            <label className="block text-sm font-semibold text-indigo-200 mb-3">{field.label}</label>
            <input
              type="number"
              step={field.step || '1'}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
              className="w-full p-4 rounded-xl bg-black/60 border border-indigo-700/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-indigo-900/20 transition-all duration-300 hover:bg-indigo-900/30"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const EMIResults = ({ principal = 300000, rate = 4.5, tenure = 20 }) => {
  const monthlyRate = rate / 1200;
  const months = tenure * 12;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return (
    <div className="space-y-8">
      {[
        { label: 'Monthly EMI', value: `$${emi.toFixed(2)}`, textSize: 'text-4xl', gradient: 'from-indigo-400 to-blue-500' },
        { label: 'Total Interest', value: `$${totalInterest.toFixed(2)}`, textSize: 'text-2xl', gradient: 'from-indigo-300 to-blue-400' },
        { label: 'Total Payment', value: `$${totalPayment.toFixed(2)}`, textSize: 'text-2xl', gradient: 'from-indigo-300 to-blue-400' },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: idx * 0.3, duration: 0.7 }}
          className="relative p-8  rounded-2xl border border-indigo-600/50 hover:bg-indigo-900/50 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 animate-pulse" />
          <p className="relative text-sm font-medium text-indigo-300 z-10">{item.label}</p>
          <p className={`relative ${item.textSize} font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} z-10`}>
            {item.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

const advantages = [
  {
    title: 'Seamless Budgeting',
    description: 'Fixed EMIs streamline financial planning with predictable payments.',
    icon: <DollarSign className="h-10 w-10 text-indigo-300" />,
  },
  {
    title: 'Empowered Discipline',
    description: 'Regular payments cultivate robust financial habits.',
    icon: <BarChart className="h-10 w-10 text-indigo-300" />,
  },
  {
    title: 'Tailored Flexibility',
    description: 'Customize repayment terms to match your financial aspirations.',
    icon: <Clock className="h-10 w-10 text-indigo-300" />,
  },
];

const disadvantages = [
  {
    title: 'Interest Surge',
    description: 'Cumulative interest can significantly inflate loan costs.',
    icon: <AlertCircle className="h-10 w-10 text-red-300" />,
  },
  {
    title: 'Financial Pressure',
    description: 'EMIs may strain budgets if not strategically managed.',
    icon: <AlertCircle className="h-10 w-10 text-red-300" />,
  },
  {
    title: 'Credit Vulnerability',
    description: 'Missed payments can jeopardize your creditworthiness.',
    icon: <AlertCircle className="h-10 w-10 text-red-300" />,
  },
];

const EMIPage = () => {
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  useEffect(() => {
    const timers = advantages.concat(disadvantages).map((_, index) =>
      setTimeout(() => setVisibleFeatures((prev) => [...new Set([...prev, index])]), index * 200)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Dynamic Background with Particle Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-indigo-400 rounded-full"
              initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0.5 }}
              animate={{
                y: [0, -1000],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: 'loop',
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-28"
        >
          <h1 className="text-7xl font-extrabold bg-gradient-to-r from-indigo-300 to-blue-500 bg-clip-text text-transparent leading-tight">
            EMI Mastery Unleashed
          </h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-2xl text-indigo-200 max-w-3xl mx-auto"
          >
            Embark on a transformative journey to conquer Equated Monthly Installments with our visually stunning, interactive platform.
          </motion.p>
        </motion.div>

        {/* Understanding EMI Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-300 to-blue-500 bg-clip-text text-transparent mb-16 text-center">
            Demystifying EMI Calculations
          </h2>
          <p className="text-indigo-200 leading-relaxed text-xl pb-2">
            EMIs redefine loan repayment, breaking down formidable sums into manageable monthly installments that blend principal and interest with elegance.
          </p>
          <p className="text-indigo-200 leading-relaxed text-xl pb-4">
            Early EMIs focus on interest, gradually shifting to erode the principal, guiding you toward financial liberation with every payment.
          </p>
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="space-y-10"
            >
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)" }}
                className="relative p-10 rounded-3xl bg-gradient-to-br from-black/70 to-indigo-900/50 border border-indigo-600/50 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 animate-pulse" />
                <h3 className="relative text-3xl font-semibold text-indigo-300 mb-8 z-10">The EMI Formula</h3>
                <p className="relative text-indigo-100 italic text-2xl z-10">
                  EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
                </p>
                <ul className="relative mt-8 text-indigo-200 space-y-4 z-10">
                  <li><span className="font-semibold">P</span> = Principal loan amount</li>
                  <li><span className="font-semibold">r</span> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)</li>
                  <li><span className="font-semibold">n</span> = Loan tenure in months</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)" }}
                className="relative p-10 rounded-3xl bg-gradient-to-br from-black/70 to-indigo-900/50 border border-indigo-600/50 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 animate-pulse" />
                <h3 className="relative text-3xl font-semibold text-indigo-300 mb-8 z-10">The EMI Formula</h3>
                <p className="relative text-indigo-100 italic text-2xl z-10">
                  EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
                </p>
                <ul className="relative mt-8 text-indigo-200 space-y-4 z-10">
                  <li><span className="font-semibold">P</span> = Principal loan amount</li>
                  <li><span className="font-semibold">r</span> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)</li>
                  <li><span className="font-semibold">n</span> = Loan tenure in months</li>
                </ul>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-indigo-900/60 rounded-3xl shadow-2xl" />
              <div className="relative p-12 rounded-3xl border border-indigo-600/50 backdrop-blur-2xl">
                <h3 className="text-3xl font-semibold text-indigo-300 mb-10">Forces Shaping Your EMI</h3>
                <ul className="space-y-5">
                  {[
                    { icon: <DollarSign className="h-10 w-10" />, title: 'Loan Amount', desc: 'Larger loans escalate EMI commitments.' },
                    { icon: <BarChart className="h-10 w-10" />, title: 'Interest Rate', desc: 'Elevated rates amplify monthly payments.' },
                    { icon: <Clock className="h-10 w-10" />, title: 'Loan Tenure', desc: 'Extended terms reduce EMIs but increase interest.' },
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.3, duration: 0.6 }}
                      className="flex items-start"
                    >
                      <motion.div
                        className="mr-6 p-4 bg-indigo-800/70 rounded-2xl text-indigo-300"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.4 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-white text-2xl">{item.title}</h4>
                        <p className="text-indigo-200 text-base">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                {/* Interactive 3D Pie Chart */}
                <motion.div
                  className="mt-12 flex justify-center"
                  initial={{ scale: 0.8, rotateX: 60 }}
                  whileInView={{ scale: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <div className="relative w-80 h-80 perspective-1000">
                    <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: 'rotateX(20deg)' }}>
                      <motion.circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="#1e3a8a"
                        strokeWidth="10"
                      />
                      <motion.circle
                        cx="50" cy="50" r="45"
                        fill="none" stroke="#4f46e5" strokeWidth="10"
                        strokeDasharray="283" strokeDashoffset="169.8"
                        className="origin-center -rotate-90"
                        initial={{ strokeDashoffset: 283 }}
                        whileInView={{ strokeDashoffset: 169.8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                      <motion.text
                        x="50" y="45"
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        EMI
                      </motion.text>
                      <motion.text
                         x="50" y="65"
                         textAnchor="middle"
                         fill="white"
                         fontSize="8"
                      >
                        Breakdown
                      </motion.text>
                    </svg>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 flex justify-center space-x-10 text-base"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.4 }}
                    >
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-indigo-600 rounded-full mr-3"></div>
                        <span className="text-indigo-200 font-medium">Principal (60%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-blue-900 rounded-full mr-3"></div>
                        <span className="text-indigo-200 font-medium">Interest (40%)</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Advantages Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-300 to-blue-500 bg-clip-text text-transparent mb-16 text-center">
            Why EMIs Shine
          </h2>
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-indigo-200 leading-relaxed text-xl"
              >
                EMI-based loans empower you to realize grand ambitions, offering structured, predictable repayment paths that align with your financial goals.
              </motion.p>
              <div className="grid grid-cols-1 gap-10">
                <AnimatePresence>
                  {advantages.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: visibleFeatures.includes(index) ? 1 : 0, y: visibleFeatures.includes(index) ? 0 : 60 }}
                      exit={{ opacity: 0, y: -60 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="relative p-10 rounded-3xl border border-indigo-600/50 bg-gradient-to-br from-black/70 to-indigo-900/50 backdrop-blur-2xl hover:shadow-indigo-600/40 hover:scale-105 transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 animate-pulse" />
                      <div className="relative flex items-start z-10">
                        <motion.div
                          className="mr-6 p-4 bg-indigo-800/80 rounded-2xl"
                          whileHover={{ rotate: 360, scale: 1.3 }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                          <p className="text-indigo-200 text-base">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="relative p-10 rounded-3xl border border-indigo-600/50 bg-gradient-to-br from-black/70 to-indigo-900/60 backdrop-blur-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 animate-pulse" />
                <h3 className="relative text-3xl font-semibold text-indigo-300 mb-8 z-10">Strategic Advantages</h3>
                <ul className="relative space-y-8 z-10">
                  {[
                    'Access substantial capital beyond your savings.',
                    'Craft repayment schedules to suit your financial strategy.',
                    'Protect against inflation for long-term investments.',
                    'Leverage tax benefits on loans like home mortgages.',
                  ].map((text, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.3 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-8 w-8 text-green-400 mr-4 flex-shrink-0" />
                      <span className="text-indigo-200 text-base">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="relative p-10 rounded-3xl border border-indigo-600/50 bg-gradient-to-br from-black/70 to-indigo-900/60 backdrop-blur-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 animate-pulse" />
                <h3 className="relative text-3xl font-semibold text-indigo-300 mb-8 z-10">Case Study: Home Loan</h3>
                <div className="relative space-y-8 z-10">
                  {[
                    { label: 'Loan Amount', value: '$300,000', width: '75%' },
                    { label: 'Interest Rate', value: '4.5% p.a.', width: '45%' },
                    { label: 'Tenure', value: '20 years', width: '66%' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-indigo-200">{item.label}</span>
                        <span className="text-white font-semibold">{item.value}</span>
                      </div>
                      <div className="w-full bg-black/60 rounded-full h-4">
                        <motion.div
                          className="bg-gradient-to-r from-indigo-600 to-blue-600 h-4 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: item.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: idx * 0.4 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="flex justify-between items-center mt-10 p-8 bg-indigo-900/40 rounded-2xl border border-indigo-600/40"
                  >
                    <div>
                      <p className="text-sm font-medium text-indigo-200">Monthly EMI</p>
                      <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
                        $1,897.95
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-indigo-200">Total Interest</p>
                      <p className="text-2xl font-semibold text-indigo-300">$155,507.80</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Drawbacks Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-300 to-blue-500 bg-clip-text text-transparent mb-16 text-center">
            Navigating EMI Pitfalls
          </h2>
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-indigo-200 leading-relaxed text-xl"
              >
                EMIs unlock possibilities but require vigilance. Master their challenges to safeguard your financial future.
              </motion.p>
              <div className="grid grid-cols-1 gap-10">
                <AnimatePresence>
                  {disadvantages.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: visibleFeatures.includes(index + advantages.length) ? 1 : 0, y: visibleFeatures.includes(index + advantages.length) ? 0 : 60 }}
                      exit={{ opacity: 0, y: -60 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="relative p-10 rounded-3xl border border-red-600/50 bg-gradient-to-br from-black/70 to-red-900/40 backdrop-blur-2xl hover:shadow-red-600/40 hover:scale-105 transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-indigo-500/10 animate-pulse" />
                      <div className="relative flex items-start z-10">
                        <motion.div
                          className="mr-6 p-4 bg-red-800/80 rounded-2xl"
                          whileHover={{ rotate: 360, scale: 1.3 }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                          <p className="text-indigo-200 text-base">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="relative p-10 rounded-3xl border border-red-600/50 bg-gradient-to-br from-black/70 to-red-900/50 backdrop-blur-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-indigo-500/10 animate-pulse" />
                <h3 className="relative text-3xl font-semibold text-red-300 mb-8 z-10">Busting EMI Myths</h3>
                <ul className="relative space-y-8 z-10">
                  {[
                    '"Zero-interest EMIs" often hide steep processing fees.',
                    'Lower EMIs can lead to prolonged financial strain.',
                    'Multiple EMIs risk damaging your credit score.',
                    'EMIs may create illusions of affordability.',
                  ].map((text, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.3 }}
                      className="flex items-center"
                    >
                      <AlertCircle className="h-8 w-8 text-red-400 mr-4 flex-shrink-0" />
                      <span className="text-indigo-200 text-base">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="relative p-10 rounded-3xl border border-red-600/50 bg-gradient-to-br from-black/70 to-red-900/50 backdrop-blur-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-indigo-500/10 animate-pulse" />
                <h3 className="relative text-3xl font-semibold text-red-300 mb-8 z-10">Long-Term Financial Impact</h3>
                <div className="relative space-y-8 z-10">
                  {[
                    { text: 'EMIs can consume 30-50% of monthly income', width: '40%' },
                    { text: 'Restricts flexibility for unexpected expenses', width: '65%' },
                    { text: 'Delays critical goals like retirement savings', width: '70%' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.3 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="mr-4 w-5 h-5 rounded-full bg-red-500"></div>
                        <span className="text-indigo-200 text-base">{item.text}</span>
                      </div>
                      <div className="w-full bg-black/60 rounded-full h-4">
                        <motion.div
                          className="bg-gradient-to-r from-red-600 to-red-400 h-4 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: item.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: idx * 0.4 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="flex justify-between items-center mt-10 p-8 bg-red-900/40 rounded-2xl border border-red-600/40"
                  >
                    <div>
                      <p className="text-sm font-medium text-indigo-200">Recommended EMI Cap</p>
                      <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">
                        30%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-indigo-200">of Monthly Income</p>
                      <p className="text-2xl font-semibold text-red-300">for all loans combined</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Calculator Section */}
        {/* <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-300 to-blue-500 bg-clip-text text-transparent mb-16 text-center">
            Calculate Your EMI
          </h2>
          <div className="grid lg:grid-cols-2 gap-20">
            {/* <EMICalculatorForm /> */}
            {/* <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative backdrop-blur-2xl bg-gradient-to-br from-black/70 to-indigo-900/50 rounded-3xl p-12 border border-indigo-600/40 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 animate-pulse" />
              <h3 className="relative text-3xl font-semibold text-indigo-300 mb-10 z-10">EMI Breakdown</h3>
              <div className="relative z-10">
                <EMIResults />
              </div>
            </motion.div> 
          </div>
        </motion.section> */}
      </div>
    </div>
  );
};

export default EMIPage;