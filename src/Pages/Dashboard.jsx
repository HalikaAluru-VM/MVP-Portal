import React, { useState } from "react";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import CardButton from "../components/CardButton";
import { User, RefreshCcw } from "lucide-react";
import { userInfo, cardsData } from "../data";
import GenAiFest from "./GenAiFest";
import UpcomingEvents from "./UpcomingEvents";

// import Event from "./Event";
// import Panel from "./Panel";

const Dashboard = () => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const resetDashboard = () => {
    setSelected(null);
    setSearch("");
  };

  const renderContent = () => {
    switch (selected) {
      case "GenAI Fest":
        return <GenAiFest />;
      case "Events":
        return <UpcomingEvents />;
      // case "Panel":
      //   return <Panel />;
      default:
        return (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold mb-4">{selected} Page</h2>
            <p className="text-gray-400">
              This is where {selected} related content will appear.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-0 relative  flex flex-col">
      <div className="absolute top-6 right-8 z-10 flex items-center">
        <div className="group relative">
          <Button
            onClick={resetDashboard}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCcw size={15} />
          </Button>
          <span className="mr-2 px-2 py-1 text-xs  text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-1/2 -translate-y-1/2 right-full whitespace-nowrap">
            Reset
          </span>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-center py-4 mt-15">
        <div className="text-center">
          <h1 className="text-lg font-bold">Hello, {userInfo.name}!</h1>
          <p className="text-xs text-gray-400">{userInfo.greeting}</p>
        </div>
      </div>

      {/* Content */}
      {!selected ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {cardsData
              .filter((c) =>
                c.label.toLowerCase().includes(search.toLowerCase())
              )
              .map((card) => (
                <CardButton
                  key={card.label}
                  label={card.label}
                  icon={card.icon}
                  color={card.color}
                  onClick={() => setSelected(card.label)}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="px-40">{renderContent()}</div>
      )}
      {/* SearchBar at the bottom */}
      {/* SearchBar at the bottom (only for landing page) */}
      {!selected && (
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for content types..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
