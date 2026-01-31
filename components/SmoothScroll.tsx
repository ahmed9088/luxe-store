'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.3,
            duration: 0.5,
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 1.5,
            infinite: false,
        }}>
            {children}
        </ReactLenis>
    );
}
