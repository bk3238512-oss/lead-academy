/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Features from './components/Features';
import Faculty from './components/Faculty';
import Results from './components/Results';
import YouTube from './components/YouTube';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CourseDetail from './components/CourseDetail';

export default function App() {
  const [view, setView] = useState<'home' | 'course-detail'>('home');

  if (view === 'course-detail') {
    return (
      <div className="min-h-screen">
        <CourseDetail onBack={() => setView('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Results />
        <Courses onCourseSelect={() => setView('course-detail')} />
        <YouTube />
        <Faculty />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
