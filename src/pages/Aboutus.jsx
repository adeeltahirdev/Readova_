import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <MainLayout>
      <main>
        {/* Hero Section */}
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">About Readova</h1>
              <p className="hero-description">
                Revolutionizing the way you read, discover, and connect with books. 
                Readova is more than just a digital library - it's your personal gateway 
                to endless knowledge and literary adventures.
              </p>
            </div>
            <div className="hero-img-box">
              <div className="about-hero-placeholder">
                <div className="placeholder-content">
                  <h3>📚 Digital Library</h3>
                  <p>Your Books, Anywhere</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="about-story mrgn-btm-md">
          <div className="container">
            <div className="grid grid-2-col">
              <div>
                <h2 className="heading-secondary">Our Story</h2>
                <p className="about-text">
                  Founded in 2024, Readova emerged from a simple yet powerful idea: 
                  to make quality reading accessible to everyone, everywhere. We noticed 
                  that while technology had transformed many aspects of our lives, 
                  accessing and managing personal reading collections remained fragmented 
                  and inconvenient.
                </p>
                <p className="about-text">
                  Our team of book lovers, tech enthusiasts, and design experts came 
                  together to create a platform that combines the joy of physical books 
                  with the convenience of digital technology. Today, Readova serves 
                  thousands of readers worldwide, helping them discover their next 
                  favorite book and manage their reading journey seamlessly.
                </p>
              </div>
              <div className="about-values">
                <h3 className="heading-tertiary">Our Mission</h3>
                <p className="about-text">
                  To democratize access to knowledge and literature by providing 
                  an intuitive, feature-rich digital library platform that inspires 
                  lifelong reading habits and connects book lovers worldwide.
                </p>
                
                <h3 className="heading-tertiary">Our Vision</h3>
                <p className="about-text">
                  A world where everyone has instant access to the books they love, 
                  personalized recommendations that expand their horizons, and a 
                  community that shares their passion for reading.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Highlight */}
        <section className="about-features mrgn-btm-md">
          <div className="container">
            <h2 className="heading-secondary text-cntr">Why Choose Readova?</h2>
            <div className="grid grid-3-col">
              <div className="feature-card">
                <div className="feature-icon">📖</div>
                <h3 className="heading-tertiary">Vast Collection</h3>
                <p className="feature-text">
                  Access thousands of books across all genres - from classic literature 
                  to contemporary bestsellers, academic texts to self-help guides.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3 className="heading-tertiary">Smart Recommendations</h3>
                <p className="feature-text">
                  Our AI-powered recommendation engine suggests books tailored to 
                  your reading preferences and past selections.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="heading-tertiary">Read Anywhere</h3>
                <p className="feature-text">
                  Continue reading seamlessly across all your devices - desktop, 
                  tablet, or mobile. Your progress is always synchronized.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⏱️</div>
                <h3 className="heading-tertiary">Reading Tracking</h3>
                <p className="feature-text">
                  Monitor your reading habits, set goals, and track your progress 
                  with our comprehensive reading statistics and insights.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3 className="heading-tertiary">Community Features</h3>
                <p className="feature-text">
                  Join reading groups, participate in discussions, and share 
                  reviews with fellow book enthusiasts in our vibrant community.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3 className="heading-tertiary">Secure & Private</h3>
                <p className="feature-text">
                  Your reading data and personal information are protected with 
                  enterprise-grade security and privacy measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-team mrgn-btm-md">
          <div className="container">
            <h2 className="heading-secondary text-cntr">Meet Our Team</h2>
            <p className="team-description text-cntr font-one mrgn-btm-md">
              Passionate individuals dedicated to creating the best reading experience for you.
            </p>
            <div className="grid grid-2-col">
              <div className="team-member">
                <div className="member-avatar">👨‍💼</div>
                <h3 className="member-name">Alex Johnson</h3>
                <p className="member-role">Founder & CEO</p>
                <p className="member-bio">
                  Former librarian turned tech entrepreneur, Alex combines his love 
                  for literature with innovative technology. With over 8 years in 
                  the publishing industry, he leads Readova's vision and strategy.
                </p>
              </div>
              
              <div className="team-member">
                <div className="member-avatar">👩‍💻</div>
                <h3 className="member-name">Sarah Chen</h3>
                <p className="member-role">Chief Technology Officer</p>
                <p className="member-bio">
                  Software engineer with 10+ years experience in building scalable 
                  platforms and AI recommendation systems. Sarah oversees all technical 
                  development and ensures our platform runs smoothly for thousands of users.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="about-stats mrgn-btm-md">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Books Available</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100,000+</div>
                <div className="stat-label">Active Readers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Countries Served</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">User Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="container">
            <div className="cta-content text-cntr">
              <h2 className="heading-secondary">Ready to Start Your Reading Journey?</h2>
              <p className="cta-description font-one mrgn-btm-md">
                Join other readers who have transformed their reading experience with Readova.
              </p>
              <div className="cta-buttons">
                <Link to="/auth/register" className="btn btn-full margin-right-sm">
                  Get Started Free
                </Link>
                <Link to="/browse" className="btn btn-outline">
                  Explore Books
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default AboutPage;