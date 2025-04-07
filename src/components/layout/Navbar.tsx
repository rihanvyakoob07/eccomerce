// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, Heart, User, Menu, X, LogOut, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-brand-blue">MERN</span>
              <span className="text-xl font-bold text-brand-orange">MarketHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-brand-blue transition-colors px-3 py-2">
              Products
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-brand-blue transition-colors px-3 py-2">
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="text-gray-600 hover:text-brand-blue p-2 rounded-full hover:bg-gray-100">
                  <Heart size={20} />
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center p-2">
                      <div className="ml-2 space-y-1">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <Settings size={16} className="mr-2" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist" className="cursor-pointer">
                        <Heart size={16} className="mr-2" /> Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/products"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md"
              onClick={toggleMenu}
            >
              Products
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                onClick={toggleMenu}
              >
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link
                  to="/wishlist"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                  onClick={toggleMenu}
                >
                  Wishlist
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                  onClick={toggleMenu}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md"
                  onClick={toggleMenu}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
