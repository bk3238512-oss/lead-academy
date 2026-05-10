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
  description: 'Comprehensive coverage of General Knowledge and General Studies for BPSC, UPSC, and semi-govt exams.',
  price: 499,
  videos: [
  { title: 'G.K. & G.S. Session 1', url: 'https://www.youtube.com/watch?v=1Kywj6czbdc' },
  { title: 'G.K. & G.S. Session 2', url: 'https://www.youtube.com/watch?v=L-pBarB5GpQ' },
  { title: 'G.K. & G.S. Session 3', url: 'https://www.youtube.com/watch?v=QBeifKnlPRI' },
  { title: 'G.K. & G.S. Session 4', url: 'https://www.youtube.com/watch?v=7xbdNNJuTOw' },
  { title: 'G.K. & G.S. Session 5', url: 'https://www.youtube.com/watch?v=IqzRyEm-bCE' },
  { title: 'G.K. & G.S. Session 6', url: 'https://www.youtube.com/watch?v=gTumt5TuQJ4' },
  { title: 'G.K. & G.S. Session 7', url: 'https://www.youtube.com/watch?v=HZ3iVzQSUVc' },
  { title: 'G.K. & G.S. Session 8', url: 'https://www.youtube.com/watch?v=45w11F6WYso' },
  { title: 'G.K. & G.S. Session 9', url: 'https://www.youtube.com/watch?v=r-pTbO_OoNs' },
  { title: 'G.K. & G.S. Session 10', url: 'https://www.youtube.com/watch?v=sXVsaQomMqA' },
  { title: 'G.K. & G.S. Session 11', url: 'https://www.youtube.com/watch?v=8XoP-Qxajls' },
  { title: 'G.K. & G.S. Session 12', url: 'https://www.youtube.com/watch?v=anrJUug7D3o' },
  { title: 'G.K. & G.S. Session 13', url: 'https://www.youtube.com/watch?v=Mtpwv4rjpT0' },
  { title: 'G.K. & G.S. Session 14', url: 'https://www.youtube.com/watch?v=n9uqz4dXtV0' },
  { title: 'G.K. & G.S. Session 15', url: 'https://www.youtube.com/watch?v=WU_L9n04GYA' },
  { title: 'G.K. & G.S. Session 16', url: 'https://www.youtube.com/watch?v=WU_L9n04GYA' },
  { title: 'G.K. & G.S. Session 17', url: 'https://www.youtube.com/watch?v=fHDdgOSXtyY' },
  { title: 'G.K. & G.S. Session 18', url: 'https://www.youtube.com/watch?v=FQCpw6E-Ptg' },
  { title: 'G.K. & G.S. Session 19', url: 'https://www.youtube.com/watch?v=rBUXZT8CXL8' },
  { title: 'G.K. & G.S. Session 20', url: 'https://www.youtube.com/watch?v=tkEmO_7jgcE' },
  { title: 'G.K. & G.S. Session 21', url: 'https://www.youtube.com/watch?v=QqmD8TYGLvs' },
  { title: 'G.K. & G.S. Session 22', url: 'https://www.youtube.com/watch?v=hvjD8dgC9IE' },
]

};

export const NCERT_BATCH: Course = {
  id: 'ncert-batch',
  title: 'NCERT Batch',
  description: 'Complete NCERT Science and History classes for competitive exam preparation.',
  price: 500,
  videos: [
    { title: 'Science Class 1', url: 'https://www.youtube.com/watch?v=pnid_kAlBgU' },
    { title: 'Science Class 2', url: 'https://www.youtube.com/watch?v=fHDdgOSXtyY' },
    { title: 'Science Class 3', url: 'https://www.youtube.com/watch?v=Txup7QwneAQ' },
    { title: 'Science Class 4', url: 'https://www.youtube.com/watch?v=jLt019ELBLI' },
    { title: 'Science Class 5', url: 'https://www.youtube.com/watch?v=9hAUa1csUsM' },
    { title: 'Science Class 6', url: 'https://www.youtube.com/watch?v=nxrcFalKIuM' },
    { title: 'Science Class 7', url: 'https://www.youtube.com/watch?v=aoE6Vq6YVkE' },
    { title: 'Science Class 8', url: 'https://www.youtube.com/watch?v=1Qklc690SWM' },
    { title: 'Science Class 9', url: 'https://www.youtube.com/watch?v=l88gqBF-Olk' },

    { title: 'History Class 1', url: 'https://www.youtube.com/watch?v=l88gqBF-Olk' },
    { title: 'History Class 2', url: 'https://www.youtube.com/watch?v=BiF9htIGUDw' }
  ]
};