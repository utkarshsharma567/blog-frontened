import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogsContext } from "../context/BlogContext";
import { useContext } from "react";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();

  const [singleBlog, setSingleBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const fetchSingleBlog = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://blog-backand-1.onrender.com/api/blogs/blog/${id}`,
        {
          withCredentials: true,
        },
      );

      setSingleBlog(data.blog);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!singleBlog) {
    return (
      <div className="py-20 text-center text-2xl font-semibold">
        You are not authorized to view this blog
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Blog Image */}
        <img
          src={singleBlog.image}
          alt={singleBlog.title}
          className="h-[450px] w-full object-cover"
        />

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            {singleBlog.title}
          </h1>

          {/* Author */}
          <div className="mt-8 flex items-center gap-4 border-b border-gray-200 pb-6">
            <img
              src={singleBlog.user.image}
              alt={singleBlog.user.name}
              className="h-16 w-16 rounded-full border-4 border-indigo-500 object-cover"
            />

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {singleBlog.user.name}
              </h3>

              <p className="text-gray-500">{singleBlog.user.email}</p>

              <p className="text-sm text-gray-400">
                {new Date(singleBlog.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10">
            <h2 className="mb-5 text-3xl font-bold text-gray-800">
              About this Blog
            </h2>

            <p className="text-lg leading-9 text-gray-700">
              {singleBlog.description}
            </p>
          </div>

         
        <div>
            <span className="text-gray-500">
              Last Updated:{" "}
              {new Date(singleBlog.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlog;
