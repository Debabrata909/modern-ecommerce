import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate Auth
    setTimeout(() => {
        navigate("/"); // Redirect to Home after login
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 min-h-[600px]">
        
        {/* LEFT SIDE: VISUALS */}
        <div className="hidden md:flex flex-col justify-between bg-black text-white p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-40"></div>
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">ShopX Premium</h2>
                <p className="text-gray-300">Join the community of trendsetters.</p>
            </div>
            <div className="relative z-10">
                <blockquote className="text-lg italic font-light mb-4">
                    "Fashion is the armor to survive the reality of everyday life."
                </blockquote>
                <p className="text-sm text-gray-400">— Bill Cunningham</p>
            </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
                <p className="text-gray-500">
                    {isLogin ? "Enter your details to access your account." : "Start your journey with us today."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-black transition" />
                    </div>
                )}
                
                <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-black transition" />
                </div>

                <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-black transition" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-black">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {isLogin && (
                    <div className="text-right">
                        <a href="#" className="text-sm font-semibold text-gray-500 hover:text-black">Forgot Password?</a>
                    </div>
                )}

                <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2">
                    {isLogin ? "Sign In" : "Sign Up"} <ArrowRight size={20} />
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="text-black font-bold hover:underline"
                >
                    {isLogin ? "Register Now" : "Login Here"}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Login;