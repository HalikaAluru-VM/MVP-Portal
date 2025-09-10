import React, { useState, useCallback } from "react";
// import { useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { events, fiscalYears } from "../data.js";
import Dropdown from "../components/Dropdown.jsx";
import { Clock, Users, MapPin, ChevronRight, ChevronLeft , ImageOff } from "lucide-react";
import Button from "../components/Button.jsx";
 
const getQuarter = (date) => {
  // Accepts a JS Date object
  const month = date.getMonth() + 1;
  if (month >= 1 && month <= 3) return 1; // Jan-Mar: Q1
  if (month >= 4 && month <= 6) return 2; // Apr-Jun: Q2
  if (month >= 7 && month <= 9) return 3; // Jul-Sep: Q3
  return 4; // Oct-Dec: Q4
};
 
const EventCard = ({ event }) => {
 
  return (
    <div className="bg-gray-700 border border-gray-700 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-55 flex flex-col relative">
      <div className="flex justify-between items-start gap-3 flex-1">
        {/* Left Content */}
        <div className="flex-1 min-w-0 flex flex-col h-full">
          {/* Header with date badge */}
          <div className="mb-3">
            <div className="bg-gray-700 text-white px-1 py-1 rounded-full text-xs font-bold inline-block">
              {event.date} {event.month}
            </div>
          </div>
         
          {/* Title and Subtitle */}
          <h3 className="text-lg font-bold text-white mb-2 leading-tight line-clamp-2">
            {event.title}
          </h3>
          <p className="text-white mb-3 text-xs line-clamp-2 flex-shrink-0">
            {event.subtitle}
          </p>
         
          {/* Event Details - Compact */}
          <div className="space-y-1 mb-3 flex-1">
            <div className="flex items-center text-gray-300 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              <span className="truncate">{event.time} • {event.duration}</span>
            </div>
            <div className="flex items-center text-gray-300 text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate">{event.location}</span>
            </div>
            {event.instructor && (
              <div className="flex items-center text-gray-300 text-xs">
                <Users className="h-3 w-3 mr-1" />
                <span className="truncate">Instructor: {event.instructor}</span>
              </div>
            )}
          </div>
         
          {/* Tags - Compact */}
          {event.tags && (
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}{" "}
              {event.tags.length > 3 && (
                <span className="text-white text-xs">+{event.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
       


{event.images && event.images.length > 0 ? (
  <div className="flex flex-col gap-2">
    {event.images.map((img, index) => (
      <div key={index} className="w-20 h-20 flex-shrink-0">
        <img
          src={img}
          alt={`${event.title} - ${index + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    ))}
  </div>
) : (
  <div className="w-20 h-20 flex items-center justify-center bg-gray-700 rounded-lg">
    <img src="src/assets/image.png" alt="" srcset="" />
  </div>
)}

 
      </div>
    </div>
  );
};
 
const CodeClub = ({ selectedYear, setSelectedYear }) => {
  // const navigate = useNavigate();
  const [selectedQuarter, setSelectedQuarter] = useState(3);
  const [activeSection, setActiveSection] = useState('codeclub');
 
  const getEventDate = useCallback((event) => {
    if (event.fullDate) return new Date(event.fullDate);
    if (event.year && event.month && event.date) {
      const monthMap = {
        JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
      };
      const monthNum = monthMap[event.month.toUpperCase()] !== undefined ? monthMap[event.month.toUpperCase()] : 0;
      return new Date(event.year, monthNum, event.date);
    }
    return new Date(`${event.month} 1, ${event.year || 2025}`);
  }, []);
 
 
  // Only include years with events, starting from FY-2024
  const years = fiscalYears;
 
  // Section options for the new dropdown
  const sectionOptions = ['codeclub', 'learnix'];
 
  // For quarter buttons, only show quarters with data for selected year
  const availableQuarters = Array.from(new Set(
    events.filter(e => Number(e.year) === Number(selectedYear)).map(e => getQuarter(getEventDate(e)))
  )).sort((a, b) => a - b);
 
  // Auto-select appropriate quarter when year changes
  React.useEffect(() => {
    if (availableQuarters.length > 0 && !availableQuarters.includes(selectedQuarter)) {
      // If current quarter is not available, select the first available quarter
      setSelectedQuarter(availableQuarters[0]);
    }
  }, [selectedYear, availableQuarters, selectedQuarter]);
 
  // Check if a year has any events
  const hasEventsForYear = (year) => {
    return events.some(event => Number(event.year) === Number(year));
  };
 
  // Check if current selected year has any events
  const currentYearHasEvents = hasEventsForYear(selectedYear);
 
  // Navigation functions
  const goToPreviousQuarter = () => {
    if (selectedQuarter > 1) {
      setSelectedQuarter(selectedQuarter - 1);
    } else {
      // Go to previous year that has events
      for (let y = selectedYear - 1; y >= years[0]; y--) {
        if (hasEventsForYear(y)) {
          setSelectedYear(y);
          setSelectedQuarter(4);
          break;
        }
      }
    }
  };
 
  const goToNextQuarter = () => {
    if (selectedQuarter < 4) {
      setSelectedQuarter(selectedQuarter + 1);
    } else {
      // Go to next year that has events
      for (let y = selectedYear + 1; y <= years[years.length - 1]; y++) {
        if (hasEventsForYear(y)) {
          setSelectedYear(y);
          setSelectedQuarter(1);
          break;
        }
      }
    }
  };
 
  // Updated navigation logic based on available data
  const canGoBack = () => {
    // Can go back if not at first quarter of current year
    if (selectedQuarter > 1) return true;
   
    // Or if there are previous years with events
    for (let y = selectedYear - 1; y >= years[0]; y--) {
      if (hasEventsForYear(y)) return true;
    }
    return false;
  };
 
  const canGoForward = () => {
    // Can go forward if not at last quarter of current year
    if (selectedQuarter < 4) return true;
   
    // Or if there are future years with events
    for (let y = selectedYear + 1; y <= years[years.length - 1]; y++) {
      if (hasEventsForYear(y)) return true;
    }
    return false;
  };
 
  // Fixed filtering logic
  const filteredEvents = events.filter((event) => {
    // Ensure both values are numbers for proper comparison
    const eventYear = Number(event.year);
    const selectedYearNum = Number(selectedYear);
    const eventDate = getEventDate(event);
    const eventQuarter = getQuarter(eventDate);
   
    return eventYear === selectedYearNum && eventQuarter === selectedQuarter;
  });
 
  // Sort events: upcoming (future) events ascending, past events descending
  const sortedEvents = React.useMemo(() => {
    const now = new Date();
    const upcoming = filteredEvents.filter(event => getEventDate(event) >= now).sort((a, b) => getEventDate(a) - getEventDate(b));
    const past = filteredEvents.filter(event => getEventDate(event) < now).sort((a, b) => getEventDate(b) - getEventDate(a));
    return [...upcoming, ...past];
  }, [filteredEvents, getEventDate]);
 
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Top Navigation Bar - Single Line Layout */}
        <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          {/* Title - Left */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Events
            </h1>
          </div>
 
          {/* Quarter Buttons - Absolutely Centered (only show for CodeClub with events) */}
          {activeSection === 'codeclub' && currentYearHasEvents && (
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex gap-2">
              {availableQuarters.map((q) => (
                <Button
                  key={q}
                  label={`Q${q}`}
                  onClick={() => setSelectedQuarter(q)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg text-white ${selectedQuarter === q ? 'bg-gray-700 border-2 border-white' : 'bg-gray-700'}`}
                  variant="custom"
                  aria-pressed={selectedQuarter === q}
                />
              ))}
            </div>
          )}
 
          {/* Quarter Buttons - Mobile Layout */}
          {activeSection === 'codeclub' && currentYearHasEvents && (
            <div className="flex justify-center w-full lg:hidden order-3">
              <div className="flex gap-2">
                {availableQuarters.map((q) => (
                  <Button
                    key={q}
                    label={`Q${q}`}
                    onClick={() => setSelectedQuarter(q)}
                    className={`px-4 py-2 text-sm font-bold rounded-lg text-white ${selectedQuarter === q ? 'bg-gray-700 border-2 border-white' : 'bg-gray-700'}`}
                    variant="custom"
                    aria-pressed={selectedQuarter === q}
                  />
                ))}
              </div>
            </div>
          )}
           
          {/* Dropdowns - Right */}
          <div className="flex gap-3 flex-shrink-0 order-2 lg:order-3">
            {/* Section Dropdown */}
            <div className="border-2 border-white rounded-lg">
              <Dropdown
                options={sectionOptions}
                value={activeSection}
                onChange={setActiveSection}
                isSection={true}
              />
            </div>
           
            {/* Year Dropdown - Only show for codeclub section */}
            {activeSection === 'codeclub' && (
              <div className="border-2 border-white rounded-lg">
                <Dropdown
                  options={years}
                  value={selectedYear}
                  onChange={setSelectedYear}
                  highlightYear={new Date().getFullYear()}
                />
              </div>
            )}
          </div>
        </div>
 
        {/* Section Buttons and Content Container */}
        <div className="flex flex-col lg:flex-row gap-6">
 
          {/* Content Area with Navigation Arrows */}
          <div className="flex-1 relative">
            {activeSection === 'learnix' ? (
              <div className="w-full flex items-center justify-center min-h-[300px]">
                <span className="text-2xl sm:text-3xl font-bold text-white">Welcome Learnix</span>
              </div>
            ) : (
              <>
                {/* CodeClub Content - Show navigation only if there are events */}
                {currentYearHasEvents ? (
                  <div className="relative flex items-center">
                    {/* Left Arrow - always show, but disable if can't go back or only one quarter button */}
                    <div className="flex-shrink-0 mr-2">
                      <Button
                        circle={true}
                        onClick={goToPreviousQuarter}
                        disabled={!canGoBack() || availableQuarters.length === 1}
                        className={`p-1.5 transition-all duration-200 ${(!canGoBack() || availableQuarters.length === 1) ? 'bg-gray-700 text-white opacity-50' : 'bg-gray-700 text-white hover:scale-110 shadow-lg'}`}
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </Button>
                    </div>
 
                    {/* Cards Content */}
                    <div className="flex-1">
                      {filteredEvents.length === 0 ? (
                        <div className="text-center text-white text-xl my-16">
                          No events available for Q{selectedQuarter} FY-{selectedYear}.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Cards Grid - 3 per row on large screens, 2 per row on medium, 1 per row on small, centered last row */}
                          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4 justify-items-center">
                            {sortedEvents.map((event, index) => (
                              <div key={index} className="w-full">
                                <EventCard event={event} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
 
                    {/* Right Arrow - always show, but disable if can't go forward */}
                    <div className="flex-shrink-0 ml-2">
                      <Button
                        circle={true}
                        onClick={goToNextQuarter}
                        disabled={!canGoForward()}
                        className={`p-1.5 transition-all duration-200 ${canGoForward() ? 'bg-gray-700 text-white hover:scale-110 shadow-lg' : 'bg-gray-700 text-white opacity-50'}`}
                      >
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Show message when no events for selected year */
                  <div className="text-center text-white text-xl my-16">
                    No events available for FY-{selectedYear}.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default CodeClub;