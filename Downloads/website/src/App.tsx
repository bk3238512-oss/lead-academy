import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Footer from './components/Footer';

import CourseDetail from './components/CourseDetail';
import AdminDashboard from './components/AdminDashboard';

import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';

export default function App() {

  const [path, setPath] = useState(
    window.location.pathname
  );

  useEffect(() => {

    const handleRoute = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener(
      'popstate',
      handleRoute
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handleRoute
      );
    };

  }, []);

  // ADMIN

  if (path === '/admin') {
    return <AdminDashboard />;
  }

  // PRIVACY POLICY

  if (path === '/privacy-policy') {
    return <PrivacyPolicy />;
  }

  // TERMS

  if (path === '/terms') {
    return <Terms />;
  }

  // COURSE DETAIL

  if (path.startsWith('/course/')) {

    const courseId = path.replace(
      '/course/',
      ''
    );

    return (
      <CourseDetail id={courseId} />
    );

  }

  // HOME PAGE

  return (

    <div>

      <Header />

      <Hero />

      <div id="about">
        <About />
      </div>

      <div id="courses">
        <Courses />
      </div>

      <Footer />

    </div>

  );

}