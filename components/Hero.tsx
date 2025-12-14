import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen pt-20 flex items-center relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-blue-50">
      {/* Decorative Blobs */}
      <MotionDiv 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[-50px] w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />
      <MotionDiv 
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[-50px] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-teal-100 transform -rotate-2 hover:rotate-0 transition-transform">
              <span className="flex h-3 w-3 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="text-sm font-bold text-gray-600 tracking-wide uppercase">Fun & Effective Recovery</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight mb-6">
              Move Better. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
                Live Happier.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              Raj Healing Hands makes physiotherapy easy, comfortable, and friendly! We help you get back to your best self with a smile.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <MotionButton 
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-800 transition-colors flex items-center"
              >
                Book Visit <ArrowRight className="ml-2 h-5 w-5" />
              </MotionButton>
              
              <MotionButton 
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-100 rounded-2xl font-bold text-lg shadow-sm hover:border-teal-200 transition-all"
              >
                View Services
              </MotionButton>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-sm font-bold text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 className="h-4 w-4 text-green-600" /></div>
                <span>Certified Experts</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-1 rounded-full"><CheckCircle2 className="h-4 w-4 text-green-600" /></div>
                <span>100% Personal Care</span>
              </div>
            </div>
          </MotionDiv>

          {/* Hero Image / Illustration */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
             <div className="relative w-full aspect-square">
                {/* Floating Elements */}
                <MotionDiv 
                  animate={{ y: [0, -20, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 right-10 bg-white p-4 rounded-3xl shadow-xl z-20 border-4 border-teal-50"
                >
                   <span className="text-4xl">⚡</span>
                </MotionDiv>
                <MotionDiv 
                  animate={{ y: [0, 20, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-20 left-0 bg-white p-4 rounded-3xl shadow-xl z-20 border-4 border-blue-50"
                >
                   <span className="text-4xl">🧘‍♀️</span>
                </MotionDiv>

                {/* Main 3D Illustration */}
                <div className="w-full h-full flex items-center justify-center">
                   {/* Using a 3D medical character illustration placeholder */}
                   <img 
                     src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=800" 
                     alt="3D Physio Character" 
                     className="w-[90%] h-[90%] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                   />
                </div>
             </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Hero;