import React from 'react';
import StyleBadge from './StyleBadge';

const HistorySidebar = ({ status }) => {
    return (
        <aside className="bento-card h-full flex flex-col gap-4">
            <div className="sidebar-header mb-4">
                <h2 className="text-xl font-bold text-gray-100 mb-2">GhostWriter AI</h2>
                <StyleBadge status={status} />
            </div>

            <div className="history-list flex-1 overflow-y-auto">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Generations</h3>
                <div className="flex flex-col gap-2">
                    {/* Placeholders */}
                    <div className="p-3 bg-slate-800/40 rounded border border-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer">
                        <div className="text-xs text-indigo-400 mb-1">Yesterday</div>
                        <div className="text-sm text-gray-300 line-clamp-2">How to scale your startup without losing your soul...</div>
                    </div>
                    <div className="p-3 bg-slate-800/40 rounded border border-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer">
                        <div className="text-xs text-indigo-400 mb-1">Dec 28</div>
                        <div className="text-sm text-gray-300 line-clamp-2">The one thing nobody tells you about React hooks...</div>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-700/50">
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full p-2 hover:bg-slate-800 rounded">
                    <span>⚙️</span> Settings
                </button>
            </div>
        </aside>
    );
};

export default HistorySidebar;
