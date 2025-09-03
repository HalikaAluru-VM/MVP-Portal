import React from "react";
import { expectations } from "../data";
import { Target, BookOpen, Award, CheckCircle, Star } from "lucide-react";
import Card from "../components/Card";
import Typography from "../components/Typography";

const ExpectationsSection = () => {
  const icons = [Target, BookOpen, Award, CheckCircle, Star]; // 5 icons

  return (
    <section className="mt-5">
      <div className="text-center">
      <Typography variant="heading" >
        What to Expect
      </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-8 mt-8">
        {expectations.map((expectation, index) => {
          const Icon = icons[index % icons.length]; // safe access
          return (
            <Card key={index} hover gradient className="text-center p-8 ">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <div>
              <Typography variant="subheading" className="mb-4 ">
                {expectation.title}
              </Typography>
              </div>
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
