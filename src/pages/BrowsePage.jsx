import React, { useState } from "react";
import ReactPaginate from "react-paginate";
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
const booksData = [
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.7,
    genre: "fiction",
    price: 12.99,
    availability: "available",
    img: Book1,
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    rating: 4.9,
    genre: "fantasy",
    price: 15.99,
    availability: "available",
    img: Book2,
  },
  {
    title: "Educated",
    author: "Tara Westover",
    rating: 4.5,
    genre: "non-fiction",
    price: 9.99,
    availability: "preorder",
    img: Book3,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    rating: 4.8,
    genre: "fantasy",
    price: 22.99,
    availability: "available",
    img: Book4,
  },
  {
    title: "Something1",
    author: "Alex Michaelides",
    rating: 4.7,
    genre: "fiction",
    price: 12.99,
    availability: "available",
    img: Book5,
  },
  {
    title: "Something2",
    author: "Frank Herbert",
    rating: 4.9,
    genre: "fantasy",
    price: 15.99,
    availability: "available",
    img: Book6,
  },
  {
    title: "Something3",
    author: "Tara Westover",
    rating: 4.5,
    genre: "non-fiction",
    price: 9.99,
    availability: "preorder",
    img: Book7,
  },
  {
    title: "Something4",
    author: "J.R.R. Tolkien",
    rating: 4.8,
    genre: "fantasy",
    price: 22.99,
    availability: "available",
    img: Book8,
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.7,
    genre: "fiction",
    price: 12.99,
    availability: "available",
    img: Book9,
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    rating: 4.9,
    genre: "fantasy",
    price: 15.99,
    availability: "available",
    img: Book10,
  },
  {
    title: "Educated",
    author: "Tara Westover",
    rating: 4.5,
    genre: "non-fiction",
    price: 9.99,
    availability: "preorder",
    img: Book3,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    rating: 4.8,
    genre: "fantasy",
    price: 22.99,
    availability: "available",
    img: Book6,
  },
  {
    title: "Something1",
    author: "Alex Michaelides",
    rating: 4.7,
    genre: "fiction",
    price: 12.99,
    availability: "available",
    img: Book2,
  },
  {
    title: "Something2",
    author: "Frank Herbert",
    rating: 4.9,
    genre: "fantasy",
    price: 15.99,
    availability: "available",
    img: Book5,
  },
  {
    title: "Something3",
    author: "Tara Westover",
    rating: 4.5,
    genre: "non-fiction",
    price: 9.99,
    availability: "preorder",
    img: Book9,
  },
  {
    title: "Something4",
    author: "J.R.R. Tolkien",
    rating: 4.8,
    genre: "fantasy",
    price: 22.99,
    availability: "available",
    img: Book1,
  },
  // Add more books as needed
];

const BrowsePage = () => {
  const [filters, setFilters] = useState({
    genre: [],
    rating: [],
    price: [],
    availability: [],
  });

  const [filteredBooks, setFilteredBooks] = useState(booksData);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      const updated = checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((val) => val !== value);
      return { ...prevFilters, [name]: updated };
    });
  };

  const handleApplyFilters = () => {
    let result = booksData;

    if (filters.genre.length > 0) {
      result = result.filter((book) => filters.genre.includes(book.genre));
    }

    if (filters.rating.length > 0) {
      result = result.filter((book) => {
        return filters.rating.some((r) => book.rating >= parseInt(r));
      });
    }

    if (filters.price.length > 0) {
      result = result.filter((book) => {
        return filters.price.some((priceRange) => {
          if (priceRange === "0-10") return book.price < 10;
          if (priceRange === "10-20")
            return book.price >= 10 && book.price <= 20;
          if (priceRange === "20+") return book.price > 20;
          return false;
        });
      });
    }

    if (filters.availability.length > 0) {
      result = result.filter((book) =>
        filters.availability.includes(book.availability)
      );
    }

    setFilteredBooks(result);
    setCurrentPage(0);
  };

  const handleReset = () => {
    setFilters({
      genre: [],
      rating: [],
      price: [],
      availability: [],
    });
    setFilteredBooks(booksData);
    setCurrentPage(0);
    document
      .querySelectorAll('.filters input[type="checkbox"]')
      .forEach((cb) => (cb.checked = false));
  };

  const pageCount = Math.ceil(filteredBooks.length / itemsPerPage);
  const startOffset = currentPage * itemsPerPage;
  const currentItems = filteredBooks.slice(
    startOffset,
    startOffset + itemsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <MainLayout>
      <section className="browse-container">
        <aside className="filters">
          <h3>Filters</h3>

          <div className="filter-group">
            <h4>Genre</h4>
            {["fiction", "non-fiction", "fantasy", "mystery"].map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  name="genre"
                  value={genre}
                  onChange={handleFilterChange}
                />
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Rating</h4>
            {[5, 4, 3].map((r) => (
              <label key={r}>
                <input
                  type="checkbox"
                  name="rating"
                  value={r}
                  onChange={handleFilterChange}
                />
                {"⭐".repeat(r)} ({r}+)
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Price</h4>
            <label>
              <input
                type="checkbox"
                name="price"
                value="0-10"
                onChange={handleFilterChange}
              />
              Under $10
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="10-20"
                onChange={handleFilterChange}
              />
              $10 - $20
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="20+"
                onChange={handleFilterChange}
              />
              Over $20
            </label>
          </div>

          <div className="filter-group">
            <h4>Availability</h4>
            <label>
              <input
                type="checkbox"
                name="availability"
                value="available"
                onChange={handleFilterChange}
              />
              Available Now
            </label>
            <label>
              <input
                type="checkbox"
                name="availability"
                value="preorder"
                onChange={handleFilterChange}
              />
              Pre-Order
            </label>
          </div>

          <button className="btn-apply" onClick={handleApplyFilters}>
            Apply Filters
          </button>
          <button className="btn-reset" onClick={handleReset}>
            Reset
          </button>
        </aside>

        <main className="book-listing">
          <div className="listing-header">
            <h2>All Books</h2>
            <div className="sort-options">
              <label>Sort By:</label>
              <select id="sort-by">
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>

          <div className="b-book-grid">
            {currentItems.map((book, index) => (
              <div className="b-book-card" key={index}>
                <img src={book.img} alt="Book Cover" />
                <div className="b-book-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <div className="b-rating">⭐⭐⭐⭐⭐ ({book.rating})</div>
                  <div className="b-price">${book.price}</div>
                  <button className="b-btn-view">View</button>
                </div>
              </div>
            ))}
            {currentItems.length === 0 && (
              <p>No books match the selected filters.</p>
            )}
          </div>

          <div className="pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< Prev"
              containerClassName="pagination"
              activeClassName="active"
              pageClassName="page-item"
              previousClassName="btn-prev"
              nextClassName="btn-next"
              disabledClassName="disabled"
            />
          </div>
        </main>
      </section>
    </MainLayout>
  );
};

export default BrowsePage;
