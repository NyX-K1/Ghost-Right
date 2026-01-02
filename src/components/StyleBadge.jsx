import React from 'react';

const StyleBadge = ({ status = 'idle' }) => {

    const getStatusConfig = (status) => {
        switch (status) {
            case 'transcribing':
                return { text: 'Transcribing Video...', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' };
            case 'analyzing':
                return { text: 'Analyzing Voice...', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-500' };
            case 'writing':
                return { text: 'Writing Hooks...', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', dot: 'bg-purple-500' };
            case 'completed':
                return { text: 'Style Found', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' };
            default:
                return { text: 'Ready', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', dot: 'bg-slate-500' };
        }
    };

    const config = getStatusConfig(status);

    return (
        <div className={`style-badge inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${config.bg} ${config.color} ${config.border}`}>
            <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${config.dot}`}></span>
            {config.text}
        </div>
    );
};

export default StyleBadge;
