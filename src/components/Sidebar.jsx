import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, ShoppingCart, User, ChevronRight, X } from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Products", icon: ShoppingBag, path: "/products" },
    { label: "Cart", icon: ShoppingCart, path: "/cart" },
    { label: "Profile", icon: User, path: "/profile" },
];

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path) => {
        navigate(path);
        if (onClose) onClose();
    };

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-900 transition-transform duration-300 transform lg:static lg:translate-x-0
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            flex flex-col h-screen p-6
        `}>
            <div className="flex items-center justify-between mb-8 px-2 lg:hidden">
                <div className="flex items-center gap-2 text-white font-black text-xl uppercase tracking-tighter">
                    <ShoppingCart size={24} className="text-blue-500" />
                    <span>Menu</span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                    <X size={20} className="text-white" />
                </button>
            </div>

            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 px-3">
                Main Menu
            </p>

            <nav className="flex flex-col gap-2">
                {navItems.map(({ label, icon: Icon, path }) => {
                    const isActive = location.pathname === path;
                    return (
                        <button
                            key={path}
                            onClick={() => handleNavigate(path)}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl font-black transition-all duration-200 uppercase text-xs tracking-wide
                                ${isActive
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white transition"
                                }`}
                        >
                            <Icon size={18} className={isActive ? "text-white" : "text-blue-500"} />
                            <span className="flex-1">{label}</span>
                            {isActive && <ChevronRight size={16} className="opacity-50" />}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;

