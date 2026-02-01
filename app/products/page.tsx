'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, Search, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const ALL_PRODUCTS = [
    {
        id: '1',
        name: 'Essential Linen Shirt',
        slug: 'essential-linen-shirt',
        description: 'A breathable, high-quality white linen shirt perfect for any season.',
        price: 120.00,
        image: '/images/linen-shirt.png',
        category: 'Clothing',
        featured: true,
        details: ['100% French Flax', 'Breathable Weave', 'Relaxed Fit'],
        priority: true
    },
    {
        id: '2',
        name: 'Tan Leather Tote',
        slug: 'tan-leather-tote',
        description: 'A minimalist tan leather tote handcrafted from premium full-grain leather.',
        price: 280.00,
        image: '/images/leather-bag.png',
        category: 'Accessories',
        featured: true,
        details: ['Veg-Tanned Leather', 'Internal Pockets', 'Hand-Stitched'],
        priority: true
    },
    {
        id: '3',
        name: 'Silver Mesh Watch',
        slug: 'silver-mesh-watch',
        description: 'A sleek silver watch with a minimalist face and mesh band.',
        price: 185.00,
        image: '/images/silver-watch.png',
        category: 'Accessories',
        featured: true,
        details: ['Japanese Quartz', '5ATM Water Resistance', 'Steel Mesh'],
        priority: true
    },
    {
        id: '4',
        name: 'Matte Charcoal Mug',
        slug: 'matte-charcoal-mug',
        description: 'A hand-thrown ceramic mug with a beautiful matte charcoal finish.',
        price: 35.00,
        image: '/images/ceramic-mug.png',
        category: 'Lifestyle',
        featured: true,
        details: ['Hand-Thrown Ceramic', 'Dishwasher Safe', 'Ergonomic Grip'],
        priority: true
    },
    {
        id: '5',
        name: 'Linen Trousers',
        slug: 'linen-trousers',
        description: 'Luxurious linen trousers with a tailored fit.',
        price: 145.00,
        image: '/images/linen-shirt.png',
        category: 'Clothing',
        details: ['Breathable Linen', 'Tailored Cut', 'Natural Fibers']
    },
    {
        id: '6',
        name: 'Minimalist Wallet',
        slug: 'minimalist-wallet',
        description: 'Sleek leather wallet for the modern minimalist.',
        price: 65.00,
        image: '/images/leather-bag.png',
        category: 'Accessories',
        details: ['Slim Profile', 'RFID Protection', 'Premium Cowhide']
    },
];

export default function ProductListing() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const categories = ['All', 'Clothing', 'Accessories', 'Lifestyle'];

    const filteredProducts = useMemo(() => {
        let result = ALL_PRODUCTS.filter(p => {
            const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (sortBy === 'low-to-high') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'high-to-low') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [activeCategory, searchQuery, sortBy]);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <main className="flex-grow pt-40 pb-32">
                <div className="container-custom">
                    {/* Cinematic Page Header */}
                    <div className="relative mb-32 overflow-hidden rounded-[4rem] bg-black p-16 md:p-24 text-white">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 right-0 w-[60%] h-full bg-[radial-gradient(circle_at_70%_20%,rgba(197,160,89,0.15),transparent_60%)]" />
                            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
                        </div>

                        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-16">
                            <div className="space-y-8 max-w-3xl">
                                <Badge variant="outline" className="border-primary/40 text-primary py-1.5 px-6 rounded-full text-[10px] tracking-[0.5em] uppercase font-black">
                                    Repository — Index 01
                                </Badge>
                                <div className="space-y-4">
                                    <h1 className="text-7xl md:text-[9rem] font-serif font-black leading-[0.8] tracking-tighter">
                                        The <br />
                                        <span className="text-primary italic font-light lowercase">Archive.</span>
                                    </h1>
                                </div>
                                <p className="text-white/50 font-medium text-xl md:text-2xl leading-relaxed max-w-xl italic">
                                    A strictly curated ledger of objects. Formally rigorous, materially honest, and aesthetically absolute.
                                </p>
                            </div>

                            <div className="w-full xl:w-md relative group">
                                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary transition-all duration-500" />
                                <input
                                    type="text"
                                    placeholder="Query Archive..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-20 pr-16 h-24 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full focus:ring-8 focus:ring-primary/5 focus:border-primary/50 text-white text-xl placeholder:text-white/20 transition-all duration-700 outline-none italic"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-24">
                        {/* Advanced Filters */}
                        <aside className="lg:w-80 space-y-16">
                            <div className="space-y-10">
                                <div className="flex items-center justify-between border-b border-border pb-6">
                                    <h4 className="text-[10px] uppercase tracking-[0.6em] font-black text-foreground">
                                        Categories
                                    </h4>
                                    <div className="w-8 h-px bg-primary" />
                                </div>
                                <div className="flex flex-wrap lg:flex-col gap-3">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`group flex items-center justify-between px-8 py-5 rounded-3xl text-[11px] uppercase tracking-[0.2em] transition-all duration-700 font-black ${activeCategory === cat
                                                ? 'bg-black text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] scale-[1.05]'
                                                : 'bg-secondary/20 text-muted-foreground hover:bg-black hover:text-white'
                                                }`}
                                        >
                                            {cat}
                                            <span className={`w-2 h-2 rounded-full transition-all duration-700 ${activeCategory === cat ? 'bg-primary' : 'bg-transparent scale-0 group-hover:scale-100 group-hover:bg-primary/40'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Aesthetic Selection */}
                            <div className="p-10 rounded-[3rem] bg-black text-white relative overflow-hidden group border border-white/5 shadow-2xl">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-[30deg] transition-all duration-1000 group-hover:scale-150">
                                    <SlidersHorizontal className="w-32 h-32" />
                                </div>
                                <div className="relative z-10 space-y-8">
                                    <Badge variant="outline" className="border-primary/30 text-primary text-[8px] uppercase tracking-[0.4em] font-black italic">
                                        Reserved List
                                    </Badge>
                                    <h4 className="text-3xl font-serif font-black leading-tight">Private <br /> Selection.</h4>
                                    <p className="text-white/40 text-sm leading-relaxed font-medium italic">Unreleased prototypes and bespoke commissions for the inner circle.</p>
                                    <Link href="#" className="inline-block pt-4">
                                        <Button variant="gold" className="rounded-full px-8 h-12 text-[9px] uppercase tracking-widest font-black">
                                            Request Access
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </aside>

                        {/* Results Section */}
                        <div className="flex-grow space-y-16">
                            <div className="flex flex-col sm:flex-row justify-between items-center bg-black/5 p-6 rounded-[2.5rem] border border-black/5 gap-6">
                                <p className="text-[10px] uppercase font-black tracking-[0.4em] text-muted-foreground px-4">
                                    Entries Logged: <span className="text-primary ml-2 font-black italic text-base">{filteredProducts.length}</span>
                                </p>
                                <div className="flex items-center gap-6 bg-white p-2 rounded-full shadow-2xl border border-black/5">
                                    <span className="text-[10px] uppercase font-black tracking-[0.4em] text-muted-foreground pl-6 pr-2">Archive Order</span>
                                    <div className="relative flex items-center pr-6 py-3">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="appearance-none bg-transparent text-[10px] font-black tracking-[0.4em] uppercase text-foreground pr-8 focus:outline-none cursor-pointer italic"
                                        >
                                            <option value="newest">Chronological</option>
                                            <option value="low-to-high">Value ASC</option>
                                            <option value="high-to-low">Value DESC</option>
                                        </select>
                                        <ChevronDown className="absolute right-0 w-4 h-4 text-primary pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            {...product}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-48 text-center space-y-12 bg-black/5 rounded-[4rem] border border-dashed border-black/10 transition-all duration-700 hover:bg-black group">
                                    <div className="relative inline-block">
                                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:opacity-0 transition-opacity duration-700" />
                                        <div className="relative w-32 h-32 bg-white flex items-center justify-center rounded-[2rem] border border-black/5 text-muted-foreground/30 transition-all duration-700 group-hover:bg-primary group-hover:text-black">
                                            <Search className="w-12 h-12" />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-4xl md:text-6xl font-serif font-black text-foreground tracking-tighter group-hover:text-white transition-colors">Archive Empty.</h3>
                                        <p className="text-muted-foreground group-hover:text-white/40 transition-colors text-xl md:text-2xl max-w-md mx-auto font-medium italic">No entries correspond to your current parameters of inquiry.</p>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setActiveCategory('All');
                                            setSearchQuery('');
                                        }}
                                        variant="gold"
                                        className="rounded-full px-16 h-20 text-xs font-black uppercase tracking-[0.4em]"
                                    >
                                        Reset Archive Inquiry
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
