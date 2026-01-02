import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import GhostSymbol from './GhostSymbol';
import GhostWordmark from './GhostWordmark';

const Navbar = ({ activeTab, setActiveTab, onLogout }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const userEmail = sessionStorage.getItem('userEmail');

    const navLinks = ['Dashboard', 'Pattern Lab', 'Archives'];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1b1f23]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Left: Branding */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <GhostSymbol size={32} />
                    <GhostWordmark className="mt-1" />
                </div>

                {/* Center: Navigation Links */}
                <ul className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link} className="relative">
                            <button
                                onClick={() => {
                                    setActiveTab(link);
                                    if (link === 'Dashboard') {
                                        // Scroll to BentoLayout
                                        setTimeout(() => {
                                            document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 50);
                                    } else if (link === 'Archives') {
                                        // Scroll to Archives section
                                        setTimeout(() => {
                                            document.getElementById('archives')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 50);
                                    }
                                }}
                                className={`text-sm font-medium transition-colors duration-300 ${activeTab === link ? 'text-[#0a66c2]' : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                {link}
                                {activeTab === link && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-[#0a66c2]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Right: Actions */}
                <div className="flex items-center gap-6">

                    {/* Expandable Search */}
                    <div className="flex items-center">
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.input
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 200, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="bg-slate-900/50 border border-slate-700 rounded-l-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#0a66c2] mr-2"
                                    placeholder="Search..."
                                    autoFocus
                                />
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <Search size={20} />
                        </button>
                    </div>

                    {/* Notification Bell */}
                    <div className="relative">
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <Bell size={20} />
                        </button>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#1b1f23]"></span>
                    </div>

                    {/* User Avatar Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 focus:outline-none"
                        >
                            <img
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                alt="User"
                                className="w-8 h-8 rounded-full border border-white/10"
                            />
                            <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-48 bg-[#242a30] border border-white/10 rounded-xl shadow-xl overflow-hidden"
                                >
                                    <div className="px-4 py-3 border-b border-white/5">
                                        <p className="text-sm font-semibold text-white">Authorized Operator</p>
                                        <p className="text-xs text-slate-400 truncate">{userEmail}</p>
                                    </div>
                                    <ul className="py-1">
                                        <li>
                                            <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                                                <User size={14} /> Profile
                                            </button>
                                        </li>
                                        <li>
                                            <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                                                <Settings size={14} /> Settings
                                            </button>
                                        </li>
                                        <li className="border-t border-white/5 mt-1">
                                            <button
                                                onClick={onLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                                            >
                                                <LogOut size={14} /> Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
