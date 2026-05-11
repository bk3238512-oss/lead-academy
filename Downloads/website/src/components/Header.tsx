import React from 'react';

export default function Header() {

  return (

    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}

        <div className="flex items-center gap-4">

          <img
            src="/logo.jpg"
            alt="LEAD Academy"
            className="w-16 h-16 rounded-2xl"
          />

          <div>

            <h1 className="text-4xl font-black text-blue-700">
              LEAD Academy
            </h1>

            <p className="font-bold text-gray-700">
              PATNA
            </p>

          </div>

        </div>

        {/* NAVBAR */}

        <nav className="flex gap-10 text-2xl font-bold text-gray-800">

          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
          >
            Home
          </button>

          <button
            onClick={() => {
              const section =
                document.getElementById('about');

              section?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
          >
            About
          </button>

          <button
            onClick={() => {
              const section =
                document.getElementById('courses');

              section?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
          >
            Courses
          </button>

          <button
            onClick={() => {
              window.open(
                'https://www.youtube.com/@LEADAcademyPatna',
                '_blank'
              );
            }}
            className="text-red-600"
          >
            YouTube
          </button>

        </nav>

      </div>

    </header>

  );

}