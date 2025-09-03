import React from "react";
 
const Eventcard = ({ event, cardWidth, onClick }) => {
  const images = event.images || [];
  // Fallback image handler
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "/vite.svg"; // fallback image in public folder
  };
  return (
    <div
      className={`rounded-2xl shadow-lg p-4 md:p-8 flex flex-col justify-between max-w-[500px] h-[340px] transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-gray-700 cursor-pointer border border-gray-700 hover:border-gray-600 focus:border-gray-600 active:border-gray-500 ${
        cardWidth ? cardWidth : "w-full max-w-[400px]"
      }`}
      onClick={onClick}
    >
      <div>
        <h3 className="text-base md:text-lg font-bold mb-2 text-white truncate">
          {event.title}
        </h3>
        {images.length > 0 && (
          <div
            className={`flex ${
              images.length === 1 ? "justify-center" : "justify-center gap-3"
            } mb-2`}
          >
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`event-img-${idx}`}
                onError={handleImgError}
                className={`object-cover rounded-full w-20 h-20 md:w-28 md:h-28 border border-gray-600 bg-gray-700`}
              />
            ))}
          </div>
        )}
        <p className="text-md text-white mb-2 truncate">
          Instructor: {event.instructor}
        </p>
        <p className="text-sm text-white mb-2 line-clamp-2">
          {event.synopsis}
        </p>
      </div>
    </div>
  );
};
 
export default Eventcard;