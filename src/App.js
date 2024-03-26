import "./App.css";
import {
  BrowserRouter,
  Route,
  // Route,
  Routes,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import LandingPage from "./Screens/LandingPage/LandingPage";
import Footer from "./Components/Footer/Footer";
import CategoriesPage from "./Screens/CategoriesPage/CategoriesPage";
import ProductsPage from "./Screens/ProductsPage/ProductsPage";
import Checkout from "./Screens/Checkout/Checkout";
import CheckoutPayment from "./Screens/CheckoutPayment/CheckoutPayment";
import AboutUs from "./Screens/AboutUs/AboutUs";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-payment" element={<CheckoutPayment />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
