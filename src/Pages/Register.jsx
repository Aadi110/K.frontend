import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "", role: "farmer" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/accounts/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setMsg("Account created! Proceeding to login...");
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-96">
        <h2 className="text-2xl font-black mb-4">Register</h2>
        {msg && <p className="text-green-500 text-xs font-bold mb-4">{msg}</p>}
        <div className="flex gap-2 mb-4">
          {['farmer', 'vendor'].map(r => (
            <button key={r} onClick={() => setFormData({...formData, role: r})} 
              className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase border-2 ${formData.role === r ? 'border-green-500 bg-green-50' : 'border-gray-100'}`}>
              {r}
            </button>
          ))}
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-xl outline-none" onChange={e => setFormData({...formData, fullname: e.target.value})} />
          <input type="email" placeholder="Email" className="w-full p-4 bg-gray-50 rounded-xl outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 rounded-xl outline-none" onChange={e => setFormData({...formData, password: e.target.value})} />
          <button className="w-full py-4 bg-[#39E71F] font-black rounded-xl">Create Account</button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-400 font-bold">
          Already have an account?{" "}
          <span
            className="text-[#39E71F] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};
export default Register;