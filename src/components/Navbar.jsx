import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { BlogsContext } from "../context/BlogContext";
import { useContext } from "react";
import { toast } from "react-toastify";



function Navbar() {

  const [open, setOpen] = useState(false);

  const { isLogin, logout } = useContext(BlogsContext);

  const navigate = useNavigate();


  const handleLogout = async () => {
  await logout();
  toast.success("Logout successfully");
  navigate("/login");
};


  return (

    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">


      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">


        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent"
        >
          BlogHub
        </Link>



        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">

          <Link to="/" className="font-medium text-gray-700 hover:text-indigo-600">
            Home
          </Link>


          <Link to="/blogs" className="font-medium text-gray-700 hover:text-indigo-600">
            Blogs
          </Link>

          {isLogin && (
            <Link to="/ai-assistant" className="font-medium text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-250 transition">
              AI Writer
            </Link>
          )}


          <Link to="/about" className="font-medium text-gray-700 hover:text-indigo-600">
            About
          </Link>


          <Link to="/contact" className="font-medium text-gray-700 hover:text-indigo-600">
            Contact
          </Link>


        </div>



        {/* Desktop Auth */}

        <div className="hidden md:block">


          {
            isLogin ? (

              <button
                onClick={handleLogout}
                className="rounded-full bg-red-600 px-6 py-2 font-semibold text-white shadow-lg hover:bg-red-700 hover:scale-105 transition"
              >
                Logout
              </button>

            ) : (

              <Link
                to="/login"
                className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2 font-semibold text-white shadow-lg hover:scale-105 transition"
              >
                Login
              </Link>

            )

          }


        </div>




        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
        >

          {
            open ? "✕" : "☰"
          }

        </button>


      </div>





      {/* Mobile Menu */}

      {
        open && (

          <div className="md:hidden bg-white border-t px-6 py-5 space-y-4">


            <Link
              onClick={()=>setOpen(false)}
              to="/"
              className="block"
            >
              Home
            </Link>


            <Link
              onClick={()=>setOpen(false)}
              to="/blogs"
              className="block"
            >
              Blogs
            </Link>

            {isLogin && (
              <Link
                onClick={()=>setOpen(false)}
                to="/ai-assistant"
                className="block text-indigo-600 font-semibold"
              >
                AI Writer
              </Link>
            )}


            <Link
              onClick={()=>setOpen(false)}
              to="/about"
              className="block"
            >
              About
            </Link>


            <Link
              onClick={()=>setOpen(false)}
              to="/contact"
              className="block"
            >
              Contact
            </Link>



            {
              isLogin ? (

                <button
                  onClick={()=>{
                    handleLogout();
                    setOpen(false);
                  }}
                  className="rounded-full bg-red-600 px-6 py-2 text-white"
                >
                  Logout
                </button>

              ) : (

                <Link
                  onClick={()=>setOpen(false)}
                  to="/login"
                  className="rounded-full bg-indigo-600 px-6 py-2 text-white inline-block"
                >
                  Login
                </Link>

              )
            }


          </div>

        )
      }


    </nav>

  );
}


export default Navbar;