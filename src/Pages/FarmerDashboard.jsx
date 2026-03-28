import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMarketplace } from '../context/MarketplaceContext';
import marketplaceDefaultImage from '../assets/marketplace/marketplace-default.svg';
import { 
  LayoutDashboard, ShoppingBasket, PlusCircle, 
  ShoppingCart, MessageSquare, IndianRupee, 
  BarChart3, Settings, Bell, Search, Trash2, Send, LogOut 
} from 'lucide-react';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { marketCrops, addProduct, deleteProduct, getFarmerProducts } = useMarketplace();
  
  // --- SECURITY GUARD ---
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");
    if (isLoggedIn !== "true" || role !== "farmer") {
      navigate("/login");
    }
  }, [navigate]);

  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [myProducts, setMyProducts] = useState([]);
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [vendorRequests, setVendorRequests] = useState([]);
  const [formData, setFormData] = useState({
    crop_name: '', category: 'Vegetables', price: '', quantity: '', unit: 'kg'
  });

  const userName = localStorage.getItem("userName") || "Farmer";

  // Get farmer's products from context
  const farmerProducts = getFarmerProducts(userName);

  // --- FETCHING DATA ---
  const fetchData = async () => {
    try {
      const prodRes = await fetch(`/api/my-products?farmer=${encodeURIComponent(userName)}`);
      const prodData = await prodRes.json();
      setMyProducts(prodData);

      const orderRes = await fetch(`/api/farmer-orders?farmer=${encodeURIComponent(userName)}`);
      const orderData = await orderRes.json();
      setIncomingOrders(orderData);

      const reqRes = await fetch('/api/manage-requests');
      const reqData = await reqRes.json();
      setVendorRequests(reqData);
    } catch (err) {
      console.error("Data Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, userName]);

  // --- DELETE PRODUCT LOGIC ---
  const handleDeleteProduct = (productId) => {
    if (!productId) return;
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    deleteProduct(productId);
    alert("Product deleted successfully!");
  };

  // --- MARK SHIPPED LOGIC ---
  const handleMarkShipped = async (orderId) => {
    try {
      const res = await fetch('/api/update-order-status', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, status: "Shipped" })
      });
      if (res.ok) {
        fetchData(); 
        alert("Order marked as Shipped!");
      }
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  // --- DELETE ORDER LOGIC ---
  const handleDeleteOrder = async (orderId) => {
    if (!orderId) return;
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/delete-order/${orderId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setIncomingOrders(prev => prev.filter(o => (o.id !== orderId && o._id !== orderId)));
        alert("Order deleted successfully!");
      } else {
        alert("Failed to delete order.");
      }
    } catch (err) {
      alert("Error deleting order.");
    }
  };

  // --- CALCULATE EARNINGS ---
  const totalEarnings = incomingOrders
    .filter(order => order.status === 'Shipped' || order.status === 'Accepted')
    .reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // --- ACCEPT REQUEST LOGIC (FIXED) ---
  const handleAcceptRequest = async (request) => {
    const requestId = request.id || request._id;
    const orderData = {
      vendor_name: request.vendor_name,
      farmer_name: userName,
      crop_name: request.item,
      price: request.budget,
      quantity: "As per request",
      status: "Accepted",
      date: new Date().toLocaleDateString()
    };

    try {
      const res = await fetch('/api/create-order', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        // Remove from requests list and add to incoming orders immediately
        setVendorRequests(prev => prev.filter(r => (r.id !== requestId && r._id !== requestId)));
        setIncomingOrders(prev => [...prev, orderData]);
        
        alert("Request accepted! It is now in your Incoming Orders.");
        setActiveTab('Incoming Orders');
      }
    } catch (err) {
      alert("Error processing acceptance.");
    }
  };

  // --- REJECT REQUEST LOGIC ---
  const handleRejectRequest = async (request) => {
    const requestId = request.id || request._id;
    if (!requestId) return;
    if (!window.confirm("Are you sure you want to reject this request?")) return;
    try {
      const res = await fetch(`/api/delete-request/${requestId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setVendorRequests(prev => prev.filter(r => (r.id !== requestId && r._id !== requestId)));
        alert("Request rejected and removed.");
      } else {
        alert("Failed to reject request.");
      }
    } catch (err) {
      alert("Error rejecting request.");
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name: formData.crop_name,
        price: formData.price,
        location: "Local Market",
        image: marketplaceDefaultImage,
        category: formData.category,
        description: `${formData.quantity} ${formData.unit} of fresh ${formData.crop_name}`
      };
      
      addProduct(newProduct, userName);
      alert("Product listed successfully!");
      setFormData({ crop_name: '', category: 'Vegetables', price: '', quantity: '', unit: 'kg' });
      setActiveTab('My Products');
    } catch (err) {
      alert("Error listing product.");
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Products', icon: <ShoppingBasket size={20} /> },
    { name: 'Publish Product', icon: <PlusCircle size={20} /> },
    { name: 'Vendor Requests', icon: <Send size={20} />, badge: vendorRequests.length },
    { name: 'Incoming Orders', icon: <ShoppingCart size={20} />, badge: incomingOrders.filter(o => o.status === 'Accepted').length },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-100 p-6 hidden lg:flex flex-col justify-between h-screen sticky top-0">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-10 px-2 text-green-600 hover:opacity-80 transition-all">
            <ShoppingBasket size={28} />
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
                {item.badge > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">{item.badge}</span>}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold uppercase">{userName[0]}</div>
            <div>
              <p className="text-sm font-black">{userName}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Farmer Partner</p>
            </div>
          </div>
          
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Logout & Switch
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-12">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{activeTab} Overview</h1>
          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 shadow-sm relative group hover:bg-gray-50">
              <Bell size={20} />
              {(vendorRequests.length + incomingOrders.length) > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[8px] flex items-center justify-center text-white font-bold">
                  {vendorRequests.length + incomingOrders.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            
            {activeTab === 'Dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <StatCard label="Earnings (Verified)" value={`₹${totalEarnings}`} icon={<IndianRupee />} />
                  <StatCard label="Listed Items" value={myProducts.length} icon={<ShoppingBasket />} />
                  <StatCard label="Active Orders" value={incomingOrders.filter(o => o.status === 'Accepted').length} icon={<ShoppingCart />} />
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                  <h3 className="font-black mb-6 text-lg">Recent Transactions (Income)</h3>
                  {incomingOrders.length > 0 ? (
                    <table className="w-full text-left">
                      <tbody className="font-bold text-sm divide-y divide-gray-50">
                        {incomingOrders.slice(0, 5).map((order, i) => (
                          <tr key={i}>
                            <td className="py-4 text-gray-900">{order.crop_name}</td>
                            <td className="py-4 text-gray-400 font-medium">From: {order.vendor_name}</td>
                            <td className="py-4 text-right">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.status === 'Shipped' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                +₹{order.price} ({order.status})
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : <p className="text-gray-400 text-sm font-bold">No transactions yet.</p>}
                </div>
              </>
            )}

            {activeTab === 'My Products' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(farmerProducts || []).length > 0 ? (farmerProducts || []).map((p, i) => {
                   const pid = p.id || p._id;
                   return (
                    <div key={pid || i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black bg-green-50 text-green-600 px-2 py-1 rounded-lg uppercase">{p.category}</span>
                        <button 
                          onClick={() => handleDeleteProduct(pid)} 
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                      <h3 className="text-lg font-black">{p.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{p.description}</p>
                      <div className="flex justify-between mt-6 pt-4 border-t border-gray-50 items-center">
                         <p className="text-xs font-bold text-gray-400">📍 {p.location}</p>
                         <p className="text-xl font-black text-slate-900">{p.price}</p>
                      </div>
                    </div>
                  )}) : <div className="col-span-3 text-center py-20 text-gray-400 font-bold">No products found.</div>}
              </div>
            )}

            {activeTab === 'Incoming Orders' && (
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <tr>
                      <th className="p-6">Buyer</th>
                      <th className="p-6">Product</th>
                      <th className="p-6">Amount</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold text-sm divide-y divide-gray-50">
                    {incomingOrders.map((order, i) => (
                      <tr key={i}>
                        <td className="p-6">{order.vendor_name}</td>
                        <td className="p-6">{order.crop_name}</td>
                        <td className="p-6">₹{order.price}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black ${
                            order.status === 'Shipped' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-6 text-right flex items-center justify-end gap-2">
                          {order.status !== 'Shipped' && (
                            <button 
                              onClick={() => handleMarkShipped(order.id || order._id)}
                              className="text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-all"
                            >
                              Mark Shipped
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteOrder(order.id || order._id)}
                            className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Vendor Requests' && (
              <div className="space-y-4">
                {vendorRequests.length > 0 ? vendorRequests.map((req, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-gray-900 text-lg">{req.item}</h4>
                      <p className="text-xs font-bold text-gray-400">Vendor: {req.vendor_name}</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <p className="text-xl font-black text-slate-900">₹{req.budget}</p>
                      <button onClick={() => handleAcceptRequest(req)} className="mt-1 text-[10px] font-black text-green-600 bg-green-50 px-4 py-1.5 rounded-full hover:bg-green-600 hover:text-white transition-all">
                        Accept Order
                      </button>
                      <button onClick={() => handleRejectRequest(req)} className="mt-1 text-[10px] font-black text-red-500 bg-red-50 px-4 py-1.5 rounded-full hover:bg-red-500 hover:text-white transition-all">
                        Reject
                      </button>
                    </div>
                  </div>
                )) : <p className="text-center py-20 text-gray-400 font-bold">No active requests from vendors.</p>}
              </div>
            )}

            {activeTab === 'Publish Product' && (
               <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm max-w-2xl">
                 <h2 className="text-xl font-black mb-6">List New Produce for Sale</h2>
                 <form onSubmit={handlePublish} className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Crop Name</label>
                       <input type="text" placeholder="e.g. Organic Tomatoes" className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" 
                         value={formData.crop_name} onChange={e => setFormData({...formData, crop_name: e.target.value})} required />
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Category</label>
                       <select className="w-full p-4 bg-gray-50 rounded-xl font-bold text-sm outline-none" 
                         value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                         <option>Vegetables</option><option>Fruits</option><option>Grains</option><option>Dairy</option>
                       </select>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Price (₹/kg)</label>
                       <input type="number" placeholder="40" className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" 
                         value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total Stock (kg)</label>
                       <input type="number" placeholder="500" className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" 
                         value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required />
                     </div>
                   </div>
                   <button type="submit" className="w-full py-4 bg-green-500 text-white font-black rounded-xl shadow-lg hover:bg-green-600 transition-all">
                     List Product in Market
                   </button>
                 </form>
               </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-gray-50 rounded-xl text-green-600">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <h2 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h2>
    </div>
  </div>
);

export default FarmerDashboard;
