'use client';

import React from 'react';

export default function AuraBackground() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Base background - Deepest Midnight */}
            <div className="absolute inset-0 bg-black" />

            {/* Cinematic Ambient Glows */}
            <div className="absolute -top-[20%] -left-[10%] w-[80%] aspect-square rounded-full bg-primary/10 blur-[180px] opacity-40 animate-pulse-slow" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] aspect-square rounded-full bg-primary/5 blur-[150px] opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

            {/* Subtler subtle background texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
