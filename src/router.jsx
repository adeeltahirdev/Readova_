import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import BrowsePage from "./pages/BrowsePage";
import LibraryPage from "./pages/LibraryPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BorrowCheckout from "./pages/BorrowCheckout";
import SubscribedCheckout from "./pages/SubscribedCheckout";
import BookDetail from "./pages/BookDetail";
import Pricing from "./pages/Pricing";
import Admin from "./pages/auth/Admin";

const Router = () => {
  return (
    <Routes>
      <Route index path="/" element={<IndexPage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/borrowcheckout" element={<BorrowCheckout />} />
      <Route path="/subscribedcheckout" element={<SubscribedCheckout />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default Router;
