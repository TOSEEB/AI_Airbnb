import { Link } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find your
            <span className="text-rose-400"> perfect stay</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Explore unique homes, luxury apartments,
            cozy cabins, and beachfront villas around
            the world.
          </p>

          {/* Search Box */}
          <div className="mt-10 bg-white rounded-xl shadow-xl p-4 flex flex-col md:flex-row gap-4">

            <div className="flex items-center gap-3 flex-1">
              <FaMapMarkerAlt className="text-rose-500" />

              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full outline-none text-gray-700"
              />
            </div>

            <button
              className="bg-rose-500 hover:bg-rose-600 transition text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <FaSearch />

              Search
            </button>

          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-8">

            <Link
              to="/stays"
              className="bg-rose-500 hover:bg-rose-600 transition px-8 py-3 rounded-lg font-semibold"
            >
              Explore Stays
            </Link>

            <Link
              to="/ai"
              className="border border-white hover:bg-white hover:text-black transition px-8 py-3 rounded-lg font-semibold"
            >
              AI Planner
            </Link>

          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 mt-12">

            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-gray-300">
                Premium Stays
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">120+</h2>
              <p className="text-gray-300">
                Destinations
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">15K+</h2>
              <p className="text-gray-300">
                Happy Guests
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;