import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, GraduationCap, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Courses', href: '#courses' },
  { name: 'YouTube', href: '#youtube' },
  { name: 'Faculty', href: '#faculty' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const auth = useAuth();
  const user = (auth as any)?.user;
  const authLogout = (auth as any)?.logout;

  const handleLogout = () => {
    if (typeof authLogout === 'function') {
      authLogout();
    } else {
      // fallback: no-op when logout not provided by context
      // eslint-disable-next-line no-console
      console.warn('Logout function not available');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg text-white">
              <GraduationCap size={28} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold font-serif leading-none ${scrolled ? 'text-primary' : 'text-primary'}`}>
                LEAD Academy
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-accent">
                Patna
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-app-text hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
                <div className="flex items-center gap-2">
                  <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border-2 border-primary/20" />
                  <span className="text-sm font-bold text-gray-700 hidden xl:inline">{user.displayName?.split(' ')[0]}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-secondary transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 font-bold"
              >
                <UserIcon size={18} />
                <span>Login</span>
              </button>
            )}

            <a 
              href="tel:+916200598775" 
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md shadow-secondary/20"
            >
              <Phone size={18} />
              <span className="font-semibold">6200598775</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            {!user && (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-primary text-white p-2 rounded-lg"
              >
                <UserIcon size={20} />
              </button>
            )}
            {user && (
               <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border-2 border-primary/20" />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-app-text hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              {user && (
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center gap-2 text-secondary font-bold"
                >
                  <LogOut size={20} /> Logout
                </button>
              )}
              <a 
                href="tel:+916200598775" 
                className="flex items-center justify-center gap-2 bg-secondary text-white px-4 py-3 rounded-lg w-full"
              >
                <Phone size={20} />
                <span className="font-bold">Call Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
}
