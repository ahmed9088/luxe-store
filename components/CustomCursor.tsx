'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'hidden'>('default');

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button';

            setCursorType(isClickable ? 'pointer' : 'default');
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] hidden lg:block">
            {/* Outer Ring */}
            <motion.div
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: cursorType === 'pointer' ? 60 : 32,
                    height: cursorType === 'pointer' ? 60 : 32,
                    backgroundColor: cursorType === 'pointer' ? 'rgba(194, 120, 97, 0.15)' : 'rgba(255, 255, 255, 0)',
                    borderColor: cursorType === 'pointer' ? 'rgba(194, 120, 97, 0.5)' : 'rgba(255, 255, 255, 0.3)',
                }}
                className="absolute border rounded-full backdrop-blur-[1px] transition-colors duration-300"
            />

            {/* Inner Dot */}
            <motion.div
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: cursorType === 'pointer' ? 8 : 4,
                    height: cursorType === 'pointer' ? 8 : 4,
                    backgroundColor: cursorType === 'pointer' ? '#c27861' : '#ffffff',
                }}
                className="absolute rounded-full"
            />
        </div>
    );
}
