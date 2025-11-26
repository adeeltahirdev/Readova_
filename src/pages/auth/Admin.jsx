import React, { useState, useEffect } from "react";
import axios from "../../../api/axios.js";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import { MdDashboard, MdLibraryBooks, MdPerson, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../assets/css/Admin.css";
import "../../assets/css/login.css";
import Logo from "../../assets/images/Logo.png";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [activeSubs, setActiveSubs] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  const adminCredentials = {
    username: "admin@gmail.com",
    password: "admin123",
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchStats = async () => {
    try {
      const usersRes = await axios.get("/allusers");
      setTotalUsers(usersRes.data.users?.length || 0);
      const booksRes = await axios.get("/showbooks");
      setTotalBooks(booksRes.data.total || 0);
      const adminRes = await axios.get("/admin/stats");
      setActiveSubs(adminRes.data.active_subscriptions || 0);
      setMonthlyRevenue(adminRes.data.monthly_revenue || 0);

    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    window.location.href = "/";
  };
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      window.location.href = "/";
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchStats().finally(() => setLoadingStats(false));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn || loadingStats) return null;

  return (
    <AdminLayout>
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2 className="admin-logo">Readova Admin</h2>
          </div>
          <nav className="sidebar-nav">
            <ul className="nav-menu">
              <li className="nav-item active">
                <Link to="/admin" className="nav-link">
                  <MdDashboard className="nav-icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/books" className="nav-link">
                  <MdLibraryBooks className="nav-icon" />
                  <span>Books Management</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/users" className="nav-link">
                  <MdPerson className="nav-icon" />
                  <span>Users Management</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <Link to="/" className="back-to-site">
              <i className="fas fa-arrow-left"></i>
              <span>Back to Site</span>
            </Link>
          </div>
        </aside>
        <main className="admin-main">
          <header className="admin-header">
            <div className="header-left">
              <h1 className="page-title">Admin Dashboard</h1>
            </div>
            <div className="header-right">
              <div className="admin-user">
                <img src={Logo} alt="Admin" className="user-avatar" />
                <span className="user-name">Admin User</span>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          {/* Dashboard Stats */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon total-books">
                <i className="fas fa-book"></i>
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{totalBooks}</h3>
                <p className="stat-label">Total Books</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon total-users">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{totalUsers}</h3>
                <p className="stat-label">Total Users</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon active-subscriptions">
                <i className="fas fa-crown"></i>
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{activeSubs}</h3>
                <p className="stat-label">Active Subscriptions</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon revenue">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-info">
                <h3 className="stat-number">
                    ${monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
                <p className="stat-label">Monthly Revenue</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </AdminLayout>
  );
};

export default Admin;