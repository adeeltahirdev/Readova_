import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import { MdDashboard, MdLibraryBooks, MdPerson, MdSettings } from "react-icons/md";
import { Link } from "react-router";
import "../../assets/css/Admin.css";
import "../../assets/css/login.css";
import axios from "../../../api/axios.js";
import { toast } from "react-toastify";

const BooksManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [newBookQuery, setNewBookQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      window.location.href = "/";
    } else {
      setIsLoggedIn(true);
      fetchBooks();
    }
  }, []);

  const fetchBooks = async (searchQuery = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`/showbooks`, { params: { q: searchQuery } });
      setBooks(res.data.books || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching books:", err);
      toast.error("Failed to load books");
    }
    setLoading(false);
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`deletebooks/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      toast.success("Book deleted successfully!");
    } catch (err) {
      console.error("Error deleting book:", err);
      toast.error("Failed to delete book");
    }
  };

  const handleAddBooks = async (e) => {
    e.preventDefault();
    if (!newBookQuery.trim()) {
      toast.warning("Please enter a search keyword (e.g., Harry Potter)");
      return;
    }
    try {
      const res = await axios.get(`/books`, { params: { q: newBookQuery } });
      toast.success(`${res.data.total} new books fetched successfully!`);
      setIsModalOpen(false);
      fetchBooks();
    } catch (err) {
      console.error("Error adding books:", err);
      toast.error("Failed to add books from Google API");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsLoggedIn(false);
    toast.info("Logged out successfully!");
    setTimeout(() => (window.location.href = "/"), 1000);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  <MdDashboard className="nav-icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="nav-item active">
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

        {/* Main Content */}
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

          {/* Books Management Section */}
          <section className="management-section" id="books">
            <div className="section-header">
              <h2 className="section-title">Books Management</h2>
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                <i className="fas fa-plus"></i> Add Books
              </button>
            </div>

            <div>
              <input
                className="search-bar search"
                type="text"
                placeholder="Search books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={() => fetchBooks(query)} className="btn btn-primary">
                Search
              </button>
            </div>

            {loading ? (
              <p>Loading books...</p>
            ) : currentBooks.length === 0 ? (
              <p>No books found.</p>
            ) : (
              <>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBooks.map((book) => (
                        <tr key={book.id}>
                          <td>
                            <img
                              src={book.thumbnail}
                              alt="cover"
                              className="book-cover-small"
                            />
                          </td>
                          <td>{book.title}</td>
                          <td>{book.authors}</td>
                          <td>{book.categories}</td>
                          <td>${book.price}</td>
                          <td className="action-buttons">
                            <button
                              className="btn-action btn-delete"
                              onClick={() => deleteBook(book.id)}
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

                {/* Pagination */}
                <div className="pagination-container">
                  <button
                    className="btn btn-primary btn-m"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`btn btn-page ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="btn btn-primary btn-m"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </section>
          {isModalOpen && (
            <div className="modal admin-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Add Books from Google</h3>
                  <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleAddBooks}>
                    <div className="form-group">
                      <label>Search Keyword</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Harry Potter, Science"
                        value={newBookQuery}
                        onChange={(e) => setNewBookQuery(e.target.value)}
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
                        Fetch & Save
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

export default BooksManagement;
