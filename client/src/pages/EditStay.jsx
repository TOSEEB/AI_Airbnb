import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getStayById,
  updateStay,
} from "../api/stayApi";

const EditStay = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    category: "Villa",
    bedrooms: 1,
    guests: 2,
    images: [""],
  });

  useEffect(() => {
    loadStay();
  }, []);

  const loadStay = async () => {
    try {
      const res = await getStayById(id);

      const stay = res.data;

      setFormData({
        title: stay.title || "",
        location: stay.location || "",
        price: stay.price || "",
        description: stay.description || "",
        category: stay.category || "Villa",
        bedrooms: stay.bedrooms || 1,
        guests: stay.guests || 2,
        images:
          stay.images && stay.images.length
            ? stay.images
            : [""],
      });

    } catch (err) {
      console.error(err);

      toast.error("Unable to load stay");

    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };


  const handleImageChange = (index, value) => {
    const updated = [...formData.images];

    updated[index] = value;

    setFormData({
      ...formData,
      images: updated,
    });
  };


  const addImage = () => {
    setFormData({
      ...formData,
      images: [
        ...formData.images,
        "",
      ],
    });
  };


  const removeImage = (index) => {
    const updated = formData.images.filter(
      (_, i) => i !== index
    );

    setFormData({
      ...formData,
      images: updated.length
        ? updated
        : [""],
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateStay(id, {
        ...formData,
        images: formData.images.filter(
          (img) => img.trim() !== ""
        ),
      });


      toast.success(
        "Stay updated successfully"
      );


      setTimeout(() => {
        navigate("/host/dashboard");
      }, 1000);


    } catch (err) {
      console.error(err);


      toast.error(
        err.response?.data?.message ||
        "Update failed"
      );


    } finally {
      setSaving(false);
    }
  };


  if (loading)
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );


  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Edit Stay
      </h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
      >

        <input
          className="w-full border rounded-lg p-3"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />


        <input
          className="w-full border rounded-lg p-3"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />


        <input
          type="number"
          className="w-full border rounded-lg p-3"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />


        <textarea
          rows="5"
          className="w-full border rounded-lg p-3"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />


        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>Villa</option>
          <option>Apartment</option>
          <option>Cabin</option>
          <option>Beach House</option>
          <option>Farm House</option>
          <option>Hotel</option>
        </select>


        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="border rounded-lg p-3"
            placeholder="Guests"
          />


          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="border rounded-lg p-3"
            placeholder="Bedrooms"
          />

        </div>


        <div>

          <h3 className="font-semibold mb-3">
            Images
          </h3>


          {formData.images.map((img,index)=>(
            <div
              key={index}
              className="flex gap-2 mb-3"
            >

              <input
                className="flex-1 border rounded-lg p-3"
                value={img}
                onChange={(e)=>
                  handleImageChange(
                    index,
                    e.target.value
                  )
                }
              />


              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeImage(index)
                  }
                  className="bg-red-500 text-white px-4 rounded-lg"
                >
                  X
                </button>
              )}

            </div>
          ))}


          <button
            type="button"
            onClick={addImage}
            className="text-rose-500 font-semibold"
          >
            + Add Image
          </button>

        </div>


        <div className="flex gap-4">

          <button
            disabled={saving}
            className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600"
          >
            {saving
              ? "Updating..."
              : "Update Stay"}
          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/host/dashboard")
            }
            className="border px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

        </div>


      </form>

    </div>
  );
};

export default EditStay;