import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { Star, Truck, ShieldCheck, RefreshCw, Minus, Plus, Heart, Share2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  
  // Find Product
  const product = products.find((p) => p.id === Number(id));

  // State for interactivity
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");

  // Mock Data for Options (Since your basic data might not have these)
  const sizes = ["S", "M", "L", "XL"];
  const colors = [
    { name: "black", class: "bg-black" },
    { name: "purple", class: "bg-purple-600" },
    { name: "gray", class: "bg-gray-400" },
  ];

  // Set initial image when product loads
  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      window.scrollTo(0, 0); // Scroll to top on page load
    }
  }, [product, id]);

  if (!product) return <div className="text-center py-20 text-2xl font-bold">Product not found</div>;

  // Filter Related Products (Same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    // Add logic here to pass quantity/size/color if your Context supports it
    for (let i = 0; i < quantity; i++) {
        dispatch({ type: "ADD_TO_CART", payload: product });
    }
    // Optional: Show toast notification here
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. BREADCRUMBS */}
        <div className="flex items-center text-sm text-gray-500 mb-8 gap-2">
            <Link to="/" className="hover:text-black">Home</Link> 
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-black">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-black font-semibold truncate max-w-[200px]">{product.title}</span>
        </div>

        {/* 2. MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-gray-100 rounded-3xl overflow-hidden aspect-square relative group"
            >
                <img src={mainImage} className="w-full h-full object-cover mix-blend-multiply" alt={product.title} />
                {product.isNew && (
                    <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
                )}
            </motion.div>
            
            {/* Thumbnails (Simulated by using the same image multiple times for demo) */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {[product.image, product.image, product.image].map((img, i) => (
                    <button 
                        key={i} 
                        onClick={() => setMainImage(img)}
                        className={`w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 ${mainImage === img ? 'border-purple-600' : 'border-transparent'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div>
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{product.title}</h1>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.floor(product.rating || 4) ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews || 120} Reviews)</span>
                    </div>
                </div>
                {/* Wishlist Icon */}
                <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition">
                    <Heart size={24} />
                </button>
            </div>

            <div className="text-3xl font-bold text-purple-600 mb-6">
                ₹{product.price.toLocaleString()}
                {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through ml-3 font-normal">
                        ₹{product.oldPrice.toLocaleString()}
                    </span>
                )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
                {product.description || "Experience premium quality with this meticulously crafted item. Designed for modern lifestyles, it combines durability with elegant aesthetics."}
            </p>

            {/* SELECTORS */}
            <div className="space-y-6 border-t border-b border-gray-100 py-6 mb-8">
                
                {/* Color Selector */}
                <div>
                    <span className="block font-semibold mb-3 text-sm uppercase tracking-wide">Select Color</span>
                    <div className="flex gap-3">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color.name)}
                                className={`w-8 h-8 rounded-full ${color.class} ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-purple-600' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Size Selector */}
                <div>
                    <span className="block font-semibold mb-3 text-sm uppercase tracking-wide">Select Size</span>
                    <div className="flex gap-3">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-12 h-12 rounded-lg border font-semibold transition-all ${
                                    selectedSize === size 
                                    ? 'bg-black text-white border-black' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mb-8">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-black">
                        <Minus size={20} />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-black">
                        <Plus size={20} />
                    </button>
                </div>

                {/* Add to Cart */}
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl py-3 px-8 transition shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                >
                    Add to Cart
                </button>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-3 border border-gray-100 p-3 rounded-lg">
                    <Truck className="text-purple-600" size={20} />
                    <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-3 border border-gray-100 p-3 rounded-lg">
                    <RefreshCw className="text-purple-600" size={20} />
                    <span>30 Day Returns</span>
                </div>
                <div className="flex items-center gap-3 border border-gray-100 p-3 rounded-lg">
                    <ShieldCheck className="text-purple-600" size={20} />
                    <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3 border border-gray-100 p-3 rounded-lg">
                    <Share2 className="text-purple-600" size={20} />
                    <span>Share Product</span>
                </div>
            </div>
          </div>
        </div>

        {/* 3. RELATED PRODUCTS */}
        <div className="border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-4 gap-6">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((p) => (
                        <Link to={`/product/${p.id}`} key={p.id} className="group">
                             <div className="bg-gray-100 rounded-xl overflow-hidden mb-3 aspect-[3/4]">
                                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                             </div>
                             <h3 className="font-semibold">{p.title}</h3>
                             <p className="text-gray-500">₹{p.price}</p>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-400">No related products found.</p>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;