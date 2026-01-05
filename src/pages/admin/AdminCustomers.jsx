import { useState } from "react";
import { Search, Mail, Phone, MoreHorizontal, UserCheck, UserX } from "lucide-react";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Amit Sharma", email: "amit@example.com", phone: "+91 98765 43210", orders: 12, spent: "₹1,24,000", status: "Active", joinDate: "Jan 12, 2024" },
    { id: 2, name: "Sarah Jenkins", email: "sarah@example.com", phone: "+91 90000 11111", orders: 5, spent: "₹45,000", status: "Active", joinDate: "Mar 05, 2024" },
    { id: 3, name: "Rahul Verma", email: "rahul@example.com", phone: "+91 88888 22222", orders: 0, spent: "₹0", status: "Blocked", joinDate: "Dec 10, 2024" },
  ]);

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Customers</h2>
                <p className="text-gray-500">View and manage your customer base.</p>
            </div>
            <button className="bg-black text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition">
                Export List
            </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
             <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
             <input 
                type="text" 
                placeholder="Search customers by name, email or phone..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
             />
        </div>

        {/* Customers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((user) => (
                <div key={user.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xl">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{user.name}</h3>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {user.status}
                                </span>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                    </div>

                    <div className="space-y-3 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-3">
                            <Mail size={16} className="text-gray-400" /> {user.email}
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={16} className="text-gray-400" /> {user.phone}
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-4">
                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase">Orders</p>
                            <p className="font-bold text-gray-900 text-lg">{user.orders}</p>
                        </div>
                        <div className="w-px h-8 bg-gray-100"></div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Spent</p>
                            <p className="font-bold text-green-600 text-lg">{user.spent}</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold transition">
                            View Profile
                        </button>
                        {user.status === 'Active' ? (
                             <button className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition" title="Block User">
                                <UserX size={20} />
                             </button>
                        ) : (
                             <button className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition" title="Activate User">
                                <UserCheck size={20} />
                             </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default AdminCustomers;