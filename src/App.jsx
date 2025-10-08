import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import GenAiFest from "./Pages/GenAiFest";
import UpcomingEvents from "./Pages/UpcomingEvents";
import Panel from "./Pages/Panel";
import Interviews from "./Pages/Interviews";
import JDs from "./Pages/JDs";
import Posts from "./Pages/Posts";
import MainLayout from "./Pages/MainLayout";
import { Sidebar } from "lucide-react";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/genai-fest" element={<GenAiFest />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/jds" element={<JDs />} />
          <Route path="/posts" element={<Posts />} />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
