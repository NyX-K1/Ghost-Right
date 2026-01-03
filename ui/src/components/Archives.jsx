import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, Ghost } from 'lucide-react';
import ArchiveCard from './ArchiveCard';

const Archives = ({ setActiveTab }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const userEmail = sessionStorage.getItem('userEmail');

    useEffect(() => {
        const fetchArchives = async () => {
            if (!userEmail) return;

            try {
                // Production URL for the archive fetch workflow
                const url = 'http://localhost:5678/webhook/archives';

                // Ensure query parameter is correctly formatted
                const response = await fetch(`${url}?email=${userEmail}`);

                if (response.ok) {
                    const data = await response.json();

                    // Map results to state variable 'posts'
                    const resultData = Array.isArray(data) ? data : (data.posts || []);

                    if (resultData.length > 0) {
                        console.log('Single Post Data:', resultData[0]);
                    }

                    setTimeout(() => {
                        setPosts(resultData);
                        setIsLoading(false);
                    }, 800);
                } else {
                    console.error("Failed to fetch archives");
                    setPosts([]);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching archives:", error);
                setPosts([]);
                setIsLoading(false);
            }
        };

        fetchArchives();
    }, [userEmail]);

    // Filter Logic
    const filteredArchives = posts.filter(post => {
        const query = searchQuery.toLowerCase();
        // Check content and valid keys (Generated_Content is primary now)
        const content = (post.Generated_Content || post.Content || post.content || post.postContent || "").toLowerCase();
        const url = (post.YT_Link || post.VideoLink || post.Link || post.yt_link || post.url || "").toLowerCase();
        return content.includes(query) || url.includes(query);
    });

    return (
        <div id="archives" className="min-h-screen bg-[#0d1117] p-8 md:p-12 font-sans relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

            <main className="pt-24 pb-12 px-8 min-h-screen box-border flex flex-col max-w-7xl mx-auto w-full relative z-10">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <span className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30 text-indigo-400">
                                <Ghost size={24} />
                            </span>
                            Content Vault
                        </h1>
                        <p className="text-slate-400 mt-2 text-sm">Access your generated ghost-written content history.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-slate-500 group-focus-within:text-corp-blue transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-[#0d1117] border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-corp-blue focus:ring-1 focus:ring-corp-blue transition-all"
                            placeholder="Search by keywords or URL..."
                        />
                    </div>
                </div>

                {/* Grid Content */}
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-slate-500">
                        <Loader2 size={40} className="animate-spin text-corp-blue mb-4" />
                        <p>Accessing Secure Vault...</p>
                    </div>
                ) : filteredArchives.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        {filteredArchives.map((post, index) => (
                            <ArchiveCard key={post.post_id || index} post={post} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-slate-500 opacity-60">
                        <Ghost size={64} strokeWidth={1} className="mb-4 text-slate-700" />
                        <h3 className="text-lg font-medium text-slate-400">No ghosts found for {userEmail}</h3>
                        <p className="max-w-xs text-center mt-2 text-sm mb-6">
                            {searchQuery ? "Try adjusting your search criteria." : "Start generating content to populate your vault."}
                        </p>
                        <button
                            onClick={() => setActiveTab('Dashboard')}
                            className="bg-white/5 hover:bg-white/10 text-corp-blue px-6 py-2 rounded-lg transition-all text-sm font-medium flex items-center gap-2 border border-corp-blue/20 hover:border-corp-blue/50"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Archives;
