import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import api from "../../api/axios";
import MainLayout from "../layouts/MainLayout.jsx";

const BrowsePage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    rating: [],
    price: [],
    availability: [],
  });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/showbooks");

        const apiBooks = (res.data.books || []).map((book) => ({
          title: book.title,
          author: book.author,
          rating: book.rating || "",
          categories: book.categories || "Unknown",
          price: book.price || "",
          availability: book.availability || "",
          img:
            book.thumbnail ||
            "https://via.placeholder.com/150x220?text=No+Image",
        }));
        const uniqueCategories = [...new Set(apiBooks.map((b) => b.categories))];
        setBooks(apiBooks);
        setFilteredBooks(apiBooks);
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

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
    let result = books;

    if (filters.categories.length > 0) {
      result = result.filter((book) =>
        filters.categories.includes(book.categories)
      );
    }

    if (filters.rating.length > 0) {
      result = result.filter((book) =>
        filters.rating.some((r) => book.rating >= parseInt(r))
      );
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
      categories: [],
      rating: [],
      price: [],
      availability: [],
    });
    setFilteredBooks(books);
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
            <h4>Category</h4>
            {categories.length > 0 ? (
              categories.map((cat, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    name="categories"
                    value={cat}
                    onChange={handleFilterChange}
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
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
                <img src={book.img} alt={book.title} />
                <div className="b-book-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <div className="b-rating">
                    {book.rating ? `⭐ ${book.rating}` : "⭐ N/A"}
                  </div>
                  <div className="b-price">
                    {book.price ? `$${book.price}` : "Price not set"}
                  </div>
                  <div className="b-category">{book.categories}</div>
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
