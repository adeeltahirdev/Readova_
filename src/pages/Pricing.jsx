import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const Pricing = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const navigate = useNavigate();
    const handleFaqToggle = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };
    const handlePlanSelect = (planName) => {
        const type = planName.toLowerCase();
        localStorage.setItem("planType", type);
        navigate('/subscribedcheckout');
    };
    
    const faqData = [
        {
            question: "Can I change my plan later?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
        },
        {
            question: "Can I cancel my subscription anytime?",
            answer: "Absolutely. You can cancel your subscription at any time, and you'll continue to have access until the end of your billing period."
        },
        {
            question: "Do you offer student discounts?",
            answer: "Yes, we offer a 50% discount for students with a valid student ID. Contact our support team to verify your status."
        }
    ];

    return(
        <>
            <Navbar />
            <main>
                <div className="container">
                    <header className="text-cntr mrgn-btm-md">
                        <h1 className="heading-primary">Choose Your Reading Plan</h1>
                        <p className="hero-description">Unlock unlimited reading with our flexible subscription plans designed for every type of reader.</p>
                    </header>
                    
                    <div className="plans-container grid grid-2-col grid-gap">
                        <div className="plan-card basic">
                            <h2 className="heading-secondary">Basic</h2>
                            <p className="plan-description">Perfect for casual readers who want to explore our library</p>
                            <div className="price-large">PKR 9.99</div>
                            <div className="price-period">per month</div>
                            
                            <ul className="list">
                                <li className="list-item">Access to 15 books</li>
                                <li className="list-item">Read on one device at a time</li>
                                <li className="list-item">Basic customer support</li>
                            </ul>
                            
                            <a 
                                href="#" 
                                className="btn btn-outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePlanSelect('Basic');
                                }}
                            >
                                Subscribe
                            </a>
                        </div>
                        <div className="plan-card popular">
                            <div className="popular-badge">MOST POPULAR</div>
                            <h2 className="heading-secondary">Premium</h2>
                            <p className="plan-description">Ideal for avid readers who want the full Readova experience</p>
                            <div className="price-large">PKR 19.99</div>
                            <div className="price-period">per month</div>
                            
                            <ul className="list">
                                <li className="list-item">Unlimited access to the books</li>
                                <li className="list-item">Read on up to 5 devices simultaneously</li>
                                <li className="list-item">Priority customer support</li>
                                <li className="list-item">Early access to new releases</li>
                                <li className="list-item">Personalized recommendations</li>
                            </ul>
                            
                            <a 
                                href="#" 
                                className="btn btn-outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePlanSelect('Premium');
                                }}
                            >
                                Subscribe
                            </a>
                        </div>
                    </div>
                    
                    <div className="faq-section mrgn-tp-md">
                        <h2 className="heading-secondary text-cntr">Frequently Asked Questions</h2>
                        
                        {faqData.map((faq, index) => (
                            <div className="faq-item" key={index}>
                                <div 
                                    className="faq-question"
                                    onClick={() => handleFaqToggle(index)}
                                >
                                    {faq.question}
                                    <span>{activeFaq === index ? '−' : '+'}</span>
                                </div>
                                <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
                                    {faq.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Pricing;