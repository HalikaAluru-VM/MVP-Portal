import React, { useState } from "react";
import { leadersSection } from "../data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../components/Button";
import Typography from "../components/Typography";

const LeadersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { heading, subHeading, leaders } = leadersSection;
  const currentLeader = leaders[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % leaders.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? leaders.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="mt-5">
      <div className="max-w-6xl  mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-5">
          {/* <Typography variant="heading" className="md:text-4xl lg:text-5xl bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {heading}
          </Typography> */}
          <Typography variant="heading">{subHeading}</Typography>
        </div>

        {/* Slider Wrapper */}
        <div className="relative flex items-center gap-2 justify-center">
          {/* Arrow Buttons OUTSIDE the card */}
          <Button
            onClick={prevSlide}
            variant="primary"
            size="md"

          
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          {/* Slider Card */}
          <div className="bg-gray-700 rounded-2xl shadow-2xl border border-gray-600 w-full">
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Leader Image */}
              <div className="w-full lg:w-2/5 xl:w-1/3 p-6 lg:p-8 flex justify-center items-center bg-gray-750">
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-4 shadow-lg flex-shrink-0">
                  <img
                    src={currentLeader.image}
                    alt={currentLeader.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        currentLeader.name
                      )}&size=256&background=3b82f6&color=ffffff&bold=true`;
                    }}
                  />
                </div>
              </div>

              {/* Leader Message */}
              <div className="w-full lg:w-3/5 xl:w-2/3 p-6 lg:p-8 xl:p-10 text-center lg:text-left flex flex-col justify-center min-h-[300px] lg:min-h-[400px]">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-6">
                    <Typography variant="paragraph1">
                      "{currentLeader.message}"
                    </Typography>
                  </div>
                  <div className="flex justify-center lg:justify-start items-center flex-shrink-0">

                    <Typography
                      variant="caption"
                      
                    >
                      {currentLeader.name}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={nextSlide}
            variant="primary"
            size="md"

          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {leaders.map((_, index) => (
            <Button
              key={index}
              onClick={() => goToSlide(index)}
              variant={index === currentIndex ? "primary" : "secondary"}
             
              circle
              className={`w-2.5 h-2.5 md:w-3 md:h-3 p-0 ${index === currentIndex ? "scale-110" : ""}`}
              aria-label={`Go to leader ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadersSection;
