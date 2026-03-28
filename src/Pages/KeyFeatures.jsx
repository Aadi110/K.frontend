import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    title: "Direct Marketplace",
    description: "Connect directly with buyers and sellers. No intermediaries means better margins for everyone.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Secure Transactions",
    description: "Your payments are protected. We hold funds in escrow until the goods are delivered and verified.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Real-Time Chat",
    description: "Negotiate prices, discuss delivery details, and build relationships instantly within the app.",
    image: "https://imgs.search.brave.com/7N-EWRlnYVh9hzhLxgLq6f1ytoxjn_BcCuS6XjaYzD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/MTA2MTYwMi9waG90/by9vcGVyYXRvci1h/cmUtd29ya2luZy1h/dC1jYWxsLWNlbnRl/ci5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9YW53YUZlcG5M/UG5WSDZLYXdXOXM0/bGhZamkyVzlYOWNR/Wkd0UDEyNWsxYz0",
  },
  {
    title: "Price Transparency",
    description: "Access real-time market rates and historical pricing trends to make informed decisions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",
  }
];

const KeyFeatures = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#fcfdfc]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-left">Key Features</h2>
            <p className="text-green-700/70 text-lg font-medium">
              Everything you need to grow your business effectively and efficiently.
            </p>
          </div>
          <Link to="/about">
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-green-600 font-bold flex items-center gap-2 hover:text-green-700 transition-colors"
          >
            View all features <span>→</span>
          </motion.button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="h-48 overflow-hidden m-4 rounded-[1.5rem]">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Text content */}
              <div className="px-6 pb-8 pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;