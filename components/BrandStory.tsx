'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Feather } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BrandStory() {
    return (
        <section className="py-40 bg-background overflow-hidden relative">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    {/* Visual Narrative */}
                    <div className="relative order-2 lg:order-1 group">
                        <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-1000 group-hover:rounded-[2rem] group-hover:shadow-[0_60px_120px_rgba(197,160,89,0.1)]">
                            <Image
                                src="/images/linen-shirt.png"
                                alt="The Luxe Maison"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                        </div>

                        {/* Floating Credo */}
                        <div className="absolute -bottom-12 -right-12 p-12 glass-dark border border-white/10 rounded-[3rem] shadow-2xl max-w-sm hidden lg:block transform group-hover:-translate-y-4 transition-transform duration-700">
                            <Feather className="w-10 h-10 text-primary mb-8 opacity-60" />
                            <p className="text-xl font-serif italic text-white leading-relaxed font-light">
                                "Luxury is not a possession, but an experience of clarity amidst chaos."
                            </p>
                            <div className="mt-8 flex items-center gap-6">
                                <div className="h-px w-12 bg-primary" />
                                <p className="text-[10px] uppercase tracking-[0.6em] text-primary font-black">
                                    THE LUXE MANIFESTO
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-16 order-1 lg:order-2">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <Badge variant="outline" className="border-primary/30 text-primary py-1.5 px-6 rounded-full text-[10px] tracking-[0.5em] uppercase font-bold">
                                    Genesis 2026
                                </Badge>
                                <h2 className="text-6xl md:text-9xl font-serif font-black leading-[0.85] text-foreground tracking-tighter">
                                    Curated <br />
                                    <span className="text-primary italic font-light lowercase">Quietude.</span>
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-10 text-muted-foreground text-xl md:text-2xl leading-[1.6] font-medium italic">
                            <p>
                                At the convergence of ancestral wisdom and modern restraint, Luxe exists as a harbinger of the essential.
                            </p>
                            <p className="text-foreground/90 not-italic font-bold">
                                We dismiss the ephemeral trends in pursuit of the eternal form. Every thread, every carve, every glint is a deliberate choice.
                            </p>
                        </div>

                        <div className="pt-8">
                            <Link href="/products" className="inline-block group">
                                <div className="flex items-center gap-8">
                                    <span className="text-2xl font-serif font-black text-foreground group-hover:text-primary transition-all duration-500">
                                        Examine our Narrative
                                    </span>
                                    <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center transition-all duration-700 group-hover:bg-primary group-hover:text-black group-hover:border-primary group-hover:rotate-[360deg]">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Heritage Metrics */}
                        <div className="grid grid-cols-3 gap-16 pt-16 border-t border-border">
                            {[
                                { val: '100%', label: 'Traceable' },
                                { val: '64+', label: 'Artisans' },
                                { val: '08', label: 'Maisons' },
                            ].map((stat, i) => (
                                <div key={i} className="space-y-3">
                                    <p className="text-4xl font-serif font-black text-foreground leading-none">{stat.val}</p>
                                    <p className="text-[10px] text-primary uppercase tracking-[0.4em] font-black">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
