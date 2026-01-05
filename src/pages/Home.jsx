import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { ArrowRight, Truck, Shield, Star, Zap, Clock, CheckCircle } from 'lucide-react'; 
import products from "../data/products";
import ProductCard from "../components/product/ProductCard";
import { Link } from 'react-router-dom';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Filter products based on Tabs (Simulated logic)
  const getFilteredProducts = () => {
    if (activeTab === "new") return products.filter(p => p.isNew);
    if (activeTab === "sale") return products.filter(p => p.oldPrice);
    return products;
  };

  return (
    <div className="overflow-hidden bg-white">

      {/* 1. HERO SECTION */}
     {/* 1. HERO SECTION (Fixed Mobile Layout) */}
      <section className="relative bg-black text-white min-h-screen flex items-center px-6 pt-32 md:pt-0 overflow-hidden">
        
        {/* Background Gradient Blob */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10 w-full">
          
          {/* Text Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center md:text-left" // Center text on mobile, left on desktop
          >
            <span className="text-purple-400 font-bold tracking-widest uppercase mb-4 block text-sm md:text-base">
              New Collection 2025
            </span>
            
            {/* Adjusted font size for mobile to prevent overflow */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Lifestyle.
              </span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-lg mx-auto md:mx-0">
              Discover premium aesthetics with our curated collection of modern essentials. Quality meets innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2 shadow-lg shadow-white/10">
                Shop Now <ArrowRight size={20} />
              </button>
              <button className="border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition">
                View Lookbook
              </button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mt-10 md:mt-0"
          >
            {/* Added styling to ensure image fits well on mobile */}
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
              className="rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition duration-500 border border-white/10 w-full max-w-md mx-auto md:max-w-full"
              alt="Fashion Model"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. BRAND LOGOS (New Section - Social Proof) */}
      <section className="py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-6">Trusted by world-class brands</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholder logos - You can replace with real SVGs */}
                {['NIKE', 'APPLE', 'SONY', 'SAMSUNG', 'ADIDAS'].map((brand, i) => (
                    <h3 key={i} className="text-2xl font-black text-gray-800">{brand}</h3>
                ))}
            </div>
        </div>
      </section>

     {/* 3. CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeInUp} 
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-500">Find exactly what you are looking for.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              name: 'Electronics', 
              image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80' // High-quality tech setup
            },
            { 
              name: 'Fashion', 
              image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80' // Stylish coat/fashion
            },
            { 
              name: 'Home Decor', 
              image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' // Modern interior
            }
          ].map((cat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }} 
              viewport={{ once: true }}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {cat.name}
                </h3>
                <span className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                  Shop Collection <ArrowRight size={16} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FLASH SALE (New Section - Urgency) */}
      <section className="bg-purple-900 py-20 px-6 relative overflow-hidden my-20">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-white">
                <div className="flex items-center gap-2 text-pink-400 font-bold mb-4">
                    <Clock size={20} /> <span>Deal of the Month</span>
                </div>
                <h2 className="text-5xl font-bold mb-6">Sony WH-1000XM5 <br/> Noise Cancelling</h2>
                <p className="text-purple-200 mb-8 text-lg">Experience the next level of silence. Limited stock available at this exclusive price.</p>
                
                {/* Countdown Timer Visual */}
                <div className="flex gap-4 mb-8">
                    {['02', '14', '35', '56'].map((time, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center min-w-[80px]">
                            <span className="block text-2xl font-bold">{time}</span>
                            <span className="text-xs text-purple-300 uppercase">{['Days', 'Hours', 'Mins', 'Secs'][i]}</span>
                        </div>
                    ))}
                </div>

                <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold transition shadow-lg shadow-pink-500/30">
                    Buy Now - ₹14,999
                </button>
            </div>
            <div className="relative">
                 {/* Glowing Circle behind image */}
                 <div className="absolute inset-0 bg-pink-500 rounded-full blur-[80px] opacity-30 animate-pulse" />
                 <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" className="relative z-10 w-full drop-shadow-2xl rotate-[-12deg] hover:rotate-0 transition duration-500" alt="Headphones" />
            </div>
         </div>
      </section>

      {/* 5. CURATED PICKS WITH TABS (New Section - Deep Content) */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Curated For You</h2>
            
            {/* TABS */}
            <div className="flex justify-center gap-4 flex-wrap">
                {['all', 'new', 'sale'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all ${
                            activeTab === tab 
                            ? "bg-black text-white" 
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {tab === 'all' ? 'Best Sellers' : tab === 'new' ? 'New Arrivals' : 'Flash Deals'}
                    </button>
                ))}
            </div>
        </div>

        <motion.div 
          layout 
          className="grid md:grid-cols-4 gap-8"
        >
            {getFilteredProducts().slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </motion.div>
      </section>

      {/* 6. TESTIMONIALS (New Section - Trust) */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { name: "Alex Johnson", role: "Photographer", text: "The camera quality is absolutely stunning. Fast delivery and great packaging." },
                    { name: "Sarah Williams", role: "Designer", text: "I love the aesthetic of this store. The products are exactly as described." },
                    { name: "Michael Chen", role: "Developer", text: "Customer support was super helpful when I needed to exchange an item. 10/10." }
                ].map((review, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="flex text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                {review.name[0]}
                            </div>
                            <div>
                                <h4 className="font-bold">{review.name}</h4>
                                <p className="text-xs text-gray-500">{review.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 7. FEATURES */}
      <section className="max-w-7xl mx-auto py-20 px-6 border-t border-gray-100">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: <Truck size={32} />, title: "Fast Delivery", desc: "Within 24 hours" },
            { icon: <Shield size={32} />, title: "Secure Payment", desc: "100% Protected" },
            { icon: <CheckCircle size={32} />, title: "Quality Check", desc: "Passed by Experts" },
            { icon: <Zap size={32} />, title: "24/7 Support", desc: "Always here for you" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-purple-600 mb-4 bg-purple-50 p-4 rounded-full">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-black rounded-3xl p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-30" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600 rounded-full blur-[100px] opacity-30" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join the Club</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">Subscribe for 20% off your first order.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-500" />
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;