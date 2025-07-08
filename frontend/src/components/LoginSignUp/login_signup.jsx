import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // example icons for user, email, password

const LoginSignup = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <FaUser className="icon" />
          <input type="text" placeholder="Username" />
        </div>
        <div className="input">
          <FaEnvelope className="icon" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <FaLock className="icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
