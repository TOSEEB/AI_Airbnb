import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user
  const loadUser = async () => {
    try {
      const res = await authApi.getProfile();
      setUser(res.data?.user ?? null);
    } catch (error) {
      const status = error.response?.status;
      if (status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      } else {
        console.error("Auth check failed:", error.response?.data || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await authApi.login({
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    return res.data;
  };

  // Register
  const register = async (name, email, password) => {
    const res = await authApi.register({
      name,
      email,
      password,
    });

    return res.data;
  };

  // Become host
  const becomeHost = async () => {
    const res = await authApi.becomeHost();
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    try {
      if (authApi.logout) {
        await authApi.logout();
      }
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loadUser,
        becomeHost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);