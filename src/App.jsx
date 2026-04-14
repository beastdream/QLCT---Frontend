import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import "./App.css";

function NavigationMenu() {
  const location = useLocation();
  
  return (
    <nav className="nav-menu glass-panel">
      <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
        Trang chủ
      </Link>
      <Link to="/about-us" className={`nav-link ${location.pathname === "/about-us" ? "active" : ""}`}>
        Giới thiệu
      </Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <NavigationMenu />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
