import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for routing
import logo from "../assets/logo.png"; // Import logo for branding consistency

const Footer = () => {
  return (
    <footer className="bg-white">
      
      {/* SECTION 2: ACTUAL FOOTER LINKS */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info with Logo */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="KishanSetu Logo" className="h-8 w-auto object-contain" />
              <span className="text-green-600 font-black text-xl tracking-tight">KishanSetu</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Connecting the world's agriculture directly, efficiently, and securely.
            </p>
            <div className="flex gap-3 mt-2">
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-gray-600 text-sm">𝕏</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-gray-600 text-sm">📸</span>
              </button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/marketplace" className="hover:text-green-600 transition-colors">Browse Crops</Link></li>
              <li><a href="#sell" className="hover:text-green-600 transition-colors cursor-pointer">Sell Products</a></li>
              <li><a href="#pricing" className="hover:text-green-600 transition-colors cursor-pointer">Pricing</a></li>
              <li><a href="#trust" className="hover:text-green-600 transition-colors cursor-pointer">Trust & Safety</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/about" className="hover:text-green-600 transition-colors">About Us</Link></li>
              <li><a href="#careers" className="hover:text-green-600 transition-colors cursor-pointer">Careers</a></li>
              <li><a href="#blog" className="hover:text-green-600 transition-colors cursor-pointer">Blog</a></li>
              <li><a href="#contact" className="hover:text-green-600 transition-colors cursor-pointer">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4 font-medium">Subscribe for market updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <button className="bg-[#39E71F] p-3 rounded-xl hover:bg-green-500 transition-colors">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="max-w-7xl mx-auto border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-medium">
            © 2026 KishanSetu Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 font-medium">
            <span className="hover:text-gray-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-600 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;