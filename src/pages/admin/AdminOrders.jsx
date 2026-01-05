import { useState } from "react";
import { Eye, Search, Filter, ChevronDown } from "lucide-react";

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // MOCK DATA
  const [orders, setOrders] = useState([
    { id: "#ORD-7782", customer: "Amit Sharma", email: "amit@example.com", date: "Dec 30, 2025", total: "₹14,999", status: "Processing", items: 2 },
    { id: "#ORD-7783", customer: "Sarah Jenkins", email: "sarah@example.com", date: "Dec 29, 2025", total: "₹2,499", status: "Shipped", items: 1 },
    { id: "#ORD-7784", customer: "Rahul Verma", email: "rahul@example.com", date: "Dec 28, 2025", total: "₹899", status: "Delivered", items: 3 },
    { id: "#ORD-7785", customer: "Priya Singh", email: "priya@example.com", date: "Dec 28, 2025", total: "₹4,500", status: "Cancelled", items: 1 },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
        case 'Delivered': return 'bg-green-100 text-green-700';
        case 'Processing': return 'bg-yellow-100 text-yellow-700';
        case 'Shipped': return 'bg-blue-100 text-blue-700';
        case 'Cancelled': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Orders</h2>
                <p className="text-gray-500">Manage and track customer orders.</p>
            </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
             <div className="relative flex-1">
                 <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                 <input 
                    type="text" 
                    placeholder="Search by Order ID or Customer..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
             </div>
             <div className="flex gap-4">
                 <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">
                    <Filter size={16} /> Filter
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">
                    Export CSV
                 </button>
             </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900 font-semibold uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {orders.filter(o => o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase())).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-bold text-purple-600">{order.id}</td>
                            <td className="px-6 py-4">
                                <p className="font-medium text-gray-900">{order.customer}</p>
                                <p className="text-xs text-gray-400">{order.email}</p>
                            </td>
                            <td className="px-6 py-4">{order.date}</td>
                            <td className="px-6 py-4 font-bold text-gray-900">{order.total}</td>
                            <td className="px-6 py-4">
                                <div className="relative group">
                                    <button className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                        {order.status} <ChevronDown size={12} />
                                    </button>
                                    {/* Dropdown for Status */}
                                    <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-10 overflow-hidden">
                                        {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                            <button 
                                                key={status}
                                                onClick={() => handleStatusChange(order.id, status)}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs font-medium"
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition" title="View Details">
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default AdminOrders;