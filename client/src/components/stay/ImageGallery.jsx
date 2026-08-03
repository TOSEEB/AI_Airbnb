import { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* Airbnb style gallery */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-3 h-[420px] overflow-hidden rounded-2xl">

        {/* Main Image */}
        <div className="md:col-span-2 md:row-span-2">
          <img
            src={images[0]}
            alt="Main Stay"
            onClick={() => {
              setSelectedImage(0);
              setIsOpen(true);
            }}
            className="w-full h-full object-cover cursor-pointer rounded-2xl"
          />
        </div>


        {/* Other Images */}
        {images.slice(1, 5).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Property ${index + 2}`}
            onClick={() => {
              setSelectedImage(index + 1);
              setIsOpen(true);
            }}
            className="w-full h-full object-cover cursor-pointer rounded-xl"
          />
        ))}

      </div>


      {/* Full Screen Viewer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">

          {/* Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 left-6 text-white text-3xl"
          >
            ✕
          </button>


          {/* Counter */}
          <div className="absolute top-6 text-white text-xl">
            {selectedImage + 1} / {images.length}
          </div>


          {/* Previous */}
          <button
            onClick={previousImage}
            className="absolute left-6 text-white text-5xl"
          >
            ‹
          </button>


          {/* Image */}
          <img
            src={images[selectedImage]}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />


          {/* Next */}
          <button
            onClick={nextImage}
            className="absolute right-6 text-white text-5xl"
          >
            ›
          </button>

        </div>
      )}

    </>
  );
};


export default ImageGallery;