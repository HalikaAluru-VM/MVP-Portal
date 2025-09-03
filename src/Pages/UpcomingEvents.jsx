import React, { useState } from "react";
import CodeClub from "./Codeclub";

 
const UpcomingEvents = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
 
  return (

    <div className="min-h-screen bg-gray-800">
      <CodeClub selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
    </div>
  );
};
 
export default UpcomingEvents;