import {StrictMode} from 'react';
// Ignore TS import error for react-dom/client when no global declaration exists
// @ts-ignore
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// Ignore TS import error for side-effect CSS import when no global declaration exists
// @ts-ignore
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
