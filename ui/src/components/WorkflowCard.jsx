import React, { useState } from 'react';

const WorkflowCard = ({ onGenerate, isProcessing, onSuccess, setLoading }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState(''); // Added name field
    const [url, setUrl] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const [samples, setSamples] = useState('');
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {};
        if (!validateEmail(email)) newErrors.email = 'Please enter a valid email.';
        if (!url) newErrors.url = 'YouTube URL is required.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        // Trigger loading state via prop (App.jsx handles the visual status)
        if (setLoading) setLoading(true);

        try {
            const response = await fetch('http://localhost:5678/webhook-test/ghostwriter-input', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    yt_url: url,
                    raw_samples: samples
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (onSuccess) onSuccess(result); // Pass result up to App
        } catch (error) {
            console.error("Error generating post:", error);
            // Handle error state if needed
        } finally {
            if (setLoading) setLoading(false);
        }
    };

    return (
        <main className="bento-card h-full" style={{ overflowY: 'auto' }}>
            <h2 className="text-2xl font-bold mb-6 text-white">Create New Post</h2>

            <div className="input-group">
                <label className="text-label">Name (Optional)</label>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label className="text-label">Email Address</label>
                <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderColor: errors.email ? 'var(--color-danger)' : '' }}
                />
                {errors.email && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
            </div>

            <div className="input-group">
                <label className="text-label">YouTube Video URL</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="https://youtube.com/watch?v=..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{ borderColor: errors.url ? 'var(--color-danger)' : '' }}
                    />
                    {url && (
                        <div style={{
                            width: '60px', height: '42px',
                            borderRadius: '4px',
                            background: '#000',
                            flexShrink: 0,
                            backgroundImage: `url(https://img.youtube.com/vi/${url.split('v=')[1]?.split('&')[0]}/0.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '1px solid var(--color-slate-light)'
                        }}></div>
                    )}
                </div>
                {errors.url && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.url}</span>}
            </div>

            <div className="input-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                <div>
                    <span className="text-label" style={{ marginBottom: 0, color: 'var(--color-text-main)' }}>First time here?</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Train the AI on your voice</span>
                </div>
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={isNewUser}
                        onChange={(e) => setIsNewUser(e.target.checked)}
                    />
                    <span className="slider"></span>
                </label>
            </div>

            <div style={{
                maxHeight: isNewUser ? '300px' : '0',
                opacity: isNewUser ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                marginBottom: isNewUser ? '1.5rem' : '0'
            }}>
                <label className="text-label">Writing Samples</label>
                <textarea
                    rows="5"
                    placeholder="Paste some of your best LinkedIn posts here..."
                    value={samples}
                    onChange={(e) => setSamples(e.target.value)}
                ></textarea>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    We'll analyze your tone, sentence structure, and vocabulary.
                </p>
            </div>

            <button
                className={`btn-primary ${isProcessing ? 'processing' : ''}`}
                onClick={handleSubmit}
                disabled={isProcessing}
            >
                {isProcessing ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <span className="loader"></span> Processing...
                    </span>
                ) : 'Generate Post'}
            </button>
        </main>
    );
};

export default WorkflowCard;
