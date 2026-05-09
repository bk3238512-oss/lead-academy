import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const faculty = [
  { name: 'Suman Patel Sir', role: 'Lead Mentor - BPSC & UPSC', image: "/suman.png" },
];

const testimonials = [
  {
    name: 'Anita Kumari',
    success: 'Selected in BPSC 67',
    quote: 'The guidance and mentorship here transformed my preparation and gave me the confidence to succeed.',
  },
  {
    name: 'Rohit Verma',
    success: 'Cleared UPSC Prelims',
    quote: 'Structured lessons and regular feedback made all the difference in my journey.',
  },
];

export default function Faculty() {
  return (
    <section id="faculty" className="bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4"
          >
            Meet Our <span className="text-blue-700">Expert Faculty</span>
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Learn from the best in the industry who have years of experience in mentoring students for government exams.</p>
        </div>

        <div className="flex justify-center mb-24">
          {faculty.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center group max-w-sm"
            >
              <div className="relative mb-8 mx-auto w-72 h-72 rounded-3xl overflow-hidden border-8 border-app-bg group-hover:border-primary/20 transition-all duration-300 shadow-2xl">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{member.name}</h3>
              <p className="text-blue-700 font-bold uppercase tracking-widest text-sm italic">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-24">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">What Our <span className="text-red-600">Students Say</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-app-bg p-8 rounded-3xl relative"
              >
                <div className="text-accent mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <Quote className="absolute top-8 right-8 text-blue-700/10" size={64} />
                <p className="text-lg italic text-gray-700 mb-6 relative z-10 leading-relaxed uppercase">
                  "{t.quote}"
                </p>
                <div>
                  <div className="font-bold text-xl">{t.name}</div>
                  <div className="text-red-600 font-bold text-sm tracking-widest">{t.success}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
