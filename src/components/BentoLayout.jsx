import React from 'react';
import { motion } from 'framer-motion';

const BentoLayout = ({ children, ...props }) => {
    return (
        <main className="pt-24 pb-12 px-8 min-h-screen box-border flex flex-col" {...props}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full h-full"
            >
                {children}
            </motion.div>
        </main>
    );
};

export default BentoLayout;
