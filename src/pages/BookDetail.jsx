import react from "react";
import MainLayout from "../layouts/MainLayout";
const BookDetail = () => {
    return(
        <MainLayout>
            <main>
                 <div class="container">
        {/* <!-- Book Header Section --{">"} */}
        <section class="book-header">
            <div class="book-cover-section">
                {/* <img src="chainsaw-man-cover.jpg" alt="Chainsaw Man Cover" class="book-cover-large"> */}
            </div>
            
            <div class="book-info-main">
                <h1 class="heading-primary">Chainsaw Man</h1>
               
                
                <div class="book-actions">
                    <a href="/BorrowCheckout" class="btn btn-full ">Borrow</a>
                    <a href="#" class="btn btn-outline subscribe-btn">Subscribe</a>
                </div>
                
                
                <div class="book-description">
                    <p>Denjis dreams of a peaceful life with his beloved were shortened by the cruel reality he faced. He found himself entangled in the dangerous underworld.</p>
                    <a href="#" class="link read-more">Read more</a>
                </div>
            </div>
        </section>

        {/* <!-- Stats Section --> */}
        <section class="book-stats">
            <div class="stat-item">
                <span class="stat-number">128</span>
                <span class="stat-label">Chapters</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">173</span>
                <span class="stat-label">Readers</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">100</span>
                <span class="stat-label">Views</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">351</span>
                <span class="stat-label">Comments</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">205</span>
                <span class="stat-label">Subscribers</span>
            </div>
        </section>

        {/* <!-- You May Also Like Section --> */}
        <section class="similar-books">
            <h2 class="heading-secondary">You may also like</h2>
            <div class="similar-books-grid">
                <div class="similar-book-card">
                    {/* <img src="berserk-cover.jpg" alt="Berserk" class="similar-book-cover"> */}
                    <h3 class="similar-book-title">Berserk</h3>
                </div>
                <div class="similar-book-card">
                    {/* <img src="dorohedoro-cover.jpg" alt="Dorohedoro" class="similar-book-cover"> */}
                    <h3 class="similar-book-title">Dorohedoro</h3>
                </div>
                <div class="similar-book-card">
                    {/* <img src="after-god-cover.jpg" alt="After God" class="similar-book-cover"> */}
                    <h3 class="similar-book-title">After God</h3>
                </div>
                <div class="similar-book-card">
                    {/* <img src="hells-paradise-cover.jpg" alt="Hell's Paradise" class="similar-book-cover"> */}
                    <h3 class="similar-book-title">Hell's Paradise</h3>
                </div>
            </div>
        </section>

        {/* <!-- Chapters Section --> */}
        <section class="chapters-section">
            <h2 class="heading-secondary">Chapters</h2>
            <div class="chapters-list">
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 1</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 2</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 3</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 4</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 5</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 6</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 7</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 8</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 9</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 10</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 11</span>
                </div>
                <div class="chapter-item">
                    <span class="chapter-number">Chapter 12</span>
                </div>
            </div>
        </section>
    </div>
            </main>
        </MainLayout>
    )
}
export default BookDetail;