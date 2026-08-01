import { useEffect, useState } from "react";
import StayCard from "../components/StayCard";
import Loader from "../components/Loader";
import { getFavorites } from "../api/favoriteApi";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      setFavorites(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p>No favorite stays yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((stay) => (
            <StayCard
              key={stay._id}
              stay={stay}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;