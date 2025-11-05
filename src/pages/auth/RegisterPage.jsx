import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import { Link } from "react-router-dom";
import { MdEmail, MdLock, MdPerson2 } from "react-icons/md";
import "../../assets/css/login.css";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [login, setLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (res.data.is_admin) {
        localStorage.setItem("userEmail", loginEmail);
        localStorage.setItem("adminAuth", "true");
        toast.success("Admin logged in successfully!", {
          style: { background: "#1a356a", color: "white" },
        });
        setTimeout(() => {
          navigate("/admin");
        }, 500);
      } else {
        localStorage.setItem("userEmail", loginEmail);
        localStorage.setItem("userAuth", "true");
        toast.success("Login successful!", {
          style: { background: "#1a356a", color: "white" },
        });
        setTimeout(() => {
          navigate("/library");
        }, 500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        style: { background: "#b00020", color: "white" },
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/register", {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      toast.success("Signup successful! You can now log in.", {
        style: { background: "#1a356a", color: "white" },
      });
      setLogin(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed", {
        style: { background: "#b00020", color: "white" },
      });
    }
  };

  return (
    <AuthLayout>
      {" "}
      <div className="wrap">
        <div className={`auth-container ${login ? "" : "active"}`}>
          {/* Login Form */}{" "}
          <div className="form-box login">
            {" "}
            <form onSubmit={handleLogin}>
              {" "}
              <h1>Login</h1>{" "}
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />{" "}
                <MdPerson2 className="icon" />{" "}
              </div>{" "}
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />{" "}
                <MdLock className="icon" />{" "}
              </div>{" "}
              <div className="forgot-link">
                {" "}
                <Link to="#">Forgot password?</Link>{" "}
              </div>{" "}
              <button type="submit" className="auth-btn">
                Login
              </button>{" "}
            </form>{" "}
          </div>
          {/* Signup Form */}
          <div className="form-box signup">
            <form onSubmit={handleSignup}>
              <h1>Sign Up</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
                <MdPerson2 className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <MdEmail className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <MdLock className="icon" />
              </div>
              <button type="submit" className="auth-btn">
                Sign up
              </button>
            </form>
          </div>
          {/* Toggle Panels */}
          <div className="toggle-box">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Welcome!</h1>
              <p>Don't have an account?</p>
              <button
                className="auth-btn signup-btn"
                onClick={() => setLogin(false)}>
                Sign Up
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button
                className="auth-btn login-btn"
                onClick={() => setLogin(true)}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
