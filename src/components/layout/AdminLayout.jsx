import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings, 
  LogOut, Bell, Search, Menu 
} from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Products", icon: ShoppingBag, path: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Customers", icon: Users, path: "/admin/customers" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
      
      {/* 1. SIDEBAR */}
      <aside className={`bg-slate-900 text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} hidden md:flex flex-col`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
           {isSidebarOpen ? (
             <h1 className="text-2xl font-bold tracking-wider">ShopX <span className="text-purple-500 text-sm">ADMIN</span></h1>
           ) : (
             <span className="font-bold text-2xl text-purple-500">S</span>
           )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-4 text-slate-400 hover:text-red-400 w-full px-4 py-2 transition">
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 md:px-10">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
             <Menu size={20} />
           </button>

           <div className="flex items-center gap-6">
              {/* Search */}
              <div className="relative hidden md:block">
                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                 <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 w-64" />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3">
                 <div className="text-right hidden md:block">
                    <p className="text-sm font-bold">Admin User</p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                 </div>
                 <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">A</div>
              </div>
           </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
           <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;