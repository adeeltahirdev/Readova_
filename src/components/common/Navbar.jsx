import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/images/Logo.png";
import { MdPerson2, MdNotifications, MdMenu, MdClose } from "react-icons/md";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const notifRef = useRef(null);
  const isLoggedIn =
    localStorage.getItem("userAuth") === "true" ||
    localStorage.getItem("adminAuth") === "true";
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) return;
      try {
        const email = localStorage.getItem("userEmail");
        const userRes = await axios.get("/user", { params: { email } });
        if (userRes.data && userRes.data.name) {
          setUsername(userRes.data.name);
        }
        const notifRes = await axios.get("/notifications");
        if (notifRes.data && notifRes.data.notifications) {
          setNotifications(notifRes.data.notifications);
          setUnreadCount(notifRes.data.count);
        }

      } catch (err) {
        console.log("Error fetching navbar data:", err);
      }
    };

    fetchData();
  }, [isLoggedIn]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
        if(searchQuery.trim()) {
            setIsMobileMenuOpen(false);
            navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
        }
    }
  };
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
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setUsername("");
    navigate("/auth/register");
    closeMobileMenu();
  };
  const toggleNotifications = () => {
      setShowNotifications(!showNotifications);
      if (!showNotifications) {
          setUnreadCount(0);
      }
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
              <li><Link className="drop-links" to="/browse?q=Fiction">Fiction</Link></li>
              <li><Link className="drop-links" to="/browse?q=Non-Fiction">Non-Fiction</Link></li>
              <li><Link className="drop-links" to="/browse?q=Mystery">Mystery</Link></li>
              <li><Link className="drop-links" to="/browse?q=Fantasy">Fantasy</Link></li>
            </ul>
          </li>
          <li>
            <Link className="nav-links" to="/browse" onClick={closeMobileMenu}>
              Browse
            </Link>
          </li>
        </ul>
        <div className="navbar-right">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search books..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className="notification-container" ref={notifRef}>
            <div 
                className="notification-icon-wrapper" 
                onClick={toggleNotifications} 
                style={{cursor: 'pointer', position: 'relative'}}
            >
              <MdNotifications className="log-icon" />
              {unreadCount > 0 && (
                  <span style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                  }}>
                      {unreadCount}
                  </span>
              )}
            </div>
            {showNotifications && (
                <div className="notification-dropdown" style={{display: 'block'}}>
                <div className="notification-header">
                    <span className="notification-title">Notifications</span>
                    <span className="mark-read-text" onClick={() => setUnreadCount(0)}>Mark as Read</span>
                </div>
                
                <div className="notification-list" style={{maxHeight: '300px', overflowY: 'auto'}}>
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <div key={notif.id} className="notification-item" style={{padding: '10px', borderBottom: '1px solid #eee', fontSize: '0.9rem'}}>
                                <p className="notification-text" style={{margin: 0}}>
                                    🔔 {notif.message}
                                </p>
                                <span style={{fontSize: '0.7rem', color: '#888'}}>{notif.time}</span>
                            </div>
                        ))
                    ) : (
                        <p className="notification-text" style={{padding: '10px'}}>No new notifications.</p>
                    )}
                </div>
                </div>
            )}
          </div>
          {isLoggedIn ? (
            <div className="user-dropdown-container">
              <div className="user-icon-wrapper">
                {username ? (
                    <div style={{fontWeight: 'bold', color: '#555'}}>{username.charAt(0).toUpperCase()}</div>
                ) : (
                    <UserIcon className="log-icon" />
                )}
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
                      to="/auth/register"
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
          ) : (
             <Link to="/auth/login" className="btn-login" style={{textDecoration:'none', color: '#333', fontWeight: 'bold', marginLeft: '10px'}}>
                Login
             </Link>
          )}
          <button className="btn-mobile-nav" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <MdClose className="icon-mobile-nav close-icon" />
            ) : (
              <MdMenu className="icon-mobile-nav menu-icon" />
            )}
          </button>
        </div>
      </nav>
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? "nav-open" : ""}`}>
        <div className="mobile-nav-content">
          <input
            type="text"
            className="mobile-nav-search"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
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
                <Link to="/browse?q=fiction" onClick={closeMobileMenu}>
                  Fiction
                </Link>
                <Link to="/browse?q=non-fiction" onClick={closeMobileMenu}>
                  Non-Fiction
                </Link>
                <Link to="/browse?q=mystery" onClick={closeMobileMenu}>
                  Mystery
                </Link>
                <Link to="/browse?q=fantasy" onClick={closeMobileMenu}>
                  Fantasy
                </Link>
              </div>
            </li>
          </ul>
          {isLoggedIn && (
            <div className="mobile-nav-actions">
              <div className="mobile-notification" onClick={() => alert("Please check desktop view for notifications")}>
                <MdNotifications className="mobile-icon" />
                <span>Notifications ({notifications.length})</span>
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
                        <Link to="/pricing" onClick={closeMobileMenu}>
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