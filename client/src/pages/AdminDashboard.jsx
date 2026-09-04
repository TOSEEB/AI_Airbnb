import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAdminSummary, updateUserRole, adminDeleteStay } from "../api/adminApi";
import Loader from "../components/Loader";

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await getAdminSummary();
      setSummary(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load admin summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      toast.success("Role updated");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update role");
    }
  };

  const handleRemoveStay = async (stayId) => {
    if (!window.confirm("Take down this listing?")) return;

    try {
      await adminDeleteStay(stayId);
      toast.success("Stay removed");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not remove stay");
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Users" value={summary.users} />
        <StatCard label="Stays" value={summary.stays} />
        <StatCard label="Bookings" value={summary.bookings} />
        <StatCard label="Confirmed" value={summary.confirmedBookings} />
        <StatCard label="Pending payment" value={summary.pendingBookings} />
        <StatCard label="Reviews" value={summary.reviews} />
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Users</h2>
      <div className="bg-white rounded-2xl shadow overflow-x-auto mb-10">
        {summary.userList?.length ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {summary.userList.map((account) => (
                <tr key={account._id}>
                  <td className="px-5 py-3 font-medium">{account.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {account.email}
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={account.role}
                      onChange={(e) =>
                        handleRoleChange(account._id, e.target.value)
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="guest">guest</option>
                      <option value="host">host</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-5 text-gray-500">No users yet.</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Listings</h2>
      <div className="bg-white rounded-2xl shadow overflow-hidden mb-10">
        {summary.stayList?.length ? (
          <div className="divide-y">
            {summary.stayList.map((stay) => (
              <div
                key={stay._id}
                className="px-5 py-4 flex flex-wrap gap-3 justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{stay.title}</p>
                  <p className="text-sm text-gray-500">
                    {stay.location} · {stay.owner?.email || "No owner"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveStay(stay._id)}
                  className="text-red-600 font-medium hover:underline"
                >
                  Take down
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-5 text-gray-500">No stays yet.</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Recent bookings</h2>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {summary.recentBookings?.length ? (
          <div className="divide-y">
            {summary.recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="px-5 py-4 flex flex-wrap gap-3 justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {booking.stay?.title || "Stay"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.user?.name} · {booking.user?.email}
                  </p>
                </div>
                <p className="capitalize text-sm font-medium">{booking.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-5 text-gray-500">No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
