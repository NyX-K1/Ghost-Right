import React from 'react';

const GhostWordmark = ({ className = "" }) => {
    return (
        <svg
            width="140"
            height="32"
            viewBox="0 0 140 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <text
                x="0"
                y="22"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                fontSize="20"
                letterSpacing="-0.02em"
                fill="white"
            >
                Ghost
            </text>
            <text
                x="58"
                y="22"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                fontSize="20"
                letterSpacing="-0.02em"
                fill="#0a66c2" // LI-Blue
            >
                Right
            </text>
        </svg>
    );
};

export default GhostWordmark;
