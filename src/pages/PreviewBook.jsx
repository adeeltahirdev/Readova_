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
} from "@heroicons/react/24/outline";
import Logo from "../../src/assets/images/Logo.png";
import "../../src/assets/css/preview.css";

const PreviewBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

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
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load book");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id, navigate]);

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
      {/* ==== HEADER ==== */}
      <header className="preview-header">
        <div className="header-left">
          <img src={Logo} alt="Logo" className="logo" /> {/* ✅ logo added */}

          <button
            onClick={() => navigate(-1)}
            className="icon-btn"
            aria-label="Back"
          >
            <ArrowLeftIcon className="icon" />
          </button>

          <div className="book-meta">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-authors">by {book.authors}</p>
          </div>
        </div>

        <div className="header-right">
          {hasGooglePreview && (
            <button
              onClick={toggleFullscreen}
              className="icon-btn"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="icon" />
              ) : (
                <ArrowsPointingOutIcon className="icon" />
              )}
            </button>
          )}

          <button onClick={shareBook} className="icon-btn" aria-label="Share">
            <ShareIcon className="icon" />
          </button>
        </div>
      </header>

      {/* ==== FULL PAGE PREVIEW AREA ==== */}
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
              <img
                src={book.cover_url}
                alt={`${book.title} cover`}
                className="fallback-cover"
              />
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
              <p className="fallback-description italic">
                No description available.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default PreviewBook;
