import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import GhostSymbol from './GhostSymbol';
import GhostWordmark from './GhostWordmark';
import ShaderBackground from './ShaderBackground';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // If already logged in, redirect to studio
        const email = localStorage.getItem('userEmail');
        if (email) {
            navigate('/studio');
        }
    }, [navigate]);

    const handleSuccess = (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log('Login Success:', decoded);

            // Save to localStorage
            localStorage.setItem('userEmail', decoded.email);
            localStorage.setItem('userName', decoded.name);
            localStorage.setItem('userPicture', decoded.picture);

            // Redirect to Studio
            navigate('/studio');
        } catch (error) {
            console.error('Login Failed to decode:', error);
        }
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] font-sans relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-50">
                <ShaderBackground />
            </div>

            <div className="z-10 bg-[#161b22]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center w-full max-w-sm">
                <div className="mb-8 flex flex-col items-center gap-2">
                    <GhostSymbol size={48} />
                    <GhostWordmark className="h-6" />
                </div>

                <p className="text-slate-400 text-sm mb-8 text-center">
                    Sign in to access your neural workspace.
                </p>

                <div className="w-full flex justify-center">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        theme="filled_black"
                        shape="pill"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
