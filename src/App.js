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

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
