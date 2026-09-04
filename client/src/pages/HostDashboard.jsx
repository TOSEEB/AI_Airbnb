import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { getHostStays, deleteStay } from "../api/stayApi";
import { getHostBookings } from "../api/bookingApi";

const nightsBetween = (checkIn, checkOut) => {
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 0;
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
};

const HostDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stays, setStays] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [staysRes, bookingsRes] = await Promise.all([
        getHostStays(),
        getHostBookings(),
      ]);

      setStays(staysRes.data.stays || staysRes.data || []);
      setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load host dashboard");
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const confirmed = bookings.filter((booking) => booking.status === "confirmed");
    const earnings = confirmed.reduce(
      (sum, booking) => sum + Number(booking.totalPrice || 0),
      0
    );
    const windowStart = Date.now();
    const windowEnd = windowStart + 30 * 24 * 60 * 60 * 1000;
    const bookedNights = confirmed.reduce((sum, booking) => {
      const start = Math.max(new Date(booking.checkIn).getTime(), windowStart);
      const end = Math.min(new Date(booking.checkOut).getTime(), windowEnd);
      if (end <= start) return sum;
      return sum + Math.round((end - start) / (1000 * 60 * 60 * 24));
    }, 0);
    const capacity = stays.length * 30;
    const occupancy = capacity
      ? Math.min(100, Math.round((bookedNights / capacity) * 100))
      : 0;

    return {
      bookingCount: bookings.length,
      earnings,
      occupancy,
    };
  }, [bookings, stays]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stay?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStay(id);
      toast.success("Stay deleted successfully");
      loadDashboard();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete stay");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-500 mt-1">Manage your properties</p>
        </div>

        <button
          onClick={() => navigate("/host/stays/new")}
          className="bg-rose-500 text-white px-5 py-3 rounded-lg hover:bg-rose-600"
        >
          + Add Stay
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-5 mb-10">
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Properties</h3>
          <p className="text-3xl font-bold">{stays.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Bookings</h3>
          <p className="text-3xl font-bold">{stats.bookingCount}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Earnings</h3>
          <p className="text-3xl font-bold">₹{stats.earnings.toLocaleString()}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Occupancy (30 days)</h3>
          <p className="text-3xl font-bold">{stats.occupancy}%</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Upcoming & recent bookings</h2>

      <div className="bg-white rounded-2xl shadow mb-10 divide-y">
        {bookings.length ? (
          bookings.slice(0, 8).map((booking) => (
            <div
              key={booking._id}
              className="px-5 py-4 flex flex-wrap gap-3 justify-between"
            >
              <div>
                <p className="font-semibold">{booking.stay?.title || "Stay"}</p>
                <p className="text-sm text-gray-500">
                  {booking.user?.name} · {nightsBetween(booking.checkIn, booking.checkOut)} nights
                </p>
              </div>
              <p className="capitalize text-sm font-medium">{booking.status}</p>
            </div>
          ))
        ) : (
          <p className="p-5 text-gray-500">No bookings yet.</p>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : stays.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold">No properties yet</h2>
          <p className="text-gray-500 mt-2">
            Add your first stay to start hosting.
          </p>
          <button
            onClick={() => navigate("/host/stays/new")}
            className="mt-5 bg-rose-500 text-white px-5 py-3 rounded-lg hover:bg-rose-600"
          >
            Add Your First Stay
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stays.map((stay) => (
            <div
              key={stay._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={stay.images?.[0]}
                alt={stay.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold">{stay.title}</h2>
                <p className="text-gray-500">{stay.location}</p>
                <p className="mt-2 font-bold text-lg">₹{stay.price} / night</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stay.guests} Guests • {stay.bedrooms} Bedrooms
                </p>
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => navigate(`/host/stays/edit/${stay._id}`)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stay._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostDashboard;
