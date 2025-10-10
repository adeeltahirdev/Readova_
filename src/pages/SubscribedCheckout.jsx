import React from "react";
import CheckLayout from "../layouts/CheckLayout";

const SubscribedCheckout = () => {
  const books = [
    {
      title: "The Time Keeper",
      author: "Mitch Albom",
      price: 350,
      image: "https://via.placeholder.com/100",
    },
    {
      title: "Digital Fortress",
      author: "Dan Brown",
      price: 500,
      image: "https://via.placeholder.com/100",
    },
  ];

  return (
    <CheckLayout>
      <div className="checkout-container">
        <div className="checkout-left">
          <h2>Books You're Borrowing</h2>
          {books.length === 0 ? (
            <p>No books added to checkout.</p>
          ) : (
            books.map((book, index) => (
              <div key={index} className="book-detail">
                <img src={book.image} alt={book.title} className="book-image" />
                <div>
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Free for subscribed members</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="checkout-right">
          <h2>Order Summary</h2>
          {books.length === 0 ? (
            <p>No books in the summary.</p>
          ) : (
            <>
              {books.map((book, index) => (
                <div key={index} className="summary-item">
                  <p>
                    <strong>{book.title}</strong>
                  </p>
                  <p>Author: {book.author}</p>
                  <p>
                    Price: <s>Rs. {book.price}</s>{" "}
                    <span style={{ color: "green" }}>Free</span>
                  </p>
                </div>
              ))}
              <h3>Total: Rs. 0</h3>
              <button className="checkout-button">Checkout</button>
            </>
          )}
        </div>
      </div>
    </CheckLayout>
  );
};

export default SubscribedCheckout;
