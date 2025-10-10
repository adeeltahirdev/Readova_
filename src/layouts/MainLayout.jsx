import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import '../assets/css/general.css';
import '../assets/css/styles.css';

const MainLayout = ({children}) => {
    return (
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    );
};

export default MainLayout;