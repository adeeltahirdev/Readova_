import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { toast } from "react-toastify";
import {
  ArrowLeftIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  BookOpenIcon,
  BookmarkIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../src/assets/images/Logo.png";
import "../../src/assets/css/preview.css";
const PreviewBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewAccess, setPreviewAccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [savedPage, setSavedPage] = useState(null);
  const userId = localStorage.getItem("userId") || localStorage.getItem("id");
  const iframeRef = useRef(null);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/books/${id}?user_id=${userId}`);
        if (data?.book) {
          setBook(data.book);
          setPreviewAccess(data.preview_access ?? false);
          localStorage.setItem(
            "recentBook",
            JSON.stringify({
              id: data.book.id,
              title: data.book.title,
              authors: data.book.authors,
              thumbnail: data.book.thumbnail,
            })
          );
        } else {
          toast.error("Book not found");
          navigate(-1);
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load book");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id, navigate, userId]);
  useEffect(() => {
    const saved = localStorage.getItem(`bookmark_${id}`);
    if (saved) setSavedPage(Number(saved));
  }, [id]);
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await iframeRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };
  const saveBookmark = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.contentWindow.postMessage({ type: "GET_PAGE" }, "*");
    window.addEventListener(
      "message",
      (event) => {
        if (event.data?.type === "CURRENT_PAGE") {
          const page = event.data.page;
          localStorage.setItem(`bookmark_${id}`, page);
          setSavedPage(page);
          toast.success(`Bookmarked page ${page}`);
        }
      },
      { once: true }
    );
  };
  const handleRating = async (value) => {
    if (!userId) {
      toast.error("You must be logged in to rate.");
      return;
    }
    setRating(value);

    try {
      await api.post("/rate", {
        user_id: userId,
        book_id: id,
        rating: value,
      });
      toast.success(`You rated this book ${value} stars`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save rating");
      setRating(0);
    }
  };
  if (loading) {
    return (
      <div className="preview-loading">
        <div className="loader"></div>
        <p>Loading preview…</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="preview-notfound">
        <BookOpenIcon className="notfound-icon" />
        <p className="notfound-text">Book not found.</p>
        <button onClick={() => navigate(-1)} className="back-btn">
          Go Back
        </button>
      </div>
    );
  }

  const hasGooglePreview = Boolean(book.google_id);

  return (
    <div className="preview-container">
      <header className="preview-header">
        <div className="header-left">
          <img src={Logo} alt="Logo" className="logo" />

          <button onClick={() => navigate(-1)} className="icon-btn">
            <ArrowLeftIcon className="icon" />
          </button>

          <div className="book-meta">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-authors">by {book.authors}</p>
          </div>
        </div>

        <div className="header-right">
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon
              key={s}
              onClick={() => handleRating(s)}
              className="icon"
              style={{
                color: s <= rating ? "yellow" : "white",
                cursor: "pointer",
              }}
            />
          ))}
          <button
            onClick={saveBookmark}
            className="icon-btn"
            title="Bookmark page">
            <BookmarkIcon className="icon" />
          </button>
          {hasGooglePreview && (
            <button onClick={toggleFullscreen} className="icon-btn">
              {isFullscreen ? (
                <ArrowsPointingInIcon className="icon" />
              ) : (
                <ArrowsPointingOutIcon className="icon" />
              )}
            </button>
          )}
        </div>
      </header>

      <section className="preview-fullpage">
        {hasGooglePreview && previewAccess ? (
          <iframe
            ref={iframeRef}
            src={`https://books.google.com/books?id=${book.google_id}&printsec=frontcover&output=embed`}
            title={`${book.title} preview`}
            className="preview-iframe"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="preview-locked">
            <h2>Preview Locked</h2>
            <p>You need to borrow this book to view the full preview.</p>
            <button
              onClick={() => navigate(`/borrowcheckout/${id}`)}
              className="borrow-btn"
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}>
              Go to Borrow Page
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default PreviewBook;