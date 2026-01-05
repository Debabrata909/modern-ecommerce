import { Link, useNavigate } from "react-router-dom";
import { Package, ChevronRight, Clock, Truck, CheckCircle, RefreshCcw, Search } from "lucide-react";
import { motion } from "framer-motion";

const Orders = () => {
  const navigate = useNavigate();

  // MOCK DATA - In a real app, fetch from API based on User ID
  const orders = [
    {
      id: "ORD-8859-X2",
      date: "Dec 30, 2025",
      total: 14999,
      status: "In Transit",
      items: [
        { id: 1, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", name: "Sony WH-1000XM5" },
        { id: 2, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200", name: "Nike Air Pegasus" }
      ]
    },
    {
      id: "ORD-7721-A9",
      date: "Nov 15, 2025",
      total: 39999,
      status: "Delivered",
      items: [
        { id: 3, img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200", name: "Apple Watch Series 9" }
      ]
    },
    {
      id: "ORD-6610-C4",
      date: "Oct 02, 2025",
      total: 2499,
      status: "Delivered",
      items: [
        { id: 4, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200", name: "Urban Backpack" },
        { id: 5, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200", name: "Gaming Mouse" },
        { id: 6, img: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=200", name: "Keyboard" }
      ]
    },
    {
      id: "ORD-5501-B1",
      date: "Sep 20, 2025",
      total: 899,
      status: "Cancelled",
      items: [
        { id: 10, img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200", name: "Coffee Mug Set" }
      ]
    }
  ];

  // Helper for Status Colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700 border-green-200";
      case "In Transit": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <CheckCircle size={16} />;
      case "In Transit": return <Truck size={16} />;
      case "Cancelled": return <Package size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Orders</h1>
                <p className="text-gray-500">View and track your purchase history.</p>
            </div>
            
            {/* Simple Search for Orders */}
            <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search Order ID..." 
                    className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black w-full md:w-64"
                />
            </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
            {orders.map((order, index) => (
                <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                    {/* Order Header */}
                    <div className="bg-gray-50/50 p-6 flex flex-wrap gap-4 justify-between items-center border-b border-gray-100">
                        <div className="flex gap-8">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Order Placed</p>
                                <p className="font-semibold text-gray-900">{order.date}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Total Amount</p>
                                <p className="font-semibold text-gray-900">₹{order.total.toLocaleString()}</p>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Order ID</p>
                                <p className="font-mono text-gray-600">#{order.id}</p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold ${getStatusStyle(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                        </div>
                    </div>

                    {/* Order Content */}
                    <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                        
                        {/* Product Thumbnails */}
                        <div className="flex-1 flex gap-4 overflow-x-auto pb-2 w-full">
                            {order.items.map((item) => (
                                <div key={item.id} className="relative group shrink-0">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    {/* Tooltip on hover */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                            {/* If more than 3 items, you could show a "+2" bubble here */}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 w-full md:w-auto shrink-0">
                            {order.status === "In Transit" ? (
                                <button 
                                    onClick={() => navigate("/track-order")}
                                    className="flex-1 md:flex-none bg-black text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
                                >
                                    Track Order <ChevronRight size={16} />
                                </button>
                            ) : (
                                <button className="flex-1 md:flex-none border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                    <RefreshCcw size={16} /> Buy Again
                                </button>
                            )}
                            
                            <button className="text-purple-600 font-bold text-sm hover:underline px-4">
                                View Invoice
                            </button>
                        </div>
                    </div>

                </motion.div>
            ))}
        </div>
        
        {/* Footer Link */}
        <div className="text-center mt-12">
            <Link to="/products" className="text-gray-500 hover:text-black font-semibold flex items-center justify-center gap-2">
                 Continue Shopping <ChevronRight size={16} />
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Orders;