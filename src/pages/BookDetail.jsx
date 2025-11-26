import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [randomBooks, setRandomBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const userId = localStorage.getItem("userId") || localStorage.getItem("id");
  const isLoggedIn = !!userId;

  useEffect(() => {
    const fetchBookData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/books/${id}?user_id=${userId}`);
        const bookData = res.data.book || res.data;
        setBook(bookData);
        setHasAccess(res.data.preview_access || false);
        if (isLoggedIn) {
            try {
                const wishRes = await api.get(`/wishlist/check/${id}?user_id=${userId}`);
                setIsWishlisted(wishRes.data.is_wishlisted);
            } catch (wErr) {
                console.error("Wishlist check failed", wErr);
            }
        }
        const allRes = await api.get("/showbooks");
        const allBooks = allRes.data.books || allRes.data;
        const filtered = allBooks.filter((b) => b.id !== bookData.id);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRandomBooks(shuffled.slice(0, 4));
        
      } catch (err) {
        console.error("Error fetching book:", err);
        toast.error("Failed to load book data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBookData();
  }, [id, userId, isLoggedIn]);
  const handleToggleWishlist = async () => {
      if (!isLoggedIn) return;
      try {
          const response = await api.post('/wishlist/toggle', {
              user_id: userId,
              book_id: id
          });
          const isAdded = response.data.status === 'added';
          setIsWishlisted(isAdded);
          if(isAdded) {
              toast.success("Added to wishlist");
          } else {
              toast.info("Removed from wishlist");
          }
      } catch (error) {
          console.error(error);
          toast.error("Failed to update wishlist");
      }
  };

  const renderDescription = () => {
    const desc = book.description || "No description available.";
    const cleanDesc = desc.replace(/<[^>]*>?/gm, '');

    if (cleanDesc.length <= 250) return <p>{cleanDesc}</p>;

    return (
      <p>
        {showFullDescription ? cleanDesc : `${cleanDesc.substring(0, 250)}... `}
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
            padding: "0 5px",
          }}
        >
          {showFullDescription ? "Show Less" : "Read More"}
        </button>
      </p>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container" style={{ padding: "50px 0", textAlign: "center" }}>
           <div className="loader"></div>
           <p>Loading book details...</p>
        </div>
      </MainLayout>
    );
  }

  if (!book) {
    return (
      <MainLayout>
        <div className="container" style={{ padding: "50px 0", textAlign: "center" }}>
          <h2>Please Login to Read Book</h2>
          <Link to='/auth/register' className="btn btn-outline subscribe-btn" style={{ marginTop: "20px" }}>
            Login
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main>
        <div className="container">
          <section className="book-header">
            <div className="book-cover-section">
              <img
                src={book.thumbnail || "https://via.placeholder.com/200x300?text=No+Image"}
                alt={book.title}
                className="book-cover-large"
              />
            </div>

            <div className="book-info-main">
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "start"}}>
                  <div>
                    <h1 className="heading-primary" style={{marginBottom: "5px"}}>{book.title}</h1>
                    <p className="book-author">By {book.authors}</p>
                  </div>
                {isLoggedIn && (
                    <button 
                        onClick={handleToggleWishlist}
                        style={{
                            background: "none", 
                            border: "1px solid #a70000ff", 
                            borderRadius: "50%", 
                            padding: "10px", 
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "15px",
                            marginTop: "40px"
                        }}
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        {isWishlisted ? (
                            <HeartIconSolid style={{ height: "24px", width: "24px", color: "red" }} />
                        ) : (
                            <HeartIconOutline style={{ height: "24px", width: "24px", color: "darkgray" }} />
                        )}
                    </button>
                  )}
              </div>
              
              <div className="book-meta-details" style={{ marginBottom: "20px" }}>
                 <span className="badge-category">{book.categories || "General"}</span>
                 <span className="price-tag" style={{ marginLeft: "15px", fontWeight: "bold", fontSize: "1.2rem", color: "#28a745" }}>
                    Rs. {book.price}
                 </span>
              </div>

              <div className="book-actions">
                {hasAccess && isLoggedIn ? (
                    <Link
                    to={`/preview/${book.id}`}
                    className="btn btn-outline"
                    style={{backgroundColor: '#28a745', color: 'white', borderColor: '#28a745'}}
                  >
                    Read Book
                  </Link>
                ) : (
                    <>
                        <Link to={`/borrowcheckout/${book.id}`} className="btn btn-outline subscribe-btn">
                            Borrow Book
                        </Link>
                        <Link to="/pricing" className="btn btn-outline subscribe-btn">
                            Subscribe Plan
                        </Link>
                    </>
                )}
              </div>

              <div className="book-description">
                 <h3>Description</h3>
                 {renderDescription()}
              </div>
            </div>
          </section>

          <section className="book-stats">
            <div className="stat-item">
              <span className="stat-number">{book.page_count || "N/A"}</span>
              <span className="stat-label">Pages</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{book.published_date?.substring(0,4) || "N/A"}</span>
              <span className="stat-label">Year</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{book.rating || "0"}</span>
              <span className="stat-label">Rating</span>
            </div>
          </section>

          <section className="similar-books">
            <h2 className="heading-secondary">You may also like</h2>
            <div className="similar-books-grid">
              {randomBooks.length > 0 ? (
                randomBooks.map((simBook) => (
                  <div
                    key={simBook.id}
                    className="similar-book-card"
                    onClick={() => {
                        navigate(`/book/${simBook.id}`);
                        window.scrollTo(0, 0);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={simBook.thumbnail || "https://via.placeholder.com/150x220?text=No+Image"}
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

          {(book.chapters_list || []).length > 0 && (
            <section className="chapters-section">
              <h2 className="heading-secondary">Chapters</h2>
              <div className="chapters-list">
                  {book.chapters_list.map((ch, idx) => (
                    <div className="chapter-item" key={idx}>
                      <span className="chapter-number">{ch}</span>
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </MainLayout>
  );
};

export default BookDetail;