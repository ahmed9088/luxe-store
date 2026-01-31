'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AuraBackground() {
    const { scrollYProgress } = useScroll();

    // Transform scroll progress to various movements
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.5, 0.5, 0.3]);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-stone-950" />

            {/* Shifting Blobs */}
            <motion.div
                style={{ rotate, scale, opacity }}
                className="absolute -top-[20%] -left-[10%] w-[80%] aspect-square rounded-full bg-primary/10 blur-[80px]"
            />
            <motion.div
                style={{
                    rotate: useTransform(scrollYProgress, [0, 1], [180, -180]),
                    scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]),
                    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.3, 0.15])
                }}
                className="absolute -bottom-[20%] -right-[10%] w-[70%] aspect-square rounded-full bg-stone-100/5 blur-[60px]"
            />

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
