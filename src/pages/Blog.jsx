import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://blog-backand-1.onrender.com/api/blogs/all-blogs"
        );

        setBlogs(data.blogs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            All <span className="text-indigo-600">Blogs</span>
          </h2>

          <p className="mt-3 text-gray-500">
            Discover the latest stories, tutorials, and updates from our
            community.
          </p>
        </div>

        {loading ? (
          /* Skeleton Loading */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <div className="h-56 bg-gray-300"></div>

                <div className="space-y-4 p-5">
                  <div className="h-6 rounded bg-gray-300"></div>

                  <div className="h-4 rounded bg-gray-200"></div>
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>

                  <div className="flex items-center gap-3 pt-3">
                    <div className="h-10 w-10 rounded-full bg-gray-300"></div>

                    <div className="flex-1 space-y-2">
                      <div className="h-4 rounded bg-gray-300"></div>
                      <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                    </div>
                  </div>

                  <div className="h-10 rounded-lg bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-56 w-full object-cover transition duration-500 hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-2 text-xl font-bold text-gray-800">
                    {blog.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                    {blog.description}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <img
                      src={blog.user.image}
                      alt={blog.user.name}
                      className="h-10 w-10 rounded-full border-2 border-indigo-500 object-cover"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {blog.user.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Link to={`/single-blog/${blog._id}`}>
                    <button className="mt-6 w-full cursor-pointer rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700">
                      Read More →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
