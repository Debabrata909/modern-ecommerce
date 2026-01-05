import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, Banknote, Smartphone, ShieldCheck, Truck, Lock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const { cart } = useCart(); 
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    upiId: "" // Added for UPI
  });

  // --- CALCULATIONS ---
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API Call
    setTimeout(() => {
        setIsProcessing(false);
        alert(`Order Placed Successfully via ${paymentMethod.toUpperCase()}!`);
    }, 2000);
  };

  if (cart.length === 0) return <div className="text-center pt-32 text-2xl font-bold">Your cart is empty.</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <span className="cursor-pointer hover:text-black" onClick={() => navigate("/cart")}>Cart</span>
            <ChevronRight size={14} />
            <span className="font-semibold text-black">Checkout</span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-10">
            
          {/* LEFT COLUMN: INPUTS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. CONTACT INFO */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address" 
                    required
                    className="input-field"
                    onChange={handleChange}
                />
            </div>

            {/* 2. SHIPPING ADDRESS */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Truck size={20} className="text-purple-600" /> Shipping Address
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input name="firstName" placeholder="First Name" required className="input-field" onChange={handleChange} />
                    <input name="lastName" placeholder="Last Name" required className="input-field" onChange={handleChange} />
                </div>
                
                <input name="address" placeholder="Street Address" required className="input-field mb-4 w-full" onChange={handleChange} />
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <input name="city" placeholder="City" required className="input-field" onChange={handleChange} />
                    <input name="state" placeholder="State" required className="input-field" onChange={handleChange} />
                    <input name="zip" placeholder="ZIP Code" required className="input-field" onChange={handleChange} />
                </div>

                <input name="phone" placeholder="Phone Number" required className="input-field w-full" onChange={handleChange} />
            </div>

            {/* 3. PAYMENT METHOD */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Lock size={20} className="text-purple-600" /> Payment Method
                </h2>

                {/* Payment Toggles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {/* Card Option */}
                    <div 
                        onClick={() => setPaymentMethod("card")}
                        className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all h-24 ${
                            paymentMethod === "card" ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200 hover:border-purple-300 text-gray-500"
                        }`}
                    >
                        <CreditCard size={24} />
                        <span className="font-semibold text-sm">Card</span>
                    </div>

                    {/* UPI Option */}
                    <div 
                        onClick={() => setPaymentMethod("upi")}
                        className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all h-24 ${
                            paymentMethod === "upi" ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200 hover:border-purple-300 text-gray-500"
                        }`}
                    >
                        <Smartphone size={24} />
                        <span className="font-semibold text-sm">UPI</span>
                    </div>

                    {/* COD Option */}
                    <div 
                        onClick={() => setPaymentMethod("cod")}
                        className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all h-24 ${
                            paymentMethod === "cod" ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200 hover:border-purple-300 text-gray-500"
                        }`}
                    >
                        <Banknote size={24} />
                        <span className="font-semibold text-sm">COD</span>
                    </div>
                </div>

                {/* Dynamic Payment Details */}
                <AnimatePresence mode="wait">
                    {paymentMethod === "card" && (
                        <motion.div 
                            key="card-form"
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: "auto" }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                        >
                            <input name="cardNumber" placeholder="Card Number" className="input-field w-full" />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="expiry" placeholder="MM / YY" className="input-field" />
                                <input name="cvc" placeholder="CVC" className="input-field" />
                            </div>
                        </motion.div>
                    )}

                    {paymentMethod === "upi" && (
                        <motion.div 
                            key="upi-form"
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: "auto" }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300"
                        >
                             <label className="block text-sm font-semibold text-gray-700 mb-2">Enter UPI ID</label>
                             <div className="flex gap-2">
                                <input 
                                    name="upiId" 
                                    placeholder="example@upi" 
                                    className="input-field flex-1 bg-white" 
                                    onChange={handleChange}
                                />
                                <button type="button" className="bg-black text-white px-4 rounded-lg text-sm font-bold hover:bg-gray-800">
                                    Verify
                                </button>
                             </div>
                             <div className="mt-4 flex gap-4 overflow-x-auto pb-2 grayscale opacity-60">
                                {/* Icons representing GPay, PhonePe, Paytm (simulated text/boxes) */}
                                <div className="border px-3 py-1 rounded bg-white text-xs font-bold">Google Pay</div>
                                <div className="border px-3 py-1 rounded bg-white text-xs font-bold">PhonePe</div>
                                <div className="border px-3 py-1 rounded bg-white text-xs font-bold">Paytm</div>
                                <div className="border px-3 py-1 rounded bg-white text-xs font-bold">BHIM</div>
                             </div>
                        </motion.div>
                    )}

                    {paymentMethod === "cod" && (
                        <motion.div 
                            key="cod-msg"
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-purple-50 p-4 rounded-lg text-sm text-purple-700 border border-purple-100 flex items-center gap-3"
                        >
                            <Banknote size={20} />
                            <div>
                                <p className="font-bold">Cash on Delivery selected</p>
                                <p className="text-xs">Pay digitally or with cash when your order arrives.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <div className="lg:col-span-1">
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                
                {/* Product List */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar mb-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                                <img src={item.image} className="w-full h-full object-cover" />
                                <span className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-md font-bold">
                                    {item.qty}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold line-clamp-2">{item.title}</h4>
                                <p className="text-xs text-gray-500">{item.category}</p>
                            </div>
                            <span className="text-sm font-semibold">₹{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold text-black">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className={shipping === 0 ? "text-green-600 font-semibold" : "text-black font-semibold"}>
                            {shipping === 0 ? "Free" : `₹${shipping}`}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (18% GST)</span>
                        <span className="font-semibold text-black">₹{Math.floor(tax).toLocaleString()}</span>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4 mb-8">
                    <div className="flex justify-between items-end">
                        <span className="text-base font-bold text-gray-900">Total</span>
                        <div className="text-right">
                             <span className="text-2xl font-bold text-purple-600">₹{Math.floor(total).toLocaleString()}</span>
                             <p className="text-[10px] text-gray-400">Including Taxes</p>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {isProcessing ? (
                        <>Processing...</>
                    ) : (
                        <>Pay with {paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'cod' ? 'Cash' : 'Card'}</>
                    )}
                </button>
                
                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
                    <ShieldCheck size={14} className="text-green-600" />
                    Secure SSL Encryption
                </div>
             </div>
          </div>
        </form>
      </div>

      {/* Helper Styles for Inputs */}
      <style>{`
        .input-field {
            width: 100%;
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 0.75rem 1rem;
            outline: none;
            transition: all 0.2s;
        }
        .input-field:focus {
            border-color: #9333ea;
            box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
            background-color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Checkout;