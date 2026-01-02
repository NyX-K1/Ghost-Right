/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ghost: {
                    dark: '#1b1f23',  // LI-Dark-Bg
                    mist: '#ffffff',
                },
                corp: {
                    blue: '#0a66c2',  // LI-Blue (Primary)
                    dark: '#1b1f23',  // Background
                    card: '#242a30',  // LI-Card-Bg
                    slate: '#e2e8f0', // Text Body
                    muted: '#94a3b8', // Muted Text
                },
                surface: {
                    glass: 'rgba(36, 42, 48, 0.7)', // Based on card bg
                    border: 'rgba(255, 255, 255, 0.08)',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'mist-flow': 'mistFlow 20s linear infinite alternate',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                mistFlow: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '100% 50%' },
                }
            }
        },
    },
    plugins: [],
}
