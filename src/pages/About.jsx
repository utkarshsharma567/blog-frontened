import React from "react";
import { FaUsers, FaPenNib, FaGlobe, FaHeart } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl font-bold">About BlogHub</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-indigo-100">
            BlogHub is a platform where writers and readers come together to
            share knowledge, ideas, and inspiring stories from around the world.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
              alt="Team"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              Our Story
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              We started BlogHub with one simple goal: to create a place where
              everyone can express their ideas and inspire others. Whether
              you're a developer, traveler, student, or storyteller, your voice
              matters here.
            </p>

            <p className="mt-4 text-lg leading-8 text-gray-600">
              Every article published on BlogHub is an opportunity to educate,
              motivate, and connect with people worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose Us?
            </h2>

            <p className="mt-3 text-gray-500">
              Everything you need to share your knowledge with the world.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-gray-50 p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl">
              <FaPenNib className="mx-auto text-5xl text-indigo-600" />
              <h3 className="mt-5 text-xl font-semibold">Quality Content</h3>
              <p className="mt-3 text-gray-600">
                Publish well-written blogs with a beautiful reading experience.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl">
              <FaUsers className="mx-auto text-5xl text-green-600" />
              <h3 className="mt-5 text-xl font-semibold">Community</h3>
              <p className="mt-3 text-gray-600">
                Connect with readers and writers from across the globe.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl">
              <FaGlobe className="mx-auto text-5xl text-blue-600" />
              <h3 className="mt-5 text-xl font-semibold">Global Reach</h3>
              <p className="mt-3 text-gray-600">
                Share your ideas with a worldwide audience anytime.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl">
              <FaHeart className="mx-auto text-5xl text-red-500" />
              <h3 className="mt-5 text-xl font-semibold">Passion</h3>
              <p className="mt-3 text-gray-600">
                Built with love to encourage creativity and learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-indigo-600 py-20 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
          <div>
            <h2 className="text-5xl font-bold">500+</h2>
            <p className="mt-2">Blogs Published</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">10K+</h2>
            <p className="mt-2">Readers</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">200+</h2>
            <p className="mt-2">Authors</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">50+</h2>
            <p className="mt-2">Countries</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-700 px-8 py-16 text-center text-white shadow-xl">
          <h2 className="text-4xl font-bold">
            Join Our Blogging Community
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
            Share your ideas, inspire others, and become a part of our growing
            community of writers.
          </p>

          <button className="mt-8 rounded-xl bg-white px-8 py-3 text-lg font-semibold text-indigo-600 transition hover:scale-105">
            Start Writing
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;