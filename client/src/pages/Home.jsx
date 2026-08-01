import { useEffect, useState } from "react";
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
    let data = [...stays];

    if (search) {
      data = data.filter(
        (stay) =>
          stay.title.toLowerCase().includes(search.toLowerCase()) ||
          stay.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter(
        (stay) =>
          stay.category?.toLowerCase() === category.toLowerCase()
      );
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
      <Hero />

      <div className="container mx-auto px-6 py-10">

        <FilterBar
          selected={category}
          onSelect={setCategory}
        />

        {loading ? (
          <Loader />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredStays.map((stay) => (
              <StayCard
                key={stay._id}
                stay={stay}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;