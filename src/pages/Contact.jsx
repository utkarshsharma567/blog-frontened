import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-indigo-100">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              Get In Touch
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Whether you have questions, feedback, or collaboration ideas,
              we're here to help. Reach out using the contact information below
              or fill out the form.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-md">
                <div className="rounded-full bg-indigo-100 p-4 text-indigo-600">
                  <FaEnvelope size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@bloghub.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-md">
                <div className="rounded-full bg-green-100 p-4 text-green-600">
                  <FaPhoneAlt size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-md">
                <div className="rounded-full bg-red-100 p-4 text-red-500">
                  <FaMapMarkerAlt size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">
                    New Delhi, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-10 flex gap-4">
              <a
                href="#"
                className="rounded-full bg-indigo-600 p-3 text-white transition hover:scale-110"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-full bg-sky-500 p-3 text-white transition hover:scale-110"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="rounded-full bg-pink-500 p-3 text-white transition hover:scale-110"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="rounded-full bg-gray-800 p-3 text-white transition hover:scale-110"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              Send a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-indigo-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-indigo-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-indigo-500"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-indigo-500"
              ></textarea>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 py-4 text-lg font-semibold text-white transition hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;