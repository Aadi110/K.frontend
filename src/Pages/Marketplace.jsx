import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';

const Marketplace = () => {
  const { marketCrops } = useMarketplace();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const normalizedSearch = searchTerm.toLowerCase();

  const filteredCrops = marketCrops
    .filter((c) => (filter === 'All' ? true : c.category === filter))
    .filter((c) =>
      normalizedSearch === ''
        ? true
        : c.name.toLowerCase().includes(normalizedSearch) ||
          c.location.toLowerCase().includes(normalizedSearch) ||
          c.category.toLowerCase().includes(normalizedSearch)
    );

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 lg:px-24 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black text-gray-900 mb-4"
        >
          Marketplace
        </motion.h1>
        <p className="text-gray-500 font-medium">Browse fresh produce directly from verified farmers.</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search for crops, seeds, or farmers..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Grains', 'Vegetables', 'Fruits'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                filter === cat ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCrops.map((crop, i) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer"
          >
            <div className="h-64 overflow-hidden relative">
              <img 
                src={crop.image} 
                alt={crop.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-600">
                {crop.category}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-extrabold text-gray-900">{crop.name}</h3>
                <p className="text-green-600 font-black">{crop.price}</p>
              </div>
              <p className="text-gray-400 text-sm font-bold flex items-center gap-1 mb-6">
                📍 {crop.location}
              </p>
              
              <button
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-green-600 transition-colors"
                onClick={() => navigate(`/marketplace/${crop.id}`)}
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;