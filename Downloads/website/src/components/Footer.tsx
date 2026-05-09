import React from 'react';
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export default function Footer() {
  const whatsappUrl = "https://wa.me/916200598775";
  return (
    <footer className="bg-blue-800 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-lg text-blue-700">
                <GraduationCap size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-serif leading-none">LEAD Academy</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-yellow-400">Patna</span>
              </div>
            </div>
            <p className="text-blue-100 italic leading-relaxed">
              Empowering the youth of Bihar with quality education and expert guidance to conquer government examinations.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/p/Lead-Academy-Patna-100063665121342/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-lg hover:bg-yellow-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-yellow-500 transition-colors"><Twitter size={20} /></a>
              <a href="https://www.instagram.com/leadacademypatna/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-lg hover:bg-yellow-500 transition-colors"><Instagram size={20} /></a>
              <a href="https://www.youtube.com/@leadacademypatnaby-sumanpa4179" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-lg hover:bg-yellow-500 transition-colors"><Youtube size={20} /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/20 p-2 rounded-lg hover:bg-[#25D366] transition-colors"><MessageCircle size={20} fill="currentColor" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 font-serif border-l-4 border-yellow-400 pl-4">Quick Links</h4>
            <ul className="space-y-4 text-blue-100 font-medium">
              <li><a href="#home" className="hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="#courses" className="hover:text-yellow-400 transition-colors">Our Courses</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Mock Tests</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Study Materials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 font-serif border-l-4 border-yellow-400 pl-4">Contact Info</h4>
            <ul className="space-y-4 text-blue-100">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-yellow-400 shrink-0 mt-1" />
                <span>Patna Center, Bihar, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-yellow-400 shrink-0" />
                <a href="tel:+916200598775" className="hover:text-yellow-400 transition-colors">+91 6200598775</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="text-[#25D366] shrink-0" fill="currentColor" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">WhatsApp Chat</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-yellow-400 shrink-0" />
                <span>info@leadacademy.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 font-serif border-l-4 border-yellow-400 pl-4">Newsletter</h4>
            <p className="text-blue-100 mb-6 italic">Stay updated with latest exam dates and news.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Your Email" className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 flex-grow outline-none focus:border-yellow-400" />
              <button className="bg-yellow-400 text-white p-2 rounded-lg hover:bg-amber-600 transition-colors">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center text-blue-200 text-sm">
          <p>© 2024 LEAD Academy Patna. All Rights Reserved. Founded by Suman Patel Sir.</p>
        </div>
      </div>
    </footer>
  );
}
