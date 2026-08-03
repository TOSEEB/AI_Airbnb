import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Fuse from "fuse.js";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaHome,
  FaTag,
} from "react-icons/fa";

const Hero = ({ search, setSearch, stays }) => {
  const searchBtnRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const searchData = [];

    stays.forEach((stay) => {
      if (stay.title) {
        searchData.push({
          type: "stay",
          value: stay.title,
        });
      }

      if (stay.location) {
        searchData.push({
          type: "location",
          value: stay.location,
        });
      }

      if (stay.category) {
        searchData.push({
          type: "category",
          value: stay.category,
        });
      }
    });

    // Remove duplicates
    const uniqueData = searchData.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.type === item.type &&
            t.value === item.value
        )
    );

    const fuse = new Fuse(uniqueData, {
      keys: ["value"],
      threshold: 0.35,
      ignoreLocation: true,
    });

    const results = fuse.search(search);

    setSuggestions(
      results.slice(0, 6).map((result) => result.item)
    );
  }, [search, stays]);

  const handleSearch = () => {
    document
      .getElementById("stays-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setSuggestions([]);
  };

  const handleSuggestionClick = (value) => {
    setSearch(value);

    setSuggestions([]);

    setTimeout(() => {
      document
        .getElementById("stays-section")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  return (
    <section
      className="relative h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find your
            <span className="text-rose-400">
              {" "}perfect stay
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Explore unique homes, luxury apartments,
            cozy cabins, and beachfront villas around
            the world.
          </p>

          {/* Search */}
          <div className="relative mt-10">

            <div className="bg-white rounded-xl shadow-xl p-4 flex flex-col md:flex-row gap-4">

              <div className="flex items-center gap-3 flex-1">

                <FaMapMarkerAlt className="text-rose-500" />

                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      searchBtnRef.current.click();
                    }
                  }}
                  className="w-full outline-none text-gray-700"
                />

              </div>

              <button
                ref={searchBtnRef}
                onClick={handleSearch}
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <FaSearch />
                Search
              </button>

            </div>

            {/* Suggestions */}

            {suggestions.length > 0 && (

              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50">

                {suggestions.map((item, index) => (

                  <div
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(item.value)
                    }
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 transition"
                  >

                    {item.type === "location" && (
                      <FaMapMarkerAlt className="text-rose-500" />
                    )}

                    {item.type === "stay" && (
                      <FaHome className="text-blue-500" />
                    )}

                    {item.type === "category" && (
                      <FaTag className="text-green-500" />
                    )}

                    <span>{item.value}</span>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* Buttons */}

          <div className="flex gap-4 mt-8">

            <Link
              to="/stays"
              className="bg-rose-500 hover:bg-rose-600 px-8 py-3 rounded-lg font-semibold"
            >
              Explore Stays
            </Link>

            <Link
              to="/ai"
              className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition"
            >
              AI Planner
            </Link>

          </div>

          {/* Stats */}

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