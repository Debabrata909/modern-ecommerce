import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // To detect current page

  // Check if we are on the Home page
  const isHomePage = location.pathname === "/";

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define Navbar Background Style based on Page & Scroll
  const navBackground = isHomePage 
    ? (scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent") 
    : "bg-black shadow-lg"; // Always black on other pages

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 text-white ${navBackground}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* 1. LOGO */}
          <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="hidden sm:block">ShopX</span>
          </Link>

          {/* 2. DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 items-center bg-white/10 px-8 py-2 rounded-full border border-white/10 backdrop-blur-sm">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-300 hover:text-purple-400 ${
                      isActive ? "text-purple-400 font-bold" : "text-gray-300"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 3. ICONS */}
          <div className="flex items-center gap-5">
            <button className="text-gray-300 hover:text-white transition hidden sm:block">
              <Search size={22} />
            </button>
            
            <Link to="/cart" className="relative text-gray-300 hover:text-white transition group">
              <ShoppingBag size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black group-hover:scale-110 transition-transform">
                  {cart.length}
                </span>
              )}
            </Link>

           {/* <Link to="/login" className="text-gray-300 hover:text-white transition hidden sm:block">
              <User size={22} />
            </Link>  */}
              <Link to="/orders" className="text-gray-300 hover:text-white transition hidden sm:block">
              <User size={22} />
            </Link>
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 bg-black z-40 md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-gray-300 hover:text-white"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;