import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, History, MapPin, Building2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="bg-app-bg relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl mb-6">About LEAD Academy <span className="text-primary italic">Patna</span></h2>
              <p className="text-lg text-gray-600 leading-relaxed italic">
                "Our mission is to empower students with quality education and help them achieve success in government examinations through smart learning and proper mentorship."
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm text-primary">
                  <History size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Founded in 2020</h4>
                  <p className="text-gray-500">Helping aspirants for over 4 years with a proven track record.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm text-secondary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Located in Patna</h4>
                  <p className="text-gray-500">The hub of competitive exam preparation in Bihar.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm text-accent">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Online & Offline</h4>
                  <p className="text-gray-500">Flexible learning modes to suit every student's needs.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-primary/5 border border-primary/5">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To become one of Bihar’s most trusted coaching platforms for government exam preparation, making quality education affordable and accessible to all.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden h-48 border-4 border-white shadow-lg">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Classroom 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-3xl overflow-hidden h-64 border-4 border-white shadow-lg">
                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop" alt="Classroom 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-3xl overflow-hidden h-64 border-4 border-white shadow-lg">
                <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop" alt="NCERT & Competitive Exam Books" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="bg-primary p-6 rounded-3xl text-white shadow-lg shadow-primary/30">
                <div className="text-3xl font-bold mb-1">NCERT</div>
                <div className="text-blue-200 uppercase tracking-wider text-xs font-bold">Expert Content</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
