import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import VoterDashboard from './pages/VoterDashboard';
import OfficerDashboard from './pages/OfficerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/voter" element={<VoterDashboard />} />
        <Route path="/officer" element={<OfficerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
