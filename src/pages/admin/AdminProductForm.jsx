import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Save, X, Upload, ChevronLeft, Image as ImageIcon } from "lucide-react";
import productsData from "../../data/products"; // Import mock data to simulate edit fetch

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // Initial State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    oldPrice: "",
    stock: 0,
    category: "Electronics",
    status: "Active",
    image: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load Data if Edit Mode
  useEffect(() => {
    if (isEditMode) {
      // In real app: fetchProductById(id)
      const productToEdit = productsData.find(p => p.id === Number(id));
      if (productToEdit) {
        setFormData({
          title: productToEdit.title,
          description: productToEdit.description || "",
          price: productToEdit.price,
          oldPrice: productToEdit.oldPrice || "",
          stock: productToEdit.stock || 10, // Default if missing
          category: productToEdit.category,
          status: "Active",
          image: productToEdit.image
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Delay
    setTimeout(() => {
      alert(isEditMode ? "Product Updated Successfully!" : "Product Created Successfully!");
      navigate("/admin/products");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-10">
      
      {/* 1. HEADER Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
            <Link to="/admin/products" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <ChevronLeft size={20} />
            </Link>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? "Edit Product" : "Add New Product"}
                </h1>
                <p className="text-sm text-gray-500">
                    {isEditMode ? `Updating product #${id}` : "Fill in the information to create a product."}
                </p>
            </div>
        </div>
        <div className="flex gap-3">
            <button 
                type="button" 
                onClick={() => navigate("/admin/products")}
                className="px-6 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                disabled={isLoading}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200 flex items-center gap-2"
            >
                {isLoading ? "Saving..." : <><Save size={18} /> Save Product</>}
            </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* 2. MAIN COLUMN (Left) */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* General Info */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">General Information</h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Sony Wireless Headphones" 
                            className="w-full border p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Product details..." 
                            className="w-full border p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" 
                        />
                    </div>
                </div>
            </div>

            {/* Media / Images */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Media</h3>
                
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition group">
                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                        <Upload size={28} />
                    </div>
                    <p className="font-bold text-gray-700">Click to upload image</p>
                    <p className="text-sm text-gray-400">or drag and drop here</p>
                    {/* Visual Placeholder for URL input if no real upload logic */}
                    <input 
                         type="text" 
                         name="image"
                         value={formData.image}
                         onChange={handleChange}
                         placeholder="Or paste Image URL here"
                         className="mt-4 w-full text-sm text-center bg-transparent border-b focus:outline-none focus:border-purple-600 pb-2"
                    />
                </div>

                {formData.image && (
                    <div className="mt-4 w-32 h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group">
                         <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                         <button 
                            type="button"
                            onClick={() => setFormData({...formData, image: ""})}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                         >
                            <X size={14} />
                         </button>
                    </div>
                )}
            </div>
        </div>

        {/* 3. SIDEBAR (Right) */}
        <div className="space-y-8">
            
            {/* Status Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Status</h3>
                <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                </select>
            </div>

            {/* Category Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Category</h3>
                <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Beauty">Beauty</option>
                </select>
                <button type="button" className="text-purple-600 text-sm font-bold mt-3 hover:underline flex items-center gap-1">
                    + Add new category
                </button>
            </div>

            {/* Pricing Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Pricing</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Base Price (₹)</label>
                        <input 
                            type="number" 
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-xl bg-gray-50 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Discount Price (Optional)</label>
                        <input 
                            type="number" 
                            name="oldPrice"
                            value={formData.oldPrice}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-xl bg-gray-50 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>
            </div>

            {/* Inventory Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Inventory</h3>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Quantity in Stock</label>
                    <input 
                        type="number" 
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl bg-gray-50 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

        </div>

      </div>
    </form>
  );
};

export default AdminProductForm;