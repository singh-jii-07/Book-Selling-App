import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './Components/Context/AuthContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    

    <AuthProvider>
      <App />
    </AuthProvider>
  

  </StrictMode>
);
