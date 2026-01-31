'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen bg-stone-950">
            <Header />

            <main className="flex-grow flex items-center justify-center relative overflow-hidden">
                {/* Abstract background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-stone-100/5 rounded-full blur-[100px]" />
                </div>

                <div className="container-custom relative z-10 text-center space-y-12">
                    <div className="relative inline-block">
                        <motion.h1
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="text-[12rem] md:text-[20rem] font-display font-bold leading-none text-white/5 select-none"
                        >
                            404
                        </motion.h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-4"
                            >
                                <h2 className="text-3xl md:text-5xl font-display font-bold">Lost in Luxury.</h2>
                                <p className="text-stone-400 max-w-md mx-auto italic">
                                    The piece you are looking for has been moved or doesn't exist. Let's get you back to the collection.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link href="/" className="btn-primary px-8 py-4 rounded-xl flex items-center gap-2 group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Return Home
                        </Link>
                        <Link href="/products" className="btn-secondary px-8 py-4 rounded-xl flex items-center gap-2 group">
                            <Search className="w-5 h-5" />
                            Browse Products
                        </Link>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
