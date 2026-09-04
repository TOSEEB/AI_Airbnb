import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getFavorites, toggleFavorite } from "../api/favoriteApi";
import { locationToPath } from "../utils/authRedirect";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    if (!user) {
      setFavoriteIds([]);
      setFavorites([]);
      return;
    }

    try {
      const res = await getFavorites();
      const list = Array.isArray(res.data) ? res.data : [];
      setFavorites(list);
      setFavoriteIds(list.map((stay) => String(stay._id)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user?._id || user?.id]);

  const isFavorite = (stayId) => favoriteIds.includes(String(stayId));

  const toggleStayFavorite = async (stayId) => {
    const res = await toggleFavorite(stayId);
    const list = Array.isArray(res.data?.favorites) ? res.data.favorites : [];
    setFavorites(list);
    setFavoriteIds(list.map((stay) => String(stay._id)));
    return res.data?.isFavorite;
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        favoriteIds,
        isFavorite,
        toggleStayFavorite,
        loadFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteButton = ({ stayId, className = "" }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isFavorite, toggleStayFavorite } = useFavorites();
  const saved = isFavorite(stayId);

  const handleClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      navigate("/login", { state: { from: locationToPath(location) } });
      return;
    }

    try {
      const nowSaved = await toggleStayFavorite(stayId);
      toast.success(nowSaved ? "Saved to favorites" : "Removed from favorites");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update favorite");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? "Remove from favorites" : "Save to favorites"}
      className={`rounded-full p-2 shadow bg-white/90 hover:bg-white ${className}`}
    >
      <FaHeart className={saved ? "text-rose-500" : "text-gray-300"} />
    </button>
  );
};
