import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.scss'
import SignUpImage from '/public/Images/SignUpImage.png';
import LendsqrLogo from '/public/Images/LendsqrLogo.png';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Show a success notification
    toast.success('Login Successful!');
    
    // Delay navigation for 1.5 seconds (1500 milliseconds)
    setTimeout(() => {
      console.log('Redirecting to dashboard...');
      navigate('/dashboard');
    }, 1500); 
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src={LendsqrLogo} alt="Lendsqr Logo" className="logo" />
        <img src={SignUpImage} alt="Sign In Illustration" className="illustration" />
      </div>
      <div className="right-section">
        <div className="login-form">
          <div>
            <img src={LendsqrLogo} alt="Lendsqr Logo" className="LoginLogo" />
          </div>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="form-group password-group">
              <input 
                type={isPasswordVisible ? 'text' : 'password'} 
                placeholder="Password" 
                required 
              />
              <span className="show-password" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? 'HIDE' : 'SHOW'}
              </span>
            </div>
            <a href="#" className="forgot-password">FORGOT PASSWORD?</a>
            <button type="submit" className="login-button">LOG IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;