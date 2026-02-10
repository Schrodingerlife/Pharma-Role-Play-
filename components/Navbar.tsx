import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mic2, LayoutDashboard, History, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200",
          isActive 
            ? "bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/30 shadow-[0_0_10px_rgba(0,217,255,0.2)]" 
            : "text-gray-400 hover:text-white hover:bg-white/5"
        )}
      >
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-navy-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-neon to-purple-neon flex items-center justify-center">
            <Mic2 className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            PharmaRoleplay
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/training" icon={BookOpen} label="Training" />
          <NavItem to="/history" icon={History} label="History" />
        </div>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-neon to-purple-light border border-white/20"></div>
      </div>
    </nav>
  );
};
