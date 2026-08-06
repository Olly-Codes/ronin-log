import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </StrictMode>,
)
