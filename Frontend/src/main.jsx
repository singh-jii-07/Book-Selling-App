import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './Components/Context/AuthContext.jsx';
import { CartProvider } from './Components/Context/CartContext.jsx';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import AppLoader from './Components/Loader/AppLoader.jsx';

const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  return (
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          {loading && <AppLoader onComplete={() => setLoading(false)} />}
          <div className={loading ? "hidden" : "block"}>
            <App />
          </div>
          <ToastContainer position="top-center" autoClose={2000} /> 
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<RootComponent />);
