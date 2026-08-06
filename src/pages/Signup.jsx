import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { BlogsContext } from "../context/BlogContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const navigate = useNavigate();
    const {loading,setLoading} = React.useContext(BlogsContext);
  

  const defaultAvatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq3sTMCXsgrwGnFXdAk3I5_gQ5uZ4EWJ9BiOUy-3rj8_VC5nQ7hYrYmuk&s=10";

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("image", image);
      console.log(image)
      setLoading(true);

      //api calling
      const resp = await axios.post(
        "https://blog-backand-1.onrender.com/api/users/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    toast.success("Account created successfully!");
    navigate("/login");

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Create Account</h1>

          <p className="mt-2 text-gray-500">
            Join our community and start sharing your blogs.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Profile Image
            </label>

            <div className="mb-4 flex justify-center">
              <img
                src={preview || defaultAvatar}
                alt="Preview"
                className="h-24 w-24 rounded-full border-2 border-gray-300 object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-gray-300 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
            />

            <p className="mt-2 text-sm text-gray-500">
              Choose a profile image from your computer.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-lg font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            {loading ? "Signing..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
