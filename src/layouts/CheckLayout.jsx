import Navbar from "../components/common/Navbar.jsx";
import "../assets/css/general.css";
import "../assets/css/styles.css";

const CheckLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default CheckLayout;
