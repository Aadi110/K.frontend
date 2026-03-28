import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-24 bg-white">
      {/* INTRODUCTION SECTION */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4">About KishanSetu</h2>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            Connecting Farmers and Buyers Directly
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            KishanSetu is a revolutionary digital marketplace transforming agriculture in Nepal by eliminating unnecessary middlemen, ensuring fair pricing, and empowering local farmers through transparent, technology-driven trade.
          </p>
          <p className="text-gray-500 text-base leading-relaxed">
            We believe that farmers deserve full value for their hard work, and buyers deserve direct access to quality produce. KishanSetu makes this possible.
          </p>
        </motion.div>
      </section>

      {/* MISSION SECTION */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4">Our Mission</h2>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            Bridging the gap between <span className="text-green-500">Soil</span> and <span className="text-green-500">Store</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Our mission is to empower Nepali farmers through cutting-edge technology, fair trade practices, and direct market access. We are committed to creating a sustainable agricultural ecosystem where every farmer thrives.
          </p>
          <div className="flex gap-8">
            <div>
              <h3 className="text-3xl font-black text-gray-900">10k+</h3>
              <p className="text-gray-400 text-sm font-bold">Verified Farmers</p>
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900">500+</h3>
              <p className="text-gray-400 text-sm font-bold">Vendor Partners</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1000&auto=format&fit=crop" 
            alt="Farming" 
            className="rounded-[3rem] shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-[#39E71F] p-8 rounded-3xl hidden md:block">
            <p className="text-black font-black text-2xl tracking-tighter italic">"Empowering the Hands that Feed Us."</p>
          </div>
        </motion.div>
      </section>

      {/* VISION SECTION */}
      <section className="bg-green-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4">Our Vision</h2>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Digitizing Agriculture for a Prosperous Nepal
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              We envision a digital-first agricultural marketplace where every farmer across Nepal has equal access to fair pricing, reliable buyers, and modern farming resources. A future where technology bridges rural and urban economies sustainably.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Comprehensive solutions designed to empower farmers and serve vendors with excellence.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Direct Connection", desc: "Farm-to-buyer without intermediaries", icon: "🔗" },
              { title: "Transparent Pricing", desc: "Real-time market rates visible to all", icon: "💰" },
              { title: "Easy Communication", desc: "In-app chat for seamless negotiations", icon: "💬" },
              { title: "Local Support", desc: "Supporting Nepali agriculture growth", icon: "🌱" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900">Built on Transparency</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Direct Trading", desc: "No middleman. No hidden fees. Just direct communication between farm and market.", icon: "🌾" },
            { title: "Secure Payments", desc: "Our platform ensures that every transaction is encrypted and verified instantly.", icon: "🛡️" },
            { title: "Quality Guarantee", desc: "We vet every vendor and farmer to maintain a marketplace of excellence.", icon: "✨" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100"
            >
              <div className="text-4xl mb-6">{item.icon}</div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE KISHANSETU */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Choose KishanSetu</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Trustworthy Platform", desc: "Verified users, secure transactions, and transparent operations you can rely on." },
                { title: "Support Local Farmers", desc: "Every purchase directly benefits hardworking farmers in your community." },
                { title: "Simple & User-Friendly", desc: "Intuitive interface makes buying and selling straightforward for everyone." },
                { title: "Sustainable Agriculture", desc: "Promoting fair trade and environmentally conscious farming practices." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="text-green-600 text-2xl font-black flex-shrink-0">✓</div>
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;