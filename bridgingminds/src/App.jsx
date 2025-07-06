import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginSignup from './components/LoginSignUp/login_signup';
import Sidebar from './components/Navbar/Sidebar';
import PlayLearnPage from './components/PlayLearn'; 
import TranslationPage from './components/Translating';
import PersonalDashboard from './components/PersonalDashboard';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />

        {/* Route container needs to grow and fill remaining space */}
      <div style={{ marginLeft: '220px', padding: '24px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play-learn" element={<PlayLearnPage />} /> 
            <Route path="/translate" element={<TranslationPage />} />
            <Route path="/PersonalDashboard" element={<PersonalDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
