import React from 'react';

export default function Hero() {

  return (

    <section className="min-h-screen bg-gray-100 flex items-center pt-24">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}

        <div>

          <h1 className="text-6xl font-black leading-tight mb-6">

            <span className="text-red-600 italic">
              Government
            </span>

            <br />

            <span className="text-blue-800">
              Exams with
            </span>

            <br />

            <span className="text-blue-800">
              Expert Guidance
            </span>

          </h1>

          <p className="text-2xl text-gray-700 mb-10 leading-relaxed">

            Join LEAD Academy Patna and prepare for
            BPSC, UPSC, SSC, Banking, Railway and
            other exams under the mentorship of
            Suman Patel Sir.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-6 mb-14">

            {/* JOIN COURSE */}

            <button
              onClick={() => {
                window.location.href =
                  '/course/gk-gs-mastery';
              }}
              className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl"
            >
              Join Online Course →
            </button>

            {/* DEMO VIDEO */}

            <button
              onClick={() => {
                window.open(
                  'https://www.youtube.com/watch?v=1Kywj6czbdc',
                  '_blank'
                );
              }}
              className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-10 py-5 rounded-2xl font-black text-xl"
            >
              Watch Demo Video
            </button>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-3 gap-8">

            <div>

              <h3 className="text-4xl font-black text-blue-700">
                10k+
              </h3>

              <p className="text-gray-600 font-bold">
                Students
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-green-600">
                95%
              </h3>

              <p className="text-gray-600 font-bold">
                Success Rate
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-yellow-600">
                NCERT
              </h3>

              <p className="text-gray-600 font-bold">
                Based Prep
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="flex justify-center">

          <div className="bg-white rounded-[40px] shadow-2xl p-4 border-4 border-pink-100">

            <img
              src="/Suman.png"
              alt="Suman Patel"
              className="w-full max-w-md rounded-[30px]"
            />

          </div>

        </div>

      </div>

    </section>

  );

}