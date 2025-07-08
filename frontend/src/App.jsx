import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginSignup from './components/LoginSignUp/login_signup';
import Sidebar from './components/Navbar/Sidebar';
import PlayLearnPage from './components/PlayLearn'; 
import TranslationPage from './components/Translating';
import PersonalDashboard from './components/PersonalDashboard';

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />

        {/* Route container needs to grow and fill remaining space */}
        <div style={{ marginLeft: '220px', padding: '24px', width: '100%' }}>
          <Routes>
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/play-learn" element={
              <PrivateRoute>
                <PlayLearnPage />
              </PrivateRoute>
            } />
            <Route path="/translate" element={
              <PrivateRoute>
                <TranslationPage />
              </PrivateRoute>
            } />
            <Route path="/PersonalDashboard" element={
              <PrivateRoute>
                <PersonalDashboard />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
