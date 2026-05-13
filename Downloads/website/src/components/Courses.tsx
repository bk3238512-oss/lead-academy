import React, { useState } from 'react';

import { motion } from 'motion/react';

import {
  BookOpen,
  Target,
  ShieldCheck,
  Zap,
  Laptop,
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';

import LoginModal from './LoginModal';

import { COURSES } from '../constants/courses';

const icons = [
  ShieldCheck,
  Target,
  Zap,
  BookOpen,
  Laptop,
  BookOpen,
  BookOpen,
  BookOpen,
];

interface CoursesProps {
  onCourseSelect?: () => void;
}

const Courses: React.FC<CoursesProps> = () => {

  const { user } = useAuth();

  const [isLoginModalOpen,
    setIsLoginModalOpen] =
    useState(false);

  const handleEnrollClick =
    (courseId: string) => {

      if (!user) {

        setIsLoginModalOpen(true);

      } else {

        window.location.href =
          `/course/${courseId}`;

      }

    };

  return (

    <section
      id="courses"
      className="bg-white"
    >

      <div className="section-container">

        <div className="text-center mb-16">

          <motion.h2
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="text-4xl md:text-5xl mb-4"
          >

            Excellence in
            <span className="text-blue-700">
              {' '}Every Course
            </span>

          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: 0.1
            }}
            className="text-gray-500 max-w-2xl mx-auto"
          >

            We offer specialized coaching
            for competitive exams with
            expert guidance.

          </motion.p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {COURSES.map(
            (course, index) => {

              const Icon =
                icons[index % icons.length];

              return (

                <motion.div
                  key={course.id}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    delay:
                      index * 0.05
                  }}
                  whileHover={{
                    y: -5
                  }}
                  className="rounded-3xl overflow-hidden border border-gray-100 bg-app-bg hover:bg-white hover:shadow-2xl transition-all duration-300 group"
                >

                  {/* THUMBNAIL */}

                  <img
                    src={
                      course.thumbnail ||
                      '/logo.png'
                    }
                    alt={course.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-6">

                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-700 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">

                      <Icon size={28} />

                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-700 transition-colors">

                      {course.title}

                    </h3>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">

                      {course.description}

                    </p>

                    <div className="flex justify-between items-center mb-5">

                      <span className="text-blue-700 font-black text-2xl">

                        ₹{course.price}

                      </span>

                      <span className="text-sm text-gray-500">

                        {course.duration}

                      </span>

                    </div>

                    <button
                      onClick={() =>
                        handleEnrollClick(
                          course.id
                        )
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all"
                    >

                      {user
                        ? 'View Course'
                        : 'Enroll Now'}

                    </button>

                  </div>

                </motion.div>

              );

            }
          )}

        </div>

      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() =>
          setIsLoginModalOpen(false)
        }
      />

    </section>

  );

};

export default Courses;