import React from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Features from './components/Features';
import Faculty from './components/Faculty';
import Contact from './components/Contact';
import Footer from './components/Footer';

import CourseDetail from './components/CourseDetail';
import AdminDashboard from './components/AdminDashboard';

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

    const onPop = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', onPop);

    return () => window.removeEventListener('popstate', onPop);

  }, []);

  if (path.startsWith('/course/')) {

    const id = decodeURIComponent(
      path.replace('/course/', '')
    );

    return <CourseDetail id={id} />;
  }

  if (path === '/admin') {
    return <AdminDashboard />;
  }

  return <Home />;
}