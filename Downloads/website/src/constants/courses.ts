// src/constants/courses.ts

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
  description: 'GK & GS preparation course.',
  price: 499,
  videos: []
};

export const NCERT_BATCH: Course = {
  id: 'ncert-batch',
  title: 'NCERT Batch',
  description: 'NCERT complete preparation.',
  price: 500,
  videos: []
};

export const HISTORY_BATCH: Course = {
  id: 'history-complete-batch',
  title: 'History Complete Batch',
  description: 'Complete history preparation.',
  price: 499,
  videos: []
};

export const POLITY_BATCH: Course = {
  id: 'polity-batch',
  title: 'Polity Batch',
  description: 'Indian polity preparation.',
  price: 499,
  videos: []
};

export const LUCENT_BATCH: Course = {
  id: 'lucent-batch',
  title: 'Lucent Batch',
  description: 'Lucent preparation.',
  price: 499,
  videos: []
};

export const CDS_BATCH: Course = {
  id: 'cds-coaching',
  title: 'CDS Coaching',
  description: 'CDS preparation.',
  price: 499,
  videos: []
};

export const DAROGA_BATCH: Course = {
  id: 'daroga-preparation',
  title: 'Daroga Preparation',
  description: 'Daroga preparation.',
  price: 499,
  videos: []
};

export const GENERAL_EXAMS_BATCH: Course = {
  id: 'general-exams',
  title: 'General Exams',
  description: 'Competitive exams preparation.',
  price: 499,
  videos: []
};

export const COURSES = [
  GK_GS_COURSE,
  NCERT_BATCH,
  HISTORY_BATCH,
  POLITY_BATCH,
  LUCENT_BATCH,
  CDS_BATCH,
  DAROGA_BATCH,
  GENERAL_EXAMS_BATCH
];