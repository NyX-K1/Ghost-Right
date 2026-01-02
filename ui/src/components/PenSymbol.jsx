import React from 'react';

const PenSymbol = ({ size = 24, className = "" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="48" height="48" fill="white" fillOpacity="0.01" />
            <path d="M5.32497 43.4998L13.81 43.5L44.9227 12.3873L36.4374 3.90204L5.32471 35.0147L5.32497 43.4998Z" fill="#2F88FF" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <path d="M27.9521 12.3873L36.4374 20.8726" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default PenSymbol;
