import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, SlidersHorizontal, X, Search } from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/product/ProductCard";

const Products = () => {
  // State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(200000); // Max price default
  const [sortBy, setSortBy] = useState("featured");

  // Extract unique categories from data
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // --- FILTERING LOGIC ---
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // 1. Search Filter
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        // 2. Category Filter
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        // 3. Price Filter
        const matchesPrice = product.price <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        // 4. Sorting Logic
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        if (sortBy === "new") return b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1;
        return 0; // featured (default order)
      });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  // --- REUSABLE FILTER SECTION UI ---
  const FilterSection = () => (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
          Categories
        </h3>
        <div className="space-y-2">
            {categories.map((cat) => (
            <label key={cat} className="flex items-center cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition-colors ${
                    selectedCategory === cat ? "bg-purple-600 border-purple-600" : "border-gray-300 bg-white group-hover:border-purple-400"
                }`}>
                    {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <input
                type="radio"
                name="category"
                className="hidden"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                />
                <span className={`text-sm ${selectedCategory === cat ? "font-semibold text-purple-700" : "text-gray-600"}`}>
                {cat}
                </span>
            </label>
            ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Max Price</h3>
            <span className="text-purple-600 font-semibold text-sm">₹{priceRange.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="0"
          max="200000"
          step="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>₹0</span>
            <span>₹2L+</span>
        </div>
      </div>
      
      {/* Clear Filters Button */}
      <button 
        onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All");
            setPriceRange(200000);
            setSortBy("featured");
        }}
        className="w-full py-3 border border-gray-300 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Collection</h1>
            <p className="text-gray-500">
                Showing {filteredProducts.length} results for <span className="text-black font-semibold">"{selectedCategory}"</span>
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 bg-gray-100 px-4 py-3 rounded-xl font-semibold"
            >
              <Filter size={18} /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative group flex-1 md:flex-none">
              <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl cursor-pointer hover:border-purple-500 transition min-w-[180px] justify-between">
                <span className="text-sm text-gray-600">Sort by:</span>
                <span className="font-semibold text-sm capitalize">{sortBy === 'new' ? 'Newest' : sortBy === 'low' ? 'Price: Low' : sortBy === 'high' ? 'Price: High' : 'Featured'}</span>
                <ChevronDown size={16} />
              </div>
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                {['featured', 'new', 'low', 'high'].map(opt => (
                    <button 
                        key={opt}
                        onClick={() => setSortBy(opt)}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition capitalize"
                    >
                        {opt === 'new' ? 'Newest Arrivals' : opt === 'low' ? 'Price: Low to High' : opt === 'high' ? 'Price: High to Low' : 'Featured'}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10 items-start">
          {/* SIDEBAR (Desktop) */}
          <aside className="hidden md:block w-64 sticky top-24 shrink-0">
             <FilterSection />
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1 min-h-[500px]">
            {filteredProducts.length === 0 ? (
                // EMPTY STATE
                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Search size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 max-w-xs mx-auto mb-6">
                        We couldn't find any items matching your filters. Try adjusting the price or category.
                    </p>
                    <button 
                        onClick={() => {setSelectedCategory("All"); setSearchQuery(""); setPriceRange(200000);}}
                        className="text-purple-600 font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            ) : (
                // GRID
                <motion.div 
                    layout 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-50 md:hidden shadow-2xl p-6 overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <SlidersHorizontal size={20} /> Filters
                    </h2>
                    <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={24} />
                    </button>
                </div>
                <FilterSection />
                <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold mt-8"
                >
                    Show {filteredProducts.length} Results
                </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;