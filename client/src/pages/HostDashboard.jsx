import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  getHostStays,
  deleteStay,
} from "../api/stayApi";
import toast from "react-hot-toast";

const HostDashboard = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadHostStays();
  }, []);


  const loadHostStays = async () => {
    try {
      const res = await getHostStays();

      setStays(res.data.stays || res.data);

    } catch (err) {
      console.error(err);

      toast.error("Unable to load stays");

    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stay?"
    );


    if (!confirmDelete) return;


    try {

      await deleteStay(id);


      toast.success(
        "Stay deleted successfully"
      );


      loadHostStays();


    } catch (err) {

      console.error(err);


      toast.error(
        "Failed to delete stay"
      );

    }
  };


  return (
    <div className="max-w-7xl mx-auto p-6">


      <div className="flex justify-between items-center mb-8">


        <div>

          <h1 className="text-3xl font-bold">
            Welcome, {user?.name}
          </h1>


          <p className="text-gray-500 mt-1">
            Manage your properties
          </p>

        </div>


        <button
          onClick={() =>
            navigate("/host/stays/new")
          }
          className="bg-rose-500 text-white px-5 py-3 rounded-lg hover:bg-rose-600"
        >
          + Add Stay
        </button>


      </div>



      <div className="grid md:grid-cols-4 gap-5 mb-10">


        <div className="bg-white shadow rounded-xl p-5">

          <h3 className="text-gray-500">
            Properties
          </h3>

          <p className="text-3xl font-bold">
            {stays.length}
          </p>

        </div>


        <div className="bg-white shadow rounded-xl p-5">

          <h3 className="text-gray-500">
            Bookings
          </h3>

          <p className="text-3xl font-bold">
            Coming Soon
          </p>

        </div>


        <div className="bg-white shadow rounded-xl p-5">

          <h3 className="text-gray-500">
            Earnings
          </h3>

          <p className="text-3xl font-bold">
            ₹0
          </p>

        </div>


        <div className="bg-white shadow rounded-xl p-5">

          <h3 className="text-gray-500">
            Occupancy
          </h3>

          <p className="text-3xl font-bold">
            0%
          </p>

        </div>


      </div>




      {loading ? (

        <p>Loading...</p>


      ) : stays.length === 0 ? (


        <div className="bg-white rounded-xl shadow p-10 text-center">


          <h2 className="text-2xl font-semibold">
            No properties yet
          </h2>


          <p className="text-gray-500 mt-2">
            Add your first stay to start hosting.
          </p>


          <button
            onClick={() =>
              navigate("/host/stays/new")
            }
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


                <h2 className="text-xl font-semibold">
                  {stay.title}
                </h2>


                <p className="text-gray-500">
                  {stay.location}
                </p>


                <p className="mt-2 font-bold text-lg">
                  ₹{stay.price} / night
                </p>


                <p className="text-sm text-gray-500 mt-1">
                  {stay.guests} Guests • {stay.bedrooms} Bedrooms
                </p>



                <div className="flex gap-3 mt-5">


                  <button
                    onClick={() =>
                      navigate(
                        `/host/stays/edit/${stay._id}`
                      )
                    }
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>



                  <button
                    onClick={() =>
                      handleDelete(stay._id)
                    }
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