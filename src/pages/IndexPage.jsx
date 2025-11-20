import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Hero from "../assets/images/Hero.webp";
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
import Customer1 from "../assets/images/customers/customer-1.jpg";
import Customer2 from "../assets/images/customers/customer-2.jpg";
import Customer3 from "../assets/images/customers/customer-3.jpg";
import Customer4 from "../assets/images/customers/customer-4.jpg";
import Customer5 from "../assets/images/customers/customer-5.jpg";
import Customer6 from "../assets/images/customers/customer-6.jpg";

const IndexPage = () => {
  const [currentRecommendedSlide, setCurrentRecommendedSlide] = useState(0);
  const [currentPopularSlide, setCurrentPopularSlide] = useState(0);

  // Sample book data - 9 books each, grouped into sets of 3
  const recommendedBooks = [
    // Slide 0
    [
      { id: 1, cover: Book7, title: "The Silent Patient", author: "Alex Michaelides", rating: "⭐⭐⭐⭐⭐ (4.7)", price: "$12.99" },
      { id: 2, cover: Book1, title: "Dune", author: "Frank Herbert", rating: "⭐⭐⭐⭐⭐ (4.9)", price: "$15.99" },
      { id: 3, cover: Book4, title: "The Hobbit", author: "J.R.R. Tolkien", rating: "⭐⭐⭐⭐⭐ (4.4)", price: "$22.99" }
    ],
    // Slide 1
    [
      { id: 4, cover: Book2, title: "Atomic Habits", author: "James Clear", rating: "⭐⭐⭐⭐⭐ (4.8)", price: "$14.99" },
      { id: 5, cover: Book3, title: "Educated", author: "Tara Westover", rating: "⭐⭐⭐⭐⭐ (4.7)", price: "$13.99" },
      { id: 6, cover: Book5, title: "The Midnight Library", author: "Matt Haig", rating: "⭐⭐⭐⭐⭐ (4.5)", price: "$16.99" }
    ],
    // Slide 2
    [
      { id: 7, cover: Book6, title: "Project Hail Mary", author: "Andy Weir", rating: "⭐⭐⭐⭐⭐ (4.9)", price: "$18.99" },
      { id: 8, cover: Book8, title: "Klara and the Sun", author: "Kazuo Ishiguro", rating: "⭐⭐⭐⭐⭐ (4.3)", price: "$15.99" },
      { id: 9, cover: Book9, title: "The Invisible Life", author: "Addie LaRue", rating: "⭐⭐⭐⭐⭐ (4.6)", price: "$17.99" }
    ]
  ];

  const popularBooks = [
    // Slide 0
    [
      { id: 1, cover: Book8, title: "Dune", author: "Frank Herbert", rating: "⭐⭐⭐⭐⭐ (4.9)", price: "$15.99" },
      { id: 2, cover: Book9, title: "The Silent Patient", author: "Alex Michaelides", rating: "⭐⭐⭐⭐⭐ (4.7)", price: "$12.99" },
      { id: 3, cover: Book3, title: "Educated", author: "Tara Westover", rating: "⭐⭐⭐⭐⭐ (4.7)", price: "$13.99" }
    ],
    // Slide 1
    [
      { id: 4, cover: Book10, title: "Where the Crawdads Sing", author: "Delia Owens", rating: "⭐⭐⭐⭐⭐ (4.8)", price: "$14.99" },
      { id: 5, cover: Book2, title: "Atomic Habits", author: "James Clear", rating: "⭐⭐⭐⭐⭐ (4.8)", price: "$14.99" },
      { id: 6, cover: Book5, title: "The Midnight Library", author: "Matt Haig", rating: "⭐⭐⭐⭐⭐ (4.5)", price: "$16.99" }
    ],
    // Slide 2
    [
      { id: 7, cover: Book7, title: "The Seven Husbands", author: "Evelyn Hugo", rating: "⭐⭐⭐⭐⭐ (4.6)", price: "$15.99" },
      { id: 8, cover: Book1, title: "1984", author: "George Orwell", rating: "⭐⭐⭐⭐⭐ (4.7)", price: "$11.99" },
      { id: 9, cover: Book4, title: "The Hobbit", author: "J.R.R. Tolkien", rating: "⭐⭐⭐⭐⭐ (4.4)", price: "$22.99" }
    ]
  ];

  const scrollLeft = (type) => {
    if (type === 'recommended') {
      setCurrentRecommendedSlide(prev => Math.max(0, prev - 1));
    } else {
      setCurrentPopularSlide(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = (type) => {
    if (type === 'recommended') {
      setCurrentRecommendedSlide(prev => Math.min(2, prev + 1));
    } else {
      setCurrentPopularSlide(prev => Math.min(2, prev + 1));
    }
  };

  // Calculate transform for smooth sliding
  const getTransformStyle = (currentSlide) => {
    return {
      transform: `translateX(-${currentSlide * 33.333}%)`
    };
  };

  return (
    <MainLayout>
      <main>
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">Meet your next favorite book</h1>
              <p className="hero-description">
                Readova is a modern library management system that lets you
                access a vast collection of books, track your progress, get
                personalized recommendations, and enjoy flexible reading
                options.
              </p>
              <a href="/auth/register" className="btn btn-full margin-right-sm">
                Read now
              </a>
              <a href="/browse" className="btn btn-outline">
                Explore
              </a>
              <div className="community">
                <div className="community-imgs">
                  <img src={Customer1} alt="customer photo" />
                  <img src={Customer2} alt="customer photo" />
                  <img src={Customer3} alt="customer photo" />
                  <img src={Customer4} alt="customer photo" />
                  <img src={Customer5} alt="customer photo" />
                  <img src={Customer6} alt="customer photo" />
                </div>
                <p className="community-text">
                  <span>100K+</span>
                  <br />
                  Book Readers Worldwide
                </p>
              </div>
            </div>
            <div className="hero-img-box">
              <img
                src={Hero}
                alt="a person reading a book"
                className="hero-img"
              />
            </div>
          </div>
        </section>

        <section className="recommended">
          <div className="container">
            <div className="grid grid-2-col">
              <h2 className="heading-secondary">Recommended</h2>
            </div>

            {/* SCROLL WRAPPER */}
            <div className="scroll-wrapper">
              <div 
                className="scroll-container" 
                style={getTransformStyle(currentRecommendedSlide)}
              >
                {recommendedBooks.map((slide, slideIndex) => (
                  <div className="scroll-slide" key={slideIndex}>
                    {slide.map((book) => (
                      <div className="hm-books" key={book.id}>
                        <img src={book.cover} className="hm-cover" alt={book.title} />
                        <div className="hm-content">
                          <ul className="hm-attributes">
                            <li className="hm-attribute">
                              <h3>{book.title}</h3>
                            </li>
                            <li className="hm-attribute">
                              <p>{book.author}</p>
                            </li>
                            <li className="hm-attribute">
                              <div className="rating">{book.rating}</div>
                            </li>
                            <li className="hm-attribute">
                              <div className="price">{book.price}</div>
                            </li>
                          </ul>
                          <a href="#" className="btn btn-full btn-view">
                            View
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <MdChevronLeft
                className={`scroll-btn ${currentRecommendedSlide === 0 ? 'disabled' : ''}`}
                onClick={() => scrollLeft('recommended')}
              />
              <MdChevronRight
                className={`scroll-btn ${currentRecommendedSlide === 2 ? 'disabled' : ''}`}
                onClick={() => scrollRight('recommended')}
              />
            </div>
          </div>
        </section>

        <section className="popular">
          <div className="container">
            <h2 className="heading-secondary">Popular</h2>

            {/* SCROLL WRAPPER - Same structure as recommended */}
            <div className="scroll-wrapper">
              <div 
                className="scroll-container"
                style={getTransformStyle(currentPopularSlide)}
              >
                {popularBooks.map((slide, slideIndex) => (
                  <div className="scroll-slide" key={slideIndex}>
                    {slide.map((book) => (
                      <div className="hm-books" key={book.id}>
                        <img src={book.cover} className="hm-cover" alt={book.title} />
                        <div className="hm-content">
                          <ul className="hm-attributes">
                            <li className="hm-attribute">
                              <h3>{book.title}</h3>
                            </li>
                            <li className="hm-attribute">
                              <p>{book.author}</p>
                            </li>
                            <li className="hm-attribute">
                              <div className="rating">{book.rating}</div>
                            </li>
                            <li className="hm-attribute">
                              <div className="price">{book.price}</div>
                            </li>
                          </ul>
                          <a href="#" className="btn btn-full btn-view">
                            View
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <MdChevronLeft
                className={`scroll-btn ${currentPopularSlide === 0 ? 'disabled' : ''}`}
                onClick={() => scrollLeft('popular')}
              />
              <MdChevronRight
                className={`scroll-btn ${currentPopularSlide === 2 ? 'disabled' : ''}`}
                onClick={() => scrollRight('popular')}
              />
            </div>
          </div>
        </section>

        <section className="new-arrivals mrgn-btm-md">
          <div className="container">
            <h2 className="heading-secondary text-cntr">New Arrivals</h2>
            <p className="arr-description text-cntr font-one mrgn-btm-md">
              Stay up to date with the latest additions to our digital library.
              Discover newly released books across genres and start reading
              something fresh today.
            </p>
          </div>
          <div className="container grid grid-3-col font-one">
            <div className="hm-books">
              <img src={Book8} className="hm-cover" alt="book cover" />
              <div className="hm-content">
                <ul className="hm-attributes">
                  <li className="hm-attribute">
                    <h3>Dune</h3>
                  </li>
                  <li className="hm-attribute">
                    <p>Frank Herbert</p>
                  </li>
                  <li className="hm-attribute">
                    <div className="rating">⭐⭐⭐⭐⭐ (4.9)</div>
                  </li>
                  <li className="hm-attribute">
                    <div className="price">$15.99</div>
                  </li>
                </ul>
                <a href="#" className="btn btn-full btn-view">
                  View
                </a>
              </div>
            </div>
            <div className="hm-books">
              <img src={Book9} className="hm-cover" alt="book cover" />
              <div className="hm-content">
                <ul className="hm-attributes">
                  <li className="hm-attribute">
                    <h3>The Silent Patient</h3>
                  </li>
                  <li className="hm-attribute">
                    <p>Alex Michaelides</p>
                  </li>
                  <li className="hm-attribute">
                    <div className="rating">⭐⭐⭐⭐⭐ (4.7)</div>
                  </li>
                  <li className="hm-attribute">
                    <div className="price">$12.99</div>
                  </li>
                </ul>
                <a href="#" className="btn btn-full btn-view">
                  View
                </a>
              </div>
            </div>
            <div className="hm-books">
              <img src={Book3} className="hm-cover" alt="book cover" />
              <div className="hm-content">
                <ul className="hm-attributes">
                  <li className="hm-attribute">
                    <h3>Educated</h3>
                  </li>
                  <li className="hm-attribute">
                    <p>Tara Westover</p>
                  </li>
                  <li className="hm-attribute">
                    <div className="rating">⭐⭐⭐⭐⭐ (4.7)</div>
                  </li>
                  <li className="hm-attribute">
                    <div className="price">$13.99</div>
                  </li>
                </ul>
                <a href="#" className="btn btn-full btn-view">
                  View
                </a>
              </div>
            </div>
          </div>
          <div className="container view-all font-one mrgn-tp-md">
            <a href="/browse" className="link">
              View All &rarr;
            </a>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default IndexPage;