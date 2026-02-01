'use client';

import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />

            <main className="flex-grow flex items-center justify-center relative overflow-hidden py-32">
                {/* Atmospheric Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05)_0%,transparent_70%)] opacity-50" />
                </div>

                <div className="container-custom relative z-10 text-center space-y-16">
                    <div className="relative inline-block">
                        <h1 className="text-[15rem] md:text-[25rem] font-serif font-black leading-none text-white/5 select-none tracking-tighter">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="space-y-6">
                                <h2 className="text-6xl md:text-[7rem] font-serif font-black text-white tracking-tighter leading-none">
                                    Lost in the <br />
                                    <span className="text-primary italic font-light lowercase">Abyss.</span>
                                </h2>
                                <p className="text-white/40 max-w-lg mx-auto font-medium text-xl italic leading-relaxed">
                                    The signature piece you seek has vanished into our archives. Allow us to guide you back to the light.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <Link href="/" className="group">
                            <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-white/60 hover:text-white transition-all duration-500">
                                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-3 text-primary" />
                                Return to Genesis
                            </div>
                        </Link>
                        <Link href="/products">
                            <Button variant="gold" className="h-16 px-12 rounded-full text-[11px] uppercase font-black tracking-[0.5em] shadow-[0_30px_60px_rgba(197,160,89,0.2)]">
                                Browse Archive <Search className="w-4 h-4 ml-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
