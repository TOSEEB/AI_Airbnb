import { useEffect, useState } from "react";
import StayCard from "../components/StayCard";
import Loader from "../components/Loader";
import { getAllStays } from "../api/stayApi";

const Stays = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStays();
  }, []);

  const fetchStays = async () => {
    try {
      const res = await getAllStays();
      setStays(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Explore Stays
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stays.map((stay) => (
          <StayCard
            key={stay._id}
            stay={stay}
          />
        ))}
      </div>
    </div>
  );
};

export default Stays; 
