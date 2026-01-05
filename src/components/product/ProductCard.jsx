import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Heart, Plus } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      {/* IMAGE SECTION */}
      <div className="relative h-[300px] overflow-hidden bg-gray-100">
        {/* Badge (Optional - can be dynamic based on product data) */}
        {product.isNew && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            NEW
            </span>
        )}

        {/* Wishlist Button (Fades in on hover) */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 z-10 hover:text-red-500">
            <Heart size={18} />
        </button>

        {/* Main Image with Zoom Effect */}
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />

        {/* Overlay Actions (Slide up on hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out bg-gradient-to-t from-black/50 to-transparent flex gap-2 justify-center pb-6">
            
            {/* Quick View Link */}
            <Link 
                to={`/product/${product.id}`}
                className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition shadow-lg"
                title="View Details"
            >
                <Eye size={20} />
            </Link>

            {/* Add to Cart Button */}
            <button 
                className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition shadow-lg flex items-center gap-2 px-4"
                onClick={() => console.log("Add to cart:", product.id)}
            >
                <ShoppingCart size={18} />
                <span className="text-sm font-bold">Add</span>
            </button>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-900 truncate pr-4">
                {product.title}
            </h3>
            <span className="font-semibold text-purple-600">
                ₹{product.price}
            </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {product.description || "Premium quality product designed for your lifestyle."}
        </p>

        {/* Rating or Category Tag */}
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-wide">
            <span>{product.category || "General"}</span>
            <span>•</span>
            <span className="text-green-600">In Stock</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;