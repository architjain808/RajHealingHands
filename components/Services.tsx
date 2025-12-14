import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Star, Circle, Triangle } from 'lucide-react';
import { SERVICES } from '../constants';
import { Service } from '../types';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

// Helper to render custom animated illustration based on service
const ServiceIllustration: React.FC<{ service: Service }> = ({ service }) => {
  const colorMap: Record<string, string> = {
    teal: 'text-teal-500 bg-teal-100 border-teal-200',
    orange: 'text-orange-500 bg-orange-100 border-orange-200',
    purple: 'text-purple-500 bg-purple-100 border-purple-200',
    blue: 'text-blue-500 bg-blue-100 border-blue-200',
    rose: 'text-rose-500 bg-rose-100 border-rose-200',
    green: 'text-green-500 bg-green-100 border-green-200',
  };

  const blobColors: Record<string, string> = {
    teal: '#ccfbf1', // teal-100
    orange: '#ffedd5', // orange-100
    purple: '#f3e8ff', // purple-100
    blue: '#dbeafe', // blue-100
    rose: '#ffe4e6', // rose-100
    green: '#dcfce7', // green-100
  };

  const iconColorClass = colorMap[service.color] || colorMap['teal'];
  const blobColor = blobColors[service.color] || blobColors['teal'];

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-white">
      {/* Animated Background Blob */}
      <MotionDiv
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 opacity-60"
        style={{ backgroundColor: blobColor }}
      />

      {/* Floating Particles */}
      <MotionDiv
        animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        className="absolute top-8 right-12 text-yellow-400"
      >
        <Star className="h-6 w-6 fill-current" />
      </MotionDiv>
      <MotionDiv
        animate={{ x: [-10, 10, -10], rotate: [0, 180, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className={`absolute bottom-8 left-12 ${iconColorClass.split(' ')[0]}`}
      >
        <Circle className="h-4 w-4 fill-current" />
      </MotionDiv>
      <MotionDiv
        animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute top-12 left-16 text-slate-300"
      >
        <Triangle className="h-5 w-5 fill-current" />
      </MotionDiv>

      {/* Main Icon */}
      <MotionDiv
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        className={`relative z-10 p-6 rounded-3xl bg-white shadow-xl border-4 border-white ${iconColorClass.split(' ')[0]}`}
      >
        <service.icon className="h-16 w-16" strokeWidth={1.5} />
      </MotionDiv>
    </div>
  );
};

const Services: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 3);

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-teal-50 to-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2dd4bf 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <MotionDiv
             initial={{ scale: 0 }}
             whileInView={{ scale: 1 }}
             className="inline-block bg-white p-3 rounded-full shadow-md mb-4"
          >
            <Sparkles className="h-8 w-8 text-yellow-400 fill-yellow-400 animate-pulse" />
          </MotionDiv>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Super Powers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive treatments designed to get you back in action!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service, index) => (
              <MotionDiv
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-xl border-2 border-gray-50 hover:border-teal-300 transition-colors group cursor-pointer flex flex-col"
              >
                {/* Illustration Area */}
                <div className="h-64 relative">
                  <ServiceIllustration service={service} />
                </div>

                <div className="p-8 flex-grow relative">
                   {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-${service.color}-50 to-transparent rounded-bl-full opacity-50`}></div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {service.description}
                  </p>
                  
                  <MotionDiv 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    className={`h-1.5 mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-${service.color}-400`}
                    style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} 
                  />
                   <div className={`h-1.5 mt-6 rounded-full w-full opacity-0 group-hover:opacity-100 transition-opacity`} 
                        style={{ backgroundColor: service.color === 'teal' ? '#2dd4bf' : 
                                                  service.color === 'orange' ? '#fb923c' :
                                                  service.color === 'purple' ? '#c084fc' :
                                                  service.color === 'blue' ? '#60a5fa' :
                                                  service.color === 'rose' ? '#fb7185' : '#4ade80' }} />
                </div>
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center">
          <MotionButton
            whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-800 transition-colors"
          >
            <span>{showAll ? 'Hide Services' : 'Show All Treatments'}</span>
            {showAll ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </MotionButton>
        </div>
      </div>
    </section>
  );
};

export default Services;