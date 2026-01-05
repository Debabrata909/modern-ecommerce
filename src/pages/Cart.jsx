import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();

  // --- CALCULATIONS ---
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const shippingThreshold = 5000;
  const shippingCost = subtotal > shippingThreshold ? 0 : 99;
  const total = subtotal + shippingCost;
  
  // Calculate progress to free shipping
  const freeShippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);

  // --- EMPTY STATE ---
  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-24">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
            <ShoppingBag size={64} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our top categories and find something you love.
        </p>
        <button 
          onClick={() => navigate("/products")}
          className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.length} items)</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Free Shipping Progress Bar */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>
                        {shippingCost === 0 
                         ? <span className="text-green-600">You've unlocked FREE Shipping!</span> 
                         : `Add ₹${(shippingThreshold - subtotal).toLocaleString()} for Free Shipping`
                        }
                    </span>
                    <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${freeShippingProgress}%` }} 
                    />
                </div>
            </div>

            {/* Cart Items List */}
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                {/* Product Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.category} • {item.color || 'Standard'}</p>
                        </div>
                        <span className="font-bold text-lg">₹{item.price.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                        {/* Quantity Control */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                             <button 
                                onClick={() => dispatch({ type: "DECREASE", payload: item.id })}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100"
                                disabled={item.qty <= 1}
                             >
                                <Minus size={14} />
                             </button>
                             <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                             <button 
                                onClick={() => dispatch({ type: "INCREASE", payload: item.id })}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100"
                             >
                                <Plus size={14} />
                             </button>
                        </div>

                        {/* Remove Button */}
                        <button 
                            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                            className="flex items-center gap-1 text-red-500 text-sm font-semibold hover:text-red-700 transition"
                        >
                            <Trash2 size={16} /> Remove
                        </button>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 rounded-3xl sticky top-28 border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping Estimate</span>
                        <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                            {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax Estimate (18%)</span>
                        <span className="font-semibold text-gray-900">₹{(subtotal * 0.18).toLocaleString()}</span>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-8">
                    <div className="flex justify-between items-end">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold text-purple-600">₹{Math.floor(total * 1.18).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Including GST</p>
                </div>

                <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-purple-600 transition flex items-center justify-center gap-2 shadow-lg"
                >
                    Checkout <ArrowRight size={20} />
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
                    <ShieldCheck size={16} className="text-green-600" />
                    <span>Secure Checkout • SSL Encrypted</span>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;