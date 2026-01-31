'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProductMagnifierProps {
    src: string;
    alt: string;
}

export default function ProductMagnifier({ src, alt }: ProductMagnifierProps) {
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleMouseEnter = (e: React.MouseEvent) => {
        const el = e.currentTarget;
        const { width, height } = el.getBoundingClientRect();
        setSize([width, height]);
        setShowMagnifier(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = e.currentTarget;
        const { top, left } = el.getBoundingClientRect();
        const x = e.pageX - left - window.scrollX;
        const y = e.pageY - top - window.scrollY;
        setXY([x, y]);
    };

    const magnifierSize = 150;
    const zoomLevel = 2.5;

    return (
        <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl cursor-none"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowMagnifier(false)}
        >
            <Image
                ref={imgRef}
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority
            />

            <AnimatePresence>
                {showMagnifier && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        style={{
                            position: 'absolute',
                            pointerEvents: 'none',
                            height: `${magnifierSize}px`,
                            width: `${magnifierSize}px`,
                            top: `${y - magnifierSize / 2}px`,
                            left: `${x - magnifierSize / 2}px`,
                            backgroundImage: `url('${src}')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                            backgroundPosition: `${-x * zoomLevel + magnifierSize / 2}px ${-y * zoomLevel + magnifierSize / 2}px`,
                        }}
                        className="rounded-full border-2 border-white/20 shadow-2xl z-50 backdrop-blur-sm overflow-hidden"
                    >
                        {/* Lens reflection/shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
