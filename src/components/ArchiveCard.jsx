import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, ExternalLink, Check, Copy, Maximize2, X } from 'lucide-react';
import { sanitizeOutput } from '../utils/sanitizeOutput';

const ArchiveCard = ({ post }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Key Mapping Logic
    const contentText = post.Generated_Content || post.Content || post.content || 'No content found';
    const videoLink = post.YT_Link || post.VideoLink || post.Link || post.yt_link;
    const dateText = post.Created_At || post.Timestamp || post.timestamp || Date.now();

    const handleCopy = () => {
        navigator.clipboard.writeText(contentText);
        setIsCopied(true);
        setShowToast(true);

        setTimeout(() => {
            setIsCopied(false);
            setShowToast(false);
        }, 2000);
    };

    // Sanitize content for display
    const cleanContent = sanitizeOutput(contentText);

    // Truncate for preview logic is optional if user wants full post, but usually better to truncate card
    // User asked: "Body: The generated post text. Use white-space: pre-wrap"
    // Assuming they want the full text visible or at least a large scrolling area? 
    // "Archive Card... Body: The generated post text." 
    // Let's us a max-height with scroll for the card body to keep grid uniform, or clamp it. 
    // I'll stick to a scrollable area within a fixed height card for consistency.

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1b1f23] border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-corp-blue/50 transition-colors group relative h-[400px]"
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#161b22]">
                <span className="text-xs font-mono text-slate-500">{new Date(dateText).toLocaleDateString()}</span>
                <div className="flex items-center gap-2 text-slate-400">
                    {videoLink ? (
                        <a href={videoLink} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-white/5 rounded-full transition-colors group/link" title="Watch Original Video">
                            <Youtube size={16} className="text-slate-400 group-hover/link:text-red-500 transition-colors" />
                        </a>
                    ) : (
                        <span className="p-1.5 opacity-30 cursor-not-allowed">
                            <Youtube size={16} />
                        </span>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <p className="text-sm text-slate-300 font-sans leading-relaxed whitespace-pre-wrap selection:bg-corp-blue/30 selection:text-white">
                    {cleanContent}
                </p>
            </div>

            {/* Action Row - Bottom Right Button */}
            <div className="p-4 bg-[#161b22]/50 border-t border-white/5 flex justify-end relative">
                <button
                    onClick={handleCopy}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                        ${isCopied
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-corp-blue/10 text-corp-blue border border-corp-blue/20 hover:bg-corp-blue hover:text-white'
                        }
                    `}
                >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    {isCopied ? 'Copied' : 'Copy Post'}
                </button>

                {/* Toast Notification (Scoped to card or global? User said "slides up from bottom") */}
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-16 right-4 bg-emerald-500 text-white px-3 py-2 rounded-lg shadow-xl flex items-center gap-2 text-xs font-semibold z-20 pointer-events-none"
                        >
                            <Check size={12} strokeWidth={3} />
                            Copied to Clipboard!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ArchiveCard;
