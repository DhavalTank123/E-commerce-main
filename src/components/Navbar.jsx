import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../store/authSlice';
import { Timer, User, LogOut, ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, sessionExpiry } = useSelector((state) => state.auth);

    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (!sessionExpiry) return;

        const tick = () => {
            const remaining = sessionExpiry - Date.now();
            if (remaining <= 0) {
                setTimeLeft('Expired');
                return;
            }
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            setTimeLeft(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [sessionExpiry]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const isWarning = timeLeft !== '' && timeLeft !== 'Expired' &&
        parseInt(timeLeft.split(':')[0]) === 0 && parseInt(timeLeft.split(':')[1]) <= 60;

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl sticky top-0 z-30 transition-all shadow-xl shadow-black/20">
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 hover:bg-slate-800 rounded-lg lg:hidden text-slate-400 transition-colors"
                    aria-label="Toggle Sidebar"
                >
                    <Menu size={22} />
                </button>

                <div className="flex items-center gap-2 text-white font-black text-lg sm:text-xl">
                    <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
                        <ShoppingCart size={20} className="sm:w-[22px] sm:h-[22px]" />
                    </div>
                    <span className="tracking-tight">E-Commerce</span>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-black uppercase tracking-widest rounded-xl transition duration-300 shadow-lg shadow-blue-950/20"
                    title="Logout"
                >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </nav>
    );
};


export default Navbar;
