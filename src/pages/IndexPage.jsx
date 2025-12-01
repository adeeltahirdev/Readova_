import React, { useEffect, useState } from "react";
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
import api from "../../api/axios.js";

const IndexPage = () => {
  const [currentRecommendedSlide, setCurrentRecommendedSlide] = useState(0);
  const [currentPopularSlide, setCurrentPopularSlide] = useState(0);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [arrivals, setArrivals] = useState([]);

  // Fallback book data - grouped into slides of 3
  const fallbackRecommended = [
    [
      { id: 1, img: Book7, title: "The Silent Patient", author: "Alex Michaelides", rating: "4.7", price: "12.99" },
      { id: 2, img: Book1, title: "Dune", author: "Frank Herbert", rating: "4.9", price: "15.99" },
      { id: 3, img: Book4, title: "The Hobbit", author: "J.R.R. Tolkien", rating: "4.4", price: "22.99" }
    ],
    [
      { id: 4, img: Book2, title: "Atomic Habits", author: "James Clear", rating: "4.8", price: "14.99" },
      { id: 5, img: Book3, title: "Educated", author: "Tara Westover", rating: "4.7", price: "13.99" },
      { id: 6, img: Book5, title: "The Midnight Library", author: "Matt Haig", rating: "4.5", price: "16.99" }
    ],
    [
      { id: 7, img: Book6, title: "Project Hail Mary", author: "Andy Weir", rating: "4.9", price: "18.99" },
      { id: 8, img: Book8, title: "Klara and the Sun", author: "Kazuo Ishiguro", rating: "4.3", price: "15.99" },
      { id: 9, img: Book9, title: "The Invisible Life", author: "Addie LaRue", rating: "4.6", price: "17.99" }
    ]
  ];

  const fallbackPopular = [
    [
      { id: 1, img: Book8, title: "Dune", author: "Frank Herbert", rating: "4.9", price: "15.99" },
      { id: 2, img: Book9, title: "The Silent Patient", author: "Alex Michaelides", rating: "4.7", price: "12.99" },
      { id: 3, img: Book3, title: "Educated", author: "Tara Westover", rating: "4.7", price: "13.99" }
    ],
    [
      { id: 4, img: Book10, title: "Where the Crawdads Sing", author: "Delia Owens", rating: "4.8", price: "14.99" },
      { id: 5, img: Book2, title: "Atomic Habits", author: "James Clear", rating: "4.8", price: "14.99" },
      { id: 6, img: Book5, title: "The Midnight Library", author: "Matt Haig", rating: "4.5", price: "16.99" }
    ],
    [
      { id: 7, img: Book7, title: "The Seven Husbands", author: "Evelyn Hugo", rating: "4.6", price: "15.99" },
      { id: 8, img: Book1, title: "1984", author: "George Orwell", rating: "4.7", price: "11.99" },
      { id: 9, img: Book4, title: "The Hobbit", author: "J.R.R. Tolkien", rating: "4.4", price: "22.99" }
    ]
  ];

  const fallbackArrivals = [
    { id: 1, img: Book8, title: "Dune", author: "Frank Herbert", rating: "4.9", price: "15.99" },
    { id: 2, img: Book9, title: "The Silent Patient", author: "Alex Michaelides", rating: "4.7", price: "12.99" },
    { id: 3, img: Book3, title: "Educated", author: "Tara Westover", rating: "4.7", price: "13.99" }
  ];

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
          img: book.thumbnail || "https://via.placeholder.com/150x220?text=No+Image",
        }));

        // Use API data if available, otherwise use fallback
        if (apiBooks.length >= 9) {
          // Group into slides of 3 books each
          const recommendedSlides = [
            apiBooks.slice(0, 3),
            apiBooks.slice(3, 6),
            apiBooks.slice(6, 9)
          ];
          const popularSlides = [
            apiBooks.slice(0, 3),
            apiBooks.slice(3, 6),
            apiBooks.slice(6, 9)
          ];
          const arrivalBooks = apiBooks.slice(0, 3);
          
          setRecommendedBooks(recommendedSlides);
          setPopularBooks(popularSlides);
          setArrivals(arrivalBooks);
        } else {
          // Use fallback data if not enough API data
          setRecommendedBooks(fallbackRecommended);
          setPopularBooks(fallbackPopular);
          setArrivals(fallbackArrivals);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        // Use fallback data on error
        setRecommendedBooks(fallbackRecommended);
        setPopularBooks(fallbackPopular);
        setArrivals(fallbackArrivals);
      }
    };

    fetchBooks();
  }, []);

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
      transform: `translateX(-${currentSlide * 100}%)`
    };
  };

  // Helper function to generate star rating
  const generateStars = (rating) => {
    if (!rating) return "⭐⭐⭐⭐⭐ (N/A)";
    const numRating = parseFloat(rating);
    const stars = "⭐".repeat(5);
    return `${stars} (${numRating.toFixed(1)})`;
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
                        <img src={book.img} className="hm-cover" alt={book.title} />
                        <div className="hm-content">
                          <ul className="hm-attributes">
                            <li className="hm-attribute">
                              <h3>{book.title}</h3>
                            </li>
                            <li className="hm-attribute">
                              <p>{book.author}</p>
                            </li>
                            <li className="hm-attribute">
                              <div className="rating">{generateStars(book.rating)}</div>
                            </li>
                            <li className="hm-attribute">
                              <div className="price">PKR {book.price}</div>
                            </li>
                          </ul>
                          <a href={`/book/${book.id}`} className="btn btn-full btn-view">
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

            {/* SCROLL WRAPPER */}
            <div className="scroll-wrapper">
              <div 
                className="scroll-container"
                style={getTransformStyle(currentPopularSlide)}
              >
                {popularBooks.map((slide, slideIndex) => (
                  <div className="scroll-slide" key={slideIndex}>
                    {slide.map((book) => (
                      <div className="hm-books" key={book.id}>
                        <img src={book.img} className="hm-cover" alt={book.title} />
                        <div className="hm-content">
                          <ul className="hm-attributes">
                            <li className="hm-attribute">
                              <h3>{book.title}</h3>
                            </li>
                            <li className="hm-attribute">
                              <p>{book.author}</p>
                            </li>
                            <li className="hm-attribute">
                              <div className="rating">{generateStars(book.rating)}</div>
                            </li>
                            <li className="hm-attribute">
                              <div className="price">PKR {book.price}</div>
                            </li>
                          </ul>
                          <a href={`/book/${book.id}`} className="btn btn-full btn-view">
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
            {arrivals.map((book) => (
              <div className="hm-books" key={book.id}>
                <img src={book.img} className="hm-cover" alt={book.title} />
                <div className="hm-content">
                  <ul className="hm-attributes">
                    <li className="hm-attribute">
                      <h3>{book.title}</h3>
                    </li>
                    <li className="hm-attribute">
                      <p>{book.author}</p>
                    </li>
                    <li className="hm-attribute">
                      <div className="rating">{generateStars(book.rating)}</div>
                    </li>
                    <li className="hm-attribute">
                      <div className="price">PKR {book.price}</div>
                    </li>
                  </ul>
                  <a href={`/book/${book.id}`} className="btn btn-full btn-view">
                    View
                  </a>
                </div>
              </div>
            ))}
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