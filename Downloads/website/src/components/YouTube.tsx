import React from 'react';
import { motion } from 'motion/react';
import { Youtube, Play, ExternalLink } from 'lucide-react';

const YOUTUBE_CHANNEL_URL =
  'https://www.youtube.com/@leadacademypatnaby-sumanpa4179';

const videos = [
  {
    id: 1,
    title: 'BPSC 70th Preparation Strategy | Suman Patel Sir',
    thumbnail:
      'https://img.youtube.com/vi/henJa7Twr-0/hqdefault.jpg',
    url: 'https://youtu.be/henJa7Twr-0?si=zGzYMWlD_qtzQGEd',
    views: '25k+',
  },
  {
    id: 2,
    title: 'Bihar Special for 70th BPSC | Expert Lecture',
    thumbnail:
      'https://img.youtube.com/vi/BhX6UKxQgfE/hqdefault.jpg',
    url: 'https://youtu.be/BhX6UKxQgfE?si=XRxO97mnpVhZ3gMu',
    views: '18k+',
  },
  {
    id: 3,
    title: 'Indian Polity Masterclass | Lead Academy Patna',
    thumbnail:
      'https://img.youtube.com/vi/eTL9T0kMzfk/hqdefault.jpg',
    url: 'https://youtu.be/eTL9T0kMzfk?si=b2FfQszUWSirXhRj',
    views: '12k+',
  },
];

export default function YouTube() {
  return (
    <section id="youtube" className="bg-app-bg pb-24">
      <div className="section-container">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-sm mb-4">
              <Youtube size={20} />
              <span>Learn on YouTube</span>
            </div>

            <h2 className="text-4xl md:text-5xl">
              Watch Our
              <span className="text-blue-700 italic">
                {' '}Expert Lectures
              </span>
            </h2>

          </div>

          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-700 font-bold hover:text-red-600 transition-colors"
          >
            Visit Our Channel
            <ExternalLink size={18} />
          </a>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {videos.map((video, index) => (

            <motion.a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer block"
            >

              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg shadow-black/5">

                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">

                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl">
                    <Play size={32} fill="currentColor" />
                  </div>

                </div>

                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
                  {video.views} Views
                </div>

              </div>

              <h3 className="text-xl font-bold group-hover:text-blue-700 transition-colors leading-tight">
                {video.title}
              </h3>

            </motion.a>

          ))}

        </div>

      </div>
    </section>
  );
}