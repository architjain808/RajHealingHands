import React, { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Stories', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${scrolled || isOpen ? 'bg-white shadow-md border-b border-teal-50 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 cursor-pointer group z-[1001]"
          >
            <div className="bg-teal-400 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-md">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className={`text-2xl font-extrabold tracking-tight group-hover:text-teal-600 transition-colors ${scrolled || isOpen ? 'text-gray-900' : 'text-gray-900'}`}>
              Raj Healing Hands
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-semibold transition-colors text-lg hover:text-teal-600 ${scrolled ? 'text-gray-600' : 'text-gray-700'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold shadow-lg hover:bg-gray-800 hover:scale-105 transition-all"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-[1001]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-teal-600 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-2xl fixed top-0 left-0 w-full z-[999] pt-24 pb-8"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-6 py-4 text-2xl font-bold text-gray-800 hover:bg-teal-50 hover:text-teal-600 rounded-3xl transition-colors active:bg-teal-100 flex justify-between items-center group"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-6">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full px-6 py-5 bg-teal-500 text-white rounded-3xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
                >
                  Book Appointment Now
                </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;