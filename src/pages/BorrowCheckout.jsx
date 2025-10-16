import React, { useState } from "react";
import CheckLayout from "../layouts/CheckLayout";


const BorrowCheckout = () => {
  const [days, setDays] = useState(7);
  const [error, setError] = useState("");

  const books = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      pricePerDay: 30,
      image: "https://via.placeholder.com/100x150",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      pricePerDay: 40,
      image: "https://via.placeholder.com/100x150",
    },
  ];

  const total = books.reduce((acc, book) => acc + book.pricePerDay * days, 0);

  const handleDaysChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 30) {
      setError("Days must be between 1 and 30");
    } else {
      setError("");
      setDays(value);
    }
  };

  const handleCheckout = () => {
    alert("Checkout complete! (demo)");
  };

  return (
    <CheckLayout>
      <div className="checkout-container">
        {/* Left Section */}
        <div className="checkout-left">
          <h2 className="checkout-heading">Books You're Borrowing</h2>
          {books.map((book, index) => (
            <div key={index} className="book-detail">
              <img src={book.image} alt={book.title} className="book-image" />
              <div>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Borrowing for {days} days</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="checkout-right">
          <h2 className="checkout-heading">Order Summary</h2>

          <label className="days-label">
            Days to Borrow:
            <input
              type="number"
              value={days}
              min={1}
              max={30}
              onChange={handleDaysChange}
              className="days-input"
            />
          </label>

          {error && <p className="days-error">{error}</p>}

          {books.map((book, index) => (
            <div key={index} className="summary-item">
              <p>
                <strong>{book.title}</strong>
              </p>
              <p>Author: {book.author}</p>
              <p>Price per day: Rs. {book.pricePerDay}</p>
              <p>Total: Rs. {book.pricePerDay * days}</p>
            </div>
          ))}

          <h3 className="total-text">Total: Rs. {total}</h3>

          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={!!error}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </CheckLayout>
  );
};

export default BorrowCheckout;
