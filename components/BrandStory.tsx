'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BrandStory() {
    return (
        <section className="py-24 md:py-32 bg-stone-950 overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Visual Side */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src="/images/linen-shirt.png"
                                alt="Our Philosophy"
                                fill
                                className="object-cover transition-transform duration-[3s] hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                        </div>

                        {/* Floating Caption */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-8 -right-8 md:-right-12 p-8 bg-stone-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-xs hidden md:block"
                        >
                            <p className="text-sm italic text-stone-300 leading-relaxed">
                                "We believe true luxury lies in simplicity and the stories behind the things we hold."
                            </p>
                            <p className="text-[10px] uppercase tracking-widest text-primary font-bold mt-4">
                                — The Luxe Philosophy
                            </p>
                        </motion.div>

                        {/* Decorative circle */}
                        <div className="absolute -top-12 -left-12 w-32 h-32 border border-primary/20 rounded-full -z-10" />
                    </div>

                    {/* Text Side */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <span className="text-primary font-semibold tracking-[0.3em] uppercase text-xs block">
                                Since 2026
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                                Crafted for the <br />
                                <span className="text-stone-400">Mindful Minimalist.</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6 text-stone-400 text-lg leading-relaxed"
                        >
                            <p>
                                Born from a passion for timeless design, Luxe was created to bridge the gap between fast fashion and unattainable luxury. We curate items that aren't just objects, but companions for your daily journey.
                            </p>
                            <p>
                                Every piece in our collection is handpicked for its quality, material integrity, and aesthetic longevity. We don't follow trends; we define seasons.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="pt-4"
                        >
                            <Link href="/products" className="group flex items-center gap-4 text-white hover:text-primary transition-colors">
                                <span className="font-display font-bold text-lg border-b border-primary/50 pb-1 group-hover:border-primary transition-all">
                                    Discover the Collection
                                </span>
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </motion.div>

                        {/* Stats mini-grid */}
                        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5">
                            <div>
                                <p className="text-2xl font-display font-bold">100%</p>
                                <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Sustainable</p>
                            </div>
                            <div>
                                <p className="text-2xl font-display font-bold">50+</p>
                                <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Artisans</p>
                            </div>
                            <div>
                                <p className="text-2xl font-display font-bold">Global</p>
                                <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Boutiques</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
