import React, { useState } from "react";
import { coachSection } from "../data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../components/Button";
import Typography from "../components/Typography";

const CoachSection = () => {
  const [coachIndex, setCoachIndex] = useState(0);
  const { heading1, subHeading1, coaches } = coachSection;

  // Slice visible coaches and wrap around if needed
  const visibleCoaches = coaches.slice(coachIndex, coachIndex + 3);
  if (visibleCoaches.length < 3) {
    visibleCoaches.push(...coaches.slice(0, 3 - visibleCoaches.length));
  }

  const nextCoach = () => {
    setCoachIndex((prev) => (prev + 3) % coaches.length);
  };

  const prevCoach = () => {
    setCoachIndex((prev) =>
      prev - 3 < 0 ? coaches.length - (coaches.length % 3 || 3) : prev - 3
    );
  };

  return (
    <section className="mt-5" >
      <div className="max-w-6xl mx-auto text-center px-6 space-y-2">
      <div>
        <Typography variant="heading">
          {heading1}
        </Typography>
        </div>
        <div>
        <Typography variant="heading" >
          {subHeading1}
        </Typography>
        </div>

        {/* Coaches Row */}
        <div className="mt-6 flex items-center justify-center gap-4 w-full">
          {/* Prev Button OUTSIDE */}
          <Button
            onClick={prevCoach}
            variant="primary"
            size="sm"
            className="rounded-full p-3 bg-gray-700/80 hover:bg-gray-600"
            aria-label="Previous coach"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Coach Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-items-center">
  {visibleCoaches.map((coach, idx) => (
    <div
      key={idx}
      className="w-72 bg-gray-700 flex flex-col items-center p-8 rounded-2xl backdrop-blur-md border border-gray-600/50 shadow-lg hover:shadow-gray-500/20 transition-all duration-300 hover:transform hover:scale-105"
    >
      {/* Coach Image */}
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg">
          <img
            src={coach.image}
            alt={coach.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Coach Name */}
      <Typography variant="h3" className="mb-4 text-white">
        {coach.name}
      </Typography>

      {/* Tech Stack */}
      <div className="flex flex-wrap justify-center gap-2">
        {coach.techStack.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 text-sm rounded-full text-gray-300 bg-gray-700 border"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  ))}
</div>


          {/* Next Button OUTSIDE */}
          <Button
            onClick={nextCoach}
            variant="primary"
            size="sm"
            className="rounded-full p-3 bg-gray-700/80 hover:bg-gray-600"
            aria-label="Next coach"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: Math.ceil(coaches.length / 3) }).map((_, index) => (
            <Button
              key={index}
              onClick={() => setCoachIndex(index * 3)}
              variant={coachIndex / 3 === index ? "primary" : "secondary"}
              size=""
              className="w-3 h-3 rounded-full p-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoachSection;
