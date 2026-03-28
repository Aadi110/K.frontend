import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { crops } from "../data/crops";

const MarketplaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cropId = parseInt(id, 10);
  const crop = crops.find((c) => c.id === cropId);

  const handleContactFarmer = () => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/farmer-dashboard");
    }
  };

  if (!crop) {
    return (
      <div className="pt-24 pb-20 px-6 md:px-12 lg:px-24 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-black mb-4">Item not found</h2>
          <p className="text-gray-500 mb-6">
            The marketplace item you are looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/marketplace")}
            className="px-6 py-3 bg-[#39E71F] font-black rounded-2xl"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 lg:px-24 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm font-bold text-gray-500 hover:text-gray-800"
        >
          ← Back to marketplace
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm grid md:grid-cols-2"
        >
          <div className="h-80 md:h-full">
            <img
              src={crop.image}
              alt={crop.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-10 flex flex-col justify-between">
            <div>
              <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">
                {crop.category}
              </span>
              <h1 className="text-3xl font-black text-gray-900 mb-3">
                {crop.name}
              </h1>
              <p className="text-gray-500 text-sm font-medium mb-4">
                📍 {crop.location}
              </p>
              <p className="text-gray-600 text-sm mb-6">{crop.description}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Current offer
                </p>
                <p className="text-2xl font-black text-green-600">
                  {crop.price}
                </p>
              </div>
              <button onClick={handleContactFarmer} className="px-8 py-4 bg-[#39E71F] text-black font-black rounded-2xl shadow-[0_10px_20px_rgba(57,231,31,0.2)] hover:shadow-[0_15px_30px_rgba(57,231,31,0.3)] transition-all">
                Contact Farmer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketplaceDetails;

