'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubscribed(true);
        toast.success('Welcome to the inner circle', {
            description: "You've been successfully subscribed to our newsletter."
        });
        setEmail('');
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-stone-900/40 -z-10" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center space-y-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                            Elevate Your Lifestyle. <br />
                            <span className="text-primary italic">Join Our Inner Circle.</span>
                        </h2>
                        <p className="text-stone-400 text-lg max-w-2xl mx-auto">
                            Receive exclusive early access to new collections, curated minimalist inspiration, and special events.
                        </p>

                        {!isSubscribed ? (
                            <motion.form
                                onSubmit={handleSubmit}
                                className="mt-12 flex flex-col md:flex-row gap-4 max-w-lg mx-auto p-2 bg-stone-950/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
                                layout
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-grow bg-transparent border-none focus:ring-0 text-white px-6 py-4 placeholder:text-stone-600 rounded-xl"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-primary py-4 px-8 rounded-xl flex items-center justify-center gap-2 group disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent animate-spin rounded-full" />
                                    ) : (
                                        <>
                                            Subscribe
                                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-12 p-8 bg-primary/10 border border-primary/20 rounded-2xl flex flex-col items-center space-y-4"
                            >
                                <CheckCircle2 className="w-12 h-12 text-primary" />
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white">You're on the list!</h3>
                                    <p className="text-stone-400 text-sm mt-1">Thank you for joining. Keep an eye on your inbox.</p>
                                </div>
                                <button
                                    onClick={() => setIsSubscribed(false)}
                                    className="text-primary text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Subscribe another email
                                </button>
                            </motion.div>
                        )}

                        <p className="text-[10px] text-stone-600 uppercase tracking-widest">
                            No spam. Unsubscribe at any time.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-[10%] w-80 h-80 bg-stone-100/5 rounded-full blur-3xl -z-10"
            />
        </section>
    );
}
