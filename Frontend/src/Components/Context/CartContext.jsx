import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = useCallback(async () => {
    const id    = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (!id || !token) { setCartCount(0); return; }
    try {
      const res = await axios.get(
        "http://localhost:4020/website/api/book/getCart",
        { headers: { id, authorization: `Bearer ${token}` } }
      );
      setCartCount(res.data.data?.length ?? 0);
    } catch {
      setCartCount(0);
    }
  }, []);

  const decrementCart = () => setCartCount((c) => Math.max(0, c - 1));
  const clearCart     = () => setCartCount(0);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount, decrementCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
