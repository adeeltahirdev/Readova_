import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import { MdDashboard, MdLibraryBooks, MdPerson, MdSettings } from "react-icons/md";
import { Link } from "react-router";
import "../../assets/css/Admin.css";
import "../../assets/css/login.css";
import axios from "../../../api/axios.js";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [query, setQuery] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      window.location.href = "/";
    } else {
      setIsLoggedIn(true);
      fetchUsers();
    }
  }, []);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/allusers");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    }
    setLoading(false);
  };
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.warning("Please fill all fields");
      return;
    }
    try {
      await axios.post("/register", newUser);
      toast.success("User created successfully!");
      setIsModalOpen(false);
      setNewUser({ name: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error("Failed to create user");
    }
  };

  const handleDeleteUser = async (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.post("/delete", { email });
      toast.success("User deleted successfully!");
      setUsers(users.filter((user) => user.email !== email));
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(query.toLowerCase()) ||
      u.email?.toLowerCase().includes(query.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    toast.info("Logged out successfully!");
    setTimeout(() => (window.location.href = "/"), 5000);
  };

  if (!isLoggedIn) return null;

  return (
    <AdminLayout>
      <div className="admin-container">
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2 className="admin-logo">Readova Admin</h2>
          </div>
          <nav className="sidebar-nav">
            <ul className="nav-menu">
              <li className="nav-item">
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
              <li className="nav-item active">
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
              <h1 className="page-title">Users Management</h1>
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

          <section className="management-section">
            <div className="section-header">
              <h2 className="section-title">All Users</h2>
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                <i className="fas fa-plus"></i> Add User
              </button>
            </div>

            <div>
              <input
                className="search-bar search" 
                type="text"
                placeholder="Search users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {loading ? (
              <p>Loading users...</p>
            ) : filteredUsers.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.email}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="action-buttons">
                          <button
                            className="btn-action btn-delete"
                            onClick={() => handleDeleteUser(user.email)}
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {isModalOpen && (
            <div className="modal admin-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Add New User</h3>
                  <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleCreateUser}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
