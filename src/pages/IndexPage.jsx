import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
const chunkArray = (array, size) => {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
};

const IndexPage = () => {
  const [currentRecommendedSlide, setCurrentRecommendedSlide] = useState(0);
  const [currentPopularSlide, setCurrentPopularSlide] = useState(0);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [arrivals, setArrivals] = useState([]);

  const allFallbackBooks = [
    { id: 1, img: Book7, title: "The Silent Patient", author: "Alex Michaelides", rating: "4.7", price: "12.99" },
    { id: 2, img: Book1, title: "Dune", author: "Frank Herbert", rating: "4.9", price: "15.99" },
    { id: 3, img: Book4, title: "The Hobbit", author: "J.R.R. Tolkien", rating: "4.4", price: "22.99" },
    { id: 4, img: Book2, title: "Atomic Habits", author: "James Clear", rating: "4.8", price: "14.99" },
    { id: 5, img: Book3, title: "Educated", author: "Tara Westover", rating: "4.7", price: "13.99" },
    { id: 6, img: Book5, title: "The Midnight Library", author: "Matt Haig", rating: "4.5", price: "16.99" },
    { id: 7, img: Book6, title: "Project Hail Mary", author: "Andy Weir", rating: "4.9", price: "18.99" },
    { id: 8, img: Book8, title: "Klara and the Sun", author: "Kazuo Ishiguro", rating: "4.3", price: "15.99" },
    { id: 9, img: Book9, title: "The Invisible Life", author: "Addie LaRue", rating: "4.6", price: "17.99" },
    { id: 10, img: Book10, title: "Where the Crawdads Sing", author: "Delia Owens", rating: "4.8", price: "14.99" }
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      let booksToProcess = [];
      try {
        const res = await api.get("/showbooks");
        const apiBooks = (res.data.books || []).map((book) => ({
          id: book.id,
          title: book.title,
          author: book.authors,
          rating: book.rating, 
          price: book.price || "1200",
          img: book.thumbnail || "https://via.placeholder.com/150x220?text=No+Image",
        }));

        if (apiBooks.length > 0) {
            booksToProcess = apiBooks;
        } else {
            booksToProcess = allFallbackBooks;
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        booksToProcess = allFallbackBooks;
      }
      const shuffledRec = shuffleArray(booksToProcess);
      const recSlides = chunkArray(shuffledRec.slice(0, 9), 3);
      setRecommendedBooks(recSlides);

      const shuffledPop = shuffleArray(booksToProcess);
      const popSlides = chunkArray(shuffledPop.slice(0, 9), 3);
      setPopularBooks(popSlides);

      const shuffledArr = shuffleArray(booksToProcess);
      setArrivals(shuffledArr.slice(0, 3)); 
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
    const maxRec = recommendedBooks.length - 1;
    const maxPop = popularBooks.length - 1;
    if (type === 'recommended') {
      setCurrentRecommendedSlide(prev => Math.min(maxRec, prev + 1));
    } else {
      setCurrentPopularSlide(prev => Math.min(maxPop, prev + 1));
    }
  };

  const getTransformStyle = (currentSlide) => {
    return {
      transform: `translateX(-${currentSlide * 100}%)`
    };
  };
  const generateStars = (rating) => {
    if (!rating || rating === 0 || rating === "0") {
        return "⭐ (N/A)";
    }
    const numRating = parseFloat(rating);
    return `${"⭐".repeat(numRating)}`; 
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
              <Link to="/auth/register" className="btn btn-full margin-right-sm">
                Read now
              </Link>
              <Link to="/browse" className="btn btn-outline">
                Explore
              </Link>
              
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

            <div className="scroll-wrapper">
              <div 
                className="scroll-container" 
                style={getTransformStyle(currentRecommendedSlide)}
              >
                {recommendedBooks.length > 0 ? (
                    recommendedBooks.map((slide, slideIndex) => (
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
                            <Link to={`/book/${book.id}`} className="btn btn-full btn-view">
                                View
                            </Link>
                            </div>
                        </div>
                        ))}
                    </div>
                    ))
                ) : (
                    <p style={{padding: "20px"}}>Loading recommendations...</p>
                )}
              </div>
              <MdChevronLeft
                className={`scroll-btn ${currentRecommendedSlide === 0 ? 'disabled' : ''}`}
                onClick={() => scrollLeft('recommended')}
              />
              <MdChevronRight
                className={`scroll-btn ${currentRecommendedSlide === (recommendedBooks.length - 1) ? 'disabled' : ''}`}
                onClick={() => scrollRight('recommended')}
              />
            </div>
          </div>
        </section>

        <section className="popular">
          <div className="container">
            <h2 className="heading-secondary">Popular</h2>

            <div className="scroll-wrapper">
              <div 
                className="scroll-container"
                style={getTransformStyle(currentPopularSlide)}
              >
                 {popularBooks.length > 0 ? (
                    popularBooks.map((slide, slideIndex) => (
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
                            <Link to={`/book/${book.id}`} className="btn btn-full btn-view">
                                View
                            </Link>
                            </div>
                        </div>
                        ))}
                    </div>
                    ))
                 ) : (
                    <p style={{padding: "20px"}}>Loading popular books...</p>
                 )}
              </div>

              <MdChevronLeft
                className={`scroll-btn ${currentPopularSlide === 0 ? 'disabled' : ''}`}
                onClick={() => scrollLeft('popular')}
              />
              <MdChevronRight
                className={`scroll-btn ${currentPopularSlide === (popularBooks.length - 1) ? 'disabled' : ''}`}
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
                  <Link to={`/book/${book.id}`} className="btn btn-full btn-view">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="container view-all font-one mrgn-tp-md">
            <Link to="/browse" className="link">
              View All &rarr;
            </Link>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default IndexPage;