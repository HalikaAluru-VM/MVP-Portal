import React from "react";
import { Clock, MapPin, Users } from "lucide-react";
 
const Eventcard = ({ event, cardWidth, onClick }) => {
  const images = event.images || [];
  // Fallback image handler
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "/vite.svg"; // fallback image in public folder
  };
  return (
    <div
      className={`rounded-2xl shadow-lg p-4 md:p-6 flex flex-col justify-between max-w-[500px] min-h-[260px] bg-black border border-gray-800 hover:border-cyan-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
        cardWidth ? cardWidth : "w-full max-w-[200px]"
      }`}
      onClick={onClick}
    >
      {/* Top Row: Title (left, always 2 lines), Images (right, square) */}
      <div
        className="flex justify-between items-center mb-2"
        style={{ minHeight: "56px", height: "56px" }} // Fixed height for alignment
      >
        <div className="flex-1 flex items-center">
          <h3
            className="text-xl font-bold text-white leading-tight break-words whitespace-pre-line line-clamp-2"
            style={{
              minHeight: "48px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {event.title}
          </h3>
        </div>
        {images.length > 0 && (
          <div className="flex gap-2 items-center ml-4">
            {images.slice(0, 2).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`event-img-${idx}`}
                onError={handleImgError}
                className="object-cover w-14 h-14 bg-gray-700" // Reduced image size
                style={{ borderRadius: "0.75rem" }}
              />
            ))}
          </div>
        )}
      </div>
      {/* Divider - always at fixed position below title/images, flush with card edges using negative margin */}
      <div
        className="border-t border-gray-800 my-2"
        style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }}
      ></div>
      {/* Description */}
      <p className="text-sm text-gray-200 mb-3 line-clamp-2">
        {event.synopsis || event.description || "No description provided."}
      </p>
      {/* Info Pills with blue border, black bg, white text, blue icons */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <div className="flex items-center bg-black border border-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white">
          <Clock className="w-4 h-4 mr-1 text-blue-600" />
          {event.time && <span>{event.time}</span>}
          {event.duration && (
            <span className="ml-1">| {event.duration}</span>
          )}
        </div>
        <div className="flex items-center bg-black border border-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white">
          <MapPin className="w-4 h-4 mr-1 text-blue-600" />
          {event.location}
        </div>
        {event.instructor && (
          <div className="flex items-center bg-black border border-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white">
            <Users className="w-4 h-4 mr-1 text-blue-600" />
            Instructor: {event.instructor}
          </div>
        )}
      </div>
    </div>
  );
};
 
export default Eventcard;