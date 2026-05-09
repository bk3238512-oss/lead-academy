import React from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, Users, Award } from 'lucide-react';

const stats = [
  { label: 'Total Selections', value: '2,500+', icon: Trophy, color: 'text-primary' },
  { label: 'BPSC Selections', value: '150+', icon: Award, color: 'text-secondary' },
  { label: 'Railway & SSC', value: '800+', icon: TrendingUp, color: 'text-accent' },
  { label: 'Success Rate', value: '94%', icon: Users, color: 'text-green-600' },
];

export default function Results() {
  return (
    <section id="results" className="bg-primary text-white py-24 overflow-hidden relative">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Our Track Record of <span className="text-accent italic">Success</span>
          </motion.h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Year after year, LEAD Academy students have consistently secured top ranks in various government examinations across India.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center"
            >
              <div className={`mb-4 inline-block p-4 rounded-2xl bg-white ${stat.color} shadow-lg shadow-black/10`}>
                <stat.icon size={32} />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 font-serif">{stat.value}</div>
              <div className="text-blue-100 uppercase tracking-widest text-xs font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <button className="bg-white text-primary hover:bg-accent hover:text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl shadow-black/20 group">
             Check Detailed Results <Award className="inline-block ml-2 group-hover:rotate-12 transition-transform" />
           </button>
        </div>
      </div>
    </section>
  );
}
