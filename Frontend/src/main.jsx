import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './Components/Context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer position="top-center" autoClose={2000} /> 
    </AuthProvider>
  </StrictMode>
);
