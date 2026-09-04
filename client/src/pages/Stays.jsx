import { useEffect, useState } from "react";
import StayCard from "../components/StayCard";
import Loader from "../components/Loader";
import { getAllStays } from "../api/stayApi";

const Stays = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStays();
  }, []);

  const fetchStays = async () => {
    try {
      const res = await getAllStays();
      setStays(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load stays");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">Explore Stays</h1>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : stays.length === 0 ? (
        <p className="text-gray-500">No stays available yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stays.map((stay) => (
            <StayCard key={stay._id} stay={stay} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Stays;
