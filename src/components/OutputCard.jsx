import React, { useState } from 'react';

const OutputCard = ({ content }) => {
    const [activeTab, setActiveTab] = useState('hooks'); // hooks or post
    const [copied, setCopied] = useState(false);

    if (!content) {
        return (
            <section className="bento-card h-full flex items-center justify-center flex-col text-center">
                <h2 className="text-xl font-bold mb-2 text-gray-500">Output Area</h2>
                <div className="text-gray-600 italic">
                    Waiting for generation...
                </div>
            </section>
        );
    }

    const handleCopy = () => {
        const textToCopy = activeTab === 'hooks'
            ? content.hooks.join('\n\n')
            : content.post;

        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="bento-card h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Generated Content</h2>

                <div className="flex bg-slate-800 rounded-lg p-1">
                    <button
                        className={`px-3 py-1 text-sm rounded-md transition-all ${activeTab === 'hooks' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('hooks')}
                    >
                        Hooks
                    </button>
                    <button
                        className={`px-3 py-1 text-sm rounded-md transition-all ${activeTab === 'post' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('post')}
                    >
                        Final Post
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 font-mono text-sm text-gray-300 whitespace-pre-wrap">
                {activeTab === 'hooks' ? (
                    <div className="flex flex-col gap-4">
                        {content.hooks.map((hook, i) => (
                            <div key={i} className="p-3 bg-slate-800/50 rounded border border-slate-700 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                                <span className="text-indigo-400 font-bold mr-2">#{i + 1}</span>
                                {hook}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>{content.post}</div>
                )}
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white border border-slate-600 transition-all font-medium text-sm"
                >
                    {copied ? (
                        <>
                            <span style={{ color: '#22c55e' }}>✓</span> Copied!
                        </>
                    ) : (
                        <>
                            <span>📋</span> Copy to Clipboard
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default OutputCard;
