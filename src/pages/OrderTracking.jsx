import { useState } from "react";
import { Search, Package, Truck, MapPin, CheckCircle, ChevronRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    // SIMULATED DATA: In a real app, you fetch this from API
    setOrderData({
      id: orderId || "ORD-8859-X2",
      estimatedDelivery: "Jan 05, 2026",
      currentStep: 2, // 0=Confirmed, 1=Shipped, 2=Out for Delivery, 3=Delivered
    });
  };

  const steps = [
    { title: "Order Confirmed", date: "Dec 30, 10:23 AM", desc: "Your order has been verified.", icon: Package },
    { title: "Shipped", date: "Jan 02, 06:00 PM", desc: "Item has left our warehouse.", icon: Truck },
    { title: "Out for Delivery", date: "Today, 08:30 AM", desc: "Agent is on the way to your address.", icon: MapPin },
    { title: "Delivered", date: "Expected Today", desc: "Package will be delivered soon.", icon: CheckCircle },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-gray-500">Enter your order ID to get real-time updates.</p>
        </div>

        {/* 1. SEARCH INPUT */}
        <div className="bg-white p-2 rounded-2xl shadow-sm mb-8 flex border border-gray-100 p-2">
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Order ID (e.g. ORD-1234)" 
                    className="w-full h-full pl-12 pr-4 outline-none rounded-xl text-gray-700 font-medium"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
            </div>
            <button 
                onClick={handleTrack}
                className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition"
            >
                Track
            </button>
        </div>

        {/* 2. TRACKING RESULT CARD */}
        {orderData && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            >
                {/* Header Summary */}
                <div className="bg-slate-900 text-white p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Order ID</p>
                            <h2 className="text-2xl font-bold">{orderData.id}</h2>
                        </div>
                        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                            <Truck className="text-green-400" size={24} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 font-semibold bg-green-400/10 w-fit px-3 py-1 rounded-full text-sm">
                         <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                         In Transit to Customer
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3 text-sm text-gray-300">
                        <Calendar size={16} /> Estimated Delivery: <span className="text-white font-bold">{orderData.estimatedDelivery}</span>
                    </div>
                </div>

                {/* TIMELINE UI */}
                <div className="p-8">
                    <div className="relative pl-4">
                        {/* Vertical Connecting Line */}
                        <div className="absolute left-[19px] top-2 bottom-10 w-0.5 bg-gray-100"></div>

                        {steps.map((step, index) => {
                            const isCompleted = index < orderData.currentStep;
                            const isCurrent = index === orderData.currentStep;
                            
                            return (
                                <div key={index} className="relative flex gap-6 mb-10 last:mb-0">
                                    {/* ICON & LINE */}
                                    <div className="relative z-10">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                            isCompleted 
                                                ? "bg-green-500 border-green-500 text-white" 
                                                : isCurrent 
                                                    ? "bg-white border-purple-600 text-purple-600 shadow-[0_0_0_4px_rgba(147,51,234,0.2)]" 
                                                    : "bg-white border-gray-200 text-gray-300"
                                        }`}>
                                            {isCompleted ? <CheckCircle size={18} /> : <step.icon size={18} />}
                                        </div>
                                        
                                        {/* Colored Line for Completed Steps */}
                                        {index < steps.length - 1 && isCompleted && (
                                            <div className="absolute left-[19px] top-10 h-[calc(100%+40px)] w-0.5 bg-green-500 -z-10"></div>
                                        )}
                                    </div>

                                    {/* TEXT CONTENT */}
                                    <div className={`flex-1 pt-1 transition-opacity duration-500 ${index > orderData.currentStep ? 'opacity-40' : 'opacity-100'}`}>
                                        <h3 className={`font-bold text-lg mb-1 ${isCurrent ? 'text-purple-600' : 'text-gray-900'}`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">{step.desc}</p>
                                        <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                            {step.date}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;