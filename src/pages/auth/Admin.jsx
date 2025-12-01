import React, { useState, useEffect } from "react";
import axios from "../../../api/axios.js";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import {
  MdDashboard,
  MdLibraryBooks,
  MdPerson,
  MdAttachMoney,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "../../assets/css/Admin.css";
import Logo from "../../assets/images/Logo.png";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [activeSubs, setActiveSubs] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  const [recentBorrows, setRecentBorrows] = useState([]);
  const [recentSubs, setRecentSubs] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
    const fetchStats = async () => {
      try {
        const usersRes = await axios.get("/allusers");
        setTotalUsers(usersRes.data.users?.length || 0);

        const booksRes = await axios.get("/showbooks");
        setTotalBooks(booksRes.data.total || 0);

        const adminRes = await axios.get("/admin/stats");
        setActiveSubs(adminRes.data.active_subscriptions || 0);
        setMonthlyRevenue(adminRes.data.monthly_revenue || 0);

        setRecentBorrows(adminRes.data.recent_borrows || []);
        setRecentSubs(adminRes.data.recent_subscriptions || []);
        setNewUsers(adminRes.data.new_users || []);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    if (isLoggedIn) {
      fetchStats();
    }
  }, [isLoggedIn]);

if (!isLoggedIn || loadingStats) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="admin-spinner"></div>
          <p className="loading-text">Loading Dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-container">
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
                <span className="user-name">Admin User</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          </header>

          {/* Stats Cards */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon total-books">
                <MdLibraryBooks />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{totalBooks}</h3>
                <p className="stat-label">Total Books</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon total-users">
                <MdPerson />
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
                <MdAttachMoney />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">
                  PKR {monthlyRevenue.toLocaleString()}
                </h3>
                <p className="stat-label">Monthly Revenue</p>
              </div>
            </div>
          </section>

          <section className="tables-grid">
            <div className="table-card-container">
              <div className="table-header">
                <h3>Borrows</h3>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Book Title</th>
                      <th>Duration</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBorrows.length > 0 ? (
                      recentBorrows.map((borrow) => (
                        <tr key={borrow.id}>
                          <td className="user-cell">
                            <div className="user-initials">
                              {borrow.user?.name?.charAt(0) || "U"}
                            </div>
                            <span>{borrow.user?.name || "Unknown"}</span>
                          </td>
                          <td>{borrow.book?.title.substring(0, 20)}...</td>
                          <td>
                            <span className="badge badge-borrow">
                              {calculateDays(
                                borrow.borrowed_at,
                                borrow.expires_at
                              )}{" "}
                              Days
                            </span>
                          </td>
                          <td className="price-text">PKR {borrow.price}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No recent borrows
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="table-card-container">
              <div className="table-header">
                <h3>Subscriptions</h3>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Plan Type</th>
                      <th>Expiry</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSubs.length > 0 ? (
                      recentSubs.map((sub) => {
                        // Logic to calculate status
                        const expiryDate = new Date(sub.expiry_date);
                        const today = new Date();
                        const diffTime = expiryDate - today;
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24)
                        );

                        let statusLabel = "Active";
                        let statusClass = "active"; // Default Green

                        if (diffTime < 0) {
                          statusLabel = "Expired";
                          statusClass = "expired"; // Red
                        } else if (diffDays <= 2) {
                          statusLabel = "Expiring Soon";
                          statusClass = "warning"; // Orange
                        }

                        return (
                          <tr key={sub.id}>
                            <td className="user-cell">
                              <div className="user-initials color-2">
                                {sub.user?.name?.charAt(0) || "U"}
                              </div>
                              <span>{sub.user?.name || "Unknown"}</span>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  sub.plan_type === "premium"
                                    ? "badge-premium"
                                    : "badge-basic"
                                }`}>
                                {sub.plan_type?.toUpperCase()}
                              </span>
                            </td>
                            <td>{formatDate(sub.expiry_date)}</td>
                            <td>
                              <span
                                className={`status-dot ${statusClass}`}></span>{" "}
                              {statusLabel}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No subscriptions yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
          </div>

            {/* Table 3: New Users */}
            <div className="table-card-container">
              <div className="table-header">
                <h3>New Users</h3>
                <Link to="/admin/users" className="view-all-link">
                  View All
                </Link>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newUsers.length > 0 ? (
                      newUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="user-cell">
                            <div className="user-initials color-3">
                              {user.name?.charAt(0)}
                            </div>
                            <span>{user.name}</span>
                          </td>
                          <td>{user.email}</td>
                          <td>{formatDate(user.created_at)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No new users
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </AdminLayout>
  );
};

export default Admin;
