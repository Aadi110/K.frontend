import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "1. List Your Products",
    description: "Create a detailed listing for your crops or supplies in minutes. Add photos, pricing, and quantity available.",
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "2. Browse Listings",
    description: "Find exactly what you need from verified sellers nearby. Filter by location, crop type, and price range.",
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "3. Transact Securely",
    description: "Complete the deal with our secure payment and tracking system. Funds are held safely until delivery is confirmed.",
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const Howitworks = () => {
  // Container variants for staggered child animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Each card appears 0.3s after the previous one
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Three simple steps to streamline your agricultural business operations.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants}
              whileHover={{ y: -10 }} // Subtle lift effect on hover
              className="bg-[#f9fbf9] p-10 rounded-[2.5rem] flex flex-col items-start text-left border border-transparent hover:border-green-100 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 border border-gray-50">
                {step.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Howitworks;