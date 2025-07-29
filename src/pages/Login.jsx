import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, CheckCircle, ChevronRight } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Form Submitted:", formData);
    // Add authentication logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 bg-[radial-gradient(circle_at_center,rgba(42,185,113,0.25)_0,rgba(0,0,0,0)_70%)] pt-16 pb-36">
      <div className="w-[600px] max-w-[90%] px-12 py-14 relative animate-fade-in">
        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-56 h-56 bg-gradient-to-br from-purple-800 to-blue-800 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-gradient-to-br from-emerald-700 to-cyan-700 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        
        <div className="relative backdrop-blur-3xl bg-black/50 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
          {/* Glowing border effect */}
          <div className="absolute inset-0 border-2 border-white/15 rounded-3xl pointer-events-none shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
          
          {/* Glass reflection effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-white/40 via-white/15 to-transparent"></div>
          
          <div className="p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-5">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-600 to-cyan-600 flex items-center justify-center shadow-2xl shadow-emerald-700/40">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">Welcome Back</h2>
              <p className="text-gray-300 mt-3 text-base font-medium">Sign in to continue your journey</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200">
                    <Mail className="h-6 w-6" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-black/60 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/70 focus:border-emerald-600/70 transition-all placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              
              <div className="group">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200">
                    <Lock className="h-6 w-6" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-14 py-4 bg-black/60 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/70 focus:border-emerald-600/70 transition-all placeholder-gray-500 shadow-sm hover:shadow-md"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-6 w-6 opacity-0 absolute"
                    />
                    <div className="h-6 w-6 border border-gray-700 rounded-md flex items-center justify-center mr-3 bg-black/60 peer-checked:bg-emerald-700 peer-checked:border-emerald-700 transition-all duration-300 shadow-sm">
                      <CheckCircle className={`h-5 w-5 text-white ${formData.rememberMe ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
                    </div>
                  </div>
                  <label htmlFor="remember-me" className="text-sm text-gray-300 font-medium">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="/forgotpassword" className="text-emerald-500 hover:text-emerald-400 font-medium underline-offset-4 hover:underline transition-all duration-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-700 to-cyan-700 py-4 px-8 rounded-xl text-white font-semibold shadow-2xl shadow-emerald-700/40 hover:shadow-emerald-700/60 transition-all duration-300 flex items-center justify-center group hover:scale-[1.02]"
              >
                <span>Sign In</span>
                <ChevronRight className="h-6 w-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
            </form>
            
            <div className="mt-10 text-center">
              <div className="flex items-center justify-center my-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                <span className="px-4 text-sm text-gray-400 font-semibold">Or continue with</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
              </div>
              
              <div className="flex justify-center gap-6 mb-8">
                <button className="h-12 w-12 rounded-full border border-gray-700 bg-black/60 flex items-center justify-center text-gray-300 hover:text-white hover:border-emerald-600 hover:bg-emerald-600/30 transition-all duration-300 hover:scale-110">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
                <button className="h-12 w-12 rounded-full border border-gray-700 bg-black/60 flex items-center justify-center text-gray-300 hover:text-white hover:border-emerald-600 hover:bg-emerald-600/30 transition-all duration-300 hover:scale-110">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </button>
                <button className="h-12 w-12 rounded-full border border-gray-700 bg-black/60 flex items-center justify-center text-gray-300 hover:text-white hover:border-emerald-600 hover:bg-emerald-600/30 transition-all duration-300 hover:scale-110">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-300 text-sm font-semibold">
                Don't have an account?{" "}
                <Link to="/signup" className="text-emerald-500 hover:text-emerald-400 font-semibold hover:underline underline-offset-4 transition-all duration-300">
                  New Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;