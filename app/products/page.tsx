'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    },
    {
        id: '5',
        name: 'Linen Trousers',
        slug: 'linen-trousers',
        description: 'Luxurious linen trousers with a tailored fit.',
        price: 145.00,
        image: '/images/linen-shirt.png',
        category: 'Clothing',
    },
    {
        id: '6',
        name: 'Minimalist Wallet',
        slug: 'minimalist-wallet',
        description: 'Sleek leather wallet for the modern minimalist.',
        price: 65.00,
        image: '/images/leather-bag.png',
        category: 'Accessories',
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

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-12 md:pt-20">
                <div className="container-custom">
                    {/* Page Title & Filter Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8">
                        <div className="space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-5xl font-display font-bold"
                            >
                                Shop All
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-stone-500"
                            >
                                Curated collection of refined essentials.
                            </motion.p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-grow md:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 text-sm bg-stone-900/50 border-white/10 rounded-xl focus:ring-primary/20"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="lg:w-64 space-y-10">
                            <div>
                                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-400 mb-6 flex items-center gap-2">
                                    <SlidersHorizontal className="w-3 h-3" />
                                    Categories
                                </h4>
                                <ul className="space-y-2">
                                    {categories.map((cat) => (
                                        <li key={cat}>
                                            <button
                                                onClick={() => setActiveCategory(cat)}
                                                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${activeCategory === cat
                                                    ? 'bg-primary/10 text-primary font-semibold border-l-2 border-primary'
                                                    : 'text-stone-400 hover:text-white hover:bg-stone-900/50'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-br from-stone-900/50 to-transparent border border-white/5">
                                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-400 mb-4">Limited Edition</h4>
                                <p className="text-stone-500 text-sm mb-4">Discover our exclusive collaborative releases.</p>
                                <button className="text-xs font-bold text-primary hover:underline">Explore More →</button>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 text-sm">
                                <p className="text-stone-500">
                                    Showing <span className="text-white font-medium">{filteredProducts.length}</span> results
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-stone-500">Sort by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="bg-stone-900 border-white/10 rounded-lg text-sm focus:ring-primary/20 py-1.5"
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="low-to-high">Price: Low to High</option>
                                        <option value="high-to-low">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {filteredProducts.length > 0 ? (
                                    <motion.div
                                        key={activeCategory + searchQuery + sortBy}
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="show"
                                        className="product-grid"
                                    >
                                        {filteredProducts.map((product) => (
                                            <motion.div key={product.id} variants={itemVariants}>
                                                <ProductCard
                                                    id={product.id}
                                                    name={product.name}
                                                    slug={product.slug}
                                                    price={product.price}
                                                    image={product.image}
                                                    category={product.category}
                                                    featured={product.featured}
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-20 text-center space-y-4"
                                    >
                                        <div className="inline-flex p-6 bg-stone-900 rounded-full">
                                            <Search className="w-12 h-12 text-stone-700" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-medium">No results found</h3>
                                            <p className="text-stone-500">Try adjusting your filters or search query.</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setActiveCategory('All');
                                                setSearchQuery('');
                                            }}
                                            className="btn-secondary btn-sm"
                                        >
                                            Clear All Filters
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
