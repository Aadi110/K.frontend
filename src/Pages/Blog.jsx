import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { blogs } from '../data/blogs';

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 lg:px-24 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
        >
          Insights & <span className="text-green-500">Impact</span>
        </motion.h1>
        <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
          Read stories about the communities we empower, learn about modern farming practices, and see the real impact of KishanSetu.
        </p>
      </div>

      {/* Featured/Latest Blog */}
      {blogs.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-7xl mx-auto mb-16"
        >
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm flex flex-col md:flex-row group cursor-pointer" onClick={() => navigate(`/blog/${blogs[0].id}`)}>
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
              <img 
                src={blogs[0].image} 
                alt={blogs[0].title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Latest Impact
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-green-600 font-black text-xs uppercase tracking-widest mb-3">
                {blogs[0].category}
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                {blogs[0].title}
              </h2>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                {blogs[0].excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-sm font-bold text-gray-400">
                  {blogs[0].date} • {blogs[0].readTime}
                </div>
                <button className="text-gray-900 font-black flex items-center gap-2 group-hover:text-green-600 transition-colors">
                  Read Article <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.slice(1).map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer flex flex-col"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            <div className="h-56 overflow-hidden relative">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-600 uppercase">
                {blog.category}
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm font-medium mb-6 line-clamp-3 flex-1">
                {blog.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="text-xs font-bold text-gray-400">
                  {blog.date}
                </div>
                <button className="text-green-600 font-black text-sm group-hover:underline">
                  View More
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
