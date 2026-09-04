import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStay } from "../api/stayApi";
import { uploadImage } from "../api/uploadApi";
import { toast } from "react-toastify";

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
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };


  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    try {
      setUploading(true);

      const uploadedImages = [];

      for (const file of files) {
        const res = await uploadImage(file);
        uploadedImages.push(res.imageUrl);
      }

      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          ...uploadedImages,
        ],
      }));

      toast.success("Images uploaded successfully");

    } catch (err) {
      console.error(err);

      toast.error("Image upload failed");

    } finally {
      setUploading(false);
    }
  };


 const handleSubmit = async (e) => {
  e.preventDefault();


  // ==========================
  // Frontend Validation
  // ==========================

  if (formData.images.length === 0) {
    toast.error(
      "Please upload at least one property image"
    );
    return;
  }


  if (formData.price <= 0) {
    toast.error(
      "Price must be greater than 0"
    );
    return;
  }


  if (formData.guests < 1) {
    toast.error(
      "Guests must be at least 1"
    );
    return;
  }


  if (formData.bedrooms < 1) {
    toast.error(
      "Bedrooms must be at least 1"
    );
    return;
  }



  try {

    setLoading(true);


    const payload = {
      ...formData,
      images: formData.images,
    };


    await createStay(payload);


    toast.success(
      "Stay added successfully!"
    );


    setTimeout(() => {
      navigate("/host/dashboard");
    }, 1000);



  } catch (err) {

    console.error(err);


    toast.error(
      err.response?.data?.message ||
      "Failed to create stay"
    );


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


        <div>

          <label className="font-semibold block mb-3">
            Property Images
          </label>


          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />


          {uploading && (
            <p className="text-blue-600">
              Uploading images...
            </p>
          )}


          <div className="grid grid-cols-3 gap-4">

            {formData.images.map((image, index) => (

              <div
                key={index}
                className="relative"
              >

                <img
                  src={image}
                  alt="Stay"
                  className="h-32 w-full object-cover rounded-lg border"
                />


                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      images:
                        prev.images.filter(
                          (_, i) => i !== index
                        ),
                    }))
                  }
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7"
                >
                  ×
                </button>

              </div>

            ))}

          </div>

        </div>


        <div className="flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600"
          >
            {loading
              ? "Saving..."
              : "Save Stay"}
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

export default AddStay; 