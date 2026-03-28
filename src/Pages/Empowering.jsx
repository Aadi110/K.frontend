import React from 'react';
import { motion } from 'framer-motion';

const Empowering = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* LEFT CONTENT: Text & Stats */}
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-6 ">
            <div className="p-1 bg-green-100 rounded-md ">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746v5.603c0 5.127-3.344 9.71-8.312 11.5a.75.75 0 01-.522 0C3.931 20.203.587 15.62.587 10.493V4.9zm1.5 1.056v4.537c0 4.225 2.76 8.01 6.834 9.489 4.074-1.479 6.834-5.264 6.834-9.49V5.956L10 2.48 3.666 5.956z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-green-600 font-bold text-xs tracking-widest uppercase">Trust & Impact</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight text-left">
            Empowering Local Agriculture
          </h2>
          
          <p className="text-gray-600 text-lg mb-10 leading-relaxed ">
            We believe in fair trade and empowering local communities. Our platform provides the tools for farmers to get the best value for their hard work and for vendors to source high-quality produce efficiently.
          </p>

          {/* Stats Row */}
          <div className="flex gap-12 mb-10">
            <div>
              <h4 className="text-3xl font-extrabold text-gray-900">25%</h4>
              <p className="text-sm text-gray-500 mt-1">Increase in farmer revenue</p>
            </div>
            <div>
              <h4 className="text-3xl font-extrabold text-gray-900">40%</h4>
              <p className="text-sm text-gray-500 mt-1">Faster supply chain</p>
            </div>
          </div>

          <button className="flex justify-between px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg">
            See Our Impact Report
          </button>
        </motion.div>

        {/* RIGHT CONTENT: Dashboard Preview */}
        <motion.div 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Dashboard Window Mockup */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white rounded-3xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-8 w-full max-w-md mx-auto"
          >
            {/* Header / Search Bar area */}
            <div className="flex justify-between items-center mb-8">
               <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="text-sm font-bold text-gray-400">dashboard.kishansetu.com</div>
             
            </div>

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Dashboard Overview</h3>
              <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">Live</span>
            </div>

            {/* Stat Item 1 */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">$</div>
              <div>
                <p className="text-xs text-gray-400 font-bold">Total Sales</p>
                <p className="text-lg font-extrabold text-gray-900">$12,450.00</p>
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold">Active Listings</p>
                <p className="text-lg font-extrabold text-gray-900">24 Products</p>
              </div>
            </div>

            {/* Chart Bars Preview */}
            <div className="flex items-end justify-between gap-2 h-20">
              <div className="w-full bg-green-100 rounded-t-lg h-1/2"></div>
              <div className="w-full bg-green-200 rounded-t-lg h-3/4"></div>
              <div className="w-full bg-green-100 rounded-t-lg h-2/3"></div>
              <div className="w-full bg-green-500 rounded-t-lg h-full"></div>
              <div className="w-full bg-green-200 rounded-t-lg h-3/4"></div>
              <div className="w-full bg-green-100 rounded-t-lg h-1/2"></div>
              <div className="w-full bg-green-200 rounded-t-lg h-2/3"></div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Empowering;