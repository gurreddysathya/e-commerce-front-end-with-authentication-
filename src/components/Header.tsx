
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, X, User, Package, Heart, Home } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { cart } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-ecom-primary flex items-center">
              <ShoppingCart size={28} className="mr-2 text-ecom-accent" />
              SleekShopper
            </Link>
          </div>

          {/* Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 mx-10">
            <form onSubmit={handleSearch} className="w-full max-w-xl relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0"
              >
                <Search size={18} />
              </Button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-ecom-accent transition-colors flex items-center">
              <Home size={20} className="mr-1" />
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-ecom-accent transition-colors flex items-center">
              <Package size={20} className="mr-1" />
              Products
            </Link>
            <Link to="/orders" className="text-gray-600 hover:text-ecom-accent transition-colors flex items-center">
              <Package size={18} className="mr-1" />
              Orders
            </Link>
            <Link to="/account" className="text-gray-600 hover:text-ecom-accent transition-colors">
              <User size={20} />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="text-ecom-accent" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-ecom-primary px-1.5 py-0.5 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart size={22} className="text-ecom-accent" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-ecom-primary px-1.5 py-0.5 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-ecom-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Search (shown below header on mobile) */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0"
            >
              <Search size={18} />
            </Button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-3 py-3 border-t animate-slide-in">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 font-medium py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} className="mr-2" />
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 font-medium py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package size={18} className="mr-2" />
                All Products
              </Link>
              <Link 
                to="/orders" 
                className="text-gray-700 font-medium py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package size={18} className="mr-2" />
                My Orders
              </Link>
              <Link 
                to="/account" 
                className="text-gray-700 font-medium py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} className="mr-2" />
                My Account
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
