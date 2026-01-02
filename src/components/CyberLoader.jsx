import React from 'react';
import { motion } from 'framer-motion';

const CyberLoader = ({ status }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 relative">
            {/* Rotating Tech Rings */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-2 border-corp-blue/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-0 border-t-2 border-corp-blue rounded-full animate-[spin_3s_linear_infinite]"></div>

                {/* Inner Ring - Counter Rotation */}
                <div className="absolute inset-4 border-2 border-dashed border-corp-muted/30 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>

                {/* Center Core Pulse */}
                <div className="absolute inset-10 bg-corp-blue/10 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                    <div className="w-2 h-2 bg-corp-blue rounded-full shadow-[0_0_10px_#0a66c2]"></div>
                </div>
            </div>

            {/* Dynamic Status Text */}
            <div className="space-y-2 text-center z-10">
                <motion.h3
                    key={status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-lg font-bold text-corp-blue uppercase tracking-[0.2em] font-mono"
                >
                    {status === 'transcribing' && ">> DECODING STREAM_"}
                    {status === 'analyzing' && ">> NEURAL ANALYSIS_"}
                    {status === 'writing' && ">> SYNTHESIZING OUTPUT_"}
                </motion.h3>

                {/* Mock Terminal Output */}
                <div className="text-[10px] text-corp-muted font-mono h-4 overflow-hidden opacity-70">
                    <span className="animate-pulse">_processing packets... [0x{Math.floor(Math.random() * 1000)}]</span>
                </div>
            </div>

            {/* Scanning Line Background Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-corp-blue/5 to-transparent -translate-y-[100%] animate-[scan_2s_linear_infinite]"></div>
            </div>
        </div>
    );
};

export default CyberLoader;
