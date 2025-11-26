import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { Link } from "react-router";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <MainLayout>
      <main>
        {/* Hero Section */}
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">Contact Us</h1>
              <p className="hero-description">
                Have questions, feedback, or need support? We're here to help! 
                Reach out to our team and we'll get back to you as soon as possible.
              </p>
            </div>
            <div className="hero-img-box">
              <div className="contact-hero-placeholder">
                <div className="placeholder-content">
                  <h3>💬 Get In Touch</h3>
                  <p>We'd love to hear from you</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="contact-methods mrgn-btm-md">
          <div className="container">
            <div className="grid grid-3-col">
              <div className="contact-method">
                <div className="method-icon">📧</div>
                <h3 className="heading-tertiary">Email Us</h3>
                <p className="method-info">support@readova.com</p>
                <p className="method-description">
                  Send us an email anytime and we'll respond within 24 hours.
                </p>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <h3 className="heading-tertiary">Call Us</h3>
                <p className="method-info">+1 (555) 123-READ</p>
                <p className="method-description">
                  Available Monday-Friday, 9AM-6PM EST for immediate assistance.
                </p>
              </div>
              
              <div className="contact-method">
                <div className="method-icon">💬</div>
                <h3 className="heading-tertiary">Live Chat</h3>
                <p className="method-info">Available Online</p>
                <p className="method-description">
                  Chat with our support team in real-time during business hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="contact-main mrgn-btm-md">
          <div className="container">
            <div className="grid grid-2-col">
              {/* Contact Form */}
              <div className="contact-form-section">
                <h2 className="heading-secondary">Send us a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-input"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-full contact-submit">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="contact-info-section">
                <h2 className="heading-secondary">Get in Touch</h2>
                <div className="contact-info">
                  <div className="info-item">
                    <div className="info-icon">🏢</div>
                    <div className="info-content">
                      <h4 className="info-title">Office Address</h4>
                      <p className="info-text">
                        NUML Multan Campus,<br />
                        Multan,<br />
                        Pakistan
                      </p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">📞</div>
                    <div className="info-content">
                      <h4 className="info-title">Phone Numbers</h4>
                      <p className="info-text">
                        Main: +1 (555) 123-READ<br />
                        Support: +1 (555) 123-HELP
                      </p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">📧</div>
                    <div className="info-content">
                      <h4 className="info-title">Email Addresses</h4>
                      <p className="info-text">
                        Support: support@readova.com<br />
                        General: hello@readova.com<br />
                        Partnerships: partners@readova.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">🕒</div>
                    <div className="info-content">
                      <h4 className="info-title">Business Hours</h4>
                      <p className="info-text">
                        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                        Saturday: 10:00 AM - 4:00 PM EST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="social-links-contact">
                  <h3 className="heading-tertiary">Follow Us</h3>
                  <div className="social-icons">
                    <a href="#" className="social-link">Facebook</a>
                    <a href="#" className="social-link">Twitter</a>
                    <a href="#" className="social-link">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default ContactPage;