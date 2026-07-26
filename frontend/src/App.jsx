import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ThreatDetection from "./pages/ThreatDetection";
import ThreatAnalytics from "./pages/ThreatAnalytics";
import IncidentResponse from "./pages/IncidentResponse";
import ThreatIntelligence from "./pages/ThreatIntelligence";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/threat-detection" element={<ThreatDetection />} />
        <Route path="/threat-analytics" element={<ThreatAnalytics />} />
        <Route path="/incident-response" element={<IncidentResponse />} />
        <Route
          path="/threat-intelligence"
          element={<ThreatIntelligence />}
        />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;