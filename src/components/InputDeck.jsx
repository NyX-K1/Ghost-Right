import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Mail, User, Youtube, FileText, Ghost } from 'lucide-react';
import PenSymbol from './PenSymbol';

const InputDeck = ({ onSubmit, isLoading, userEmail }) => {
    const [formData, setFormData] = useState({
        email: userEmail || '',
        name: '',
        url: '',
        samples: ''
    });
    const [isNewUser, setIsNewUser] = useState(false);
    const [errors, setErrors] = useState({});

    // Sync prop changes
    useEffect(() => {
        if (userEmail) {
            setFormData(prev => ({ ...prev, email: userEmail }));
        }
    }, [userEmail]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Full name required.';
        if (!validateEmail(formData.email)) newErrors.email = 'Valid authorization email required.';
        if (!formData.url) newErrors.url = 'Content source required.';

        if (isNewUser && !formData.samples.trim()) {
            newErrors.samples = 'Style calibration data required for new operators.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        // Clean submission of all data
        onSubmit({
            ...formData,
            isNewUser
        });
    };

    return (
        <div className="h-full flex flex-col p-8 glass-card relative overflow-hidden">
            <div className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-xl font-bold text-corp-slate tracking-tight mb-1">Creator Studio</h2>
                <p className="text-xs font-medium text-corp-muted uppercase tracking-widest">Configure Post Parameters</p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">

                {/* Name */}
                <div className="space-y-1 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-2 ml-1">
                        <User size={14} className="text-corp-muted" />
                        <label className="text-xs uppercase tracking-wider font-bold text-corp-muted">User Profile</label>
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={twMerge("input-clean", errors.name && "border-red-400 ring-2 ring-red-400/20")}
                        placeholder="Ex. Sarah Connor"
                    />
                    {errors.name && <span className="text-xs text-red-400 font-medium ml-1">{errors.name}</span>}
                </div>

                {/* Email (Auto-filled but Editable) */}
                <div className="space-y-1 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Authentication</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={16} className="text-slate-600 group-focus-within:text-corp-blue transition-colors" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={twMerge("input-clean pl-10", errors.email && "border-red-400 ring-2 ring-red-400/20")}
                            placeholder="name@company.com"
                        />
                    </div>
                    {errors.email && <span className="text-xs text-red-400 font-medium ml-1">{errors.email}</span>}
                </div>

                {/* New User Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-lg border border-white/5 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center gap-2">
                        <Ghost size={16} className={isNewUser ? "text-corp-blue" : "text-corp-muted"} />
                        <span className="text-sm font-semibold text-corp-slate">New to GhostRight?</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsNewUser(!isNewUser)}
                        className={twMerge(
                            "w-12 h-6 rounded-full p-1 transition-all duration-300 relative",
                            isNewUser ? "bg-corp-blue" : "bg-slate-700"
                        )}
                    >
                        <div className={twMerge(
                            "w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300",
                            isNewUser ? "translate-x-6" : "translate-x-0"
                        )}></div>
                    </button>
                </div>

                {/* Conditional Style Samples */}
                <AnimatePresence>
                    {isNewUser && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="space-y-1 overflow-hidden"
                        >
                            <div className="flex justify-between items-baseline ml-1">
                                <div className="flex items-center gap-2">
                                    <FileText size={14} className="text-corp-blue" />
                                    <label className="text-xs uppercase tracking-wider font-bold text-corp-blue">Pattern Matching Data</label>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium bg-slate-800 px-2 py-0.5 rounded border border-white/5">REQUIRED</span>
                            </div>
                            <textarea
                                name="samples"
                                rows={4}
                                value={formData.samples}
                                onChange={handleChange}
                                className={twMerge("input-clean resize-none", errors.samples && "border-red-400 ring-2 ring-red-400/20")}
                                placeholder="Paste 3-4 examples of your previous high-performing content..."
                            ></textarea>
                            {errors.samples && <span className="text-xs text-red-400 font-medium ml-1">{errors.samples}</span>}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content Source */}
                <div className="space-y-1 animate-fade-up" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-2 ml-1">
                        <Youtube size={14} className="text-corp-muted" />
                        <label className="text-xs uppercase tracking-wider font-bold text-corp-muted">Input Source</label>
                    </div>
                    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className={twMerge("input-clean", errors.url && "border-red-400 ring-2 ring-red-400/20")}
                        placeholder="Topic, URL, or raw text to rewrite..."
                    />
                    {errors.url && <span className="text-xs text-red-400 font-medium ml-1">{errors.url}</span>}
                </div>

                <div className="mt-auto pt-4">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className={twMerge("btn-primary w-full py-4 text-sm tracking-wide uppercase", isLoading && "opacity-80 cursor-not-allowed")}
                    >
                        {isLoading ? (
                            <>
                                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                                Generating...
                            </>
                        ) : (
                            <>
                                <PenSymbol size={20} className="text-slate-900" />
                                Generate Synthesis
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default InputDeck;
