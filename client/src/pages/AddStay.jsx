import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStay } from "../api/stayApi";

const AddStay = () => {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);

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

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const removeImageField = (index) => {
    const updated = formData.images.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: updated.length ? updated : [""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        images: formData.images.filter((img) => img.trim() !== ""),
      };

      await createStay(payload);

      alert("Stay added successfully!");

      navigate("/host/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create stay");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Add New Stay
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6"
      >

        {/* Title */}

        <div>
          <label className="font-semibold block mb-2">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
            placeholder="Luxury Beach Villa"
          />
        </div>

        {/* Location */}

        <div>
          <label className="font-semibold block mb-2">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
            placeholder="Goa"
          />
        </div>

        {/* Price */}

        <div>
          <label className="font-semibold block mb-2">
            Price per Night
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Description */}

        <div>
          <label className="font-semibold block mb-2">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Category */}

        <div>
          <label className="font-semibold block mb-2">
            Category
          </label>

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
        </div>

        {/* Guests */}

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="font-semibold block mb-2">
              Guests
            </label>

            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Bedrooms
            </label>

            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="1"
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        {/* Images */}

        <div>

          <label className="font-semibold block mb-4">
            Image URLs
          </label>

          {formData.images.map((img, index) => (

            <div
              key={index}
              className="flex gap-2 mb-3"
            >

              <input
                type="text"
                value={img}
                onChange={(e) =>
                  handleImageChange(
                    index,
                    e.target.value
                  )
                }
                className="flex-1 border rounded-lg p-3"
                placeholder="https://example.com/image.jpg"
              />

              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeImageField(index)
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
            onClick={addImageField}
            className="text-rose-500 font-semibold"
          >
            + Add Another Image
          </button>

        </div>

        {/* Buttons */}

        <div className="flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600"
          >
            {loading ? "Saving..." : "Save Stay"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/host/dashboard")}
            className="border px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddStay;