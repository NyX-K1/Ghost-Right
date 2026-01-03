import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, LogOut, Settings } from 'lucide-react';
import GhostSymbol from './GhostSymbol';
import GhostWordmark from './GhostWordmark';

const Navbar = ({ activeTab, setActiveTab, onLogout, userEmail, userName, userPicture }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navLinks = ['Dashboard', 'Archives'];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1b1f23]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Left: Branding */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <GhostSymbol size={32} />
                    <GhostWordmark className="mt-1" />
                </div>

                {/* Center: Navigation Links */}
                <ul className="flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                    {navLinks.map((link) => (
                        <li key={link} className="relative z-0">
                            <button
                                onClick={() => {
                                    setActiveTab(link);
                                    if (link === 'Dashboard') {
                                        setTimeout(() => {
                                            document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 50);
                                    } else if (link === 'Archives') {
                                        setTimeout(() => {
                                            document.getElementById('archives')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 50);
                                    }
                                }}
                                className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${activeTab === link ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                {activeTab === link && (
                                    <motion.div
                                        layoutId="nav-background"
                                        className="absolute inset-0 bg-[#0a66c2]/80 rounded-full -z-10 shadow-lg shadow-blue-500/20"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                {link}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Right: Actions */}
                <div className="flex items-center gap-6">

                    {/* User Avatar Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className={`flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border transition-all duration-200 ${isProfileOpen ? 'bg-white/10 border-white/20' : 'border-transparent hover:bg-white/5 hover:border-white/10'}`}
                        >
                            <img
                                src={userPicture || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                                alt="User"
                                className="w-8 h-8 rounded-full border border-white/10 shadow-sm"
                            />
                            <div className="flex flex-col items-start hidden sm:flex">
                                <span className="text-xs font-medium text-slate-200 leading-none">{userName || 'Operator'}</span>
                            </div>
                            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180 text-white' : ''}`} />
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
