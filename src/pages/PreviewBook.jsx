import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { toast } from "react-toastify";
import {
  ArrowLeftIcon,
  ShareIcon,
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

  const [rating, setRating] = useState(0); // New
  const [savedPage, setSavedPage] = useState(null); // New

  const iframeRef = useRef(null);

  /* ======================== LOAD BOOK ======================== */
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/books/${id}`);
        if (data?.book) {
          setBook(data.book);
        } else {
          toast.error("Book not found");
          navigate(-1);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load book");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id, navigate]);

  /* ======================== LOAD LOCAL BOOKMARK & RATING ======================== */
  useEffect(() => {
    const saved = localStorage.getItem(`bookmark_${id}`);
    if (saved) setSavedPage(Number(saved));

    const storedRating = localStorage.getItem(`rating_${id}`);
    if (storedRating) setRating(Number(storedRating));
  }, [id]);

  /* ======================== TOGGLE FULLSCREEN ======================== */
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

  /* ======================== SHARE ======================== */
  const shareBook = async () => {
    if (!book) return;

    const shareData = {
      title: book.title,
      text: `Check out "${book.title}" by ${book.authors}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        toast.info("Share cancelled");
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  /* ======================== BOOKMARK (LOCAL, GENERIC) ======================== */
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

  /* ======================== STAR RATING (LOCAL, GENERIC) ======================== */
  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${id}`, value);
    toast.success(`You rated this book ${value} stars`);
  };

  /* ======================== RENDER ======================== */
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
          {/* ⭐ STAR RATING */}
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon
              key={s}
              onClick={() => handleRating(s)}
              className="icon"
              style={{ color: s <= rating ? "yellow" : "white", cursor: "pointer" }}
            />
          ))}

          {/* 🔖 BOOKMARK */}
          <button onClick={saveBookmark} className="icon-btn" title="Bookmark page">
            <BookmarkIcon className="icon" />
          </button>

          {/* FULLSCREEN */}
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
        {hasGooglePreview ? (
          <iframe
            ref={iframeRef}
            src={`https://books.google.com/books?id=${book.google_id}&printsec=frontcover&output=embed`}
            title={`${book.title} preview`}
            className="preview-iframe"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="preview-fallback">
            {book.cover_url ? (
              <img src={book.cover_url} alt={`${book.title} cover`} className="fallback-cover" />
            ) : (
              <div className="fallback-icon-wrap">
                <BookOpenIcon className="fallback-icon" />
              </div>
            )}

            <h2 className="fallback-title">{book.title}</h2>
            <p className="fallback-authors">{book.authors}</p>
            {book.description ? (
              <p className="fallback-description">{book.description}</p>
            ) : (
              <p className="fallback-description italic">No description available.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default PreviewBook;
