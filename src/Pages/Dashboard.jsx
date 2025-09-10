import React, { useState } from "react";
import CardButton from "../components/CardButton";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { chatbotTemplates,cardRoutes } from "../data";


const Dashboard = () => {

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);


  const domainSuggestions = [
    "Upcoming Events",
    "Gen AI Fest agenda",
    "Workshops in Gen AI Fest",
  ];



  // Map keywords and aliases to routes for flexible matching
  const keywordRouteMap = [
    { keys: ["event", "events", "upcoming events"], route: "/upcoming-events" },
    { keys: ["genai", "gen ai", "genaifest", "genai fest", "fest"], route: "/genai-fest" },
    { keys: ["panel", "panels"], route: "/panel" },
    { keys: ["interview", "interviews"], route: "/interviews" },
    { keys: ["jd", "jds", "job description"], route: "/jds" },
    { keys: ["post", "posts", "stories"], route: "/posts" },
    { keys: ["comingsoon", "coming soon", "comingsoon!", "coming-soon!"], route: "/comingsoon" },
    { keys: ["coming"], route: "/coming" },
    { keys: ["coming soon!", "coming-soon!"], route: "/coming-soon!" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchValue.trim().toLowerCase();
    for (const entry of keywordRouteMap) {
      if (entry.keys.some(key => value.includes(key))) {
        navigate(entry.route);
        setShowSuggestions(false);
        return;
      }
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (s) => {
    setSearchValue(s);
    const val = s.toLowerCase();
    for (const entry of keywordRouteMap) {
      if (entry.keys.some(key => val.includes(key))) {
        navigate(entry.route);
        setShowSuggestions(false);
        return;
      }
    }
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      {/* Greeting */}
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Hello Sreehitha</h1>

        {/* Centered SearchBar for Dashboard */}
        <div className="w-full max-w-2xl">
          <SearchBar
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onSubmit={handleSearch}
            placeholder="Search ..."
            showSuggestions={showSuggestions}
            suggestions={domainSuggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mx-auto"
        style={{ maxWidth: 980 }}
      >
        {chatbotTemplates.map((template, index) => (
          <CardButton
            key={index}
            label={template.title}
            icon={template.icon}
            description={template.description}
            onClick={() => navigate(cardRoutes[index])}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
