export interface Video {
  title: string;
  url: string;
}

export interface Course {
  id: string;

  title: string;

  description: string;

  price: number;

  duration?: string;

  teacher?: string;

  language?: string;

  lectures?: number;

  thumbnail?: string;

  introVideo?: string;

  benefits?: string[];

  videos: Video[];
}

export const COURSES: Course[] = [

{
  id: 'gk-gs-mastery',

  title: 'G.K. & G.S. All Subject (Lucent + घटना चक्र)',

  description:
    'Complete G.K. & G.S. preparation with Lucent + घटना चक्र for all competitive exams. PPT, Mind Map and complete study material.',

  price: 499,

  duration: '6 Months',

  teacher: 'Suman Patel Sir',

  language: 'Hindi',

  lectures: 150,

  thumbnail: '/gkgs-thumbnail.png',

  introVideo:
    'https://youtu.be/_ZN_eQmoD5w?si=xRph_66TY7_UxWOR',

  benefits: [
    'Live Classes',
    'PPT & Mind Map',
    'Lucent + घटना चक्र Notes',
    'Test Series',
    'Doubt Support',
    'PDF Notes',
  ],

  videos: []

},

{
  id: 'ncert-batch',

  title: 'NCERT Complete Batch',

  description:
    'Complete NCERT preparation course for BPSC, UPSC, SSC and all government exams with detailed explanation and notes.',

  price: 499,

  duration: '4 Months',

  teacher: 'Suman Patel Sir',

  language: 'Hindi',

  lectures: 90,

  thumbnail: '/ncert-thumbnail.png',

  introVideo:
    'https://www.youtube.com/watch?v=BhX6UKxQgfE',

  benefits: [
    'Complete NCERT Coverage',
    'Live Classes',
    'PDF Notes',
    'Practice Questions',
    'Test Series',
    'Doubt Support',
  ],

  videos: []

},
  {
    id: 'history-complete-batch',
    title: 'History Complete Batch',
    description: 'Complete history preparation',
    price: 499,
    videos: []
  },

  {
    id: 'biology-batch',
    title: 'Biology Batch',
    description: 'Complete biology preparation',
    price: 499,
    videos: []
  },

  {
    id: 'chemistry-batch',
    title: 'Chemistry Batch',
    description: 'Complete chemistry preparation',
    price: 499,
    videos: []
  },

  {
    id: 'cds-coaching',
    title: 'CDS Coaching',
    description: 'CDS exam preparation',
    price: 999,
    videos: []
  },

  {
    id: 'daroga-preparation',
    title: 'Daroga Preparation',
    description: 'Bihar Daroga preparation',
    price: 999,
    videos: []
  },

  {
    id: 'general-exams',
    title: 'General Exams',
    description: 'Preparation for all exams',
    price: 999,
    videos: []
  }

];