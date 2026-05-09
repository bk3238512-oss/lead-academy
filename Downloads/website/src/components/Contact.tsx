import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageSquare, MessageCircle } from 'lucide-react';

export default function Contact() {
  const whatsappNumber = '916200598775';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <section id="contact" className="bg-app-bg">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-8">Get In <span className="text-blue-700 italic">Touch</span></h2>
            <p className="text-gray-600 mb-12">
              Have questions about our courses or admission process? Reach out to us and our team will get back to you shortly.
            </p>

            <div className="space-y-8">
              <a href="tel:+916200598775" className="flex items-center gap-6 group">
                <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Phone size={28} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">Call Us</div>
                  <div className="text-2xl font-bold text-blue-700">+91 6200598775</div>
                </div>
              </a>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="bg-[#25D366] p-4 rounded-2xl text-white shadow-lg shadow-[#25D366]/20 group-hover:scale-110 transition-transform">
                  <MessageCircle size={28} fill="currentColor" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">WhatsApp Chat</div>
                  <div className="text-2xl font-bold text-[#25D366]">+91 6200598775</div>
                </div>
              </a>

              <a href="mailto:info@leadacademy.com" className="flex items-center gap-6 group">
                <div className="bg-red-600 p-4 rounded-2xl text-white shadow-lg shadow-secondary/20 group-hover:scale-110 transition-transform">
                  <Mail size={28} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">Email Us</div>
                  <div className="text-2xl font-bold text-red-600">info@leadacademy.com</div>
                </div>
              </a>
              <div className="flex items-center gap-6">
                <div className="bg-accent p-4 rounded-2xl text-white shadow-lg shadow-accent/20">
                  <MapPin size={28} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">Location</div>
                  <div className="text-2xl font-bold text-accent">Patna, Bihar, India</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-xl shadow-primary/5 border border-gray-100"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <MessageSquare className="text-blue-700" /> Online Admission Form
            </h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Contact Number</label>
                  <input type="tel" placeholder="+91 00000 00000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Interested Course</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                  <option>Select a Course</option>
                  <option>UPSC</option>
                  <option>BPSC</option>
                  <option>SSC</option>
                  <option>Banking</option>
                  <option>Railway</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Message</label>
                <textarea rows={4} placeholder="Your message or query..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"></textarea>
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4">
                Send Application <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
