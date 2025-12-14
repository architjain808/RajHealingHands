import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';
import { REVIEWS } from '../constants';

const MotionDiv = motion.div as any;

const Reviews: React.FC = () => {
  // Define distinctive colors for cards to make them fun
  const cardColors = [
    'bg-yellow-50 border-yellow-200',
    'bg-purple-50 border-purple-200',
    'bg-blue-50 border-blue-200',
    'bg-teal-50 border-teal-200',
  ];

  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Happy Patients</h2>
        <div className="flex justify-center items-center space-x-2 mb-8">
           <div className="flex space-x-1">
             {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />)}
           </div>
           <span className="text-gray-500 font-bold ml-2">5.0 Star Rating</span>
        </div>
      </div>

      {/* Marquee Effect Container */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 animate-scroll whitespace-nowrap px-4 py-4" style={{ width: 'max-content' }}>
          {/* Duplicate list for infinite scroll feel (rendered twice) */}
          {[...REVIEWS, ...REVIEWS].map((review, index) => {
             const colorClass = cardColors[index % cardColors.length];
             return (
              <MotionDiv
                key={`${review.id}-${index}`}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className={`w-80 md:w-96 flex-shrink-0 p-8 rounded-[2rem] border-2 ${colorClass} shadow-sm relative cursor-pointer whitespace-normal`}
              >
                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-md border border-gray-100">
                  <MessageCircle className="h-6 w-6 text-gray-400" />
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-gray-700 bg-white shadow-sm border border-gray-100`}>
                    {review.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.author}</h4>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide bg-white px-2 py-0.5 rounded-full">{review.role}</span>
                  </div>
                </div>

                <div className="flex text-yellow-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 font-medium leading-relaxed italic">
                  "{review.text}"
                </p>
              </MotionDiv>
             );
          })}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Reviews;