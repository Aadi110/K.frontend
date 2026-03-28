import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react"; // Compact separator favicon
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Get the last part of the path (e.g., "Marketplace" from "/marketplace")
  const pathnames = location.pathname.split('/').filter((x) => x);
  const currentPage = pathnames[pathnames.length - 1];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBg = isScrolled || (location.pathname === "/login" || location.pathname === "/signup");

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-4 md:px-12 py-4 transition-all duration-300 ${
        showBg ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      {/* LEFT: Logo + Mobile Breadcrumb */}
      <div className="flex items-center gap-2 md:gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="KishanSetu" className="h-8 w-auto object-contain" />
          <h1 className="text-xl font-black text-green-600 tracking-tight hidden sm:block md:block">
            KishanSetu
          </h1>
        </Link>

        {/* MOBILE ONLY BREADCRUMB: Appears next to logo */}
        {currentPage && (
          <div className="flex items-center gap-1 md:hidden">
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded-md">
              {currentPage.replace(/-/g, ' ')}
            </span>
          </div>
        )}
      </div>

      {/* CENTER: Desktop Navigation Links */}
      <div className="space-x-8 hidden md:flex">
        {["Home", "Marketplace", "About", "Blog"].map((name) => {
          const path = name === "Home" ? "/" : `/${name.toLowerCase()}`;
          return (
            <Link
              key={name}
              to={path}
              className={`text-sm font-bold transition-colors ${
                location.pathname === path ? "text-green-600" : "text-gray-700 hover:text-green-600"
              }`}
            >
              {name}
            </Link>
          );
        })}
      </div>

      {/* RIGHT: Action Buttons */}
      <div className="flex items-center gap-3">
        <Link to="/login">
          <button className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 text-gray-700">
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-[#39E71F] text-black text-xs font-bold rounded-xl shadow-sm">
            Sign Up
          </button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;