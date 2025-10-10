import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Hero from "../assets/images/Hero.webp";
import Book1 from "../assets/images/covers/Book1.jpg";
import Book2 from "../assets/images/covers/Book2.jpg";
import Book3 from "../assets/images/covers/Book3.jpg";
import Book4 from "../assets/images/covers/Book4.png";
import Book5 from "../assets/images/covers/Book5.jpg";
import Book6 from "../assets/images/covers/Book6.jpg";
import Book7 from "../assets/images/covers/Book7.jpg";
import Book8 from "../assets/images/covers/Book8.png";
import Book9 from "../assets/images/covers/Book9.jpg";
import Book10 from "../assets/images/covers/Book10.jpg";
import Customer1 from "../assets/images/customers/Customer-1.jpg";
import Customer2 from "../assets/images/customers/Customer-2.jpg";
import Customer3 from "../assets/images/customers/Customer-3.jpg";
import Customer4 from "../assets/images/customers/Customer-4.jpg";
import Customer5 from "../assets/images/customers/Customer-5.jpg";
import Customer6 from "../assets/images/customers/Customer-6.jpg";

const IndexPage = () => {
  return (
    <MainLayout>
      <main>
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">Meet your next favorite book</h1>
              <p className="hero-description">
                Readova is a modern library management system that lets you
                access a vast collection of books, track your progress, get
                personalized recommendations, and enjoy flexible reading
                options.
              </p>
              <a href="/auth/register" className="btn btn-full margin-right-sm">
                Read now
              </a>
              <a href="/browse" className="btn btn-outline">
                Explore
              </a>
              <div className="community">
                <div className="community-imgs">
                  <img src={Customer1} alt="customer photo" />
                  <img src={Customer2} alt="customer photo" />
                  <img src={Customer3} alt="customer photo" />
                  <img src={Customer4} alt="customer photo" />
                  <img src={Customer5} alt="customer photo" />
                  <img src={Customer6} alt="customer photo" />
                </div>
                <p className="community-text">
                  <span>100K+</span>
                  <br />
                  Book Readers Worldwide
                </p>
              </div>
            </div>
            <div className="hero-img-box">
              <img
                src={Hero}
                alt="a person reading a book"
                className="hero-img"
              />
            </div>
          </div>
        </section>

        <section className="recommended">
          <div className="container">
            <div className="grid grid-2-col">
              <h2 className="heading-secondary">Recommended</h2>
            </div>

            <div className="hm-grid container">
              <div class="hm-books ">
                <img src={Book7} class="hm-cover" alt="book cover" />
                <div class="hm-content">
                  <ul class="hm-attributes">
                    <li class="hm-attribute">
                      <h3>The Silent Patient</h3>
                    </li>
                    <li class="hm-attribute">
                      <p>Alex Michaelides</p>
                    </li>
                    <li class="hm-attribute">
                      <div className="rating">⭐⭐⭐⭐⭐ (4.7)</div>
                    </li>
                    <li class="hm-attribute">
                      <div className="price">$12.99</div>
                    </li>
                  </ul>
                  <a href="#" class="btn btn-full btn-view">
                    View
                  </a>
                </div>
              </div>
              <div class="hm-books ">
                <img src={Book1} class="hm-cover" alt="book cover" />
                <div class="hm-content">
                  <ul class="hm-attributes">
                    <li class="hm-attribute">
                      <h3>Dune</h3>
                    </li>
                    <li class="hm-attribute">
                      <p>Frank Herbert</p>
                    </li>
                    <li class="hm-attribute">
                      <div className="rating">⭐⭐⭐⭐⭐ (4.9)</div>
                    </li>
                    <li class="hm-attribute">
                      <div className="price">$15.99</div>
                    </li>
                  </ul>
                  <a href="#" class="btn btn-full btn-view">
                    View
                  </a>
                </div>
              </div>
              <div class="hm-books ">
                <img src={Book4} class="hm-cover" alt="book cover" />
                <div class="hm-content">
                  <ul class="hm-attributes">
                    <li class="hm-attribute">
                      <h3>The Hobbit</h3>
                    </li>
                    <li class="hm-attribute">
                      <p>J.R.R. Tolkien</p>
                    </li>
                    <li class="hm-attribute">
                      <div className="rating">⭐⭐⭐⭐⭐ (4.4)</div>
                    </li>
                    <li class="hm-attribute">
                      <div className="price">$22.99</div>
                    </li>
                  </ul>
                  <a href="#" class="btn btn-full btn-view">
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container scroll">
            <MdChevronLeft className="scroll-btn" />
            <MdChevronRight className="scroll-btn" />
          </div>
        </section>

        <section className="popular">
          <div className="container">
            <h2 className="heading-secondary">Popular</h2>
          </div>

          <div className="container grid grid-3-col font-one">
            <div class="hm-books">
              <img src={Book8} class="hm-cover" alt="book cover" />
              <div class="hm-content">
                <ul class="hm-attributes">
                  <li class="hm-attribute">
                    <h3>Dune</h3>
                  </li>
                  <li class="hm-attribute">
                    <p>Alex Michaelides</p>
                  </li>
                  <li class="hm-attribute">
                    <div className="rating">⭐⭐⭐⭐⭐ (4.4)</div>
                  </li>
                  <li class="hm-attribute">
                    <div className="price">$22.99</div>
                  </li>
                </ul>
                <a href="#" class="btn btn-full btn-view">
                  View
                </a>
              </div>
            </div>
            <div class="hm-books ">
              <img src={Book9} class="hm-cover" alt="book cover" />
              <div class="hm-content">
                <ul class="hm-attributes">
                  <li class="hm-attribute">
                    <h3>The Silent Patient</h3>
                  </li>
                  <li class="hm-attribute">
                    <p>J.R.R. Tolkien</p>
                  </li>
                  <li class="hm-attribute">
                    <div className="rating">⭐⭐⭐⭐⭐ (4.4)</div>
                  </li>
                  <li class="hm-attribute">
                    <div className="price">$22.99</div>
                  </li>
                </ul>
                <a href="#" class="btn btn-full btn-view">
                  View
                </a>
              </div>
            </div>
            <div class="hm-books ">
              <img src={Book3} class="hm-cover" alt="book cover" />
              <div class="hm-content">
                <ul class="hm-attributes">
                  <li class="hm-attribute">
                    <h3>Educated</h3>
                  </li>
                  <li class="hm-attribute">
                    <p>Tara Westover</p>
                  </li>
                  <li class="hm-attribute">
                    <div className="rating">⭐⭐⭐⭐⭐ (4.4)</div>
                  </li>
                  <li class="hm-attribute">
                    <div className="price">$22.99</div>
                  </li>
                </ul>
                <a href="#" class="btn btn-full btn-view">
                  View
                </a>
              </div>
            </div>
          </div>
          <div className="container scroll">
            <MdChevronLeft className="scroll-btn" />
            <MdChevronRight className="scroll-btn" />
          </div>
        </section>

        <section className="new-arrivals mrgn-btm-md">
          <div className="container">
            <h2 className="heading-secondary text-cntr">New Arrivals</h2>
            <p className="arr-description text-cntr font-one mrgn-btm-md">
              Stay up to date with the latest additions to our digital library.
              Discover newly released books across genres and start reading
              something fresh today.
            </p>
          </div>
          <div className="container grid grid-3-col font-one">
            <div class="hm-books">
              <img src={Book8} class="hm-cover" alt="book cover" />
              <div class="hm-content">
                <ul class="hm-attributes">
                  <li class="hm-attribute">
                    <h3>Dune</h3>
                  </li>
                  <li class="hm-attribute">
                    <p>Alex Michaelides</p>
                  </li>
                  <li class="hm-attribute">
                    <div className="rating">⭐⭐⭐⭐⭐ (4.4)</div>
                  </li>
                  <li class="hm-attribute">
                    <div className="price">$22.99</div>
                  </li>
                </ul>
                <a href="#" class="btn btn-full btn-view">
                  View
                </a>
              </div>
            </div>
            <div class="hm-books ">
              <img src={Book9} class="hm-cover" alt="book cover" />
              <div class="hm-content">
                <ul class="hm-attributes">
                  <li class="hm-attribute">
                    <h3>The Silent Patient</h3>
                  </li>
                  <li class="hm-attribute">
                    <p>J.R.R. Tolkien</p>
                  </li>
                  <li class="hm-attribute">
                    <div className="rating">⭐⭐⭐⭐⭐ (4.4)</div>
                  </li>
                  <li class="hm-attribute">
                    <div className="price">$22.99</div>
                  </li>
                </ul>
                <a href="#" class="btn btn-full btn-view">
                  View
                </a>
              </div>
            </div>
            <div class="hm-books ">
              <img src={Book3} class="hm-cover" alt="book cover" />
              <div class="hm-content">
                <ul class="hm-attributes">
                  <li class="hm-attribute">
                    <h3>Educated</h3>
                  </li>
                  <li class="hm-attribute">
                    <p>Tara Westover</p>
                  </li>
                  <li class="hm-attribute">
                    <div className="rating">⭐⭐⭐⭐⭐ (4.4)</div>
                  </li>
                  <li class="hm-attribute">
                    <div className="price">$22.99</div>
                  </li>
                </ul>
                <a href="#" class="btn btn-full btn-view">
                  View
                </a>
              </div>
            </div>
          </div>
          <div className="container view-all font-one mrgn-tp-md">
            <a href="#" className="link">
              View All &rarr;
            </a>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default IndexPage;
