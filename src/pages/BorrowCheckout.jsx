import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import CheckLayout from "../layouts/CheckLayout";
import api from "../../api/axios.js"; 
import { toast } from "react-toastify";

const BorrowCheckout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const userId = localStorage.getItem("userId") || localStorage.getItem("id");
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await api.get(`/books/${id}`);
        if (data && data.book) {
          setBook(data.book);
        } else {
          toast.error("Book data missing");
          navigate("/library");
        }
      } catch (err) {
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id, navigate]);

  const pricePerDay = book ? parseFloat(book.price) : 0;
  const total = (pricePerDay * days).toFixed(2);

  const handleDaysChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 7) {
      setError("Days must be between 1 and 7");
    } else {
      setError("");
      setDays(value);
    }
  };
  const handleCheckout = async () => {
    if (!userId) {
        toast.error("User not found. Please login again.");
        return;
    }
    if (error || days < 1) return;
    
    setProcessing(true);

    try {
      const payload = {
        user_id: userId, 
        book_id: book.id,
        days: days
      };

      const response = await api.post('/borrow', payload);
      
      if(response.status === 200) {
        toast.success("Borrow successful!");
        navigate(`/preview/${book.id}`);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!book) return null;

  return (
    <CheckLayout>
      <div className="checkout-container">
        <div className="checkout-left">
          <h2 className="checkout-heading">Confirm Borrowing</h2>
          <div className="book-detail">
            {book.thumbnail && <img src={book.thumbnail} alt={book.title} className="book-image" />}
            <div>
              <h3>{book.title}</h3>
              <p>Author: {book.authors}</p>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <h2 className="checkout-heading">Order Summary</h2>
          <label className="days-label">
            Days: <input type="number" value={days} min={1} max={30} onChange={handleDaysChange} className="days-input" />
          </label>
          {error && <p className="days-error">{error}</p>}
          
          <div className="summary-item">
             <p>Price: Rs. {pricePerDay} / day</p>
          </div>
          
          <h3 className="total-text">Total: Rs. {total}</h3>

          <button className="checkout-button" onClick={handleCheckout} disabled={!!error || processing}>
            {processing ? "Processing..." : "Confirm & Borrow"}
          </button>
        </div>
      </div>
    </CheckLayout>
  );
};

export default BorrowCheckout;