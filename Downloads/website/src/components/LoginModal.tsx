import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, Phone, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { signInWithGoogle, auth, RecaptchaVerifier, signInWithPhoneNumber } from '../lib/firebase';
import { ConfirmationResult } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep('phone');
      setPhone('');
      setOtp('');
      setError('');
      setResendTimer(0);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const setupRecaptcha = (containerId: string) => {
    try {
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
      }
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
      });
    } catch (err) {
      console.error('Recaptcha error:', err);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const prefix = '+91';

    // If typing starts, ensure prefix is there
    if (val && !val.startsWith('+')) {
      const digits = val.replace(/\D/g, '').slice(0, 10);
      setPhone(prefix + digits);
      return;
    }

    // Allow deleting back to empty
    if (!val) {
      setPhone('');
      return;
    }

    // If it starts with +, ensure it's specifically +91 and limited to 10 digits after
    if (val.startsWith(prefix)) {
      const digits = val.slice(prefix.length).replace(/\D/g, '').slice(0, 10);
      setPhone(prefix + digits);
    }
  };

  const handleSendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    
    const digits = phone.replace('+91', '').replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setupRecaptcha('recaptcha-container');
    const appVerifier = (window as any).recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setStep('otp');
      setResendTimer(30); // 30 seconds wait for resend
    } catch (err: any) {
      console.error('Send OTP error:', err);
      setError(err.message || 'Failed to send OTP. Try again.');
      if (appVerifier) appVerifier.clear();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        onClose();
      }
    } catch (err: any) {
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-blue-700 font-bold">
                  <div className="bg-blue-600 p-2 rounded-xl text-white">
                    <LogIn size={24} />
                  </div>
                  <span className="text-xl uppercase tracking-widest">Sign In</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div id="recaptcha-container"></div>

              {step === 'phone' ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-3">Get Started</h3>
                    <p className="text-gray-500">Enter your mobile number to receive a secure login code.</p>
                  </div>

                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone size={20} />
                      </div>
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 focus:border-primary transition-all font-bold tracking-widest"
                      />
                    </div>
                    
                    {error && <p className="text-red-600 text-sm font-bold text-center">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading || phone.replace('+91', '').length < 10}
                      className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Send Verification Code"}
                      <ArrowRight size={20} />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                      <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Verify OTP</h3>
                    <p className="text-sm text-gray-500">Sent to <span className="font-bold text-gray-700">{phone}</span></p>
                  </div>

                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter 6-digit Code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-center text-2xl font-black tracking-[0.5em] focus:border-primary transition-all placeholder:tracking-normal placeholder:text-sm placeholder:font-medium"
                    />

                    {error && <p className="text-red-600 text-sm font-bold text-center">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading || otp.length < 6}
                      className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-blue-800 transition-all disabled:opacity-50"
                    >
                      {loading ? "Verifying..." : "Verify & Login"}
                    </button>

                    <div className="flex flex-col gap-2">
                      <button 
                        type="button"
                        disabled={resendTimer > 0 || loading}
                        onClick={() => handleSendOTP()}
                        className="w-full text-gray-400 font-bold text-sm hover:text-blue-700 transition-colors disabled:opacity-50"
                      >
                        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                      </button>

                      <button 
                        type="button"
                        onClick={() => setStep('phone')}
                        className="w-full text-gray-400 font-bold text-sm hover:text-blue-700 transition-colors"
                      >
                        Change Phone Number
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400 font-medium uppercase tracking-widest">Or Continue With</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-100 p-4 rounded-2xl hover:border-primary/50 hover:bg-blue-600/5 transition-all group mb-4"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all" />
                <span className="font-bold text-gray-700">Google Account</span>
              </button>

              <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
                By signing in, you agree to Lead Academy's <br />
                <a href="#" className="text-blue-700 font-bold hover:underline">Terms of Service</a> & <a href="#" className="text-blue-700 font-bold hover:underline">Privacy Policy</a>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
