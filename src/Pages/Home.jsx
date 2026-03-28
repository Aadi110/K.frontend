import React from 'react'
import { motion } from 'framer-motion';

import HowItWorks from './Howitworks';
import KeyFeatures from './KeyFeatures';
import Empowering from './Empowering';
import CommunityStories from './CommunityStories';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fcf5] to-[#eef9ee]">
    <section className="flex flex-col lg:flex-row items-center justify-between px-6 py-12 md:px-12 lg:px-24 min-h-screen overflow-hidden">
      
      {/* LEFT CONTENT */}
      <motion.div
        className="max-w-xl flex flex-col items-start z-10 w-full mb-12 lg:mb-0"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Top Badge */}
       

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
          Connecting <br /> Farmers <br />
          <span className="text-green-500">Directly</span> to <br />
          Vendors
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
          KishanSetu is the modern agriculture marketplace that simplifies the supply chain. Buy and sell crops, equipment, and supplies with zero middlemen.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
  {/* Link to the Marketplace Page */}
  <Link to="/marketplace" className="w-full sm:w-auto">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full px-8 py-3.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
    >
      View Marketplace
    </motion.button>
  </Link>
  
  {/* Link to the "How it Works" Section or Page */}
  <Link to="/about" className="w-full sm:w-auto">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full px-8 py-3.5 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
    >
      About Us
    </motion.button>
  </Link>
</div>

        {/* Trust Indicators (Avatars) */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="User 1" />
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="User 2" />
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="User 3" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            Trusted by 2,000+ farmers
          </p>
        </div>
      </motion.div>

      {/* RIGHT IMAGE & FLOATING CARD */}
      <motion.div
        className="relative w-full max-w-lg lg:ml-auto"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Image Container */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[450px] md:h-[550px] w-full">
          <img 
            src="https://imgs.search.brave.com/_28Gd1IvnahbdxfxP2CnWD3pnjBcuUTO99expdd9F0o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE3/MDYwNTk5MjM3NzUt/MzFmMzlkZmNiMWY5/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHdhRzkw/Ynkxd1lXZGxmSHg4/ZkdWdWZEQjhmSHg4/ZkE9PQ" 
            alt="Inside a greenhouse" 
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for better contrast at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
        </div>

        {/* Floating 'Latest Transaction' Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-white/20"
        >
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">Latest Transaction</p>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded flex items-center gap-1">
              Sold
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">Organic Avocados</h3>
          
          <div className="flex justify-between items-center border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Maria S. to WholeFoods
            </div>
            <span className="text-lg font-bold text-green-600">$4,250</span>
          </div>
        </motion.div>
        
      </motion.div>
    </section>
    <HowItWorks/>
    <KeyFeatures/>
    <Empowering/>
    <CommunityStories/>
 
    </div>



  );
};

export default Home;