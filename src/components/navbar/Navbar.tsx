import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { storageService } from '../../services/storageService';
import { ShoppingBag, Shield, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { totalQuantity, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandConfig = storageService.getBrandConfig();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-black/[0.06] dark:bg-white/[0.08] border border-black/[0.1] dark:border-white/[0.1] flex items-center justify-center text-xs font-mono font-semibold tracking-wider text-black dark:text-white transition-colors">
            <span className="text-[#FF7700]">C</span><span>M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-semibold text-sm tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
              {brandConfig.brandName}
            </span>
          </div>
        </a>

        {/* Minimal Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-[13px] font-sans text-[#86868B]">
          <a href="#customise" className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium transition-colors">
            Studio
          </a>
          <a href="#variants" className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors">
            Editions
          </a>
          <a href="#built-for-your-ride" className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors">
            Jacket Fit
          </a>
          <a href="#faq" className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          
          {/* Light / Dark Mode Toggle Pill */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:px-3 sm:py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.08] text-[12px] font-sans text-[#1D1D1F] dark:text-[#F5F5F7] transition-all flex items-center gap-1.5"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle display theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-xs">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline text-xs">Dark</span>
              </>
            )}
          </button>

          {/* Admin Pill */}
          <button
            onClick={onOpenAdmin}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-full text-[12px] font-sans transition-all flex items-center gap-1.5 ${
              isAuthenticated
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#86868B] dark:text-[#A1A1A6] border border-black/[0.08] dark:border-white/[0.08]'
            }`}
            title="Admin Portal"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAuthenticated ? 'Admin' : 'Admin'}</span>
          </button>

          {/* Cart Pill */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-all flex items-center gap-1.5 text-[12px] font-medium shadow-sm"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart</span>
            {totalQuantity > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#FF7700] text-white text-[10px] font-mono font-bold">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#86868B] hover:text-black dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F5F7] dark:bg-black/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] px-6 py-6 space-y-4 text-sm font-sans">
          <a
            href="#customise"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#1D1D1F] dark:text-white font-medium"
          >
            Studio Customiser
          </a>
          <a
            href="#variants"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#86868B] hover:text-black dark:hover:text-white"
          >
            Three Editions
          </a>
          <a
            href="#built-for-your-ride"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#86868B] hover:text-black dark:hover:text-white"
          >
            Jacket Fit
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#86868B] hover:text-black dark:hover:text-white"
          >
            FAQ
          </a>
          <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 px-4 rounded-full bg-black/[0.06] dark:bg-white/[0.08] text-xs font-sans"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="px-4 py-2 rounded-full bg-black/[0.06] dark:bg-white/[0.08] text-xs font-sans text-[#86868B]"
            >
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
