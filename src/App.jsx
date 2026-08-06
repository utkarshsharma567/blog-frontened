import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleBlog from "./pages/SingleBlog";
import AIAssistant from "./pages/AIAssistant";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const App = () => {
  return (
    <div className="  px-4 mx-auto">
      <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/single-blog/:id" element={<SingleBlog />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
    </Routes>
    <Footer />
   {/* toast */}
    <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
};

export default App;
