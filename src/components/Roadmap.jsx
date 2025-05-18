import { useState, useEffect } from "react";
import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import Tagline from "./Tagline";
import { roadmap } from "../constants";
import { check2, grid, loading1 } from "../assets";
import { motion } from "framer-motion";

const Roadmap = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
    
    // Reset active item after 10 seconds
    const timer = setTimeout(() => {
      setActiveItem(null);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [activeItem]);

  return (
    <Section className="overflow-hidden" id="roadmap">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* <Tagline className="mb-5 mx-auto">Our Journey Forward</Tagline> */}
          <Heading 
            tag="Ready to get started" 
            title="What we're working on" 
            className="mx-auto max-w-3xl" 
          />
        </motion.div>

        <div className="relative z-10">
          {/* 3D perspective wrapper */}
          <div className="perspective-[2000px] transform-gpu">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 md:gap-6 relative">
              {roadmap.map((item, index) => {
                const isActive = activeItem === item.id;
                const status = item.status === "done" ? "Done" : "In progress";
                const delay = index * 0.2;
                
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                    animate={{ 
                      opacity: isInView ? 1 : 0, 
                      y: isInView ? 0 : 50,
                      rotateX: isInView ? 0 : -15 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay, 
                      ease: "easeOut" 
                    }}
                    whileHover={{ 
                      scale: 1.03, 
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)" 
                    }}
                    onClick={() => setActiveItem(item.id)}
                    className={`group cursor-pointer transition-all duration-500 p-0.5 rounded-3xl backdrop-blur-sm ${
                      item.colorful 
                        ? "bg-gradient-to-br from-purple-500 via-blue-400 to-emerald-400"
                        : isActive
                          ? "bg-gradient-to-r from-blue-500 to-cyan-400" 
                          : "bg-gradient-to-r from-n-6 to-n-7"
                    }`}
                    key={item.id}
                  >
                    <div className="relative h-full p-7 bg-n-8 rounded-[2.75rem] overflow-hidden flex flex-col xl:p-10 backdrop-blur-md bg-opacity-95">
                      {/* Status indicator */}
                      <div className={`absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                        item.status === "done" 
                          ? "bg-green-500/10 text-green-400" 
                          : "bg-amber-500/10 text-amber-400"
                      }`}>
                        {item.status === "done" ? (
                          <img src={check2} width={12} height={12} alt="Complete" />
                        ) : (
                          <img src={loading1} width={12} height={12} alt="In progress" className="animate-spin" />
                        )}
                        {status}
                      </div>
                      
                      {/* Background grid with glow effect */}
                      <div className="absolute -inset-1 opacity-30 group-hover:opacity-50 transition-opacity z-0">
                        <img
                          className="w-full h-full object-cover"
                          src={grid}
                          alt="Grid"
                        />
                        <div className={`absolute inset-0 ${
                          item.colorful 
                            ? "bg-gradient-radial from-purple-500/20 via-transparent to-transparent"
                            : "bg-gradient-radial from-blue-500/10 via-transparent to-transparent"
                        }`}></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-1 flex flex-col h-full">
                        <div className="mb-8 mt-4 mx-auto transform group-hover:scale-105 transition-transform duration-500">
                          <div className="overflow-hidden rounded-2xl shadow-lg">
                            <img
                              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                              src={item.imageUrl}
                              width={500}
                              height={340}
                              alt={item.title}
                            />
                          </div>
                        </div>
                        
                        <h4 className="text-2xl font-bold mb-3 group-hover:text-gradient-blue transition-colors">{item.title}</h4>
                        <p className="text-n-4 group-hover:text-n-3 transition-colors mb-6">{item.text}</p>
                        
                        <div className="mt-auto">
                          <div className={`inline-flex items-center gap-2 text-sm font-medium ${
                            item.colorful ? "text-blue-400" : "text-n-3"
                          } group-hover:translate-x-2 transition-transform`}>
                            Learn more
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.3335 8H12.6668" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 3.33325L12.6667 7.99992L8 12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-radial from-blue-500/20 via-transparent to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-radial from-purple-500/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button className="mx-auto">
            View Complete Roadmap
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};

export default Roadmap;