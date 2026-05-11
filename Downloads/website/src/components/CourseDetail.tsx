// src/components/CourseDetail.tsx

import React, { useEffect, useState } from 'react';

import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc
} from 'firebase/firestore';

import { db } from '../lib/firebase';
import { COURSES } from '../constants/courses';

export default function CourseDetail({ id }: any) {

  // FIND COURSE

  const course = COURSES.find(
    (c: any) => c.id === id
  );

  // STATES

  const [videos, setVideos] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);

  const [activeVideo, setActiveVideo] = useState<any>(null);

  const [transactionId, setTransactionId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isEnrolled, setIsEnrolled] = useState(false);

  // LOAD SAVED LOGIN

  useEffect(() => {

    const savedPhone = localStorage.getItem(
      `enrolled_${id}`
    );

    if (savedPhone) {
      setPhoneNumber(savedPhone);
    }

  }, [id]);

  // CHECK APPROVAL

  useEffect(() => {

    if (!phoneNumber) return;

    const q = query(
      collection(db, 'enrollments'),
      where('courseId', '==', id),
      where('status', '==', 'approved'),
      where('phoneNumber', '==', phoneNumber)
    );

    const unsub = onSnapshot(q, (snapshot) => {

      if (!snapshot.empty) {

        setIsEnrolled(true);

        localStorage.setItem(
          `enrolled_${id}`,
          phoneNumber
        );

      } else {

        setIsEnrolled(false);

      }

    });

    return () => unsub();

  }, [id, phoneNumber]);

  // LOAD VIDEOS

  useEffect(() => {

    const q = query(
      collection(db, 'videos'),
      where('courseId', '==', id)
    );

    const unsub = onSnapshot(q, (snapshot) => {

      const firebaseVideos = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        .sort((a: any, b: any) => {

          if (!a.createdAt || !b.createdAt) return 0;

          return (
            a.createdAt.seconds -
            b.createdAt.seconds
          );

        });

      setVideos(firebaseVideos);

      if (firebaseVideos.length > 0) {
        setActiveVideo(firebaseVideos[0]);
      }

    });

    return () => unsub();

  }, [id]);

  // LOAD NOTES

  useEffect(() => {

    const q = query(
      collection(db, 'notes'),
      where('courseId', '==', id)
    );

    const unsub = onSnapshot(q, (snapshot) => {

      const firebaseNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setNotes(firebaseNotes);

    });

    return () => unsub();

  }, [id]);

  // SECURITY BLOCK

  useEffect(() => {

    const disableRightClick = (e: any) => {
      e.preventDefault();
    };

    const disableKeys = (e: any) => {

      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshot disabled');
      }

      if (
        e.ctrlKey &&
        (
          e.key === 'u' ||
          e.key === 'U' ||
          e.key === 's' ||
          e.key === 'S' ||
          e.key === 'i' ||
          e.key === 'I'
        )
      ) {
        e.preventDefault();
      }

      if (e.key === 'F12') {
        e.preventDefault();
      }

    };

    document.addEventListener(
      'contextmenu',
      disableRightClick
    );

    document.addEventListener(
      'keydown',
      disableKeys
    );

    return () => {

      document.removeEventListener(
        'contextmenu',
        disableRightClick
      );

      document.removeEventListener(
        'keydown',
        disableKeys
      );

    };

  }, []);

  // SUBMIT PAYMENT

  const handleSubmitPayment = async () => {

    try {

      await addDoc(
        collection(db, 'enrollments'),
        {
          courseId: id,
          courseTitle: course?.title,
          transactionId,
          phoneNumber,
          status: 'pending',
          createdAt: new Date()
        }
      );

      const whatsappMessage =
        `Hello Sir, I paid for ${course?.title}. Transaction ID: ${transactionId}`;

      window.open(
        `https://wa.me/916200598775?text=${encodeURIComponent(whatsappMessage)}`,
        '_blank'
      );

      alert('Payment submitted successfully');

    } catch (error) {

      alert('Error submitting payment');

    }

  };

  // COURSE NOT FOUND

  if (!course) {
    return <div>Course not found</div>;
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* BACK BUTTON */}

      <button
        onClick={() => window.history.back()}
        className="mb-6 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold"
      >
        ← Back
      </button>

      {/* TITLE */}

      <h1 className="text-4xl font-black mb-8">
        {course.title}
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}

        <div className="lg:col-span-2">

          {isEnrolled ? (

            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${
                activeVideo?.url
                  ?.replace(
                    'https://www.youtube.com/watch?v=',
                    ''
                  )
                  ?.split('&')[0]
              }`}
              title={activeVideo?.title}
              allowFullScreen
              className="rounded-2xl bg-black"
            />

          ) : (

            <div className="bg-white rounded-2xl p-10 text-center">

              <h2 className="text-3xl font-bold text-red-600 mb-4">
                Premium Course
              </h2>

              <p className="mb-4">
                Pay ₹{course.price} to unlock this course.
              </p>

              {/* QR */}

              <div className="bg-gray-100 rounded-2xl p-6 mb-6">

                <img
                  src="/upi.png"
                  alt="UPI QR"
                  className="w-full max-w-md mx-auto rounded-2xl"
                />

                <p className="text-2xl text-blue-700 font-black mt-4">
                  srdr009546@okicici
                </p>

              </div>

              {/* PHONE */}

              <input
                type="text"
                placeholder="Your Phone Number"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
                className="w-full p-4 border rounded-2xl mb-4"
              />

              {/* TRANSACTION */}

              <input
                type="text"
                placeholder="UPI Transaction ID"
                value={transactionId}
                onChange={(e) =>
                  setTransactionId(e.target.value)
                }
                className="w-full p-4 border rounded-2xl mb-4"
              />

              {/* BUTTON */}

              <button
                onClick={handleSubmitPayment}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold"
              >
                Submit Payment
              </button>

            </div>

          )}

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">

          {/* VIDEOS */}

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

          {/* NOTES */}

          <div className="bg-white rounded-2xl p-4 space-y-4">

            <h2 className="text-2xl font-bold">
              PDF Notes
            </h2>

            {notes.map((note: any, index: number) => (

              <a
                key={index}
                href={note.pdfUrl}
                target="_blank"
                className="block bg-green-600 text-white p-4 rounded-2xl text-center font-bold"
              >
                {note.title}
              </a>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}