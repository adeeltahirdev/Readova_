import React, { useState } from "react";
import Logo from "../../assets/images/Logo.png";
import { MdPerson2, MdNotifications, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (!isMobileMenuOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
      setIsMobileUserMenuOpen(false); // close user dropdown when menu closes
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileUserMenuOpen(false);
    document.body.classList.remove("nav-open");
  };

  return (
    <>
      <nav className="navbar font-one">
        <div className="navbar-left">
          <img src={Logo} alt="" className="logo" />
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

          {/* Notification Icon + Dropdown */}
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

          {/* Desktop User Dropdown */}
          <div className="user-dropdown-container">
            <div className="user-icon-wrapper">
              <MdPerson2 className="log-icon" />
            </div>
            <div className="user-dropdown">
              <ul>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/library">My Library</Link>
                </li>
                <li>
                  <Link to="/pricing">Subscription</Link>
                </li>
                <li>
                  <Link to="#">Logout</Link>
                </li>
              </ul>
            </div>
          </div>

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
            <li className="mobile-dropdown">
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
              <Link to="/Pricing" onClick={closeMobileMenu}>
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

          {/* Mobile Bottom Section (Notifications + Account) */}
          <div className="mobile-nav-actions">
            <div className="mobile-notification">
              <MdNotifications className="mobile-icon" />
              <span>Notifications</span>
            </div>

            {/* Mobile User Dropdown Inside Panel */}
            <div className="mobile-user-dropdown">
              <div
                className="mobile-account"
                onClick={() => setIsMobileUserMenuOpen((prev) => !prev)}
              >
                <MdPerson2 className="mobile-icon" />
                <span>Account</span>
              </div>

              {isMobileUserMenuOpen && (
                <div className="mobile-user-dropdown-menu">
                  <ul>
                    <li>
                      <Link to="/profile" onClick={closeMobileMenu}>
                        Profile
                      </Link>
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
                      <Link to="/logout" onClick={closeMobileMenu}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
