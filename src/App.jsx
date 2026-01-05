import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar"; 
import Footer from "./components/layout/Footer"; 
import { CartProvider } from "./context/CartContext"; 

const App = () => {
  const location = useLocation();
  
  // Logic: Hide Navbar/Footer if path starts with "/admin", "/login", or "/register"
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";
  
  const shouldHideLayout = isAdminRoute || isAuthRoute;

  return (
    <CartProvider>
      {/* Only show Public Navbar if NOT an admin or auth page */}
      {!shouldHideLayout && <Navbar />}
      
      <AppRoutes />
      
      {/* Only show Public Footer if NOT an admin or auth page */}
      {!shouldHideLayout && <Footer />}
    </CartProvider>
  );
};

export default App;