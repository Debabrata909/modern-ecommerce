import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // SIMULATED AUTHENTICATION
    setTimeout(() => {
      if (email === "admin@shopx.com" && password === "admin123") {
        navigate("/admin"); // Redirect to Dashboard
      } else {
        setError("Invalid Admin Credentials");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-950 p-8 text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                <ShieldCheck className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Admin Portal</h2>
            <p className="text-gray-400 text-sm">Secure access for ShopX staff only.</p>
        </div>

        {/* Form */}
        <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
                
                {/* Error Alert */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm font-semibold border border-red-100">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input 
                            type="email" 
                            placeholder="admin@shopx.com" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-lg shadow-purple-200 disabled:opacity-70"
                >
                    {isLoading ? "Authenticating..." : <>Access Dashboard <ArrowRight size={20} /></>}
                </button>
            </form>
            
            <div className="mt-8 text-center">
                <p className="text-xs text-gray-400">
                    Not an admin? <a href="/" className="text-purple-600 hover:underline">Return to Store</a>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;