import React, { useState } from "react";
import CodeClub from "./Codeclub";
import Sidebar from "../components/Sidebar";

const UpcomingEvents = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  return (
    <div className="min-h-screen bg-gray-900 flex flex-row">
      <div className="flex-1 flex flex-col items-center">
        <CodeClub selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      </div>
    </div>
  );
};

export default UpcomingEvents;