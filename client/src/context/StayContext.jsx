import { createContext, useContext, useEffect, useState } from "react";
import * as stayApi from "../api/stayApi";

const StayContext = createContext();

export const StayProvider = ({ children }) => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStays = async () => {
    try {
      setLoading(true);

      const data = await stayApi.getAllStays();

      setStays(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStays();
  }, []);

  const addStay = async (stay) => {
    const newStay = await stayApi.createStay(stay);

    setStays((prev) => [...prev, newStay]);

    return newStay;
  };

  const updateStay = async (id, stay) => {
    const updated = await stayApi.updateStay(id, stay);

    setStays((prev) =>
      prev.map((item) => (item._id === id ? updated : item))
    );

    return updated;
  };

  const deleteStay = async (id) => {
    await stayApi.deleteStay(id);

    setStays((prev) => prev.filter((stay) => stay._id !== id));
  };

  return (
    <StayContext.Provider
      value={{
        stays,
        loading,
        fetchStays,
        addStay,
        updateStay,
        deleteStay,
      }}
    >
      {children}
    </StayContext.Provider>
  );
};

export const useStays = () => useContext(StayContext);