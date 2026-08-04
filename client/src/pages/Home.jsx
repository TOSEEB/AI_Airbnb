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
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchStays();
  }, []);

  useEffect(() => {
    if (!stays.length) return;

    let data = [...stays];

    // Search
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

      data = fuse.search(search).map((result) => result.item);
    }

    // Category filter
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

      const allowedCategories = categoryMap[category];

      if (allowedCategories) {
        data = data.filter((stay) =>
          allowedCategories.includes(stay.category)
        );
      }
    }

    setFilteredStays(data);

  }, [search, category, stays]);


  const fetchStays = async () => {

    try {

      console.log(
        "VITE API URL:",
        import.meta.env.VITE_API_URL
      );

      const res = await getAllStays();

      console.log(
        "Backend response:",
        res
      );


      const staysData =
        Array.isArray(res?.data)
          ? res.data
          : [];


      setStays(staysData);
      setFilteredStays(staysData);
      setError("");

    } catch (err) {

      console.error(
        "FETCH STAYS ERROR:",
        err.response || err.message || err
      );


      setError(
        "Unable to load stays. Backend connection failed."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div>

      <Hero
        search={search}
        setSearch={setSearch}
        stays={stays}
      />


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

        ) : error ? (

          <div className="mt-12 text-center text-red-600">

            <h2 className="text-2xl font-semibold">
              {error}
            </h2>

            <p className="text-gray-500 mt-2">
              Check browser console for API URL and backend response.
            </p>

          </div>

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
              Try searching another city or category.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Home;