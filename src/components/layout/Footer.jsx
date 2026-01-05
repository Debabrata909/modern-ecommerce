import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        
        {/* 1. BRAND & DESCRIPTION */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
             <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
            </div>
            ShopX
          </h2>
          <p className="text-sm leading-relaxed mb-6">
            Your premium destination for modern lifestyle essentials. Quality, style, and innovation delivered to your doorstep.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* 2. SHOPPING LINKS */}
        <div>
          <h3 className="text-white font-bold mb-6">Shop</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/products" className="hover:text-purple-400 transition">New Arrivals</Link></li>
            <li><Link to="/products" className="hover:text-purple-400 transition">Best Sellers</Link></li>
            <li><Link to="/products" className="hover:text-purple-400 transition">Electronics</Link></li>
            <li><Link to="/products" className="hover:text-purple-400 transition">Fashion</Link></li>
          </ul>
        </div>

        {/* 3. CUSTOMER SUPPORT */}
        <div>
          <h3 className="text-white font-bold mb-6">Support</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/contact" className="hover:text-purple-400 transition">Contact Us</Link></li>
            {/* <li><Link to="/faq" className="hover:text-purple-400 transition">FAQ</Link></li> */}
              <li>
              <Link to="/track-order" className="hover:text-purple-400 transition">
                Track Order
              </Link>
            </li>
            <li><Link to="/shipping" className="hover:text-purple-400 transition">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-purple-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* 4. CONTACT INFO */}
        <div>
          <h3 className="text-white font-bold mb-6">Get in Touch</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-purple-600" />
              <span>123 Market Street, Pune, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-purple-600" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-purple-600" />
              <span>support@shopx.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} ShopX. All rights reserved.
        </p>
        
        <div className="flex gap-4 items-center">
            <span className="text-xs font-semibold">We Accept:</span>
            <div className="flex gap-2 text-white">
                <CreditCard size={24} />
                {/* You can add SVG icons for Visa/Mastercard here for real logos */}
                <span className="font-bold text-lg">VISA</span>
                <span className="font-bold text-lg italic">PayPal</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;