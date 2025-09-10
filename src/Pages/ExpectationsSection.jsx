import React from "react";
import { expectations } from "../data";
import { Target, BookOpen, Award, CheckCircle, Star } from "lucide-react";
import Card from "../components/Card";
import Typography from "../components/Typography";
 
const ExpectationsSection = () => {
  const icons = [Target, BookOpen, Award, CheckCircle, Star]; // 5 icons
 
  return (
    <section className="mt-10 px-4 sm:px-6 lg:px-20">
      {/* Heading */}
      <div className="text-center">
        <Typography variant="heading">What to Expect</Typography>
      </div>
 
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {expectations.map((expectation, index) => {
          const Icon = icons[index % icons.length]; // safe access
          return (
            <Card
              key={index}
              hover
              gradient
              className="text-center p-6 sm:p-8 flex flex-col items-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-500 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
 
              {/* Title */}
              <Typography variant="subheading" className="mb-3">
                {expectation.title}
              </Typography>
 
              {/* Description */}
              <Typography variant="body" className="leading-relaxed">
                {expectation.description}
              </Typography>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
 
export default ExpectationsSection;