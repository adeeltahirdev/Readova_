import Logo from '../../assets/images/Logo.png';
import {Link} from "react-router";
const Footer = () => {
    return (
        <footer className="footer font-one color">
            <div className="container grid grid--footer">
                <div className="logo-col">
                    <a href="#" className="footer-logo footer-link">
                        <img className="logo" src={Logo} alt="readova logo"/>
                    </a>

                    <div className="address-col mrgn-btm-sm">

                        <address className="contacts">
                            <p className="address">
                                NUML Multan Campus,<br/>
                                Multan, Pakistan
                            </p>
                            <p>
                                <a className="footer-link" href="tel:415-201-6370">415-201-6370</a
                                ><br/>
                                <a className="footer-link" href="mailto:hello@readova.com"
                                >info@readova.com</a
                                >
                            </p>
                        </address>
                    </div>

                    <ul className="social-links">
                        <li>
                            <a className="footer-link" href="#"
                            >
                                <ion-icon className="social-icon" name="logo-instagram"></ion-icon
                                >
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="#"
                            >
                                <ion-icon className="social-icon" name="logo-facebook"></ion-icon
                                >
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="#"
                            >
                                <ion-icon className="social-icon" name="logo-twitter"></ion-icon
                                >
                            </a>
                        </li>
                    </ul>
                </div>

                <nav className="nav-col">
                    <p className="footer-heading">Company</p>
                    <ul className="footer-nav">
                        <li><a className="footer-link" href="#">About Us</a></li>
                        <li><a className="footer-link" href="#">Contact Us</a></li>
                    </ul>
                </nav>

                <nav className="nav-col">
                    <p className="footer-heading">SERVICES</p>
                    <ul className="footer-nav">
                        <li><a className="footer-link" href="#">Borrow</a></li>
                        <li><a className="footer-link" href="#">Membership</a></li>
                        <li>
                            <a className="footer-link" href="/library#wishlist-bookmarks"
                            >Wishlist</a
                            >
                        </li>
                    </ul>
                </nav>

                <nav className="nav-col">
                    <p className="footer-heading">QUICK LINKS</p>
                    <ul className="footer-nav">
                        <li><a className="footer-link" href="/register">Login</a></li>
                        <li><a className="footer-link" href="/browse">Browse</a></li>
                        <li><a className="footer-link" href="#">Privacy & Policy</a></li>
                        <li><a className="footer-link" href="#">Terms & Conditions</a></li>
                    </ul>
                </nav>
                
            </div>
            <hr/>
            <p className="copyright">
                Copyright &copy; <span className="year">{ new Date().getFullYear() }</span> Readova | All rights
                reserved.
            </p>
        </footer>
    );
};

export default Footer;