import React from 'react';

const ShaderBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#1b1f23]">
            {/* Deep Blue Ambient Mesh */}
            <div
                className="absolute top-[-50%] left-[-20%] w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-20 animate-pulse-slow"
                style={{ background: 'radial-gradient(circle, #0a66c2 0%, transparent 70%)' }}
            ></div>

            {/* Secondary Cool Gray Mesh */}
            <div
                className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] opacity-10 animate-mist-flow"
                style={{ background: 'radial-gradient(circle, #e2e8f0 0%, transparent 70%)' }}
            ></div>

            {/* Subtle Overlay Pattern for Texture */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
            ></div>
        </div>
    );
};

export default ShaderBackground;
