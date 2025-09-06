import { curve, heroBackground, robot } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[75rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-900/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
            <span className="text-sm font-medium text-blue-400 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              AI-Powered Loan Analytics
            </span>
          </div>
          <h1 className="h1 mb-6">
            {/* Intelligent Loan Planning for Your &nbsp;AI&nbsp;Chatting with {` `} */}
            Smart Financial Planning with
            <span className="inline-block relative">
              WealthWise AI{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>

          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Transform your financial future with WealthWise AI. Our advanced EMI calculator combines cutting-edge AI with comprehensive market analysis to deliver personalized payment schedules, interest optimization, and strategic financial recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-center mb-8 md:mb-12">
            <Button href="/ai" white className="px-8 py-4 font-medium">
              <span className="flex items-center">
                AI Calculator
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Button>
            <Button href="/manual" white className="px-8 py-4 font-medium">
              <span className="flex items-center">
                Manual Calculator
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Button>
            {/* <Button href="/learn-more" light className="px-8 py-4 font-medium">
              Learn More
            </Button> */}
          </div>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-7xl xl:mb-24">
          <div className="lg:col-span-6 relative">
            <div className="relative bg-black border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
              {/* Calculator Tabs */}
              <div className="flex border-b border-n-6">
                <button className="flex-1 py-4 px-6 bg-blue-500/10 border-b-2 border-blue-500 text-blue-400 font-medium">
                  Standard Calculator
                </button>
                <button className="flex-1 py-4 px-6 text-n-3 hover:text-n-1 transition duration-200">
                  AI Advisor
                </button>
              </div>

              {/* Calculator Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-xl font-medium">EMI Calculator</h3>
                  <div className="flex space-x-2 items-center">
                    <span className="text-xs text-n-3">Powered by</span>
                    <span className="text-sm font-medium text-blue-400">CalcuLoan<span className="text-teal-400">AI</span></span>
                  </div>
                </div>

                {/* Interactive Sliders */}
                <div className="space-y-6 mb-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-n-3">Loan Amount</label>
                      <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">$250,000</div>
                    </div>
                    <div className="relative mb-1">
                      <div className="absolute h-2 left-0 right-0 top-1/2 -translate-y-1/2 bg-n-6 rounded-full"></div>
                      <div className="absolute h-2 left-0 right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" style={{ width: '60%' }}></div>
                      <div className="absolute h-5 w-5 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg cursor-pointer" style={{ left: '60%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-n-3 pt-3">
                      <span>$50,000</span>
                      <span>$500,000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-n-3">Interest Rate (%)</label>
                      <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">4.5%</div>
                    </div>
                    <div className="relative mb-1">
                      <div className="absolute h-2 left-0 right-0 top-1/2 -translate-y-1/2 bg-n-6 rounded-full"></div>
                      <div className="absolute h-2 left-0 right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" style={{ width: '35%' }}></div>
                      <div className="absolute h-5 w-5 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg cursor-pointer" style={{ left: '35%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-n-3 pt-3">
                      <span>2.0%</span>
                      <span>10.0%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-n-3">Loan Term</label>
                      <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">30 years</div>
                    </div>
                    <div className="relative mb-1">
                      <div className="absolute h-2 left-0 right-0 top-1/2 -translate-y-1/2 bg-n-6 rounded-full"></div>
                      <div className="absolute h-2 left-0 right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" style={{ width: '80%' }}></div>
                      <div className="absolute h-5 w-5 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg cursor-pointer" style={{ left: '80%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-n-3 pt-3">
                      <span>5 years</span>
                      <span>35 years</span>
                    </div>
                  </div>
                </div>

                {/* Manual Input Option */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold">Manual Input</h4>
                    <div className="w-12 h-6 rounded-full bg-n-6 relative cursor-pointer">
                      <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-n-3">$</span>
                      <input type="text" className="w-full h-10 pl-8 pr-3 rounded-lg bg-n-7 border border-n-6 text-white focus:outline-none focus:border-blue-500" placeholder="Amount" />
                    </div>
                    <div className="relative">
                      <input type="text" className="w-full h-10 px-3 rounded-lg bg-n-7 border border-n-6 text-white focus:outline-none focus:border-blue-500" placeholder="Rate %" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-n-3">%</span>
                    </div>
                    <div className="relative">
                      <input type="text" className="w-full h-10 px-3 rounded-lg bg-n-7 border border-n-6 text-white focus:outline-none focus:border-blue-500" placeholder="Years" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-n-3">yrs</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 font-medium text-white hover:shadow-lg hover:shadow-blue-500/30 transition duration-300">
                  Calculate EMI
                </button>

                {/* Results Section */}
                <div className="mt-6 pt-6 border-t border-n-6">
                  <h4 className="font-bold mb-4">Payment Summary</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-n-7 border border-n-6">
                      <p className="text-sm text-n-3 mb-1">Monthly Payment</p>
                      <p className="text-2xl font-bold text-white">$1,267.23</p>
                    </div>
                    <div className="p-4 rounded-lg bg-n-7 border border-n-6">
                      <p className="text-sm text-n-3 mb-1">Total Interest</p>
                      <p className="text-2xl font-bold text-teal-400">$206,201.60</p>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/20">
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 mr-2">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15848 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 17H12.01" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h4 className="font-medium text-teal-400">AI Recommendation</h4>
                    </div>
                    <p className="text-sm text-white">Refinancing at 3.8% could save you $28,423 over the life of your loan. Would you like a personalized repayment plan?</p>
                  </div>
                </div>
              </div>

              {/* Company Info Footer */}
              <div className="bg-n-8 py-3 px-6 flex justify-between items-center border-t border-n-6">
                <div className="flex items-center">
                  <div className="w-6 h-6 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10C14 12.2091 12.2091 14 10 14" stroke="url(#footer-logo)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M10 14C7.79086 14 6 15.7909 6 18" stroke="url(#footer-logo)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M10 6C12.2091 6 14 4.20914 14 2" stroke="url(#footer-logo)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M4 12H2" stroke="url(#footer-logo)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M18 8H16" stroke="url(#footer-logo)" strokeWidth="1.5" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="footer-logo" x1="2" y1="2" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#3B82F6" />
                          <stop offset="1" stopColor="#2DD4BF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-xs text-n-3 pt-3">© 2025 CalcuLoanAI. All rights reserved.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-n-3 hover:text-white transition duration-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="text-n-3 hover:text-white transition duration-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="text-n-3 hover:text-white transition duration-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.225 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.455C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.18 20.452H3.554V8.995H7.18v11.457zM5.367 7.435c-1.166 0-2.112-.96-2.112-2.14 0-1.18.946-2.139 2.112-2.139 1.165 0 2.112.959 2.112 2.139 0 1.18-.947 2.14-2.112 2.14zm15.085 13.017h-3.625v-5.6c0-1.361-.025-3.111-1.891-3.111-1.893 0-2.182 1.481-2.182 3.014v5.697H9.129V8.995h3.477v1.595h.05c.484-.92 1.67-1.89 3.44-1.89 3.677 0 4.356 2.424 4.356 5.574v6.178z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-teal-400/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>

            {/* Stats floating card */}
            {/* <div className="absolute -top-10 -left-10 hidden lg:block">
              <div className="bg-n-8/90 backdrop-blur-sm border border-n-6 rounded-xl p-4 shadow-lg">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm font-medium">AI Accuracy Rate</span>
                </div>
                <p className="text-2xl font-display font-medium mb-1">99.8%</p>
                <div className="flex items-center text-teal-400 text-xs">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <span>+2.4% from last month</span>
                </div>
              </div>
            </div> */}

            {/* Savings floating card */}
            {/* <div className="absolute -bottom-10 right-10 hidden lg:block">
              <div className="bg-n-8/90 backdrop-blur-sm border border-n-6 rounded-xl p-4 shadow-lg">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-sm font-medium">Average User Savings</span>
                </div>
                <p className="text-2xl font-display font-medium mb-1">$42,618</p>
                <div className="flex items-center text-blue-400 text-xs">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <span>Over typical 30-year loan</span>
                </div>
              </div>
            </div> */}
          </div>
          <BackgroundCircles />
        </div>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
