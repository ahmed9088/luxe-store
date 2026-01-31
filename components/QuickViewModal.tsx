'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, ArrowRight, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductMagnifier from './ProductMagnifier';
import { useHapticFeedback } from '@/lib/haptics';

interface QuickViewModalProps {
    product: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const { playClick, playHover } = useHapticFeedback();
    const { addItem } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    if (!product) return null;

    const handleAddToCart = () => {
        addItem({
            id: '',
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    const toggleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 450 }}
                        className="relative w-full max-w-4xl bg-stone-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => { playClick(); onClose(); }}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors backdrop-blur-md border border-white/10"
                            onMouseEnter={playHover}
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-stone-900">
                            <ProductMagnifier
                                src={product.image}
                                alt={product.name}
                            />
                            {product.featured && (
                                <div className="absolute top-6 left-6 z-10">
                                    <span className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-primary" />
                                        Featured
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <div className="space-y-6">
                                <div>
                                    <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">
                                        {product.category}
                                    </span>
                                    <h2 className="text-3xl font-display font-bold mt-2 leading-tight">
                                        {product.name}
                                    </h2>
                                    <p className="text-2xl font-display text-primary mt-4">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>

                                <p className="text-stone-400 leading-relaxed text-sm md:text-base">
                                    {product.description || 'A masterpiece of minimalist design and premium quality, crafted for those who appreciate the finer things in life.'}
                                </p>

                                <div className="space-y-4 pt-4">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => { playClick(); handleAddToCart(); }}
                                            className="flex-grow btn-primary py-4 rounded-xl flex items-center justify-center gap-2 group"
                                            onMouseEnter={playHover}
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            Add to Bag
                                        </button>
                                        <button
                                            onClick={() => { playClick(); toggleWishlist(); }}
                                            className={`p-4 rounded-xl border border-white/10 transition-all duration-300 ${isInWishlist(product.id) ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/5 hover:bg-white/10 text-white'
                                                }`}
                                            onMouseEnter={playHover}
                                        >
                                            <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-primary' : ''}`} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => {
                                            onClose();
                                            window.location.href = `/products/${product.slug}`;
                                        }}
                                        className="w-full flex items-center justify-center gap-2 py-3 text-stone-500 hover:text-white transition-colors text-sm font-medium group"
                                    >
                                        View Full Details
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
