'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

interface WishlistDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const { addItem } = useCart();

    const handleMoveToCart = (product: any) => {
        addItem({
            id: '', // Generated in addItem
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        removeFromWishlist(product.id);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-stone-950/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-primary fill-primary" />
                                <h2 className="text-xl font-display font-semibold">Wishlist</h2>
                                <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-stone-400">
                                    {wishlist.length}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {wishlist.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center text-stone-500">
                                        <Heart className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-lg font-medium">Your wishlist is empty</p>
                                        <p className="text-sm text-stone-500">Add items you love to save them for later.</p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="btn-primary mt-4"
                                    >
                                        Browse Products
                                    </button>
                                </div>
                            ) : (
                                wishlist.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex gap-4 group"
                                    >
                                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-900 border border-white/5 flex-shrink-0">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between">
                                            <div>
                                                <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">
                                                    {product.category}
                                                </p>
                                                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                                                <p className="text-primary font-medium mt-1">${product.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleMoveToCart(product)}
                                                    className="flex-grow flex items-center justify-center gap-2 py-2 px-3 bg-white/5 hover:bg-primary hover:text-stone-950 rounded-lg text-sm transition-all duration-300"
                                                >
                                                    <ShoppingCart className="w-4 h-4" />
                                                    Add to Cart
                                                </button>
                                                <button
                                                    onClick={() => removeFromWishlist(product.id)}
                                                    className="p-2 hover:text-red-400 transition-colors"
                                                    title="Remove from wishlist"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {wishlist.length > 0 && (
                            <div className="p-6 border-t border-white/10 space-y-4 bg-stone-900/50">
                                <button
                                    onClick={clearWishlist}
                                    className="w-full py-3 text-stone-400 hover:text-stone-100 transition-colors text-sm font-medium"
                                >
                                    Clear All Items
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
