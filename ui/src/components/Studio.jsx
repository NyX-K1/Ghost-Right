import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import InputDeck from './InputDeck';
import ChromiumDisplay from './ChromiumDisplay';
import BentoLayout from './BentoLayout';
import ShaderBackground from './ShaderBackground';
import EngineRoom from './EngineRoom';
import { sanitizeOutput } from '../utils/sanitizeOutput';
import { AnimatePresence } from 'framer-motion';
import IntroAnimation from './IntroAnimation';
import Archives from './Archives';
import { useNavigate } from 'react-router-dom';

const Studio = () => {
    const navigate = useNavigate();
    // Auth State: Read from localStorage now
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail'));

    // App State
    const [status, setStatus] = useState('idle'); // idle, transcribing, analyzing, writing, completed
    const [generatedContent, setGeneratedContent] = useState(null);
    const [showIntro, setShowIntro] = useState(true);
    const [activeTab, setActiveTab] = useState(''); // Default to empty (no selection)

    // Scroll to top on mount (Hero Section)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Check auth on mount and when interactions happen
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            navigate('/login');
        } else {
            setUserEmail(email);
        }
    }, [navigate]);


    // Logout Handler
    const handleLogout = () => {
        localStorage.clear();
        setUserEmail(null);
        setGeneratedContent(null);
        setActiveTab('');
        // Navigate handled by router usually, but reload ensures clean state if prefered, or just navigate('/login')
        navigate('/login');
    };

    // Audio Logic
    useEffect(() => {
        const audio = new Audio('/public/loading.mp3');
        audio.loop = true;
        audio.volume = 0.3;

        const isLoading = ['transcribing', 'analyzing', 'writing'].includes(status);

        if (isLoading) {
            audio.play().catch(e => console.log("Audio play failed (interaction required):", e));
        } else {
            audio.pause();
            audio.currentTime = 0;
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [status]);

    const handleGenerate = async (formData) => {
        setStatus('transcribing');

        // Production URL for the main n8n workflow
        const endpoint = 'http://localhost:5678/webhook/ghostwriter-input';

        try {
            setTimeout(() => setStatus('analyzing'), 2000);
            setTimeout(() => setStatus('writing'), 4500);

            console.log(`GhostRight: Contacting Engine at ${endpoint}...`);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail, // Dynamic email
                    name: formData.name, // Still using form data name if available, or could pull from user profile later
                    yt_url: formData.url,
                    raw_samples: formData.samples
                }),
            });

            if (response.ok) {
                // Response Inspector: Log raw text first
                const text = await response.text();
                console.log('RAW N8N OUTPUT:', text);

                try {
                    // Try to parse the text as JSON
                    const data = JSON.parse(text);

                    // Strict parsing: Expect postContent
                    const rawContent = data.postContent || "Error: received JSON but 'postContent' format was missing.";
                    const cleanText = sanitizeOutput(rawContent);

                    const cleanData = {
                        ...data,
                        post: cleanText
                    };

                    setTimeout(() => {
                        setGeneratedContent(cleanData);
                        setStatus('completed');
                    }, 6000);

                } catch (parseError) {
                    console.error('Handshake Failed. n8n sent this instead of JSON:', text);

                    // Show raw error in UI (Response Inspector)
                    setTimeout(() => {
                        const errorPost = `👻 **Ghostly Debugger: Handshake Failed**

The GhostRight UI received data but could not parse it as JSON.

**Raw Response Inspector:**
\`\`\`text
${text.substring(0, 500)}...
\`\`\`

**Parse Error:** ${parseError.message}`;

                        setGeneratedContent({
                            hooks: ["❌ JSON Parse Error", "⚠️ Invalid Response"],
                            post: errorPost
                        });
                        setStatus('completed');
                    }, 6000);
                }
            } else {
                throw new Error(`Server responded with ${response.status}`);
            }

        } catch (e) {
            console.error("GhostRight Engine Failure", e);

            // "Ghostly Debugger" Error Message
            setTimeout(() => {
                const errorPost = `👻 **Ghostly Debugger: Connection Failed**

The GhostRight UI could not connect to the Neural Engine.
    
**Diagnostic Report:**
- **Target Endpoint:** \`${endpoint}\`
- **Error Details:** ${e.message}
- **Suggestion:** Check .env VITE_N8N_BASE_URL and ensure n8n is running.

*Check your browser console (F12) for the full network log.*`;

                setGeneratedContent({
                    hooks: ["❌ Connection Error", "⚠️ Engine Offline"],
                    post: errorPost // Raw because we want the error format to be visible
                });
                setStatus('completed');
            }, 6000);
        }
    };

    if (!userEmail) {
        // Should be handled by useEffect redirect, but render null or loader meantime
        return null;
    }

    return (
        <div className="min-h-screen font-sans selection:bg-corp-blue/20">
            <AnimatePresence>
                {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
            </AnimatePresence>

            <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
                <ShaderBackground />

                <Navbar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={handleLogout}
                    userEmail={userEmail}
                    userName={localStorage.getItem('userName')}
                    userPicture={localStorage.getItem('userPicture')}
                />

                <EngineRoom />

                {activeTab === 'Archives' ? (
                    <Archives setActiveTab={setActiveTab} userEmail={userEmail} />
                ) : (
                    <BentoLayout id="dashboard">
                        {/* Left Column: Input Deck */}
                        <div className="lg:col-span-1 h-full">
                            <InputDeck
                                onSubmit={handleGenerate}
                                isLoading={status !== 'idle' && status !== 'completed'}
                                userEmail={userEmail}
                            />
                        </div>

                        {/* Right Columns: Chromium Display */}
                        <div className="lg:col-span-2 h-full">
                            <ChromiumDisplay status={status} content={generatedContent} />
                        </div>
                    </BentoLayout>
                )}
            </div>
        </div>
    );
}

export default Studio;
