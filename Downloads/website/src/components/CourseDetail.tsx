import React, { useEffect, useState } from 'react';

import {
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

import { db } from '../lib/firebase';
import { COURSES } from '../constants/courses';

export default function CourseDetail({ id }: any) {

  const course = COURSES.find(
    (c: any) => c.id === id
  );

  const [videos, setVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<any>(null);

  const [utr, setUtr] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {

    const q = query(
      collection(db, 'videos'),
      where('courseId', '==', id)
    );

    const unsub = onSnapshot(q, (snapshot) => {

      const firebaseVideos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setVideos(firebaseVideos);

      if (firebaseVideos.length > 0) {
        setActiveVideo(firebaseVideos[0]);
      }

    });

    return () => unsub();

  }, [id]);

  const handleSubmitUTR = async () => {

    alert('Payment submitted. Wait for admin approval.');

  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-black mb-8">
        {course.title}
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          {isEnrolled ? (

            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${activeVideo?.url.split('v=')[1]?.split('&')[0]}`}
              title={activeVideo?.title}
              allowFullScreen
              className="rounded-2xl bg-black"
            />

          ) : (

            <div className="bg-white rounded-2xl p-10 text-center">

              <h2 className="text-3xl font-bold text-red-600 mb-4">
                Premium Course
              </h2>

              <p className="mb-6">
                Purchase this course to continue watching.
              </p>

              <div className="bg-gray-100 rounded-2xl p-6 mb-6">

                <p className="text-xl font-bold">
                  UPI ID
                </p>

                <p className="text-2xl text-blue-700 font-black">
                  srdr009546@okicici
                </p>

              </div>

              <input
                type="text"
                placeholder="Enter UTR Number"
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
                className="w-full p-4 border rounded-2xl mb-4"
              />

              <button
                onClick={handleSubmitUTR}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold"
              >
                Submit Payment
              </button>

            </div>

          )}

        </div>

        <div className="bg-white rounded-2xl p-4 space-y-4">

          <h2 className="text-2xl font-bold">
            Course Videos
          </h2>

          {videos.map((video: any, index: number) => (

            <button
              key={index}
              onClick={() => setActiveVideo(video)}
              className="w-full p-4 bg-gray-100 rounded-2xl text-left hover:bg-blue-100"
            >
              {video.title}
            </button>

          ))}

        </div>

      </div>

    </div>

  );

}