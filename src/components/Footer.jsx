import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Blog<span className="text-indigo-500">Hub</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Discover amazing stories, programming tutorials, travel guides,
              and inspiring articles from writers around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/blogs" className="hover:text-indigo-400 transition">
                  Blogs
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-indigo-400 transition">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h3>

            <ul className="space-y-3 text-sm">
              <li>📍 New Delhi, India</li>
              <li>📧 support@bloghub.com</li>
              <li>📞 +91 98765 43210</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-sky-500"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-pink-500"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-gray-700"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">BlogHub</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;