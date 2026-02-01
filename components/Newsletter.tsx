'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        setIsLoading(false);
        setIsSubscribed(true);
        toast.success('Welcome to the Inner Circle', {
            description: "You've been successfully added to our curated newsletter."
        });
        setEmail('');
    };

    return (
        <section className="py-40 relative overflow-hidden bg-background">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px]" />
            </div>

            <div className="container-custom">
                <div className="max-w-6xl mx-auto glass-dark p-12 md:p-24 rounded-[4rem] overflow-hidden relative border border-white/5">
                    <div className="absolute -top-10 -right-10 p-8 text-primary/5">
                        <Star className="w-64 h-64 rotate-45" />
                    </div>

                    <div className="relative z-10 text-center space-y-12">
                        <div className="space-y-6">
                            <span className="text-[10px] uppercase font-bold tracking-[0.6em] text-primary block">
                                Beyond the Surface
                            </span>
                            <h2 className="text-5xl md:text-8xl font-serif font-black leading-none text-white tracking-tighter">
                                The Inner Circle.
                            </h2>
                        </div>

                        <p className="text-white/50 text-xl max-w-2xl mx-auto font-medium italic">
                            A curated ledger of aesthetics, delivered monthly. <br /> Reserved for those who seek the profound.
                        </p>

                        {!isSubscribed ? (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-16 flex flex-col md:flex-row gap-6 max-w-2xl mx-auto"
                            >
                                <div className="flex-grow group relative">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Vault access via email..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 focus:border-primary/50 focus:ring-8 focus:ring-primary/5 text-white px-10 py-6 rounded-full text-lg transition-all duration-700 outline-none placeholder:text-white/20 italic"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    variant="gold"
                                    className="h-auto rounded-full py-6 px-14 flex items-center justify-center gap-4 transition-all duration-700 hover:scale-105"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-background/30 border-t-background animate-spin rounded-full" />
                                    ) : (
                                        <>
                                            Register Access
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <div
                                className="mt-10 p-16 bg-primary/10 border border-primary/20 rounded-[3rem] flex flex-col items-center space-y-8 animate-in zoom-in-95 duration-1000"
                            >
                                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40">
                                    <CheckCircle2 className="w-10 h-10 text-black" />
                                </div>
                                <div className="text-center space-y-4">
                                    <h3 className="text-4xl font-serif font-bold text-white">Entry Permitted</h3>
                                    <p className="text-white/60 text-lg">You have been added to the curated registry.</p>
                                </div>
                                <button
                                    onClick={() => setIsSubscribed(false)}
                                    className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-primary transition-all duration-500"
                                >
                                    Register secondary vault
                                </button>
                            </div>
                        )}

                        <div className="flex items-center justify-center gap-8 pt-8 opacity-30">
                            {['Bespoke', 'Encrypted', 'Absolute'].map((v) => (
                                <React.Fragment key={v}>
                                    <p className="text-[10px] text-white uppercase tracking-[0.4em] font-bold">
                                        {v}
                                    </p>
                                    {v !== 'Absolute' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
