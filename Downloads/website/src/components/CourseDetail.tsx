import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Lock, Send, MessageCircle, ArrowLeft, CheckCircle2, QrCode, Smartphone, Clock, ShieldCheck, Maximize2, Volume2, SkipForward, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ReactPlayerDefault from 'react-player';
const ReactPlayer = ReactPlayerDefault as any;
// @ts-ignore: may not be present in all environments
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, onSnapshot, orderBy, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
// @ts-ignore: may not be present in all environments
import { auth } from '../lib/firebase';
// Provide a fallback course object. The original import referred to a type named `Course`
// which caused "only refers to a type" errors when used as a value. Use a local
// runtime object to ensure the component has course data at runtime.
import { COURSES } from '../constants/courses';
import { useParams } from 'react-router-dom';
import LoginModal from './LoginModal';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider: { providerId: any; email: any; }) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function CourseDetail() {
  const { id } = useParams();

const course = COURSES.find(
  (c: any) => c.id.toLowerCase() === String(id).toLowerCase()
);

if (!course) {
  return <div>Course not found</div>;
}
  // Avoid depending on react-router-dom to prevent module resolution errors in some environments.
  // Use window.history as a lightweight fallback for navigating back.
  const onBack = () => window.history.back();
  const { user } = useAuth();
  const [enrollmentStatus, setEnrollmentStatus] = useState<'none' | 'pending' | 'verified'>('none');
  const [activeVideo, setActiveVideo] = useState(course.videos[0]);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmittingUTR, setIsSubmittingUTR] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error' | 'verifying'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const playerRef = useRef<any>(null);
  useEffect(() => {
    setIsVideoLoading(true);
  }, [activeVideo]);

  const handleVideoEnd = () => {
    const currentIndex = course.videos.findIndex((v: any) => v.url === activeVideo.url);
    if (currentIndex < course.videos.length - 1) {
      setActiveVideo(course.videos[currentIndex + 1]);
    }
  };

  const upiId = 'srdr009546@okicici';
  const amount = 499;
  const whatsappNo = '+916200598775';

  // Check enrollment status
  useEffect(() => {
    if (!user) return;
    const enrollmentId = `${user.uid}_${course.id}`;
    const path = `enrollments/${enrollmentId}`;
    const unsub = onSnapshot(doc(db, 'enrollments', enrollmentId), (doc) => {
      if (doc.exists()) {
        setEnrollmentStatus(doc.data().status as any);
      } else {
        setEnrollmentStatus('none');
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
    return unsub;
  }, [user]);

  // Handle Phone Input Change
  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(cleaned);
    if (cleaned && cleaned.length < 10) {
      setValidationError('Please enter a valid 10-digit number');
    } else {
      setValidationError(null);
    }
    if (submissionStatus === 'error') setSubmissionStatus('idle');
  };

  // Handle UTR Input Change with auto-validation
  const handleUtrChange = (val: string) => {
    const cleaned = val.replace(/\s/g, '').toUpperCase();
    setUtrNumber(cleaned);
    if (cleaned && cleaned.length < 12) {
      setValidationError('UTR must be at least 12 characters');
    } else {
      setValidationError(null);
    }
    if (submissionStatus === 'error') setSubmissionStatus('idle');
  };

  const handleSubmitUTR = async () => {
  setValidationError(null);

  if (!user || !utrNumber.trim() || !phoneNumber.trim()) {
    setValidationError("Mobile and UTR number are required.");
    return;
  }

  if (utrNumber.trim().length < 12) {
    setValidationError("Invalid UTR format.");
    return;
  }

  if (phoneNumber.trim().length < 10) {
    setValidationError("Please enter a valid mobile number.");
    return;
  }

  setIsSubmittingUTR(true);

  try {
    await setDoc(doc(db, "enrollments", `${user.uid}_${course.id}`), {
      userId: user.uid,
      userName: user.displayName || "",
      userEmail: user.email || "",
      phone: phoneNumber,
      utr: utrNumber,
      courseId: course.id,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    setSubmissionStatus("success");

    const message = `New Enrollment Request

Name: ${user.displayName}
Phone: ${phoneNumber}
UTR: ${utrNumber}
Course: ${course.title}`;

    const whatsappUrl =
      `https://wa.me/916200598775?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

  } catch (error) {
    console.error(error);
    setSubmissionStatus("error");
    setValidationError("Submission failed. Please try again.");
  } finally {
    setIsSubmittingUTR(false);
  }
};

  // Load comments
  useEffect(() => {
    if (enrollmentStatus !== 'verified') return;
    const path = `courses/${course.id}/comments`;
    const q = query(
      collection(db, 'courses', course.id, 'comments'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
    return unsub;
  }, [enrollmentStatus, course.id]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;
    const path = `courses/${course.id}/comments`;
    try {
      await addDoc(collection(db, 'courses', course.id, 'comments'), {
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        content: newComment,
        createdAt: serverTimestamp()
      });
      setNewComment('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const upiDeepLink = `upi://pay?pa=${upiId}&pn=Lead%20Academy&am=${amount}&cu=INR`;

  if (!user && enrollmentStatus === 'none') {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="bg-blue-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={40} className="text-blue-700" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-500 mb-8">Please login to view course details and enroll.</p>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20"
          >
            Sign in to Continue
          </button>
          <button onClick={onBack} className="mt-4 text-gray-400 font-medium flex items-center gap-2 mx-auto">
            <ArrowLeft size={18} /> Back to Home
          </button>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-blue-700 transition-colors font-bold">
            <ArrowLeft size={20} /> <span className="hidden sm:inline">Back to Courses</span>
          </button>
          <div className="flex items-center gap-3">
             <div className="bg-blue-600/5 px-4 py-2 rounded-xl">
               <span className="text-blue-700 font-bold text-sm tracking-tight">{course.title}</span>
             </div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content (Video Player) */}
          <div className="lg:col-cols-2 lg:col-span-2 space-y-8">
            <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl group">
              {enrollmentStatus === 'verified' ? (
                <>
                  <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${activeVideo.url.split('v=')[1]}`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-2xl"
                    onLoad={() => setIsVideoLoading(false)}
                  />
                  
                  {/* Custom Loading Overlay */}
                  <AnimatePresence>
                    {isVideoLoading && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <Loader2 size={40} className="text-blue-700 animate-spin" />
                          <div className="text-white text-xs font-bold uppercase tracking-widest animate-pulse">Buffering Lecture...</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cinema Overlay hints (optional but cool) */}
                  <div className="absolute top-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                      <div className="text-white text-xs font-black uppercase tracking-tighter flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        Now Playing: {activeVideo.title}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8 bg-gradient-to-br from-gray-900 to-black">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 border border-white/20">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Content Locked</h3>
                  <p className="text-gray-400 max-w-sm px-4">
                    {enrollmentStatus === 'pending' 
                      ? "Payment verification in progress. Access is typically granted within 2-24 hours."
                      : `Purchase this course for lifetime access to all lectures for just ₹${amount}.`}
                  </p>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-500 leading-relaxed max-w-2xl">{course.description}</p>
              
              <div className="mt-8 pt-8 border-t flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <div className="font-bold">Lifetime</div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Access</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Play size={24} />
                  </div>
                   <div>
                    <div className="font-bold">{course.videos.length} Lectures</div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Full Playlist</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            {enrollmentStatus === 'verified' && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <MessageCircle className="text-blue-700" />
                  <h3 className="text-2xl font-bold">Student Discussion</h3>
                </div>

                <form onSubmit={handleSubmitComment} className="mb-8">
                  <div className="flex gap-4">
                    <img src={user?.photoURL || ''} alt={user?.displayName || ''} className="w-12 h-12 rounded-2xl" />
                    <div className="flex-1 space-y-4">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Ask a doubt or share your thoughts..."
                        className="w-full bg-gray-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-primary h-24 transition-all resize-none"
                      />
                      <div className="flex justify-end">
                        <button 
                          type="submit"
                          disabled={!newComment.trim()}
                          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800 transition-all disabled:opacity-50"
                        >
                          Post Comment <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="space-y-6">
                  {comments.length > 0 ? comments.map((comment) => (
                    <motion.div 
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4"
                    >
                      <img src={comment.userPhoto} alt={comment.userName} className="w-12 h-12 rounded-2xl object-cover" />
                      <div className="flex-1 bg-gray-50 p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-900">{comment.userName}</span>
                          <span className="text-xs text-gray-400 lowercase">
                             {comment.createdAt?.toDate().toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{comment.content}</p>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-12 text-gray-400 font-medium">
                      Be the first to start a conversation!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (Playlist or Payment) */}
          <div className="lg:col-span-1 space-y-8">
            {enrollmentStatus === 'verified' ? (
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col h-[800px] sticky top-32">
                <div className="p-6 bg-blue-600 text-white">
                  <h3 className="font-bold text-xl mb-1">Course Content</h3>
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">{course.videos.length} Total Lessons</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {course.videos.map((video: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (activeVideo.url !== video.url) {
                          setIsVideoLoading(true);
                          setActiveVideo(video);
                        }
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${
                        activeVideo.url === video.url 
                          ? 'bg-blue-600/5 border-2 border-primary/20' 
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        activeVideo.url === video.url ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:text-blue-700 transition-colors'
                      }`}>
                        <Play size={18} fill={activeVideo.url === video.url ? "currentColor" : "none"} />
                      </div>
                      <div>
                        <div className={`text-sm font-bold line-clamp-1 ${activeVideo.url === video.url ? 'text-blue-700' : 'text-gray-700'}`}>
                          {video.title}
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Lecture {idx + 1}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : enrollmentStatus === 'pending' ? (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-32 border-2 border-yellow-500/10">
                <div className="p-12 text-center">
                  <div className="bg-yellow-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-yellow-100">
                    <Clock size={40} className="text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Verification Pending</h3>
                  <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-yellow-200">
                    Expected: 2-24 Hours
                  </div>
                  <p className="text-gray-500 leading-relaxed mb-8">
                    Thank you! Your payment details (UTR) have been submitted. Our team is verifying the transaction with the bank.
                  </p>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 mb-8">
                    <div className="flex gap-3">
                       <ShieldCheck className="text-blue-700 shrink-0" size={20} />
                       <div className="text-sm text-gray-600 font-medium">Automatic access will be granted once verified.</div>
                    </div>
                    <div className="flex gap-3">
                       <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                       <div className="text-sm text-gray-600 font-medium">Lifetime access to all lectures.</div>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/${whatsappNo.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-200"
                  >
                    <MessageCircle size={20} /> Contact Support
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-32 border-2 border-primary/10">
                <div className="p-8 text-center border-b bg-blue-600/5">
                   <div className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Total Amount</div>
                   <div className="text-5xl font-black text-blue-700">₹{amount}</div>
                </div>
                
                <div className="p-8 space-y-8">
                   <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600/10 p-3 rounded-xl text-red-600 font-bold text-lg">1.</div>
                        <div>
                          <div className="font-bold text-gray-900 mb-1 leading-tight">Pay via UPI</div>
                          <div className="text-xs text-gray-500 font-medium">To ID: <span className="text-blue-700 font-bold">{upiId}</span></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                         <a 
                          href={upiDeepLink}
                          className="w-full flex items-center justify-center gap-3 bg-red-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-secondary/20 hover:scale-[1.02] transition-all"
                         >
                            <Smartphone size={20} /> Pay via App
                         </a>
                         <div className="text-center text-[10px] text-gray-400 font-bold uppercase">Or Scan QR Code Below</div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center">
                         <div className="w-32 h-32 bg-white rounded-2xl shadow-inner flex items-center justify-center mb-3">
                            <QrCode size={80} strokeWidth={1} className="text-gray-800" />
                         </div>
                         <div className="text-center">
                            <div className="text-xs font-bold text-gray-800">Lead Academy Patna</div>
                            <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">srdr009546@okicici</div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600/10 p-3 rounded-xl text-blue-700 font-bold text-lg">2.</div>
                        <div className="flex-1 space-y-4">
                          <div className="font-bold text-gray-900 leading-tight">Verification Proof</div>
                          
                          <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest ml-1">Mobile Number</label>
                             <input 
                              type="tel" 
                              placeholder="10-digit mobile number"
                              value={phoneNumber}
                              onChange={(e) => handlePhoneChange(e.target.value)}
                              className={`w-full bg-gray-50 border-2 rounded-xl p-3 focus:border-primary transition-all text-center font-bold tracking-widest ${validationError && phoneNumber && phoneNumber.length < 10 ? 'border-red-500/50' : 'border-gray-100'}`}
                            />
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest ml-1">UTR Number</label>
                             <input 
                              type="text" 
                              placeholder="12-digit UTR from payment"
                              value={utrNumber}
                              onChange={(e) => handleUtrChange(e.target.value)}
                              className={`w-full bg-gray-50 border-2 rounded-xl p-3 focus:border-primary transition-all text-center font-bold tracking-widest uppercase placeholder:tracking-normal placeholder:font-medium ${validationError && utrNumber ? 'border-red-500/50' : 'border-gray-100'}`}
                            />
                          </div>
                        </div>
                      </div>
                   </div>

                   {validationError && (
                     <motion.div 
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       className="bg-red-50 border border-red-100 rounded-xl p-3 text-[10px] text-red-600 font-bold uppercase tracking-widest text-center"
                     >
                       {validationError}
                     </motion.div>
                   )}

                   {submissionStatus === 'success' && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="bg-green-50 border border-green-100 rounded-xl p-4 text-center"
                     >
                       <CheckCircle2 className="text-green-600 mx-auto mb-2" size={24} />
                       <div className="text-xs font-bold text-green-700 uppercase tracking-widest">Payment Verified!</div>
                       <div className="text-[10px] text-green-600 mt-1">Activating your lifetime access now...</div>
                     </motion.div>
                   )}

                   <div className="pt-4">
                      <button 
                        onClick={handleSubmitUTR}
                        disabled={!utrNumber.trim() || !phoneNumber.trim() || isSubmittingUTR || !!validationError}
                        className={`w-full py-5 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-50 ${
                          submissionStatus === 'success' ? 'bg-green-500 text-white shadow-green-200' : 'bg-blue-600 text-white shadow-primary/30 hover:bg-blue-800'
                        }`}
                      >
                        {isSubmittingUTR ? (
                          <div className="flex items-center gap-2">
                             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             Verifying Transaction...
                          </div>
                        ) : submissionStatus === 'success' ? (
                          "Success! Access Granted"
                        ) : (
                          <>
                            Submit and Notify <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-gray-400 text-center mt-6 font-bold uppercase tracking-widest leading-relaxed">
                        Submission will open WhatsApp to share proof. Verification takes 2-24 hours for lifetime access.
                      </p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
