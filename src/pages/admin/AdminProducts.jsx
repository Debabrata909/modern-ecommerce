import { useState } from "react";
import { Edit, Trash2, Plus, Search, MoreVertical } from "lucide-react";
import productsData from "../../data/products"; // Using your existing data
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
          setProducts(products.filter(p => p.id !== id));
      }
  };

  return (
    <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Products</h2>
                <p className="text-gray-500">Manage your product inventory here.</p>
            </div>
           <Link to="/admin/products/new" className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition flex items-center gap-2 shadow-lg shadow-purple-200">
                <Plus size={20} /> Add Product
            </Link> 
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
             <div className="relative flex-1">
                 <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                 <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
             </div>
             <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 text-sm outline-none">
                 <option>All Categories</option>
                 <option>Electronics</option>
                 <option>Fashion</option>
             </select>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-900 font-semibold uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Stock</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <img src={product.image} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                    <div>
                                        <p className="font-bold text-gray-900">{product.title}</p>
                                        <p className="text-xs text-gray-400">ID: #{product.id}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                                    {product.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-bold">₹{product.price.toLocaleString()}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <Link 
                                        to={`/admin/products/edit/${product.id}`}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default AdminProducts;