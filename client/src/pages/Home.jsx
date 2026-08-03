import { useEffect, useState } from "react";
import Fuse from "fuse.js";

import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import StayCard from "../components/StayCard";
import Loader from "../components/Loader";

import { getAllStays } from "../api/stayApi";

const Home = () => {
  const [stays, setStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchStays();
  }, []);

  useEffect(() => {
    if (!stays.length) return;

    let data = [...stays];

    // Smart Fuzzy Search
    if (search.trim()) {
      const fuse = new Fuse(stays, {
        keys: [
          "title",
          "location",
          "description",
          "category",
          "type",
        ],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 2,
      });

      const results = fuse.search(search);

      data = results.map((result) => result.item);
    }

    // Category Filter
    // Category Filter

if (category !== "All") {

  const categoryMap = {

    Featured: [
      "Villa",
      "Penthouse",
      "Beach House",
    ],

    Beach: [
      "Beach House",
    ],

    Cabin: [
      "Cabin",
    ],

    Luxury: [
      "Villa",
      "Penthouse",
      "Castle",
    ],

    Cozy: [
      "Cabin",
      "Farm House",
      "Bungalow",
    ],

    City: [
      "Apartment",
      "Penthouse",
    ],

    Family: [
      "Villa",
      "Apartment",
      "Bungalow",
    ],

  };


  const allowedCategories =
    categoryMap[category];


  if (allowedCategories) {

    data = data.filter((stay) =>
      allowedCategories.includes(
        stay.category
      )
    );

  }

}

    setFilteredStays(data);
  }, [search, category, stays]);

  const fetchStays = async () => {
    try {
      const res = await getAllStays();

      setStays(res.data);
      setFilteredStays(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        search={search}
        setSearch={setSearch}
        stays={stays}
      />

      {/* Stays Section */}
      <div
        id="stays-section"
        className="container mx-auto px-6 py-10"
      >
        <FilterBar
          selected={category}
          onSelect={setCategory}
        />

        {loading ? (
          <Loader />
        ) : filteredStays.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredStays.map((stay) => (
              <StayCard
                key={stay._id}
                stay={stay}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No stays found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching for another city or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;