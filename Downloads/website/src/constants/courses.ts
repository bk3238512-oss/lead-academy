export interface Video {
  title: string;
  url: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  videos: Video[];
}

export const GK_GS_COURSE: Course = {
  id: 'gk-gs-mastery',
  title: 'G.K. & G.S. Mastery Batch',
  description:
    'Comprehensive coverage of General Knowledge and General Studies for BPSC, UPSC, and semi-govt exams.',
  price: 499,
  videos: []
};

export const NCERT_BATCH: Course = {
  id: 'ncert-batch',
  title: 'NCERT Batch',
  description:
    'Complete NCERT Science and History classes for competitive exam preparation.',
  price: 500,
  videos: []
};

export const COURSES = [
  GK_GS_COURSE,
  NCERT_BATCH
];