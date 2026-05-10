/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
// lightweight internal routing to avoid dependency on react-router-dom

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Features from './components/Features';
import Faculty from './components/Faculty';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CourseDetail from './components/CourseDetail';

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Courses />
      <Features />
      <Faculty />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (path.startsWith('/course/')) {
    const id = decodeURIComponent(path.replace('/course/', ''));
    const C = CourseDetail as any;
    return <C id={id} />;
  }

  return <Home />;
}