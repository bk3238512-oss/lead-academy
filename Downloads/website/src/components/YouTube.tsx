import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Youtube, Play, ExternalLink, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@leadacademypatnaby-sumanpa4179';

const videos = [
  { id: 1, title: 'BPSC 70th Preparation Strategy | Suman Patel Sir', thumbnail: 'https://img.youtube.com/vi/henJa7Twr-0/hqdefault.jpg', url: 'https://youtu.be/henJa7Twr-0?si=zGzYMWlD_qtzQGEd', views: '25k+' },
  { id: 2, title: 'Bihar Special for 70th BPSC | Expert Lecture', thumbnail: 'https://img.youtube.com/vi/BhX6UKxQgfE/hqdefault.jpg', url: 'https://youtu.be/BhX6UKxQgfE?si=XRxO97mnpVhZ3gMu', views: '18k+' },
  { id: 3, title: 'Indian Polity Masterclass | Lead Academy Patna', thumbnail: 'https://img.youtube.com/vi/eTL9T0kMzfk/hqdefault.jpg', url: 'https://youtu.be/eTL9T0kMzfk?si=b2FfQszUWSirXhRj', views: '12k+' },
];

export default function YouTube() {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleVideoClick = (e: React.MouseEvent, url: string) => {
    if (!user) {
      e.preventDefault();
      setIsLoginModalOpen(true);
    }
  };

  return (
    <section id="youtube" className="bg-app-bg pb-24">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-sm mb-4">
              <Youtube size={20} />
              <span>Learn on YouTube</span>
            </div>
            <h2 className="text-4xl md:text-5xl">Watch Our <span className="text-primary italic">Expert Lectures</span></h2>
          </div>
          <a 
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
          >
            Visit Our Channel <ExternalLink size={18} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleVideoClick(e, video.url)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer block"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg shadow-black/5">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {!user ? (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center mb-3 border border-white/30">
                      <Lock size={24} />
                    </div>
                    <span className="text-white font-bold text-xs uppercase tracking-widest px-4 py-2 bg-primary rounded-lg shadow-xl">Login to Watch</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
                  {video.views} Views
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                {video.title}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </section>
  );
}
