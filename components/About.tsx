import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Sparkles } from "lucide-react";
import small from "../assets/small.png";
const MotionDiv = motion.div as any;

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Fun Background Blobs */}
      <MotionDiv
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"
      />
      <MotionDiv
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side - Blob Style */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center relative"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Animated Rings */}
              <MotionDiv
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-teal-200 rounded-full"
              />

              {/* 3D Doctor Avatar */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-teal-50 flex items-center justify-center">
                <img
                  src={small}
                  alt="Anshikka Arora Avatar"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Floating Badge */}
              <MotionDiv
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-2 border-2 border-teal-100"
              >
                <Sparkles className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                <div>
                  <p className="font-bold text-gray-800 text-sm">Super</p>
                  <p className="font-bold text-teal-500 text-xs">Friendly!</p>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>

          {/* Text Side */}
          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <div className="inline-block bg-teal-100 text-teal-700 font-bold px-4 py-1 rounded-full text-sm mb-4">
              👋 Meet Anshikka Arora
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Healing with a <br />
              <span className="text-teal-500">Happy Heart</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 font-medium">
              Hi there! I'm Anshikka Arora. I believe physiotherapy shouldn't be
              scary. My goal is to make your recovery journey as fun and
              effective as possible!
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We use colorful equipment, engaging exercises, and a lot of
              positivity to get you moving again.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
                <div className="bg-yellow-400 p-1 rounded-full text-white">
                  <Award className="h-4 w-4" />
                </div>
                <span className="font-bold text-gray-700">Expert Care</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-xl border border-purple-100">
                <div className="bg-purple-400 p-1 rounded-full text-white">
                  <Heart className="h-4 w-4 fill-current" />
                </div>
                <span className="font-bold text-gray-700">Patient Loved</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                <div className="bg-blue-400 p-1 rounded-full text-white">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="font-bold text-gray-700">Certified</span>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default About;
