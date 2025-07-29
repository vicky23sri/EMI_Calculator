import React, { useState } from 'react';
import { 
  Mail, 
  ArrowLeft, 
  Send, 
  CheckCircle, 
  Shield, 
  Lock,
  Key,
  RefreshCw
} from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleBackToLogin = () => {
    // Navigate to signin page
    window.location.href = '/signin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-72 w-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 h-96 w-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 h-64 w-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 h-48 w-48 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <div className="h-2 w-2 bg-blue-400/60 rounded-full animate-ping"></div>
      </div>
      <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
        <div className="h-3 w-3 bg-purple-400/60 rounded-full animate-ping delay-1000"></div>
      </div>
      <div className="absolute bottom-1/4 left-3/4 transform translate-x-1/2 -translate-y-1/2">
        <div className="h-2 w-2 bg-pink-400/60 rounded-full animate-ping delay-2000"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">

        {/* Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Card Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
          <div className="absolute -top-4 -right-4 h-24 w-24 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 h-20 w-20 bg-purple-500/10 rounded-full blur-xl"></div>

          <div className="relative z-10">
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl mb-4 relative">
                    <Lock className="h-8 w-8 text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    No worries! Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-gray-700/50 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 backdrop-blur-sm ${
                          errors.email 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                            : 'border-gray-600/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                        <span className="h-1 w-1 bg-red-400 rounded-full"></span>
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-5 w-5 animate-spin" />
                          <span>Sending Reset Link...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Reset Link</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Security Note */}
                <div className="mt-8 bg-gray-700/30 border border-gray-600/30 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-emerald-400 mt-0.5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        <span className="font-medium text-emerald-400">Security Notice:</span> The password reset link will expire in 15 minutes for your security. If you don't receive the email, check your spam folder.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 relative">
                  <CheckCircle className="h-10 w-10 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3">Check Your Email!</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  We've sent a password reset link to{' '}
                  <span className="text-blue-400 font-medium">{email}</span>
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-gray-700/50 hover:bg-gray-700/70 text-white font-medium py-3 px-6 rounded-2xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50"
                  >
                    Try Different Email
                  </button>
                  
                  <button
                    onClick={handleBackToLogin}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                    <span className="relative">Back to Login</span>
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-400">
                    Didn't receive the email?{' '}
                    <button
                      onClick={() => handleSubmit({ preventDefault: () => {} })}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                    >
                      Resend link
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{' '}
            <button
              onClick={handleBackToLogin}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
            >
              Sign in instead
            </button>
          </p>
        </div>
      </div>

      {/* Additional floating icons */}
      <div className="absolute top-1/3 right-10 animate-float">
        <div className="h-8 w-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-gray-600/30">
          <Key className="h-4 w-4 text-blue-400" />
        </div>
      </div>
      
      <div className="absolute bottom-1/3 left-10 animate-float delay-1000">
        <div className="h-10 w-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-gray-600/30">
          <Mail className="h-5 w-5 text-purple-400" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;