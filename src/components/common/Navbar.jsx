import React, { useState } from "react";
import Logo from "../../assets/images/Logo.png";
import { MdPerson2, MdNotifications, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Add/remove class from body for CSS targeting
    if (!isMobileMenuOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('nav-open');
  };

  return (
    <>
      <nav className="navbar font-one">
        <div className="navbar-left">
          <img src={Logo} alt="" className="logo" />
        </div>
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
          <li>
            <Link className="nav-links" to="/library" onClick={closeMobileMenu}>
              Library
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/Pricing" onClick={closeMobileMenu}>
              Pricing
            </Link>
          </li>
        </ul>
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

          <Link className="acc" to="/auth/register">
            <MdPerson2 className="log-icon" />
          </Link>

          {/* Mobile Menu Button */}
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
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'nav-open' : ''}`}>
        <div className="mobile-nav-content">
          <input 
            type="text" 
            className="mobile-nav-search" 
            placeholder="Search books..." 
          />
          
          <ul className="mobile-nav-links">
            <li>
              <Link to="/" onClick={closeMobileMenu}>Home</Link>
            </li>
            <li className="mobile-dropdown">
              <Link to="/browse" onClick={closeMobileMenu}>Browse All</Link>
            </li>
            <li>
              <Link to="/library" onClick={closeMobileMenu}>My Library</Link>
            </li>
            <li>
              <Link to="/Pricing" onClick={closeMobileMenu}>Pricing</Link>
            </li>
            <li className="mobile-genre-section">
              <span className="mobile-genre-title">Genres</span>
              <div className="mobile-genre-links">
                <Link to="/browse?genre=fiction" onClick={closeMobileMenu}>Fiction</Link>
                <Link to="/browse?genre=non-fiction" onClick={closeMobileMenu}>Non-Fiction</Link>
                <Link to="/browse?genre=mystery" onClick={closeMobileMenu}>Mystery</Link>
                <Link to="/browse?genre=fantasy" onClick={closeMobileMenu}>Fantasy</Link>
              </div>
            </li>
          </ul>
          
          <div className="mobile-nav-actions">
            <div className="mobile-notification">
              <MdNotifications className="mobile-icon" />
              <span>Notifications</span>
            </div>
            <Link to="/auth/register" className="mobile-account" onClick={closeMobileMenu}>
              <MdPerson2 className="mobile-icon" />
              <span>Account</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;