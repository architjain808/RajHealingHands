import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, MapPin, Mail, Clock, ExternalLink, ArrowRight, Star } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import { ContactFormState } from '../types';

const MotionDiv = motion.div as any;

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>({ name: '', problem: '' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Raj Healing Hands! My name is ${form.name}. I would like to enquire about: ${form.problem}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mapAddress = "Tapovan, opposite peeple tree hotel, saraye, Laxman Jhula, Uttarakhand 249192";
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Details Column */}
          <MotionDiv 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <div className="mb-8">
              <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-3">Get in Touch</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Start Your Recovery</h3>
              <p className="text-lg text-slate-600 font-medium">
                We are conveniently located in Tapovan, Rishikesh. Book an appointment or visit us for a consultation.
              </p>
            </div>

            <div className="space-y-6 flex-grow mb-8">
              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-teal-50 transition-colors border border-transparent hover:border-teal-100 group cursor-pointer" onClick={() => window.open(`tel:+${WHATSAPP_NUMBER}`)}>
                <div className="bg-teal-100 p-3 rounded-full mt-1 group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 text-teal-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase">Call or WhatsApp</p>
                  <p className="text-xl font-bold text-slate-900">+91 73517 75090</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 group">
                <div className="bg-blue-100 p-3 rounded-full mt-1 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase">Email Us</p>
                  <p className="text-xl font-bold text-slate-900">rajhealing@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-100 group">
                 <div className="bg-purple-100 p-3 rounded-full mt-1 group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-500 uppercase">Working Hours</p>
                   <p className="text-lg font-bold text-slate-900">Mon-Sat: 9am - 8pm</p>
                   <p className="text-sm text-slate-500">Sunday: By Appointment</p>
                </div>
              </div>
            </div>

            {/* Quick Links & Google Reviews */}
            <div className="grid grid-cols-2 gap-4">
                 {/* Google Reviews Card */}
                <div 
                  className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-lg relative overflow-hidden group cursor-pointer hover:border-teal-200"
                  onClick={() => window.open('https://search.google.com/local/writereview?placeid=ChByYWogaGVhbGluZyBoYW5kSO2O7quQvYCACFoeEAAQARACGAAYARgCIhByYWogaGVhbGluZyBoYW5kkgEUcGh5c2lvdGhlcmFweV9jZW50ZXI', '_blank')}
                >
                    <div className="relative z-10">
                        <div className="flex space-x-1 mb-2">
                           <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                           <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                           <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                           <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                           <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </div>
                        <p className="font-bold text-slate-800 text-lg">Google Reviews</p>
                        <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center">Rate us 5 Stars <ExternalLink className="h-3 w-3 ml-1" /></p>
                    </div>
                    {/* Google G Logo Decoration */}
                    <div className="absolute -right-2 -bottom-4 text-9xl font-black text-slate-50 opacity-50 rotate-12 select-none group-hover:scale-110 transition-transform">G</div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200 relative overflow-hidden group cursor-pointer" onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}>
                    <div className="relative z-10">
                        <p className="font-bold text-teal-800 text-lg">Services</p>
                        <p className="text-xs text-teal-600 font-semibold mt-1 flex items-center">Explore Treatments <ArrowRight className="h-3 w-3 ml-1" /></p>
                    </div>
                    <div className="absolute right-[-10px] bottom-[-10px] bg-teal-200 rounded-full w-16 h-16 opacity-50 group-hover:scale-150 transition-transform"></div>
                </div>
            </div>
            
          </MotionDiv>

          {/* Form & Map Container */}
          <MotionDiv 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-4 border-teal-50 shadow-2xl flex flex-col space-y-8 relative"
          >
             <div className="h-64 w-full rounded-3xl overflow-hidden shadow-inner border-2 border-slate-100 relative group">
               <iframe 
                 title="Raj Healing Hands Location"
                 src={mapSrc}
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="grayscale-[20%] hover:grayscale-0 transition-all duration-500"
               />
               <a 
                 href="https://maps.app.goo.gl/YRGeKoaadHBfzHJN4" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-teal-500 hover:text-white transition-colors flex items-center"
               >
                 <MapPin className="h-3 w-3 mr-1" /> Get Directions
               </a>
             </div>

             <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
               <div className="flex items-center space-x-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-bold text-gray-400 uppercase">Fast Reply Guaranteed</span>
               </div>
               <div>
                 <input 
                   type="text" 
                   required
                   value={form.name}
                   onChange={(e) => setForm({...form, name: e.target.value})}
                   className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-teal-400 focus:ring-4 focus:ring-teal-50 outline-none bg-slate-50 transition-all font-bold text-slate-700 placeholder-slate-400"
                   placeholder="Your Name"
                 />
               </div>
               
               <div>
                 <textarea 
                   required
                   rows={3}
                   value={form.problem}
                   onChange={(e) => setForm({...form, problem: e.target.value})}
                   className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-teal-400 focus:ring-4 focus:ring-teal-50 outline-none bg-slate-50 transition-all font-medium text-slate-700 placeholder-slate-400"
                   placeholder="How can we help?"
                 />
               </div>

               <button 
                 type="submit"
                 className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-1"
               >
                 <Send className="h-5 w-5" />
                 <span>Send WhatsApp Message</span>
               </button>
             </form>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Contact;