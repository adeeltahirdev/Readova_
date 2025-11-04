import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import { MdDashboard, MdLibraryBooks, MdPerson, MdSettings, MdEmail, MdLock } from "react-icons/md";
import { Link } from "react-router";
import "../../assets/css/Admin.css";
import "../../assets/css/login.css";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Admin credentials
  const adminCredentials = {
    username: 'admin@gmail.com',
    password: 'admin123'
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (username === adminCredentials.username && password === adminCredentials.password) {
      localStorage.setItem('adminAuth', 'true');
      setIsLoggedIn(true);
    } else {
      setError('Invalid admin credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');

    // Try to close the tab
    window.close();

    // Fallback redirect if browser blocks tab closing
    setTimeout(() => {
      window.location.href = '/';
    }, 300);
  };

  // 🔒 Check if user is authenticated — redirect if not
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      window.location.href = '/'; // redirect unauthorized visitors to home
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // If not logged in, show nothing (to prevent flash before redirect)
  if (!isLoggedIn) return null;

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
                <Link to="#dashboard" className="nav-link">
                  <MdDashboard className="nav-icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#books" className="nav-link">
                  <MdLibraryBooks className="nav-icon" />
                  <span>Books Management</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#users" className="nav-link">
                  <MdPerson className="nav-icon" />
                  <span>Users Management</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#categories" className="nav-link">
                  <i className="fas fa-tags"></i>
                  <span>Categories</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#subscriptions" className="nav-link">
                  <i className="fas fa-crown"></i>
                  <span>Subscriptions</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#analytics" className="nav-link">
                  <i className="fas fa-chart-bar"></i>
                  <span>Analytics</span>
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

        {/* Main Content */}
        <main className="admin-main">
          {/* Header */}
          <header className="admin-header">
            <div className="header-left">
              <h1 className="page-title">Admin Dashboard</h1>
            </div>
            <div className="header-right">
              <div className="admin-user">
                <img src="admin-avatar.jpg" alt="Admin" className="user-avatar" />
                <span className="user-name">Admin User</span>
                <button 
                  onClick={handleLogout}
                  className="logout-btn"
                  style={{
                    marginLeft: '15px',
                    padding: '8px 16px',
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
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
                <h3 className="stat-number">1,247</h3>
                <p className="stat-label">Total Books</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon total-users">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-info">
                <h3 className="stat-number">8,542</h3>
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
                <i className="fas fa-plus"></i>
                Add New Book
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
                    <td><img src="book1.jpg" alt="Book Cover" className="book-cover-small" /></td>
                    <td>The Midnight Library</td>
                    <td>Matt Haig</td>
                    <td>Fiction</td>
                    <td><span className="status-badge status-active">Active</span></td>
                    <td className="action-buttons">
                      <button className="btn-action btn-edit" title="Edit"><i className="fas fa-edit"></i></button>
                      <button className="btn-action btn-delete" title="Delete"><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td><img src="book2.jpg" alt="Book Cover" className="book-cover-small" /></td>
                    <td>Atomic Habits</td>
                    <td>James Clear</td>
                    <td>Self-Help</td>
                    <td><span className="status-badge status-active">Active</span></td>
                    <td className="action-buttons">
                      <button className="btn-action btn-edit" title="Edit"><i className="fas fa-edit"></i></button>
                      <button className="btn-action btn-delete" title="Delete"><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <td><img src="book3.jpg" alt="Book Cover" className="book-cover-small" /></td>
                    <td>Project Hail Mary</td>
                    <td>Andy Weir</td>
                    <td>Sci-Fi</td>
                    <td><span className="status-badge status-inactive">Inactive</span></td>
                    <td className="action-buttons">
                      <button className="btn-action btn-edit" title="Edit"><i className="fas fa-edit"></i></button>
                      <button className="btn-action btn-delete" title="Delete"><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Add Book Modal */}
          {isModalOpen && (
            <div className="modal admin-modal" id="addBookModal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Add New Book</h3>
                  <button className="modal-close" onClick={closeModal}>&times;</button>
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

          {/* Quick Actions */}
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
