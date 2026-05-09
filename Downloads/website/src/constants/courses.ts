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
  price: 1,
  videos: [
    { title: 'G.K. & G.S. Session 1', url: 'https://www.youtube.com/live/1Kywj6czbdc?si=XK1NY9Of4qolo239' },
    { title: 'G.K. & G.S. Session 2', url: 'https://www.youtube.com/live/L-pBarB5GpQ?si=1mx8pSF66E1uKayu' },
    { title: 'G.K. & G.S. Session 3', url: 'https://www.youtube.com/live/QBeifKnlPRI?si=D9LG0HxD1OZEDEV7' },
    { title: 'G.K. & G.S. Session 4', url: 'https://www.youtube.com/live/7xbdNNJuTOw?si=6Ii9zAhwZ-aJ6GX1' },
    { title: 'G.K. & G.S. Session 5', url: 'https://www.youtube.com/live/IqzRyEm-bCE?si=crrAHhuqLpsd6G91' },
    { title: 'G.K. & G.S. Session 6', url: 'https://www.youtube.com/live/gTumt5TuQJ4?si=Q3UIhWWIygyANRTK' },
    { title: 'G.K. & G.S. Session 7', url: 'https://www.youtube.com/live/HZ3iVzQSUVc?si=bTuB3vMOExXZwirX' },
    { title: 'G.K. & G.S. Session 8', url: 'https://www.youtube.com/live/45w11F6WYso?si=eqyO5VgrMQVBshqa' },
    { title: 'G.K. & G.S. Session 9', url: 'https://www.youtube.com/live/r-pTbO_OoNs?si=xM9jiD_mOfQJ1iyS' },
    { title: 'G.K. & G.S. Session 10', url: 'https://www.youtube.com/live/sXVsaQomMqA?si=9try111OTHe_CtmH' },
    { title: 'G.K. & G.S. Session 11', url: 'https://www.youtube.com/live/8XoP-Qxajls?si=9EaKDY4C52jZknIr' },
    { title: 'G.K. & G.S. Session 12', url: 'https://www.youtube.com/live/anrJUug7D3o?si=HxuR-7OLKUMkEIec' },
    { title: 'G.K. & G.S. Session 13', url: 'https://www.youtube.com/live/Mtpwv4rjpT0?si=P-oK0j9u8m_9F7i5' },
    { title: 'G.K. & G.S. Session 14', url: 'https://www.youtube.com/live/n9uqz4dXtV0?si=WZavJPBa1AZIJTBm' },
    { title: 'G.K. & G.S. Session 15', url: 'https://www.youtube.com/live/WU_L9n04GYA?si=el4l09uONrF9fnNH' },
    { title: 'G.K. & G.S. Session 16', url: 'https://www.youtube.com/live/WU_L9n04GYA?si=hX1ZmNDiezN2loyc' },
    { title: 'G.K. & G.S. Session 17', url: 'https://www.youtube.com/live/fHDdgOSXtyY?si=pKPGur4XC7Go6ORk' },
    { title: 'G.K. & G.S. Session 18', url: 'https://www.youtube.com/live/FQCpw6E-Ptg?si=YipVsA9XpMlZKI5x' },
    { title: 'G.K. & G.S. Session 19', url: 'https://www.youtube.com/live/rBUXZT8CXL8?si=p0gLqozXGdw9cX_Y' },
    { title: 'G.K. & G.S. Session 20', url: 'https://www.youtube.com/live/tkEmO_7jgcE?si=SW0JHkkRwORxRLo8' },
    { title: 'G.K. & G.S. Session 21', url: 'https://youtu.be/QqmD8TYGLvs?si=xnlwZ1QVEV12sQrQ' },
    { title: 'G.K. & G.S. Session 22', url: 'https://www.youtube.com/live/hvjD8dgC9IE?si=z5SXkJA9rdoD8HVm' },
  ]
};
