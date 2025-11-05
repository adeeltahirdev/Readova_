import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../../api/axios";
import { toast } from "react-toastify";
const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        // Fetch main book detail
        const res = await api.get(`/books/${id}`);
        const bookData = res.data.book || res.data;
        setBook(bookData);
        const allRes = await api.get("/showbooks");
        const allBooks = allRes.data.books || allRes.data;
        const filtered = allBooks.filter((b) => b.id !== bookData.id);

        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRandomBooks(shuffled.slice(0, 4));
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <main>
          <div className="container">
            <p>Loading book details...</p>
          </div>
        </main>
      </MainLayout>
    );
  }

  if (!book) {
    return (
      <MainLayout>
        <main>
          <div className="container">
            <p>Book not found.</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </main>
      </MainLayout>
    );
  }

  const renderDescription = () => {
    const desc = book.description || "No description available.";
    if (desc.length <= 250) return <p>{desc}</p>;

    return (
      <p>
        {showFullDescription ? desc : `${desc.substring(0, 250)}... `}
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="link read-more"
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "inherit",
            padding: 0,
          }}
        >
          {showFullDescription ? "Show Less" : "Read More"}
        </button>
      </p>
    );
  };

  return (
    <MainLayout>
      <main>
        <div className="container">
          {/* Book Header Section */}
          <section className="book-header">
            <div className="book-cover-section">
              <img
                src={
                  book.thumbnail ||
                  "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={book.title}
                className="book-cover-large"
              />
            </div>

            <div className="book-info-main">
              <h1 className="heading-primary">{book.title}</h1>
              <p className="book-author">By {book.authors}</p>

              <div className="book-actions">
                <a href="#" className="btn btn-full"  onClick={() => navigate('/borrowcheckout')}>
                  Borrow
                </a>
                <a href="/pricing" className="btn btn-outline subscribe-btn">
                  Subscribe
                </a>
              </div>

              <div className="book-description">{renderDescription()}</div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="book-stats">
            <div className="stat-item">
              <span className="stat-number">{book.chapters ?? 0}</span>
              <span className="stat-label">Chapters</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{book.readers ?? 0}</span>
              <span className="stat-label">Readers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{book.views ?? 0}</span>
              <span className="stat-label">Views</span>
            </div>
          </section>

          {/* You May Also Like Section */}
          <section className="similar-books">
            <h2 className="heading-secondary">You may also like</h2>
            <div className="similar-books-grid">
              {randomBooks.length > 0 ? (
                randomBooks.map((simBook) => (
                  <div
                    key={simBook.id}
                    className="similar-book-card"
                    onClick={() => navigate(`/book/${simBook.id}`)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={
                        simBook.thumbnail ||
                        "https://via.placeholder.com/150x220?text=No+Image"
                      }
                      alt={simBook.title}
                      className="similar-book-cover"
                    />
                    <h3 className="similar-book-title">{simBook.title}</h3>
                  </div>
                ))
              ) : (
                <p>No similar books available.</p>
              )}
            </div>
          </section>

          {/* Chapters Section */}
          <section className="chapters-section">
            <h2 className="heading-secondary">Chapters</h2>
            <div className="chapters-list">
              {(book.chapters_list || []).length > 0 ? (
                book.chapters_list.map((ch, idx) => (
                  <div className="chapter-item" key={idx}>
                    <span className="chapter-number">{ch}</span>
                  </div>
                ))
              ) : (
                <p>No chapter data available.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  );
};

export default BookDetail;