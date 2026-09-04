import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaAirbnb, FaUserCircle, FaHeart, FaBars } from "react-icons/fa";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import { locationToPath } from "../utils/authRedirect";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = locationToPath(location);
  const { user, logout, becomeHost } = useContext(AuthContext);
  const hasSession = Boolean(user || localStorage.getItem("token"));

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();

    setShowMenu(false);

    navigate("/login");
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const activeLink = ({ isActive }) =>
    isActive
      ? "text-rose-500 font-semibold"
      : "text-gray-700 hover:text-rose-500";

  return (
    <nav className="shadow-md sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-rose-500"
        >
          <FaAirbnb size={30} />
          AI Airbnb
        </Link>

        {/* Desktop links */}

        <div className="hidden md:flex gap-8">
          <NavLink to="/" className={activeLink}>
            Home
          </NavLink>

          {hasSession && (
            <>
              <NavLink to="/bookings" className={activeLink}>
                Bookings
              </NavLink>

              <NavLink to="/dashboard" className={activeLink}>
                Dashboard
              </NavLink>
            </>
          )}

          {(user?.role === "host" || user?.role === "admin") && (
            <NavLink to="/host/dashboard" className={activeLink}>
              Host
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin" className={activeLink}>
              Admin
            </NavLink>
          )}

          <NavLink to="/ai" className={activeLink}>
            AI Planner
          </NavLink>
        </div>

        {/* Right side */}

        <div className="flex items-center gap-5">
          {hasSession && (
            <Link to="/favorites">
              <FaHeart size={22} className="text-gray-600 hover:text-red-500" />
            </Link>
          )}

          {user ? (
            <div className="relative" ref={menuRef}>
              {/* Profile button */}

              <button
                onClick={() => setShowMenu(!showMenu)}

                className="
                    flex
                    items-center
                    gap-3
                    border
                    rounded-full
                    px-4
                    py-2
                    hover:shadow-md
                    transition
                  "
              >
                <FaBars />

                <FaUserCircle size={30} className="text-gray-600" />
              </button>

              {/* Dropdown */}

              {showMenu && (
                <div
                  className="
                      absolute
                      right-0
                      mt-3
                      w-72
                      bg-white
                      rounded-xl
                      shadow-xl
                      border
                      overflow-hidden
                      "
                >
                  {/* User info */}

                  <div
                    className="
                        px-5
                        py-4
                        border-b
                        "
                  >
                    <h3
                      className="
                          font-semibold
                          text-gray-900
                          "
                    >
                      {user.name || "User"}
                    </h3>

                    <p
                      className="
                          text-sm
                          text-gray-500
                          "
                    >
                      {user.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"

                    onClick={closeMenu}

                    className="
                        block
                        px-5
                        py-3
                        hover:bg-gray-100
                        "
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/bookings"

                    onClick={closeMenu}

                    className="
                        block
                        px-5
                        py-3
                        hover:bg-gray-100
                        "
                  >
                    My Bookings
                  </Link>

                  <Link
                    to="/favorites"

                    onClick={closeMenu}

                    className="
                        block
                        px-5
                        py-3
                        hover:bg-gray-100
                        "
                  >
                    Favorites
                  </Link>

                  <Link
                    to="/dashboard"

                    onClick={closeMenu}

                    className="
                        block
                        px-5
                        py-3
                        hover:bg-gray-100
                        "
                  >
                    Dashboard
                  </Link>

                  {(user.role === "host" || user.role === "admin") && (
                    <Link
                      to="/host/dashboard"

                      onClick={closeMenu}

                      className="
                            block
                            px-5
                            py-3
                            hover:bg-gray-100
                            "
                    >
                      Host Dashboard
                    </Link>
                  )}

                  {user.role === "guest" && (
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await becomeHost();
                          closeMenu();
                          navigate("/host/dashboard");
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="block w-full text-left px-5 py-3 hover:bg-gray-100"
                    >
                      Become a host
                    </button>
                  )}

                  {user.role === "admin" && (
                    <Link
                      to="/admin"

                      onClick={closeMenu}

                      className="
                            block
                            px-5
                            py-3
                            hover:bg-gray-100
                            "
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <div className="border-t">
                    <button
                      onClick={handleLogout}

                      className="
                          w-full
                          text-left
                          px-5
                          py-3
                          hover:bg-gray-100
                          "
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                state={{ from: returnTo }}
                className="text-gray-700 hover:text-rose-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                state={{ from: returnTo }}
                className="
                  bg-rose-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-rose-600
                  "
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-4">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
