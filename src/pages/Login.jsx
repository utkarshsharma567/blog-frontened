import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BlogsContext } from "../context/BlogContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // call context
  const { loading, setLoading,setIsLogin } = React.useContext(BlogsContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const resp = await axios.post(
        "https://blog-backand-1.onrender.com/api/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
 const token = localStorage.setItem("token", resp.data.token);
 console.log("Token",token)


      toast.success(resp.data.message);
      setIsLogin(true); // 👈 ye add karo
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back 👋</h1>

          <p className="mt-2 text-gray-500">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email Address
            </label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-medium text-gray-700">Password</label>
            </div>

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="h-4 w-4 accent-indigo-600" />
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-lg font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            Login
          </button>
        </form>

        {/* Divider */}

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:underline"
          >
            {loading ? "Signing..." : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
