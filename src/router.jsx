import { Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import BrowsePage from "./pages/BrowsePage";
import LibraryPage from "./pages/LibraryPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BorrowCheckout from "./pages/BorrowCheckout";
import SubscribedCheckout from "./pages/SubscribedCheckout";
import BookDetail from "./pages/BookDetail";
import Pricing from "./pages/Pricing";
import Preview from "./pages/PreviewBook";
import Admin from "./pages/auth/Admin";
import Books from "./pages/auth/BooksManagement";
import User from "./pages/auth/UserManagement";
import PrivateRoute from "./components/common/PrivateRoute";

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index path="/" element={<IndexPage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route
        path="/auth/register"
        element={
          localStorage.getItem("userAuth") === "true" ||
          localStorage.getItem("adminAuth") === "true" ? (
            localStorage.getItem("adminAuth") === "true" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/library" />
            )
          ) : (
            <RegisterPage />
          )
        }
      />

      {/* Protected Routes for normal users */}
      <Route
        path="/library"
        element={
          <PrivateRoute>
            <LibraryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/borrowcheckout"
        element={
          <PrivateRoute>
            <BorrowCheckout />
          </PrivateRoute>
        }
      />
      <Route
        path="/subscribedcheckout"
        element={
          <PrivateRoute>
            <SubscribedCheckout />
          </PrivateRoute>
        }
      />
      <Route
        path="/pricing"
        element={
          <PrivateRoute>
            <Pricing />
          </PrivateRoute>
        }
      />

      {/* Admin-only route */}
      <Route
        path="/admin"
        element={
          <PrivateRoute adminOnly={true}>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute adminOnly={true}>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/books"
        element={
          <PrivateRoute adminOnly={true}>
            <Books />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Router;
