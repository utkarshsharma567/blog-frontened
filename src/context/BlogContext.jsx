import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BlogsContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://blog-backand-1.onrender.com/api/blogs/all-blogs"
      );

      setBlogs(response.data.blogs);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "https://blog-backand-1.onrender.com/api/users/me",
        {
          withCredentials: true,
        }
      );

      if (res.data.loggedIn) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }

    } catch (error) {
      console.log("Auth error:", error);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "https://blog-backand-1.onrender.com/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setIsLogin(false);

    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const contextValue = {
    blogs,
    loading,
    setLoading,
    fetchBlogs,
    isLogin,
    setIsLogin,
    logout,
    checkAuth,
  };

  return (
    <BlogsContext.Provider value={contextValue}>
      {children}
    </BlogsContext.Provider>
  );
};

export default BlogsProvider;