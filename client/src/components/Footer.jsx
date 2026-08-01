import { Link } from "react-router-dom";
import {
  FaAirbnb,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-rose-500">
              <FaAirbnb />
              AI Airbnb
            </div>

            <p className="mt-4 text-gray-600 text-sm leading-6">
              Discover unique stays, book unforgettable trips,
              and receive AI-powered travel recommendations.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">
              Explore
            </h3>

            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/stays">Stays</Link>
              </li>

              <li>
                <Link to="/ai">
                  AI Planner
                </Link>
              </li>

              <li>
                <Link to="/favorites">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">
              Account
            </h3>

            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register">
                  Register
                </Link>
              </li>

              <li>
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/bookings">
                  Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">
              Follow Us
            </h3>

            <div className="flex gap-4 text-2xl text-gray-600">

              <a href="#">
                <FaFacebook />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

              <a href="#">
                <FaGithub />
              </a>

            </div>
          </div>

        </div>

        <hr className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">

          <p>
            © {new Date().getFullYear()} AI Airbnb. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">

            <Link to="#">
              Privacy Policy
            </Link>

            <Link to="#">
              Terms of Service
            </Link>

            <Link to="#">
              Contact
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;