import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import AllBooks  from "./Pages/All-books";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  const router = createBrowserRouter([
    
    {
      path: "/home",
      element: (
        <div>
          <Navbar />
          <Home />
          <Footer />
        </div>
      ),
    },
    {
      path: "/about",
      element: (
        <div>
          <Navbar />
          <AboutUs />
          <Footer />
        </div>
      ),
    },
    {
      path: "/all-books",
      element: (
        <div>
          <Navbar />
          <AllBooks/>
          
          <Footer />
        </div>
      ),
    },
    {
      path: "/cart",
      element: (
        <div>
          <Navbar />
          <Cart />
          <Footer />
        </div>
      ),
    },
    {
      path: "/profile",
      element: (
        <div>
          <Navbar />
          <Profile />
          <Footer />
        </div>
      ),
    },
    {
      path: "/signin",
      element: (
        <div>
          <Navbar />
          <SignIn />
          <Footer />
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div>
          <Navbar />
          <SignUp />
          <Footer />
        </div>
      ),
    },
    {
      path: "*",
      element: (
        <div>
          <Navbar />
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>404 - Page Not Found</h2>
          </div>
          <Footer />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
