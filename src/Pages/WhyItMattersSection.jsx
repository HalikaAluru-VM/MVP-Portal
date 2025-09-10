import React from "react";
import { whyItMattersSection } from "../data";
import Typography from "../components/Typography";
 
 
 
const WhyItMattersSection = () => {
  return (
    <section className="mt-5">
      <div className="text-center">
        <div>
        <Typography variant="heading" className="mb-6">
          {whyItMattersSection.title}
        </Typography>
        </div>
        <div className="mt-5 px-20">
        <Typography variant="body" >
          {whyItMattersSection.description}
        </Typography>
        </div>
      </div>
 
 
    </section>
  );
};
 
export default WhyItMattersSection;
 
 