import React from 'react';
import '../../styles/Sidebar.css';
import {
  FaHome,
  FaUserCircle,
  FaMicrophone,
  FaPuzzlePiece,
  FaChartBar,
  FaLanguage,
  FaEnvelope,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      {/* Logo and App Name */}
      <div className="logo">
        <img src={logo} alt="Bridging Minds Logo" className="logo-image" />
      </div>

      {/* User Info */}
      {user && (
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span className="user-name">{user.name || user.email}</span>
        </div>
      )}

      {/* Menu */}
      <ul className="sidebar-menu">
        <li title="Home" aria-label="Home">
          <Link to="/"><FaHome /> Home</Link>
        </li>

        <li title="Learning Space" aria-label="Learning Space">
          <Link to="/play-learn"><FaLanguage /> Play and Learn</Link>
        </li>
        {/* <li title="Daily Challenge" aria-label="Daily Challenge">
          <Link to="/daily"><FaPuzzlePiece /> Daily Challenge</Link>
        </li> */}
        <li title="Translating" aria-label="Translating">
          <Link to="/translate"><FaMicrophone /> Translating</Link>
        </li>
        <li title="Activity" aria-label="Activity">
          <Link to="/PersonalDashboard"><FaChartBar /> Personal Dashboard</Link>
        </li>
        {/* <li title="Settings" aria-label="Settings">
          <Link to="/settings"><FaCog /> Settings</Link>
        </li> */}
      </ul>

      {/* Language Switcher */}
      <div className="language-switcher">
        <button>Deutsch</button>
        <button>French</button>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
