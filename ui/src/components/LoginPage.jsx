import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GhostSymbol from './GhostSymbol';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            onLogin(email);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-radial-gradient from-[#1b1f23] via-[#0a0a0c] to-[#0a0a0c] opacity-50 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#4f80ff 1px, transparent 1px), linear-gradient(90deg, #4f80ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8"
            >
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mb-6 p-6 bg-slate-900/50 rounded-full border border-white/5 shadow-2xl shadow-indigo-500/20"
                    >
                        <GhostSymbol size={48} />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white tracking-tighter mb-2">GhostRight</h1>
                    <p className="text-slate-400 text-sm tracking-wide uppercase">Generation Engine</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Authentication</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter authorized credential..."
                            className="w-full bg-[#161b22]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-corp-blue focus:ring-1 focus:ring-corp-blue transition-all"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-corp-blue hover:bg-white hover:text-corp-blue text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-corp-blue/20 flex items-center justify-center gap-2"
                    >
                        Initiate Session
                    </motion.button>
                </form>

                <p className="text-center text-slate-600 text-xs mt-8">
                    Advanced Content Synthesis System.
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
