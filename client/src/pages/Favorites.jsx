import StayCard from "../components/StayCard";
import { useFavorites } from "../context/FavoriteContext";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">My Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorite stays yet. Tap the heart on a listing to save it.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((stay) => (
            <StayCard key={stay._id} stay={stay} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
