'use client';

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center space-y-16">
            <div className="relative group">
                {/* Architectural Loader */}
                <div className="w-24 h-24 rounded-full border border-white/5 border-t-primary animate-spin" style={{ animationDuration: '3s' }} />

                {/* Secondary Ring */}
                <div className="absolute inset-2 rounded-full border border-white/5 border-b-primary/50 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />

                {/* Center Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_20px_rgba(197,160,89,1)]" />
                </div>
            </div>

            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h2 className="text-4xl font-serif font-black tracking-[0.5em] uppercase text-white transition-all duration-1000">
                        Luxe
                    </h2>
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
                </div>
                <div className="flex items-center justify-center gap-6">
                    <span className="w-8 h-px bg-white/10" />
                    <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.4em] italic">
                        Materializing Intent
                    </p>
                    <span className="w-8 h-px bg-white/10" />
                </div>
            </div>

            {/* Subtle atmospheric glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 blur-[150px] opacity-20 pointer-events-none" />
        </div>
    );
}
