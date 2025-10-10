import Navbar from "../components/common/Navbar.jsx";
import "../assets/css/login.css";

const MainLayout = ({children}) => {
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
};

export default MainLayout;