'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-stone-950 z-[100] flex flex-col items-center justify-center space-y-8">
            <div className="relative">
                {/* Modern circular loader */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border border-white/5 border-t-primary"
                />

                {/* Pulse inner circle */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-12 h-12 bg-primary/20 rounded-full blur-xl" />
                </motion.div>

                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(194,120,97,0.8)]" />
                </div>
            </div>

            <div className="text-center space-y-2">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl font-display font-bold tracking-[0.2em] uppercase text-white"
                >
                    Luxe
                </motion.h2>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-px bg-primary mx-auto"
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-xs text-stone-500 uppercase tracking-widest pt-2"
                >
                    Curating perfection...
                </motion.p>
            </div>
        </div>
    );
}
