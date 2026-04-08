import React from 'react';
import { IndianRupee, CheckCircle2, Clock } from 'lucide-react';

const HistoryCard = ({ transaction }) => {
  const dateObj = new Date(transaction.timestamp);
  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const isCompleted = transaction.status === "Completed" || transaction.status === "SUCCESS";

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
          {isCompleted ? <CheckCircle2 size={24} /> : <Clock size={24} />}
        </div>
        <div>
          <h3 className="text-lg font-black text-gray-900">{transaction.crop_name || "Unknown Product"}</h3>
          <p className="text-xs font-bold text-gray-400 mt-1">Vendor: {transaction.vendor_id}</p>
        </div>
      </div>
      
      <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-2 md:gap-1">
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:block mb-1">Amount</p>
          <p className="text-xl font-black text-slate-900 flex items-center gap-1">
            <IndianRupee size={16} />{transaction.amount}
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${isCompleted ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
            {transaction.status}
            </span>
            <span className="text-[10px] font-bold text-gray-400 mt-1">{formattedDate} • {formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
