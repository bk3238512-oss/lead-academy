import React, { useState } from 'react';

import {
  addDoc,
  collection
} from 'firebase/firestore';

import { db } from '../lib/firebase';

export default function AdminDashboard() {

  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const handleAddVideo = async () => {

    try {

      await addDoc(
        collection(db, 'videos'),
        {
          courseId,
          title,
          url: youtubeUrl,
          createdAt: new Date()
        }
      );

      alert('Video Added Successfully');

      setCourseId('');
      setTitle('');
      setYoutubeUrl('');

    } catch (error) {

      alert('Error Adding Video');
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-black text-blue-700 mb-8">
          LEAD Academy Admin Panel
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full p-4 border rounded-2xl"
          />

          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border rounded-2xl"
          />

          <input
            type="text"
            placeholder="YouTube URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full p-4 border rounded-2xl"
          />

          <button
            onClick={handleAddVideo}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold"
          >
            Add Video
          </button>

        </div>

      </div>

    </div>

  );

}