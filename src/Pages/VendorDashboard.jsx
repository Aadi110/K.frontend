import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  LayoutDashboard, Search, ShoppingBag, Heart, 
  MessageSquare, History, Settings, Bell, 
  ShoppingBasket, IndianRupee, Send, User, 
  ChevronRight, Filter, LogOut 
} from 'lucide-react';

const VendorDashboard = () => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const navigate = useNavigate();
  const { marketCrops } = useMarketplace();

  // --- SECURITY GUARD ---
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");
    if (isLoggedIn !== "true" || role !== "vendor") {
      navigate("/login");
    }
  }, [navigate]);

  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [myOrders, setMyOrders] = useState([]);
  const [requestData, setRequestData] = useState({ item: '', budget: '', deadline: '' });
  
  // New Logic States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // 'low', 'high'
  const [savedProducts, setSavedProducts] = useState([]);
  
  const vendorName = localStorage.getItem("userName") || "Vendor";

  // --- FETCHING DATA ---
  const fetchData = () => {
    fetch(`${API_BASE}/api/vendor-orders?vendor=${encodeURIComponent(vendorName)}`)
      .then(res => res.json())
      .then(data => setMyOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, vendorName]);

  // --- SEARCH & FILTER LOGIC ---
  const filteredAndSortedItems = marketCrops
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "low") {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.-]/g, ''));
        return priceA - priceB;
      }
      if (sortBy === "high") {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.-]/g, ''));
        return priceB - priceA;
      }
      return 0;
    });

  // --- FAVORITES LOGIC ---
  const toggleFavorite = (product) => {
    setSavedProducts(prev => {
      const isSaved = prev.find(p => p.id === product.id);
      if (isSaved) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  // --- NOTIFICATION LOGIC ---
  const notifications = myOrders.filter(o => o.status === 'Shipped' || o.status === 'Accepted');

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleBuyNow = async (product) => {
    const isAuthenticated = localStorage.getItem("isLoggedIn");
    if (isAuthenticated !== "true") {
      navigate("/login");
      return;
    }

    const newOrder = {
      vendor_name: vendorName,
      crop_name: product.name,
      price: product.price,
      quantity: product.quantity || "1",
      status: "Processing",
      date: new Date().toLocaleDateString(),
      farmer_name: product.farmer_name || "Unknown Farmer"
    };

    try {
      const res = await fetch(`${API_BASE}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });

      if (res.ok) {
        setMyOrders(prev => [...prev, newOrder]);
        alert(`Order placed for ${product.name}! Farmer has been notified.`);
        setActiveTab('My Orders');
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Error placing order. Please try again.");
    }
  };

  const handlePostRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/manage-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...requestData, vendor_name: vendorName })
      });
      if (res.ok) {
        alert("Your request has been broadcasted to all farmers!");
        setRequestData({ item: '', budget: '', deadline: '' });
        setActiveTab('Dashboard');
      }
    } catch (err) {
      alert("Error broadcasting request.");
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Browse Market', icon: <Search size={20} /> },
    { name: 'Request Produce', icon: <Send size={20} /> },
    { name: 'My Orders', icon: <ShoppingBag size={20} />, badge: myOrders.length },
    { name: 'Saved Farmers', icon: <Heart size={20} />, badge: savedProducts.length },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans text-slate-900">
      <aside className="w-72 bg-white border-r border-gray-100 p-6 hidden lg:flex flex-col justify-between h-screen sticky top-0">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-10 px-2 text-green-600 hover:opacity-80 transition-all active:scale-95 group">
            <ShoppingBasket size={28} className="group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-black text-slate-900 tracking-tight">KishanSetu</span>
          </Link>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === item.name ? 'bg-green-50 text-green-600' : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">{item.icon} {item.name}</div>
                {item.badge > 0 && <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">{item.badge}</span>}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{vendorName[0]}</div>
            <div>
              <p className="text-sm font-black">{vendorName}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Certified Vendor</p>
            </div>
          </div>

          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Logout & Switch
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none w-64 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 shadow-sm relative">
                <Bell size={20} />
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">
                        {notifications.length}
                    </span>
                )}
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            
            {activeTab === 'Dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <StatCard label="Total Spending" value={`₹${myOrders.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0)}`} icon={<IndianRupee />} />
                  <StatCard label="Orders in Transit" value={myOrders.filter(o => o.status === 'Shipped').length} icon={<ShoppingBag />} />
                  <StatCard label="Market Items" value={marketCrops.length} icon={<ShoppingBasket />} />
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black text-lg">Recommended for You</h3>
                    <button className="text-green-600 text-xs font-black uppercase tracking-widest flex items-center gap-1" onClick={() => setActiveTab('Browse Market')}>
                      View Market <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {marketCrops.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm">
                          <ShoppingBasket size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900">{item.crop_name}</h4>
                          <p className="text-xs font-bold text-gray-400">₹{item.price}/kg • From Farmer {item.farmer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Browse Market' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100">
                  <p className="text-sm font-bold text-gray-400">Showing {filteredAndSortedItems.length} products</p>
                  <div className="flex gap-2">
                      <select 
                        className="text-xs font-black bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 outline-none"
                        onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}
                      >
                          <option value="default">Sort By</option>
                          <option value="low">Price: Low to High</option>
                          <option value="high">Price: High to Low</option>
                      </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedItems.map((item, i) => (
                    <ProductCard 
                        key={i} 
                        item={item} 
                        onBuy={handleBuyNow} 
                        onFavorite={toggleFavorite}
                        isSaved={savedProducts.some(p => p.id === item.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Saved Farmers' && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {savedProducts.length > 0 ? savedProducts.map((item, i) => (
                 <ProductCard 
                    key={i} 
                    item={item} 
                    onBuy={handleBuyNow} 
                    onFavorite={toggleFavorite}
                    isSaved={true}
                 />
               )) : (
                 <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <Heart className="mx-auto text-gray-200 mb-4" size={48} />
                    <p className="text-gray-400 font-bold">No saved products yet.</p>
                 </div>
               )}
             </div>
            )}

            {activeTab === 'Request Produce' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="mb-8">
                    <h2 className="text-2xl font-black text-gray-900">Post a Request</h2>
                    <p className="text-gray-400 text-sm font-bold">Can't find a product? Tell our farmers what you need.</p>
                  </div>
                  <form onSubmit={handlePostRequest} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Requirement (e.g. 500kg Wheat)</label>
                      <input type="text" placeholder="Be specific..." className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" 
                        value={requestData.item} onChange={e => setRequestData({...requestData, item: e.target.value})} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Max Budget (₹)</label>
                        <input type="number" placeholder="5000" className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" 
                          value={requestData.budget} onChange={e => setRequestData({...requestData, budget: e.target.value})} required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Needed By</label>
                        <input type="date" className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm text-gray-500" 
                          value={requestData.deadline} onChange={e => setRequestData({...requestData, deadline: e.target.value})} required />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                      <Send size={18} /> Broadcast to All Farmers
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'My Orders' && (
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <tr>
                      <th className="p-6">Date</th>
                      <th className="p-6">Product</th>
                      <th className="p-6">Farmer</th>
                      <th className="p-6">Price</th>
                      <th className="p-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold text-sm divide-y divide-gray-50">
                    {myOrders.map((order, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-6 text-gray-400 font-medium">{order.date}</td>
                        <td className="p-6 text-gray-900">{order.crop_name}</td>
                        <td className="p-6 text-gray-900">{order.farmer_name}</td>
                        <td className="p-6">₹{order.price}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black ${
                            order.status === 'Processing' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- REUSABLE COMPONENTS ---

const ProductCard = ({ item, onBuy, onFavorite, isSaved }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black bg-green-50 text-green-600 px-2 py-1 rounded-lg uppercase tracking-wider">{item.category}</span>
        <button 
            onClick={() => onFavorite(item)}
            className={`transition-colors ${isSaved ? 'text-red-500' : 'text-gray-200 hover:text-red-400'}`}
        >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <h3 className="text-xl font-black text-gray-900 mb-1">{item.name}</h3>
      <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-6">
        <User size={14} className="text-green-500" /> {item.location}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase">Price</p>
          <p className="text-2xl font-black text-slate-900">{item.price}</p>
        </div>
        <button 
          onClick={() => onBuy(item)}
          className="bg-green-500 text-white px-6 py-2.5 rounded-xl font-black text-xs hover:bg-green-600 transition-all shadow-lg shadow-green-100"
        >
          Buy Now
        </button>
      </div>
    </div>
);

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-gray-50 rounded-xl text-green-600">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <h2 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h2>
    </div>
  </div>
);

export default VendorDashboard;
