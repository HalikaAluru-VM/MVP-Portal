import React, { useState } from "react";
import Typography from "../components/Typography";
import Card from "../components/Card";
import Button from "../components/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { literacySection } from "../data"; // adjust path if needed
 
const LiteracySection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 1;
  const total = literacySection.topics.length;
 
  const handleNext = () => {
    if (startIndex + itemsPerPage < total) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };
 
  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };
 
  const visibleTopics = literacySection.topics.slice(
    startIndex,
    startIndex + itemsPerPage
  );
 
  // number of pages
  const totalPages = Math.ceil(total / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage);
 
  return (
    <section className="mt-5 px-6 text-white">
      <div className="text-center ">
       <Typography variant="heading" >
        {literacySection.heading}
      </Typography>
      </div>
 
<div
  className="flex items-center justify-center gap-3 w-full relative"
  style={{ minHeight: "340px" }}
>
  {/* Left Arrow OUTSIDE, vertically centered */}
  <Button
    onClick={handlePrev}
    variant="primary"
    size="sm"
    className="self-center flex-shrink-0 rounded-full p-3 bg-gray-700/80 hover:bg-gray-600"
    aria-label="Previous topics"
  >
    <ArrowLeft size={20} />
  </Button>
 
  {/* Card Container */}
<div className="flex justify-center w-full md:w-auto">
  {visibleTopics.map((topic) => (
    <Card
      key={topic.id}
   
     
      className="w-full md:w-[900px] min-h-[1px] flex flex-col p-5"
    >
      <Typography variant="subheading" className="mb-3">
        {topic.topic}
      </Typography>
      <Typography variant="paragraph" className="mb-4">
        {topic.description}
      </Typography>
      <div>
        <Typography variant="subheading">Why it matters:</Typography>
      </div>
      <Typography variant="paragraph">{topic.whyItMatters}</Typography>
    </Card>
  ))}
</div>
 
 
  {/* Right Arrow OUTSIDE, vertically centered */}
  <Button
    onClick={handleNext}
    variant="primary"
    size="sm"
    className="self-center flex-shrink-0 rounded-full p-3 bg-gray-700/80 hover:bg-gray-600"
    aria-label="Next topics"
  >
    <ArrowRight size={20} />
  </Button>
</div>
 
 
      {/* Dots Navigation (same style as CoachSection) */}
<div className="flex justify-center  space-x-2">
  {Array.from({ length: totalPages }).map((_, index) => (
    <Button
      key={index}
      onClick={() => setStartIndex(index * itemsPerPage)}
      variant={currentPage === index ? "primary" : "secondary"}
      size=""
      className={`w-3 h-3 rounded-full p-0
        ${currentPage === index ? "bg-white scale-110" : "bg-gray-500"}`}
    />
  ))}
</div>
 
    </section>
  );
};
 
export default LiteracySection;