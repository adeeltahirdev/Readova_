import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Hero from "../assets/images/Hero.webp";
import api from "../../api/axios.js";

const IndexPage = () => {
  const [books, setBooks] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [popular, setPopular] = useState([]);
  const [arrivals, setArrivals] = useState([]);

  // Slider Refs
  const recSliderRef = useRef(null);
  const popSliderRef = useRef(null);
  const newSliderRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/showbooks");
        const apiBooks = (res.data.books || []).map((book) => ({
          id: book.id,
          title: book.title,
          author: book.authors,
          rating: book.rating || "",
          price: book.price || "",
          img:
            book.thumbnail ||
            "https://via.placeholder.com/150x220?text=No+Image",
        }));

        setBooks(apiBooks);

        // Auto-categorize
        setRecommended(apiBooks.slice(0, 5));
        setPopular(apiBooks.slice(5, 10));
        setArrivals(apiBooks.slice(10, 15));
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <MainLayout>
      <main>
        {/* HERO SECTION (unchanged) */}
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">Meet your next favorite book</h1>
              <p className="hero-description">
                Readova is a modern library management system that lets you
                access a vast collection of books, track your progress, get
                personalized recommendations, and enjoy flexible reading options.
              </p>
              <a href="/auth/register" className="btn btn-full margin-right-sm">
                Read now
              </a>
              <a href="/browse" className="btn btn-outline">
                Explore
              </a>
            </div>
            <div className="hero-img-box">
              <img src={Hero} alt="a person reading a book" className="hero-img" />
            </div>
          </div>
        </section>

        {/* RECOMMENDED SECTION */}
        <section className="recommended">
          <div className="container">
            <div className="grid grid-2-col">
              <h2 className="heading-secondary">Recommended</h2>
            </div>

            <div className="hm-grid container" ref={recSliderRef}>
              {recommended.map((book) => (
                <div className="hm-books" key={book.id}>
                  <img src={book.img} className="hm-cover" alt="book cover" />
                  <div className="hm-content">
                    <ul className="hm-attributes">
                      <li className="hm-attribute"><h3>{book.title}</h3></li>
                      <li className="hm-attribute"><p>{book.author}</p></li>
                      <li className="hm-attribute">
                        <div className="rating">⭐ {book.rating}</div>
                      </li>
                      <li className="hm-attribute">
                        <div className="price">${book.price}</div>
                      </li>
                    </ul>
                    <a href={`/book/${book.id}`} className="btn btn-full btn-view">View</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="container scroll">
              <MdChevronLeft className="scroll-btn" onClick={() => scrollLeft(recSliderRef)} />
              <MdChevronRight className="scroll-btn" onClick={() => scrollRight(recSliderRef)} />
            </div>
          </div>
        </section>

        {/* POPULAR SECTION */}
        <section className="popular">
          <div className="container">
            <h2 className="heading-secondary">Popular</h2>
          </div>

          <div className="container grid grid-3-col font-one" ref={popSliderRef}>
            {popular.map((book) => (
              <div className="hm-books" key={book.id}>
                <img src={book.img} className="hm-cover" alt="book cover" />
                <div className="hm-content">
                  <ul className="hm-attributes">
                    <li className="hm-attribute"><h3>{book.title}</h3></li>
                    <li className="hm-attribute"><p>{book.author}</p></li>
                    <li className="hm-attribute"><div className="rating">⭐ {book.rating}</div></li>
                    <li className="hm-attribute"><div className="price">${book.price}</div></li>
                  </ul>
                  <a href={`/book/${book.id}`} className="btn btn-full btn-view">View</a>
                </div>
              </div>
            ))}
          </div>

          <div className="container scroll">
            <MdChevronLeft className="scroll-btn" onClick={() => scrollLeft(popSliderRef)} />
            <MdChevronRight className="scroll-btn" onClick={() => scrollRight(popSliderRef)} />
          </div>
        </section>

        {/* NEW ARRIVALS SECTION */}
        <section className="new-arrivals mrgn-btm-md">
          <div className="container">
            <h2 className="heading-secondary text-cntr">New Arrivals</h2>
          </div>

          <div className="container grid grid-3-col font-one" ref={newSliderRef}>
            {arrivals.map((book) => (
              <div className="hm-books" key={book.id}>
                <img src={book.img} className="hm-cover" alt="book cover" />
                <div className="hm-content">
                  <ul className="hm-attributes">
                    <li className="hm-attribute"><h3>{book.title}</h3></li>
                    <li className="hm-attribute"><p>{book.author}</p></li>
                    <li className="hm-attribute"><div className="rating">⭐ {book.rating}</div></li>
                    <li className="hm-attribute"><div className="price">${book.price}</div></li>
                  </ul>
                  <a href={`/book/${book.id}`} className="btn btn-full btn-view">View</a>
                </div>
              </div>
            ))}
          </div>

          <div className="container scroll">
            <MdChevronLeft className="scroll-btn" onClick={() => scrollLeft(newSliderRef)} />
            <MdChevronRight className="scroll-btn" onClick={() => scrollRight(newSliderRef)} />
          </div>
        </section>

      </main>
    </MainLayout>
  );
};

export default IndexPage;
