import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, CheckCircle2 } from "lucide-react";

const Login = () => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // CHECK IF ALREADY LOGGED IN
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");
    if (isLoggedIn === "true" && role) {
      navigate(role === "farmer" ? "/farmer-dashboard" : "/vendor-dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // SAVE SESSION DATA
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("isLoggedIn", "true");
        
        // If Remember Me is unchecked, you could technically use sessionStorage, 
        // but for this flow, we'll use localStorage to keep it persistent as requested.
        
        navigate(data.role === "farmer" ? "/farmer-dashboard" : "/vendor-dashboard");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      alert("Unable to reach the server. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] relative px-4">
      {/* Soft background glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-100 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-md border border-gray-50"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-green-50 rounded-3xl mb-4">
             <Lock className="text-[#39E71F]" size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 font-bold text-sm mt-2 uppercase tracking-widest text-[10px]">
            Login to your KishanSetu ID
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-green-500/20 font-bold transition-all text-sm"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                autoComplete="current-password"
                className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-green-500/20 font-bold transition-all text-sm" 
                onChange={e => setPassword(e.target.value)} 
                required
              />
            </div>
          </div>

          {/* REMEMBER ME & FORGOT PASSWORD */}
          <div className="flex items-center justify-between px-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="peer hidden" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <div className="w-5 h-5 border-2 border-gray-200 rounded-lg peer-checked:bg-[#39E71F] peer-checked:border-[#39E71F] transition-all"></div>
                <CheckCircle2 className="absolute text-white opacity-0 peer-checked:opacity-100 transition-all p-0.5" size={20} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 group-hover:text-gray-600 transition-colors">Remember Me</span>
            </label>
            
            <button type="button" className="text-[11px] font-black uppercase tracking-wider text-[#39E71F] hover:text-green-600 transition-colors">
              Forgot Password?
            </button>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-5 bg-[#39E71F] text-black font-black rounded-2xl shadow-[0_10px_20px_rgba(57,231,31,0.2)] hover:shadow-[0_15px_30px_rgba(57,231,31,0.3)] transition-all mt-4 text-sm"
          >
            Sign In to Dashboard
          </motion.button>
        </form>

        <p className="text-center mt-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
          Don't have an account?{" "}
          <span
            className="text-[#39E71F] cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Create one
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;