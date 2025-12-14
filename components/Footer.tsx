import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="bg-teal-900 p-2 rounded-full">
            <Heart className="h-6 w-6 text-teal-400 fill-teal-400" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Raj Healing Hands</span>
        </div>
        
        <p className="text-teal-200 mb-8 max-w-md mx-auto">
          Dedicated to restoring your movement and improving your quality of life through expert physiotherapy care.
        </p>

        <div className="border-t border-teal-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-teal-400">
          <p>&copy; {new Date().getFullYear()} Raj Healing Hands. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;