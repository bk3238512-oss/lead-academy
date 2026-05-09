import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Users, Award, BookOpen } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
          alt="Academy Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-4 py-2 rounded-full mb-6 font-semibold text-sm">
              <Star size={16} className="fill-current" />
              <span>Bihar's Most Trusted Coaching Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Crack <span className="text-secondary italic">Government</span> Exams with Expert Guidance
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              Join LEAD Academy Patna and prepare for BPSC, UPSC, SSC, Banking, Railway, and other exams under the mentorship of Suman Patel Sir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="btn-primary flex items-center justify-center gap-2">
                Join Online Course <ArrowRight size={20} />
              </button>
              <a href="#youtube" className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                Watch Demo Video
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 p-2 rounded-lg text-accent">
                  <Users size={24} />
                </div>
                <div>
                  <div className="font-bold text-xl">10k+</div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Students</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Award size={24} />
                </div>
                <div>
                  <div className="font-bold text-xl">95%</div>
                  <div className="text-xs text-gray-500 font-semibold uppercase">Success Rate</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                  <BookOpen size={24} />
                </div>
                <div>
                  <div className="font-bold text-lg">NCERT</div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase">Based Prep</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1544717297-fa154da09f5b?q=80&w=2070&auto=format&fit=crop" 
                alt="Suman Patel Sir" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary p-8">
                <div className="text-white">
                  <div className="text-2xl font-bold font-serif">Suman Patel Sir</div>
                  <div className="text-blue-200 uppercase tracking-widest text-sm font-semibold">Founder & Lead Mentor</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-full -z-10 blur-3xl opacity-30"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary rounded-full -z-10 blur-3xl opacity-30"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
