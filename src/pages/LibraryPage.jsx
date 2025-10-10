import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Book1 from "../assets/images/covers/Book1.jpg";
import Book2 from "../assets/images/covers/Book2.jpg";
import Book3 from "../assets/images/covers/Book3.jpg";
import Book4 from "../assets/images/covers/Book4.png";
import Book5 from "../assets/images/covers/Book5.jpg";
import Book6 from "../assets/images/covers/Book6.jpg";
import Book7 from "../assets/images/covers/Book7.jpg";
import Book8 from "../assets/images/covers/Book8.png";
import Book9 from "../assets/images/covers/Book9.jpg";
import Book10 from "../assets/images/covers/Book10.jpg";

const LibraryPage = () => {
  const [loading, setLoading] = useState({
    borrowed: false,
    purchased: false,
    wishlist: false,
    bookmarks: false,
  });

  return (
    <MainLayout>
      <main>
        <section className="library-dashboard">
          <div className="stats-overview">
            <div className="stat-card">
              <h3 className="font-one">Books Owned</h3>
              <p className="font-one">24</p>
            </div>
            <div className="stat-card">
              <h3 className="font-one">Reading Now</h3>
              <p className="font-one">3</p>
            </div>
            <div className="stat-card">
              <h3 className="font-one">Wishlist</h3>
              <p className="font-one">12</p>
            </div>
            <div className="stat-card">
              <h3 className="font-one">Bookmarks</h3>
              <p className="font-one">8</p>
            </div>
          </div>

          <div className="section">
            <h2 className="heading-secondary">Continue Reading</h2>
            <div className="book-cards">
              <div className="book-card">
                <img src={Book1} alt="Book Cover" />
                <div className="book-info font-one">
                  <h3>The Silent Patient</h3>
                  <p>Alex Michaelides</p>

                  <button className="btn-read font-one">Continue</button>
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="heading-secondary">Download</h2>
            <div className="book-cards">
              <div className="book-card">
                <img src={Book5} alt="Book Cover" />
                <div className="book-info">
                  <h3>The Midnight Library</h3>
                  <p>Matt Haig</p>
                  <button className="btn-dnld">Download</button>
                </div>
              </div>
            </div>
          </div>

          <div className="section" id="wishlist-bookmarks">
            <h2 className="heading-secondary">Wishlist & Bookmarks</h2>
            <div className="book-tabs">
              <button className="tab-btn active font-one" data-tab="wishlist">
                Wishlist
              </button>
              <button className="tab-btn font-one" data-tab="bookmarks">
                Bookmarks
              </button>
            </div>
            <div className="tab-content" id="wishlist">
              <div className="book-cards">
                <div className="book-card">
                  <img src={Book4} alt="Book Cover" />
                  <div className="book-info">
                    <h3>The Midnight Library</h3>
                    <p>Matt Haig</p>
                    <button className="btn-buy">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-content"
              id="bookmarks"
              style={{ display: "none" }}
            >
              <div className="book-cards">
                <div className="book-card">
                  <img src={Book5} alt="Book Cover" />
                  <div className="book-info">
                    <h3>Educated</h3>
                    <p>Tara Westover</p>
                    <button className="btn-read">Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default LibraryPage;
