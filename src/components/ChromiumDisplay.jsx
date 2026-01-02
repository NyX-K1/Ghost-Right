import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, FileDown, Cpu, Activity, Info } from 'lucide-react';
import CyberLoader from './CyberLoader';

const ChromiumDisplay = ({ status, content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!content) return;
        const text = typeof content === 'string' ? content : content.post || JSON.stringify(content);
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col p-8 glass-card relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 z-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <div>
                    <h2 className="text-xl font-bold text-corp-slate tracking-tight mb-1 flex items-center gap-2">
                        <Activity className="text-corp-blue" size={20} />
                        Synthesis Output
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${status === 'completed' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            STATUS: {status === 'idle' ? 'SYSTEM READY' : status.toUpperCase()}
                        </p>
                    </div>
                </div>

                {(status === 'completed' && content) && (
                    <button
                        onClick={handleCopy}
                        className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-lg text-xs font-semibold text-corp-blue uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95"
                    >
                        {copied ? (
                            <>
                                <Check size={14} className="text-green-500" /> COPIED
                            </>
                        ) : (
                            <>
                                <Copy size={14} /> COPY CONTENT
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Content Display */}
            <div className="flex-1 relative z-10 flex flex-col">
                <AnimatePresence>

                    {/* IDLE */}
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, position: 'absolute' }}
                            className="flex-1 flex flex-col items-center justify-center text-slate-400 inset-0"
                        >
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                <Cpu className="text-slate-300" size={32} />
                            </div>
                            <p className="font-medium text-sm tracking-widest opacity-60">Awaiting Input Parameters...</p>
                        </motion.div>
                    )}

                    {/* LOADING */}
                    {(status === 'transcribing' || status === 'analyzing' || status === 'writing') && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col items-center justify-center inset-0"
                        >
                            <CyberLoader status={status} />
                        </motion.div>
                    )}

                    {/* SUCCESS */}
                    {status === 'completed' && content && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
                        >
                            <div className="p-8 bg-white/80 rounded-xl border border-white shadow-sm font-sans text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
                                {content.post || content.text || content.postContent || (typeof content === 'string' ? content : JSON.stringify(content, null, 2))}
                            </div>

                            {content.hooks && (
                                <div className="mt-8 grid gap-3">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                        <Info size={12} /> Viral Hooks
                                    </h3>
                                    {content.hooks.map((hook, i) => (
                                        <div key={i} className="p-4 bg-white/60 border border-slate-100 rounded-lg text-sm text-slate-600 font-medium hover:border-corp-blue/30 transition-colors cursor-default shadow-sm">
                                            <span className="text-corp-blue mr-2 font-bold">{i + 1}.</span> {hook}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChromiumDisplay;
