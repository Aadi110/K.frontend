import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const testimonials = [
  {
    quote: "KishanSetu transformed how I sell my corn harvest. I used to rely on local brokers who took a huge cut. Now I deal directly with processing plants.",
    name: "Ram Tiwari",
    role: "Corn Farmer, Chitwan",
    image: "https://english.onlinekhabar.com/wp-content/uploads/2017/01/isard2.jpg"
  },
  {
    quote: "As a restaurant owner, sourcing fresh, organic ingredients was always a headache. KishanSetu makes it incredibly easy to find quality local produce.",
    name: "Bina Thapa",
    role: "Restaurant Owner, Kathmandu",
    image: "https://static01.nyt.com/images/2021/05/05/dining/05canlis2/05canlis2-articleLarge-v2.jpg?quality=75&auto=webp&disable=upscale"
  }
];

const CommunityStories = () => {
  return (
    <div>
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#fcfdfc]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Community Stories</h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Decorative Quote Mark */}
              <div className="absolute top-6 right-10 text-gray-100 text-8xl font-serif select-none pointer-events-none">
                “
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-14 h-14 rounded-full object-cover grayscale-[30%] hover:grayscale-0 transition-all"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-green-600 font-medium">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
       
      </div>
      
    </section>
   <div>
      <section className="py-24 px-6 text-center border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Start Selling or Buying Today
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            Join thousands of farmers and vendors already trading on the world's most trusted agricultural marketplace.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* LINKED TO SIGNUP PAGE */}
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-[#39E71F] text-black font-bold rounded-xl shadow-lg shadow-green-200"
              >
                Create Farmer Account
              </motion.button>
            </Link>

            {/* LINKED TO SIGNUP PAGE */}
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Create Vendor Account
              </motion.button>
            </Link>
          </div>
        </motion.div>
        </section>
        </div>
        </div>
  );
};

export default CommunityStories;