import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/Logo.png";
import { MdPerson2, MdNotifications, MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("userAuth") === "true" ||
    localStorage.getItem("adminAuth") === "true";

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoggedIn) return;

      try {
        const email = localStorage.getItem("userEmail");
        const res = await axios.get("/user", {
          params: { email },
        });

        if (res.data && res.data.name) {
          setUsername(res.data.name);
        }
      } catch (err) {
        console.log("Error fetching user info:", err);
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
      setIsMobileUserMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileUserMenuOpen(false);
    document.body.classList.remove("nav-open");
  };

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    localStorage.removeItem("adminAuth");
    setUsername("");
    navigate("/auth/register");
    closeMobileMenu();
  };

  return (
    <>
      {" "}
      <nav className="navbar font-one">
        {" "}
        <div className="navbar-left">
          {" "}
          <img src={Logo} alt="" className="logo" />{" "}
        </div>
        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <Link className="nav-links" to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="genre-dropdown">
            <Link className="nav-links" to="#">
              Genres
            </Link>
            <ul className="drop-menu">
              <li>
                <Link className="drop-links" to="#">
                  Fiction
                </Link>
              </li>
              <li>
                <Link className="drop-links" to="#">
                  Non-Fiction
                </Link>
              </li>
              <li>
                <Link className="drop-links" to="#">
                  Mystery
                </Link>
              </li>
              <li>
                <Link className="drop-links" to="#">
                  Fantasy
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="nav-links" to="/browse" onClick={closeMobileMenu}>
              Browse
            </Link>
          </li>
        </ul>
        {/* Desktop Right Section */}
        <div className="navbar-right">
          <input type="text" className="search-bar" placeholder="Search..." />

          <div className="notification-container">
            <div className="notification-icon-wrapper">
              <MdNotifications className="log-icon" />
            </div>
            <div className="notification-dropdown">
              <div className="notification-header">
                <span className="notification-title">Notifications</span>
                <span className="mark-read-text">Mark as Read</span>
              </div>
              <p className="notification-text">
                🔔 New book added: <em>The Lost Library</em>
              </p>
            </div>
          </div>

          {/* Only show user dropdown if logged in */}
          {isLoggedIn && (
            <div className="user-dropdown-container">
              <div className="user-icon-wrapper">
                {username || <MdPerson2 className="log-icon" />}
              </div>
              <div className="user-dropdown">
                <ul>
                  <li>
                    <span className="username-display">{username}</span>
                  </li>
                  <li>
                    <Link to="/library">My Library</Link>
                  </li>
                  <li>
                    <Link to="/pricing">Subscription</Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button className="btn-mobile-nav" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <MdClose className="icon-mobile-nav close-icon" />
            ) : (
              <MdMenu className="icon-mobile-nav menu-icon" />
            )}
          </button>
        </div>
      </nav>
      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? "nav-open" : ""}`}>
        <div className="mobile-nav-content">
          <input
            type="text"
            className="mobile-nav-search"
            placeholder="Search books..."
          />
          <ul className="mobile-nav-links">
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/browse" onClick={closeMobileMenu}>
                Browse All
              </Link>
            </li>
            <li>
              <Link to="/library" onClick={closeMobileMenu}>
                My Library
              </Link>
            </li>
            <li>
              <Link to="/pricing" onClick={closeMobileMenu}>
                Pricing
              </Link>
            </li>
            <li className="mobile-genre-section">
              <span className="mobile-genre-title">Genres</span>
              <div className="mobile-genre-links">
                <Link to="/browse?genre=fiction" onClick={closeMobileMenu}>
                  Fiction
                </Link>
                <Link to="/browse?genre=non-fiction" onClick={closeMobileMenu}>
                  Non-Fiction
                </Link>
                <Link to="/browse?genre=mystery" onClick={closeMobileMenu}>
                  Mystery
                </Link>
                <Link to="/browse?genre=fantasy" onClick={closeMobileMenu}>
                  Fantasy
                </Link>
              </div>
            </li>
          </ul>

          {/* Mobile Bottom Section */}
          {isLoggedIn && (
            <div className="mobile-nav-actions">
              <div className="mobile-notification">
                <MdNotifications className="mobile-icon" />
                <span>Notifications</span>
              </div>
              <div className="mobile-user-dropdown">
                <div
                  className="mobile-account"
                  onClick={() => setIsMobileUserMenuOpen((prev) => !prev)}>
                  <MdPerson2 className="mobile-icon" />
                  <span>{username || "Account"}</span>
                </div>
                {isMobileUserMenuOpen && (
                  <div className="mobile-user-dropdown-menu">
                    <ul>
                      <li>
                        <span className="username-display">{username}</span>
                      </li>
                      <li>
                        <Link to="/library" onClick={closeMobileMenu}>
                          My Library
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings" onClick={closeMobileMenu}>
                          Subscription
                        </Link>
                      </li>
                      <li>
                        <button className="logout-btn" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
