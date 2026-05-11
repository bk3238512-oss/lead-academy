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

          {activeVideo ? (

            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${activeVideo.url.split('v=')[1]?.split('&')[0]}`}
              title={activeVideo.title}
              allowFullScreen
              className="rounded-2xl bg-black"
            />

          ) : (

            <div className="bg-white rounded-2xl p-10">
              No videos uploaded yet
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