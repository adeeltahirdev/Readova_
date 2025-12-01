import React, { useState, useEffect } from "react";
import CheckLayout from "../layouts/CheckLayout";
import api from "../../api/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../assets/css/Subscriptioncheckout.css";

const FIXED_PRICES = {
    basic: 9.99,
    premium: 19.99,
};

const SubscriptionCheckout = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId") || localStorage.getItem("id");
    const planType = localStorage.getItem("planType") || "basic";

    useEffect(() => {
        if (planType === 'basic') {
            const fetchBooks = async () => {
                try {
                    const { data } = await api.get("/subscriptions/books");
                    setBooks(data.books || []);
                } catch (error) {
                    toast.error("Failed to fetch books");
                } finally {
                    setLoading(false);
                }
            };
            fetchBooks();
        } else {
            setLoading(false);
        }
    }, [planType]);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddBook = (book) => {
        if (selectedBooks.length >= 10) return;
        setSelectedBooks([...selectedBooks, book]);
        setBooks(books.filter((b) => b.id !== book.id));
    };

    const handleRemoveBook = (book) => {
        setSelectedBooks(selectedBooks.filter((b) => b.id !== book.id));
        setBooks([...books, book]);
    };

    const handleCheckout = async () => {
        if (!userId) {
            toast.error("User not logged in");
            return;
        }
        const priceToSend = FIXED_PRICES[planType];
        setProcessing(true);
        try {
            const response = await api.post("/subscriptions/checkout", {
                plan_type: planType,
                selected_books: planType === "basic" ? selectedBooks.map(b => b.id) : [],
                user_id: userId,
                price: priceToSend, 
            });

            if (response.status === 200) {
                toast.success(`Subscription successful! Welcome to ${planType} plan.`);
                navigate("/library");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Subscription failed");
        } finally {
            setProcessing(false);
        }
    };

    const currentPlanPrice = FIXED_PRICES[planType];
    if (loading) return <div className="p-10 text-center">Loading...</div>;
    
    if (planType === 'premium') {
        return (
            <CheckLayout>
                <div className="checkout-container" style={{
                    display:'flex', 
                    flexDirection:'column', 
                    alignItems:'center', 
                    justifyContent:'center', 
                    minHeight:'60vh',
                    textAlign: 'center'
                }}>
                    <h1 className="heading-primary">Confirm Premium Subscription</h1>
                    <p style={{fontSize:'1.2rem', margin:'20px 0', maxWidth:'600px'}}>
                        You are about to subscribe to the **Premium Plan**. You will get unlimited access to **ALL** books in our library for 1 month.
                    </p>
                    <div className="price-tag" style={{fontSize: "2rem", color: "#28a745", fontWeight: "bold", marginBottom: "30px"}}>
                        PKR{currentPlanPrice.toFixed(2)} / month
                    </div>
                    <button
                        className="checkout-button"
                        onClick={handleCheckout}
                        disabled={processing}
                        style={{padding: "15px 40px", fontSize: "1.2rem", maxWidth: "300px", borderRadius: "8px", border: "none", background: "#28a745", color: "white", cursor: "pointer"}}
                    >
                        {processing ? "Processing..." : "Confirm & Subscribe"}
                    </button>
                </div>
            </CheckLayout>
        );
    }

    return (
        <CheckLayout>
            <div className="checkout-container">
                <div className="checkout-left">
                    <div className="checkout-header">
                        <h2>Select Books</h2> 
                        <p>Plan Price: <span style={{color: '#2563eb', fontWeight: '700'}}>PKR{currentPlanPrice.toFixed(2)}/month</span></p>
                    </div>
                    
                    <input
                        type="text"
                        placeholder="Search for books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-box"
                    />
                    
                    <div className="book-list-scroll">
                        {filteredBooks.length === 0 ? (
                            <div style={{textAlign: 'center', padding: '40px', color: '#9ca3af'}}>
                                <p>No books found matching your search.</p>
                            </div>
                        ) : (
                            filteredBooks.map((book) => (
                                <div key={book.id} className="book-detail">
                                    {book.thumbnail && (
                                        <img src={book.thumbnail} alt={book.title} className="book-image" />
                                    )}
                                    <div className="book-info-text">
                                        <h3>{book.title}</h3>
                                        <p>Author: {book.authors || book.author}</p>
                                    </div>
                                    <button
                                        className="add-button"
                                        onClick={() => handleAddBook(book)}
                                        disabled={selectedBooks.length >= 10}
                                    >
                                        Add +
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="checkout-right">
                    <div className="checkout-header">
                        <h2>Selected Books <span style={{fontSize: '0.9em', color: '#6b7280', fontWeight: 'normal', marginLeft: '5px'}}>({selectedBooks.length}/10)</span></h2>
                        <p>Review your selection before subscribing</p>
                    </div>

                    <div className="book-list-scroll">
                        {selectedBooks.length === 0 ? (
                            <div style={{textAlign: 'center', padding: '40px', color: '#9ca3af', border: '2px dashed #e5e7eb', borderRadius: '12px', marginTop: '10px'}}>
                                <p>No books selected yet.</p>
                                <p style={{fontSize: '0.85rem', marginTop: '5px'}}>Select up to 10 books from the left to continue.</p>
                            </div>
                        ) : (
                            selectedBooks.map((book) => (
                                <div key={book.id} className="book-detail selected">
                                     {book.thumbnail && (
                                        <img src={book.thumbnail} alt={book.title} className="book-image" />
                                    )}
                                    <div className="book-info-text">
                                        <h3>{book.title}</h3>
                                        <p>{book.authors || book.author}</p>
                                    </div>
                                    <button
                                        className="remove-button"
                                        onClick={() => handleRemoveBook(book)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <button
                        className="checkout-button"
                        onClick={handleCheckout}
                        disabled={selectedBooks.length === 0 || processing}
                    >
                        {processing ? "Processing..." : "Confirm & Subscribe"}
                    </button>
                </div>
            </div>
        </CheckLayout>
    );
};

export default SubscriptionCheckout;