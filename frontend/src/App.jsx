import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Home from './components/Home';
import LoginSignup from './components/LoginSignUp/login_signup';
import Sidebar from './components/Navbar/Sidebar';
import PlayLearnPage from './components/PlayLearn'; 
import TranslationPage from './components/Translating';
import PersonalDashboard from './components/PersonalDashboard';

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
      {user && <Sidebar />}

      {/* Route container needs to grow and fill remaining space */}
      <div style={{ marginLeft: user ? '220px' : '0', padding: '24px', width: '100%' }}>
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
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
