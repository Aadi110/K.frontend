import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ isOpen, onClose, amount, cropName, onConfirmPayment, isProcessing }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isProcessing ? onClose : undefined}
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
          />

          {/* Payment Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white p-8 rounded-[30px] shadow-2xl w-full max-w-md border border-white/50 z-10"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚜</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Confirm Payment</h3>
              <p className="text-gray-500 mt-2">Paying for: <strong>{cropName}</strong></p>
              
              <div className="my-6 p-4 bg-green-50 rounded-2xl">
                <p className="text-sm text-green-600 font-medium">Total Amount</p>
                <p className="text-3xl font-black text-green-700">₹ {amount}</p>
              </div>

              <button 
                className="w-full py-4 bg-[#60bb46] hover:bg-[#52a03c] text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onConfirmPayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <img src="https://esewa.com.np/common/images/esewa_logo.png" alt="eSewa" className="h-6 bg-white rounded px-1 object-contain" />
                    Pay with eSewa
                  </>
                )}
              </button>
              
              <button 
                onClick={onClose}
                disabled={isProcessing}
                className="mt-4 text-gray-400 hover:text-gray-600 text-sm font-medium disabled:opacity-50"
              >
                Cancel Transaction
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
