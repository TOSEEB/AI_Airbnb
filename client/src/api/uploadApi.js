import api from "./axios";

export const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await api.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};