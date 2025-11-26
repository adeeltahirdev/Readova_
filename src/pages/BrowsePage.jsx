import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import api from "../../api/axios";
import MainLayout from "../layouts/MainLayout.jsx";
import { Link, useSearchParams } from "react-router-dom";
const BrowsePage = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    rating: [],
    price: [],
    availability: [],
    searchQuery: "" 
  });
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const visibleCategories = ["fiction", "non-fiction", "mystery", "fantasy", "sci-fi"];
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/showbooks");
        const apiBooks = (res.data.books || []).map((book) => ({
          id: book.id,
          title: book.title,
          author: book.authors,
          rating: book.rating || 0,
          categories: book.categories || "Unknown",
          price: book.price || 0,
          availability: book.availability || "",
          img: book.thumbnail || "https://via.placeholder.com/150x220?text=No+Image",
        }));

        const categoryGroups = {
          fiction: ["fiction", "novel", "literature", "drama"],
          "non-fiction": ["non-fiction", "biography", "history", "self-help", "education"],
          mystery: ["mystery", "thriller", "crime", "detective"],
          fantasy: ["fantasy", "adventure", "mythology", "magical"],
          "sci-fi": ["sci-fi", "science fiction", "space", "technology", "future"],
        };

        const mapToMainCategory = (cat) => {
          const normalized = (cat || "").toLowerCase();
          for (const [main, keywords] of Object.entries(categoryGroups)) {
            if (keywords.some((k) => normalized.includes(k))) return main;
          }
          return "fiction";
        };
        const groupedBooks = apiBooks.map((b) => ({
          ...b,
          categories: mapToMainCategory(b.categories),
        }));

        setBooks(groupedBooks);
        setCategories(visibleCategories);
        const queryQ = searchParams.get("q");
        let initialFilters = {
             categories: [],
             rating: [],
             price: [],
             availability: [],
             searchQuery: ""
        };
        if (queryQ) {
            const lowerQ = queryQ.toLowerCase();
            if (visibleCategories.includes(lowerQ)) {
                initialFilters.categories = [lowerQ];
            } else {
                initialFilters.searchQuery = lowerQ;
            }
        }
        setFilters(initialFilters);
        filterAndSort(groupedBooks, initialFilters, sortBy);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, [searchParams]);
  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      const updated = checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((val) => val !== value);
      return { ...prevFilters, [name]: updated };
    });
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    const sorted = sortBooks(filteredBooks, newSort);
    setFilteredBooks(sorted);
  };
  const filterAndSort = (sourceBooks, currentFilters, currentSort) => {
      let result = sourceBooks;
      if (currentFilters.categories.length > 0) {
        result = result.filter((book) =>
          currentFilters.categories.includes(book.categories)
        );
      }
      if (currentFilters.rating.length > 0) {
        result = result.filter((book) =>
          currentFilters.rating.some((r) => book.rating >= parseInt(r))
        );
      }
      if (currentFilters.price.length > 0) {
        result = result.filter((book) => {
          return currentFilters.price.some((priceRange) => {
            if (priceRange === "0-10") return book.price < 10;
            if (priceRange === "10-20") return book.price >= 10 && book.price <= 20;
            if (priceRange === "20+") return book.price > 20;
            return false;
          });
        });
      }
      if (currentFilters.searchQuery) {
          const q = currentFilters.searchQuery.toLowerCase();
          result = result.filter(book => 
              book.title.toLowerCase().includes(q) || 
              book.author.toLowerCase().includes(q)
          );
      }
      result = sortBooks(result, currentSort);
      setFilteredBooks(result);
      setCurrentPage(0);
  };

  const sortBooks = (booksToSort, sortType) => {
    const sortedBooks = [...booksToSort];
    switch (sortType) {
      case "newest":
        return sortedBooks.sort((a, b) => b.id - a.id);
      case "price-low":
        return sortedBooks.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedBooks.sort((a, b) => b.price - a.price);
      case "popularity":
        return sortedBooks.sort((a, b) => b.rating - a.rating);
      default:
        return sortedBooks;
    }
  };

  const handleApplyFilters = () => {
    filterAndSort(books, filters, sortBy);
  };

  const handleReset = () => {
    const resetFilters = {
      categories: [],
      rating: [],
      price: [],
      availability: [],
      searchQuery: ""
    };
    setFilters(resetFilters);
    setSortBy("newest");
    filterAndSort(books, resetFilters, "newest");
  };
  const pageCount = Math.ceil(filteredBooks.length / itemsPerPage);
  const startOffset = currentPage * itemsPerPage;
  const currentItems = filteredBooks.slice(startOffset, startOffset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    window.scrollTo(0, 0);
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
                    checked={filters.categories.includes(cat)}
                    onChange={handleFilterChange}
                    checked={filters.categories.includes(cat)}
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
                  checked={filters.rating.includes(String(r))}
                  onChange={handleFilterChange}
                  checked={filters.rating.includes(r.toString())}
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
                checked={filters.price.includes("0-10")}
                onChange={handleFilterChange}
                checked={filters.price.includes("0-10")}
              />
              Under $10
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="10-20"
                checked={filters.price.includes("10-20")}
                onChange={handleFilterChange}
                checked={filters.price.includes("10-20")}
              />
              $10 - $20
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="20+"
                checked={filters.price.includes("20+")}
                onChange={handleFilterChange}
                checked={filters.price.includes("20+")}
              />
              Over $20
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
            <h2>
                {filters.categories.length > 0 
                    ? `Genre: ${filters.categories.join(", ")}` 
                    : filters.searchQuery 
                        ? `Search: "${filters.searchQuery}"`
                        : "All Books"
                }
            </h2>
            <div className="sort-options">
              <label>Sort By:</label>
              <select id="sort-by" onChange={handleSortChange} value={sortBy}>
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
                  <Link to={`/book/${book.id}`} className="btn btn-full btn-view">View</Link>
                </div>
              </div>
            ))}

            {currentItems.length === 0 && (
              <div style={{gridColumn: "1 / -1", textAlign: "center", padding: "40px"}}>
                <p>No books match the selected filters.</p>
                <button onClick={handleReset} style={{marginTop: "10px", color: "blue", background: "none", border: "underline", cursor: "pointer"}}>Clear all filters</button>
              </div>
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