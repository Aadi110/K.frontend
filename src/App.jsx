import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Marketplace from './Pages/Marketplace';
import Login from './Pages/Login';
import Register from './Pages/Register';
import About from './Pages/About';
import Blog from './Pages/Blog';
import BlogDetails from './Pages/BlogDetails';
import VendorDashboard from './Pages/VendorDashboard';
import FarmerDashboard from './Pages/FarmerDashboard';
import Howitworks from './Pages/Howitworks';
import MarketplaceDetails from './Pages/MarketplaceDetails';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Component to handle Footer visibility
const AppContent = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/register";

  const isDashboardPage =
    location.pathname.startsWith("/farmer-dashboard") ||
    location.pathname.startsWith("/vendor-dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isDashboardPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<MarketplaceDetails />} />
          <Route path='/About' element={<About />}/>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path='/howitworks' element={<Howitworks/>}/>
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {/* Footer only shows if not on Login/Signup or dashboards */}
      {!isAuthPage && !isDashboardPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <MarketplaceProvider>
      <Router>
        <AppContent />
      </Router>
    </MarketplaceProvider>
  );
}

export default App;
