import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import api from "../../api/axios.js";
import { toast } from "react-toastify";
const PLACEHOLDER_IMG = "[https://via.placeholder.com/150x220?text=No+Cover](https://via.placeholder.com/150x220?text=No+Cover)";
const LibraryPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || localStorage.getItem("id");
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [subscribedBooks, setSubscribedBooks] = useState([]);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [recentBook, setRecentBook] = useState(null);
  const [planType, setPlanType] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
            toast.error("Please login to view library");
            navigate('/auth/login');
            return;
        }
        const libRes = await api.get(`/library/my-books?user_id=${userId}`);
        setBorrowedBooks(libRes.data.borrowed_books || []);
        setSubscribedBooks(libRes.data.subscribed_books || []);
        setPlanType(libRes.data.plan_type);
        const wishRes = await api.get(`/wishlist?user_id=${userId}`);
        setWishlistBooks(wishRes.data.books || wishRes.data);
        const savedRecent = localStorage.getItem("recentBook");
        if (savedRecent) {
            setRecentBook(JSON.parse(savedRecent));
        }
      } catch (error) {
        console.error("Library fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate]);
  const hasBorrowed = borrowedBooks.length > 0;
  const hasSubscribed = subscribedBooks.length > 0;
  let libraryHeading = "My Library";
  if (hasBorrowed && hasSubscribed) {
      libraryHeading = "Borrowed & Subscribed Books";
  } else if (hasBorrowed) {
      libraryHeading = "Borrowed Books";
  } else if (hasSubscribed) {
      libraryHeading = "Subscribed Books";
  } else if (planType === 'premium') {
      libraryHeading = "Premium Access Active";
  }
  const displayBooks = [...borrowedBooks, ...subscribedBooks];
  const uniqueDisplayBooks = displayBooks.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
  if (loading) {
      return (
        <MainLayout>
            <div style={{textAlign: "center", padding: "50px"}}><div className="loader"></div></div>
        </MainLayout>
      );
  }

  return (
    <MainLayout>
      <main>
        <section className="library-dashboard">
          <div className="stats-overview">
            <div className="stat-card">
              <h3 className="font-one">My Books</h3>
              <p className="font-one">{uniqueDisplayBooks.length}</p>
            </div>
            <div className="stat-card">
              <h3 className="font-one">Wishlist</h3>
              <p className="font-one">{wishlistBooks.length}</p>
            </div>
            <div className="stat-card">
              <h3 className="font-one">Plan</h3>
              <p className="font-one" style={{textTransform: "capitalize"}}>{planType || "None"}</p>
            </div>
          </div>
          {recentBook && (
            <div className="section">
                <h2 className="heading-secondary">Continue Reading</h2>
                <div className="book-cards">
                    <div className="book-card">
                        <img src={recentBook.thumbnail || PLACEHOLDER_IMG} alt={recentBook.title} />
                        <div className="book-info font-one">
                            <h3>{recentBook.title}</h3>
                            <p>{recentBook.authors}</p>
                            <Link to={`/preview/${recentBook.id}`} className="btn-read font-one" style={{textAlign:'center', display:'block', textDecoration:'none'}}>
                                Continue Reading
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          )}
          <div className="section">
            <h2 className="heading-secondary">{libraryHeading}</h2>
            
            {uniqueDisplayBooks.length === 0 ? (
                <div style={{textAlign: "center", padding: "100px", color: "#666"}}>
                    <p style={{fontSize:"12px"}}>You haven't borrowed or subscribed to any books yet.</p>
                    {planType === 'premium' && <p>You have Premium! Go to any book and read it instantly.</p>}
                    <Link to="/browse" className="btn btn-full">Browse Books</Link>
                    <Link to="/pricing" className="btn btn-outline btn-library">Subscribed Plan</Link>
                </div>
            ) : (
                <div className="book-cards">
                    {uniqueDisplayBooks.map((book) => (
                        <div className="book-card" key={book.id}>
                            <img src={book.thumbnail || PLACEHOLDER_IMG} alt={book.title} />
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <p>{book.authors}</p>
                                <Link to={`/book/${book.id}`} className="btn-read" style={{textAlign:'center', display:'block', textDecoration:'none'}}>
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
          <div className="section" id="wishlist-section">
            <h2 className="heading-secondary">My Wishlist</h2>   
            {wishlistBooks.length === 0 ? (
                <p style={{paddingLeft: "10px"}}>Your wishlist is empty.</p>
            ) : (
                <div className="book-cards">
                    {wishlistBooks.map((book) => (
                        <div className="book-card" key={`wish-${book.id}`}>
                            <img src={book.thumbnail || PLACEHOLDER_IMG} alt={book.title} />
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <p>{book.authors}</p>
                                <Link to={`/book/${book.id}`} className="btn-buy" style={{textAlign:'center', display:'block', textDecoration:'none'}}>
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default LibraryPage;