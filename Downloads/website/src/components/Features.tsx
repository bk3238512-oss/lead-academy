import React from 'react';
import { motion } from 'motion/react';
import { Video, BookOpen, FileCheck, HelpCircle, Users, BadgeIndianRupee, GraduationCap, VideoIcon } from 'lucide-react';

const features = [
  { name: 'Live Classes', description: 'Interactive sessions with real-time doubt solving.', icon: Video },
  { name: 'Recorded Lectures', description: 'Access classes anytime, anywhere at your convenience.', icon: VideoIcon },
  { name: 'NCERT & PDFs', description: 'Comprehensive study materials with complete NCERT coverage for all exams.', icon: BookOpen },
  { name: 'Mock Tests', description: 'Regular series to evaluate and improve performance.', icon: FileCheck },
  { name: 'Doubt Solving', description: 'Dedicated sessions to clear all your concepts.', icon: HelpCircle },
  { name: 'Hindi Medium', description: 'Full support for students from Hindi medium backgrounds.', icon: GraduationCap },
  { name: 'Affordable Rates', description: 'Quality education priced for everyone.', icon: BadgeIndianRupee },
  { name: 'Expert Faculty', description: 'Learn from teachers who have cleared these exams.', icon: Users },
];

export default function Features() {
  return (
    <section className="bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4"
          >
            Why Choose <span className="text-secondary">LEAD Academy?</span>
          </motion.h2>
          <p className="text-gray-500">Unlock your potential with our unique teaching methodology.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="mb-6 inline-block p-4 rounded-2xl bg-app-bg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.name}</h3>
              <p className="text-gray-500 leading-relaxed italic">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
