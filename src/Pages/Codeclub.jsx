import React, { useState, useCallback } from "react";
import { events, fiscalYears } from "../data.js";
import Dropdown from "../components/Dropdown.jsx";
import { Clock, Users, MapPin, ChevronRight, ChevronLeft , ImageOff } from "lucide-react";
import Button from "../components/Button.jsx";
import Eventcard from "../components/Eventcard.jsx";
import bg from '../../public/bg.png';
 
const getQuarter = (date) => {
  // Accepts a JS Date object
  const month = date.getMonth() + 1;
  if (month >= 1 && month <= 3) return 1; // Jan-Mar: Q1
  if (month >= 4 && month <= 6) return 2; // Apr-Jun: Q2
  if (month >= 7 && month <= 9) return 3; // Jul-Sep: Q3
  return 4; // Oct-Dec: Q4
};
 
const EventCard = ({ event }) => {
  // Use the new Eventcard layout
  return <Eventcard event={event} />;
};
 
const CodeClub = ({ selectedYear, setSelectedYear }) => {
  const [selectedQuarter, setSelectedQuarter] = useState(3);
  const [activeSection, setActiveSection] = useState('codeclub');
  const [page, setPage] = useState(0); // For event pagination
 
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
 
  const getEventFY = (date) => {
    // Fiscal year matches calendar year
    return date.getFullYear();
  };
 
  const currentYear = new Date().getFullYear();
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
 
  // Pagination logic
  const EVENTS_PER_PAGE = 4;
  const totalPages = Math.ceil(sortedEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = sortedEvents.slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE);
 
  // Reset page when quarter/year/section changes
  React.useEffect(() => {
    setPage(0);
  }, [selectedQuarter, selectedYear, activeSection]);
 
  return (
    <div className="min-h-screen w-full relative" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    {/* <div className="min-h-screen bg-black relative overflow-visible"> */}
      <div className="max-w-4xl mx-auto px-5 py-8 overflow-visible">
        {/* Top Navigation Bar - Single Line Layout */}                
        <div className="w-full flex flex-row justify-between items-center gap-4 mb-3">
          {/* Title - Left */}
          <div className="flex-shrink-0 text-left">
            <h1 className="text-2xl sm:text-2xl font-bold text-white">
              Events
            </h1>
          </div>
 
          {/* Controls - Right: Quarter Buttons and Dropdowns */}
          <div className="flex items-center gap-10">
            {activeSection === 'codeclub' && currentYearHasEvents && (
              <div className="flex gap-2">
                {availableQuarters.map((q) => (
                  <Button
                    key={q}
                    label={`Q${q}`}
                    onClick={() => setSelectedQuarter(q)}
                    className={`px-4 py-2 text-sm font-bold rounded-xl text-white ${selectedQuarter === q ? 'bg-cyan-500 border-2 border-none' : 'bg-black-700 border-1 border-cyan-300'}`}
                    variant="custom"
                    aria-pressed={selectedQuarter === q}
                  />
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Dropdown
                options={sectionOptions}
                value={activeSection}
                onChange={setActiveSection}
                isSection={true}
                className="bg-[#00CFFF] text-black font-bold px-8 py-4 rounded-xl border-none shadow-none min-w-[140px] min-h-[48px] text-lg"
              />
              {activeSection === 'codeclub' && (
                <Dropdown
                  options={years}
                  value={selectedYear}
                  onChange={setSelectedYear}
                  highlightYear={new Date().getFullYear()}
                  className="bg-[#00CFFF] text-black font-bold px-8 py-4 rounded-xl border-none shadow-none min-w-[140px] min-h-[48px] text-lg"
                />
              )}
            </div>
          </div>
        </div>
        {/* Divider line below controls, full width */}
        <div className="w-full border-b border-gray-800 dark:border-gray-600 " style={{marginTop: '8px', marginBottom: '18px'}} />
        {/* Section Buttons and Content Container */}
        <div className="w-full flex flex-col gap-4 overflow-visible">
          {/* Content Area */}
          <div className="w-full relative overflow-visible">
            {activeSection === 'learnix' ? (
              <div className="w-full flex items-center justify-center min-h-[300px]">
                <span className="text-2xl sm:text-3xl font-bold text-white">Welcome Learnix</span>
              </div>
            ) : (
              <>
                {/* CodeClub Content - Show cards for current page only */}
                {currentYearHasEvents ? (
                  <div className="overflow-visible">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 justify-items-center overflow-visible w-full">
                      {paginatedEvents.length === 0 ? (
                        <div className="text-center text-white text-xl my-16">
                          No events available for Q{selectedQuarter} FY-{selectedYear}.
                        </div>
                      ) : (
                        paginatedEvents.map((event, index) => (
                          <div key={index} className="w-full">
                            <EventCard event={event} />
                          </div>
                        ))
                      )}
                    </div>
                    {/* Pagination Arrows just below the event cards, right side bottom corner, aligned with grid */}
                    {totalPages > 1 && (
                      <div className="flex justify-end items-center mt-6 w-full">
                        <Button
                          circle={true}
                          onClick={() => setPage((p) => Math.max(0, p - 1))}
                          disabled={page === 0}
                          className={`w-8 h-8 flex items-center justify-center rounded-md bg-[#181C20] shadow-lg transition-all duration-200 ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#23272b]'} text-gray-300`}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          circle={true}
                          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                          disabled={page === totalPages - 1}
                          className={`w-8 h-8 flex items-center justify-center rounded-md bg-[#181C20] shadow-lg transition-all duration-200 ml-3 ${page === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#23272b]'} text-gray-300`}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
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