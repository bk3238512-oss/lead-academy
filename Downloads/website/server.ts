import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert, getApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase Config for Admin SDK
const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));

if (!getApps().length) {
  // Initializing without arguments to use default credentials in Cloud Run
  // This often avoids permission issues with specific project/database targeting
  initializeApp();
}

const firestore = getFirestore(firebaseConfig.firestoreDatabaseId);

console.log(`[FIREBASE] Admin SDK Initialized for Project: ${firebaseConfig.projectId} | Database: ${firebaseConfig.firestoreDatabaseId}`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/verify-payment', async (req, res) => {
    const { userId, utr, phone, courseId, amount, userName, userEmail } = req.body;
    
    console.log(`[PAYMENT] Verification started | UTR: ${utr} | User: ${userId} | Phone: ${phone}`);

    try {
      // 1. Simulate network delay for Bank Gateway verification
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 2. Server-side Validation
      if (!utr || utr.trim().length < 12) {
        console.warn(`[PAYMENT] REJECTED: Invalid UTR format (${utr})`);
        return res.status(400).json({ error: 'Invalid UTR format. Standard UTR is 12-22 characters.' });
      }

      if (!phone || phone.length < 10) {
        return res.status(400).json({ error: 'Invalid phone number provided.' });
      }

      // 3. Mock Verification Logic
      // For testing: UTRs starting with '999' will simulate a bank decline/failure
      let isVerified = true;
      if (utr.startsWith('999')) {
        isVerified = false;
        console.error(`[PAYMENT] FAILED: Bank reported invalid transaction for UTR: ${utr}`);
        return res.status(400).json({ 
          error: 'Bank verification failed. Please check your UTR number or contact your bank if the amount was deducted.' 
        });
      }

      // 4. Auto-Verification: Update Firestore via Admin SDK
      if (isVerified) {
        const enrollmentId = `${userId}_${courseId}`;
        const enrollmentRef = firestore.collection('enrollments').doc(enrollmentId);
        
        // Update user's phone number
        await firestore.collection('users').doc(userId).set({
          phoneNumber: phone,
          lastLogin: FieldValue.serverTimestamp()
        }, { merge: true });

        // Update enrollment status to verified
        await enrollmentRef.set({
          userId,
          userName,
          userEmail,
          userPhone: phone,
          courseId,
          status: 'verified',
          enrolledAt: FieldValue.serverTimestamp(),
          verifiedAt: FieldValue.serverTimestamp(),
          utr: utr
        });

        // Log transaction as verified
        await firestore.collection('transactions').add({
          userId,
          userPhone: phone,
          courseId,
          utr: utr,
          amount: amount,
          status: 'verified',
          submittedAt: FieldValue.serverTimestamp(),
          verifiedAt: FieldValue.serverTimestamp()
        });

        console.log(`[PAYMENT] AUTO-VERIFIED: Enrollment ${enrollmentId} activated | UTR: ${utr}`);
        
        return res.json({ 
          success: true, 
          status: 'verified',
          message: 'Your payment was automatically verified! Enjoy your lifetime access.',
          timestamp: new Date().toISOString()
        });
      }

      // Fallback (though currently handled by the '999' block above)
      res.json({ 
        success: true, 
        status: 'pending',
        message: 'Your payment request has been logged for manual verification.',
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      console.error('[PAYMENT] SERVER ERROR:', err);
      res.status(500).json({ error: 'An internal error occurred during verification.' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
