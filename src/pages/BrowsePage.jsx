import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import api from "../../api/axios";
import MainLayout from "../layouts/MainLayout.jsx";
import { Link, useLocation } from "react-router";

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
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/showbooks");
        const apiBooks = (res.data.books || []).map((book) => ({
          id: book.id,
          title: book.title,
          author: book.authors,
          rating: book.rating || "",
          categories: book.categories || "Unknown",
          price: book.price || "",
          availability: book.availability || "",
          img:
            book.thumbnail ||
            "https://via.placeholder.com/150x220?text=No+Image",
        }));

        //  Category grouping map
        const categoryGroups = {
          fiction: ["fiction", "novel", "literature", "drama"],
          "non-fiction": ["non-fiction", "biography", "history", "self-help", "education"],
          mystery: ["mystery", "thriller", "crime", "detective"],
          fantasy: ["fantasy", "adventure", "mythology", "magical"],
          "sci-fi": ["sci-fi", "science fiction", "space", "technology", "future"],
        };

        //  Function to normalize book category
        const mapToMainCategory = (cat) => {
          const normalized = cat.toLowerCase();
          for (const [main, keywords] of Object.entries(categoryGroups)) {
            if (keywords.some((k) => normalized.includes(k))) return main;
          }
          return "fiction"; // default fallback
        };

        //  Assign grouped categories to each book
        const groupedBooks = apiBooks.map((b) => ({
          ...b,
          categories: mapToMainCategory(b.categories),
        }));

        // Show only 5 filters in sidebar
        const visibleCategories = ["fiction", "non-fiction", "mystery", "fantasy", "sci-fi"];

        setBooks(groupedBooks);
        setFilteredBooks(groupedBooks);
        setCategories(visibleCategories);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  // Handle URL parameters for genre filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const genre = urlParams.get('genre');
    
    if (genre && categories.includes(genre)) {
      // Auto-select the genre filter when coming from navbar
      setFilters(prev => ({
        ...prev,
        categories: [genre]
      }));
      
      // Also check the corresponding checkbox
      setTimeout(() => {
        const checkbox = document.querySelector(`input[name="categories"][value="${genre}"]`);
        if (checkbox) {
          checkbox.checked = true;
        }
      }, 100);
    }
  }, [location.search, categories]);

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
    setSortBy(e.target.value);
  };

  // Apply filters and sorting
  const applyFiltersAndSorting = () => {
    let result = books;

    // Apply filters
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

    // Apply sorting
    result = sortBooks(result, sortBy);

    setFilteredBooks(result);
    setCurrentPage(0);
  };

  const sortBooks = (booksToSort, sortType) => {
    const sortedBooks = [...booksToSort];
    
    switch (sortType) {
      case "newest":
        // Assuming newer books have higher IDs - adjust based on your data
        return sortedBooks.sort((a, b) => b.id - a.id);
      
      case "price-low":
        return sortedBooks.sort((a, b) => (a.price || 0) - (b.price || 0));
      
      case "price-high":
        return sortedBooks.sort((a, b) => (b.price || 0) - (a.price || 0));
      
      case "popularity":
        // Assuming higher rating means more popular - adjust based on your data
        return sortedBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
      default:
        return sortedBooks;
    }
  };

  const handleApplyFilters = () => {
    applyFiltersAndSorting();
  };

  const handleReset = () => {
    setFilters({
      categories: [],
      rating: [],
      price: [],
      availability: [],
    });
    setSortBy("newest");
    setFilteredBooks(books);
    setCurrentPage(0);
    document
      .querySelectorAll('.filters input[type="checkbox"]')
      .forEach((cb) => (cb.checked = false));
    // Reset sort dropdown to default
    const sortSelect = document.getElementById("sort-by");
    if (sortSelect) sortSelect.value = "newest";
    
    // Clear URL parameters
    window.history.replaceState({}, '', '/browse');
  };

  // Apply sorting when sort option changes or filters change
  useEffect(() => {
    applyFiltersAndSorting();
  }, [sortBy, filters]);

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
            <h2>All Books</h2>
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