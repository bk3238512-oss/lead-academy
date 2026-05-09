import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Target, ShieldCheck, Zap, Laptop, Clock, Database, Headset } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

const courses = [
  { id: 1, name: 'UPSC Preparation', icon: ShieldCheck, studentsCount: '1,200+' },
  { id: 2, name: 'BPSC Preparation', icon: Target, studentsCount: '2,500+' },
  { id: 3, name: 'SSC Coaching', icon: Zap, studentsCount: '3,000+' },
  { id: 4, name: 'Banking Exams', icon: Database, studentsCount: '1,800+' },
  { id: 5, name: 'Railway Exams', icon: Laptop, studentsCount: '2,000+' },
  { id: 6, name: 'CDS Coaching', icon: BookOpen, studentsCount: '800+' },
  { id: 7, name: 'Daroga Preparation', icon: ShieldCheck, studentsCount: '1,500+' },
  { id: 8, name: 'General Exams', icon: Clock, studentsCount: '4,000+' },
];

interface CoursesProps {
  onCourseSelect?: () => void;
}

export default function Courses({ onCourseSelect }: CoursesProps) {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleEnrollClick = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else if (onCourseSelect) {
      onCourseSelect();
    }
  };

  return (
    <section id="courses" className="bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4"
          >
            Excellence in <span className="text-primary">Every Course</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto"
          >
            We offer specialized coaching for a wide range of government competitive exams with focused curriculum and expert guidance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl border border-gray-100 bg-app-bg hover:bg-white hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <course.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
              <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">{course.studentsCount} Students Enrolled</p>
              <button 
                onClick={handleEnrollClick}
                className="text-primary font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                {user ? 'View Content' : 'Enroll Now'} <BookOpen size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </section>
  );
}
