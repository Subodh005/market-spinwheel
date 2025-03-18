
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Home, Info, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="w-full py-4 px-6 bg-market-dark-blue/90 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-market-teal" />
          <span className="text-xl font-bold bg-gradient-to-r from-market-teal to-blue-300 bg-clip-text text-transparent">
            StockPredict
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" active={location.pathname === "/"}>
            <Home className="w-4 h-4 mr-1" />
            Home
          </NavLink>
          <NavLink to="/models" active={location.pathname.includes("/models")}>
            <BarChart3 className="w-4 h-4 mr-1" />
            Models
          </NavLink>
          <NavLink to="/about" active={location.pathname === "/about"}>
            <Info className="w-4 h-4 mr-1" />
            About
          </NavLink>
        </nav>
        
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-slate-700/50 transition-colors">
            <Settings className="h-5 w-5 text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? 'bg-slate-700/50 text-white' 
          : 'text-slate-300 hover:bg-slate-800/30 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
