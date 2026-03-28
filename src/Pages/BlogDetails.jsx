import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-black mb-4">Article Not Found</h2>
        <button 
          onClick={() => navigate('/blog')}
          className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-6 mb-10 text-center">
        <button
          onClick={() => navigate('/blog')}
          className="mb-8 text-sm font-bold text-gray-500 hover:text-green-600 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          ← Back to all articles
        </button>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-600 font-black text-xs uppercase tracking-widest mb-6">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm font-bold text-gray-500">
            <span>By {blog.author}</span>
            <span>•</span>
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>
        </motion.div>
      </div>

      {/* Featured Image */}
      <motion.div 
        className="max-w-5xl mx-auto px-6 mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-full h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-xl">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.div 
        className="max-w-3xl mx-auto px-6 prose prose-lg prose-green"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogDetails;
