import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <AboutUs />
          <Footer />
        </>
      ),
    },
    {
      path: "/all-books",
      element: (
        <>
          <Navbar />
          <AllBooks />
          <Footer />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
       
          <>
            <Navbar />
            <Cart />
            <Footer />
          </>
        
      ),
    },
    {
      path: "/profile",
      element: (
      
          <>
            <Navbar />
            <Profile />
            <Footer />
          </>
        
      ),
    },
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
      path: "/AdminForm",
      element: (
        <>
        <Navbar/>
        <AdminForm/>
        </>
      )
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
      path: "/view-details/:id",
      element: (
       
          <>
            <Navbar />
            <Details />
            <Footer />
          </>
       
      ),
    },
    {
      path: "/cart",
      element: (
       
          <>
            <Navbar />
            <Cart/>
            <Footer />
          </>
       
      ),
    },
    {
      path: "/profile/orders",
      element: (
       
          <>
            <Navbar />
            <Order/>
            <Footer />
          </>
       
      ),
    },
    {
      path: "*",
      element: (
        <>
          <Navbar />
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>404 - Page Not Found</h2>
          </div>
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App; 