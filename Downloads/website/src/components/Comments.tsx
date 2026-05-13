import React, {
  useEffect,
  useState,
} from 'react';

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../lib/firebase';

interface Props {
  courseId: string;
}

export default function Comments({
  courseId,
}: Props) {

  const [name, setName] =
    useState('');

  const [comment, setComment] =
    useState('');

  const [comments, setComments] =
    useState<any[]>([]);

  // LOAD COMMENTS

  useEffect(() => {

    const q = query(
      collection(db, 'comments'),
      where('courseId', '==', courseId),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {

        const data = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setComments(data);

      }
    );

    return () => unsub();

  }, [courseId]);

  // POST COMMENT

  const handleComment = async () => {

    if (!name || !comment) {
      alert('Fill all fields');
      return;
    }

    try {

      await addDoc(
        collection(db, 'comments'),
        {
          courseId,
          name,
          comment,
          createdAt:
            serverTimestamp(),
        }
      );

      setComment('');

    } catch (error) {

      alert('Error posting comment');

    }

  };

  return (

    <div className="bg-white rounded-3xl p-6 mt-8 shadow-xl">

      <h2 className="text-3xl font-black mb-6">
        Comments
      </h2>

      {/* INPUT */}

      <div className="space-y-4 mb-8">

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-4 border rounded-2xl"
        />

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="w-full p-4 border rounded-2xl h-32"
        />

        <button
          onClick={handleComment}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold"
        >
          Post Comment
        </button>

      </div>

      {/* COMMENTS */}

      <div className="space-y-4">

        {comments.map((item: any) => (

          <div
            key={item.id}
            className="bg-gray-100 p-5 rounded-2xl"
          >

            <h3 className="font-black text-blue-700 mb-2">
              {item.name}
            </h3>

            <p className="text-gray-700">
              {item.comment}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}