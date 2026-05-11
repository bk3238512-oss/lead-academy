// src/components/AdminDashboard.tsx

import React, { useEffect, useState } from 'react';

import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc
} from 'firebase/firestore';

import { db } from '../lib/firebase';

export default function AdminDashboard() {

  // VIDEO STATES

  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  // PDF STATES

  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  // ENROLLMENTS

  const [enrollments, setEnrollments] = useState<any[]>([]);

  // LOAD ENROLLMENTS

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, 'enrollments'),
      (snapshot) => {

        setEnrollments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        );

      }
    );

    return () => unsub();

  }, []);

  // ADD VIDEO

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

      setTitle('');
      setYoutubeUrl('');

    } catch (error) {

      alert('Error adding video');

    }

  };

  // ADD PDF

  const handleAddPdf = async () => {

    try {

      await addDoc(
        collection(db, 'notes'),
        {
          courseId,
          title: pdfTitle,
          pdfUrl,
          createdAt: new Date()
        }
      );

      alert('PDF Added Successfully');

      setPdfTitle('');
      setPdfUrl('');

    } catch (error) {

      alert('Error adding PDF');

    }

  };

  // APPROVE STUDENT

  const approveStudent = async (id: string) => {

    try {

      await updateDoc(
        doc(db, 'enrollments', id),
        {
          status: 'approved'
        }
      );

      alert('Student Approved');

    } catch (error) {

      alert('Error approving student');

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-10">

        {/* TITLE */}

        <h1 className="text-4xl font-black text-blue-700">
          LEAD Academy Admin Panel
        </h1>

        {/* ADD VIDEO */}

        <div className="space-y-4">

          <h2 className="text-2xl font-bold">
            Add Course Video
          </h2>

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
            placeholder="YouTube Watch URL"
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

        {/* ADD PDF */}

        <div className="space-y-4">

          <h2 className="text-2xl font-bold text-green-700">
            Add PDF Notes
          </h2>

          <input
            type="text"
            placeholder="PDF Title"
            value={pdfTitle}
            onChange={(e) => setPdfTitle(e.target.value)}
            className="w-full p-4 border rounded-2xl"
          />

          <input
            type="text"
            placeholder="Google Drive PDF Link"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            className="w-full p-4 border rounded-2xl"
          />

          <button
            onClick={handleAddPdf}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold"
          >
            Add PDF
          </button>

        </div>

        {/* PAYMENT REQUESTS */}

        <div>

          <h2 className="text-3xl font-black mb-6">
            Student Payment Requests
          </h2>

          <div className="space-y-4">

            {enrollments.map((student: any) => (

              <div
                key={student.id}
                className="p-4 bg-gray-100 rounded-2xl flex justify-between items-center"
              >

                <div>

                  <p className="font-bold">
                    {student.courseTitle}
                  </p>

                  <p>
                    Transaction ID:
                    {' '}
                    {student.transactionId}
                  </p>

                  <p>
                    Phone:
                    {' '}
                    {student.phoneNumber}
                  </p>

                  <p>
                    Status:
                    {' '}
                    {student.status}
                  </p>

                </div>

                <button
                  onClick={() => approveStudent(student.id)}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl"
                >
                  Approve
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}