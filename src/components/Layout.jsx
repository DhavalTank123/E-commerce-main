import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden transition-all duration-300">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <div className="p-4 sm:p-6 pb-0">
                    <Navbar onToggleSidebar={toggleSidebar} />
                </div>

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 pt-0">
                    <div className="max-w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;

