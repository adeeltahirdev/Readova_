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
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
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
              <li className="nav-item">
                <Link to="#settings" className="nav-link">
                  <MdSettings className="nav-icon" />
                  <span>Settings</span>
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
                  style={{
                    marginLeft: "15px",
                    padding: "8px 16px",
                    background: "#ff4444",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
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
                <h3 className="stat-number">3,215</h3>
                <p className="stat-label">Active Subscriptions</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon revenue">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-info">
                <h3 className="stat-number">$24,580</h3>
                <p className="stat-label">Monthly Revenue</p>
              </div>
            </div>
          </section>

          {/* Books Management Section */}
          <section className="management-section">
            <div className="section-header">
              <h2 className="section-title">Books Management</h2>
              <button className="btn btn-primary" onClick={openModal}>
                <i className="fas fa-plus"></i> Add New Book
              </button>
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src="book1.jpg"
                        alt="Book Cover"
                        className="book-cover-small"
                      />
                    </td>
                    <td>The Midnight Library</td>
                    <td>Matt Haig</td>
                    <td>Fiction</td>
                    <td>
                      <span className="status-badge status-active">Active</span>
                    </td>
                    <td className="action-buttons">
                      <button className="btn-action btn-edit" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-action btn-delete" title="Delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </section>

          {isModalOpen && (
            <div className="modal admin-modal" id="addBookModal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Add New Book</h3>
                  <button className="modal-close" onClick={closeModal}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form className="book-form">
                    <div className="form-group">
                      <label htmlFor="bookTitle">Book Title</label>
                      <input type="text" id="bookTitle" className="form-control" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bookAuthor">Author</label>
                      <input type="text" id="bookAuthor" className="form-control" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bookCategory">Category</label>
                      <select id="bookCategory" className="form-control" required>
                        <option value="">Select Category</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="mystery">Mystery</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="sci-fi">Sci-Fi</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="bookDescription">Description</label>
                      <textarea id="bookDescription" className="form-control" rows="4"></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="bookCover">Cover Image</label>
                      <input type="file" id="bookCover" className="form-control" accept="image/*" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bookPrice">Price ($)</label>
                      <input type="number" id="bookPrice" className="form-control" step="0.01" min="0" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  <button className="btn btn-primary">Save Book</button>
                </div>
              </div>
            </div>
          )}
          <section className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              <div className="action-card">
                <i className="fas fa-chart-line"></i>
                <h3>View Reports</h3>
                <p>Generate analytics reports</p>
              </div>
              <div className="action-card">
                <i className="fas fa-cog"></i>
                <h3>System Settings</h3>
                <p>Configure platform settings</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </AdminLayout>
  );
};

export default Admin;
