import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import AllBooks from "./Pages/All-books";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Details from "./Components/details/Details";
import Order from "./Components/Profile/Order";
import AdminForm from "./Components/Profile/AdminForm";
import Wishlist from "./Pages/Wishlist";

import ScrollProgress from "./Components/UI/ScrollProgress";
import BackToTop from "./Components/UI/BackToTop";

// Layout wrapper for all pages
const Layout = () => (
  <>
    <ScrollProgress />
    <Navbar />
    <ScrollRestoration />
    <Outlet />
    <Footer />
    <BackToTop />
  </>
);

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/all-books", element: <AllBooks /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/profile", element: <Profile /> },
        { path: "/profile/orders", element: <Order /> },
        { path: "/view-details/:id", element: <Details /> },
        { path: "*", element: (
          <div className="min-h-[60vh] flex flex-col items-center justify-center pt-navbar text-center px-4">
            <span className="text-6xl mb-4">🛸</span>
            <h2 className="text-3xl font-bold text-brand-text mb-2">Lost in Space</h2>
            <p className="text-brand-muted max-w-md">The page you're looking for has drifted into another dimension.</p>
          </div>
        ) },
      ],
    },
    // No-footer or special layouts
    {
      path: "/signin",
      element: (
        <>
          <Navbar />
          <SignIn />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <SignUp />
        </>
      ),
    },
    {
      path: "/AdminForm",
      element: (
        <>
          <Navbar />
          <AdminForm />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App; 