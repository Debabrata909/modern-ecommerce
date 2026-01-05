import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  // Stats Data
  const stats = [
    { title: "Total Sales", value: "₹45,231.89", icon: DollarSign, color: "bg-green-500", trend: "+20.1%", trendUp: true },
    { title: "Total Orders", value: "356", icon: ShoppingBag, color: "bg-blue-500", trend: "+15.2%", trendUp: true },
    { title: "Customers", value: "2,405", icon: Users, color: "bg-purple-500", trend: "+10.4%", trendUp: true },
    { title: "Refunds", value: "12", icon: TrendingUp, color: "bg-red-500", trend: "-2.5%", trendUp: false },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "Amit Sharma", amount: "₹14,999", status: "Completed", date: "Today, 10:30 AM" },
    { id: "#ORD-002", customer: "Priya Singh", amount: "₹2,499", status: "Pending", date: "Yesterday, 4:15 PM" },
    { id: "#ORD-003", customer: "Rahul Verma", amount: "₹899", status: "Shipped", date: "Jan 12, 2025" },
    { id: "#ORD-004", customer: "Sneha Kapoor", amount: "₹4,500", status: "Cancelled", date: "Jan 10, 2025" },
  ];

  const getStatusColor = (status) => {
      switch(status) {
          case 'Completed': return 'bg-green-100 text-green-700';
          case 'Pending': return 'bg-yellow-100 text-yellow-700';
          case 'Shipped': return 'bg-blue-100 text-blue-700';
          case 'Cancelled': return 'bg-red-100 text-red-700';
          default: return 'bg-gray-100 text-gray-700';
      }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Welcome back, here is what's happening today.</p>
      </div>

      {/* 1. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-4">
               <div className={`${stat.color} bg-opacity-10 p-3 rounded-xl`}>
                 <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
               </div>
               <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
               </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* 2. RECENT ORDERS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold">Recent Orders</h3>
            <button className="text-purple-600 text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900 font-semibold uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4">{order.customer}</td>
                            <td className="px-6 py-4">{order.date}</td>
                            <td className="px-6 py-4 font-bold">{order.amount}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;