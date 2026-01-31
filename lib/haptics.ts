'use client';

import { useEffect, useRef } from 'react';

// A lightweight hook to play subtle haptic-like sounds
export function useHapticFeedback() {
    const clickAudioRef = useRef<HTMLAudioElement | null>(null);
    const hoverAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // We use extremely short, high-frequency "ticks"
        // Creating oscillators for a synthesized "haptic" feel to avoid loading large audio files
        const createTick = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const playTick = () => {
                if (context.state === 'suspended') {
                    context.resume();
                }
                const osc = context.createOscillator();
                const gain = context.createGain();

                osc.type = type;
                osc.frequency.setValueAtTime(frequency, context.currentTime);

                gain.gain.setValueAtTime(0.05, context.currentTime); // Very quiet
                gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

                osc.connect(gain);
                gain.connect(context.destination);

                osc.start();
                osc.stop(context.currentTime + duration);
            };
            return playTick;
        };

        (window as any).playClickHaptic = createTick(800, 0.05);
        (window as any).playHoverHaptic = createTick(1200, 0.02, 'triangle');

    }, []);

    const playClick = () => {
        if ((window as any).playClickHaptic) (window as any).playClickHaptic();
    };

    const playHover = () => {
        if ((window as any).playHoverHaptic) (window as any).playHoverHaptic();
    };

    return { playClick, playHover };
}
