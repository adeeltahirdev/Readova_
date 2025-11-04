import React, { useState } from 'react';
import AuthLayout from "../../layouts/AuthLayout.jsx";
import { Link } from "react-router-dom";
import { MdEmail, MdLock, MdPerson2 } from "react-icons/md";
import '../../assets/css/login.css';
import axios from "../../../api/axios";

const RegisterPage = () => {
  const [login, setLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoginError('');

  
  if (loginEmail === 'admin@gmail.com' && loginPassword === 'admin123') {
    localStorage.setItem('adminAuth', 'true');
    window.location.href = '/admin';
    return;
  }

  try {
    const res = await axios.post('/login', {
      email: loginEmail,
      password: loginPassword,
    });

    localStorage.setItem('userAuth', 'true');
    window.location.href = '/library';
  } catch (err) {
    setLoginError(err.response?.data?.message || 'Login failed');
  }
};


  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');
    try {
      await axios.post('/register', {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      setSignupSuccess('Signup successful! You can now log in.');
      setLogin(true);
    } catch (err) {
      setSignupError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <AuthLayout>
      <div className="wrap">
        <div className={`auth-container ${login ? '' : 'active'}`}>
          <div className="form-box login">
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                />
                <MdPerson2 className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                />
                <MdLock className="icon" />
              </div>
              <div className="forgot-link">
                <Link to="#">Forgot password?</Link>
              </div>
             <button type="submit" className="auth-btn">Login</button>
              {loginError && <div className="auth-message error">{loginError}</div>}

            </form>
          </div>

          <div className="form-box signup">
            <form onSubmit={handleSignup}>
              <h1>Sign Up</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  required
                />
                <MdPerson2 className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  required
                />
                <MdEmail className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  required
                />
                <MdLock className="icon" />
              </div>
              <button type="submit" className="auth-btn">Sign up</button>
{signupError && <div className="auth-message error">{signupError}</div>}
{signupSuccess && <div className="auth-message success">{signupSuccess}</div>}

            </form>
          </div>
          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button className="auth-btn signup-btn" onClick={() => setLogin(false)}>Sign Up</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button className="auth-btn login-btn" onClick={() => setLogin(true)}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;