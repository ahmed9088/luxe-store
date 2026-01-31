'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import Magnetic from './Magnetic';
import { useHapticFeedback } from '@/lib/haptics';

export default function Header() {
    const { playClick, playHover } = useHapticFeedback();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const { totalItems } = useCart();
    const { wishlist } = useWishlist();

    return (
        <>
            <header className="sticky top-0 z-50 glass border-b border-white/10">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Magnetic strength={0.2}>
                            <Link href="/" className="flex items-center space-x-2 group">
                                <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient-primary">
                                    Luxe
                                </h1>
                            </Link>
                        </Magnetic>

                        {/* Desktop Navigation */}
                        {/* ... */}

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/products" className="link text-sm font-medium">
                                Shop All
                            </Link>
                            <Link href="/products?category=clothing" className="link text-sm font-medium">
                                Clothing
                            </Link>
                            <Link href="/products?category=accessories" className="link text-sm font-medium">
                                Accessories
                            </Link>
                            <Link href="/products?featured=true" className="link text-sm font-medium">
                                Featured
                            </Link>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 md:space-x-4">
                            {/* Search */}
                            <Magnetic strength={0.3}>
                                <button className="hidden md:flex btn-ghost btn-sm">
                                    <Search className="w-5 h-5" />
                                </button>
                            </Magnetic>

                            {/* Wishlist */}
                            <Magnetic strength={0.3}>
                                <button
                                    onClick={() => { playClick(); setWishlistOpen(true); }}
                                    className="btn-ghost btn-sm relative"
                                    onMouseEnter={playHover}
                                >
                                    <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-primary fill-primary' : ''}`} />
                                    {wishlist.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary text-stone-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </button>
                            </Magnetic>

                            {/* Account */}
                            <Magnetic strength={0.3}>
                                <Link href="/account" className="hidden md:flex btn-ghost btn-sm">
                                    <User className="w-5 h-5" />
                                </Link>
                            </Magnetic>

                            {/* Cart */}
                            <Magnetic strength={0.3}>
                                <button
                                    onClick={() => { playClick(); setCartOpen(true); }}
                                    className="btn-ghost btn-sm relative"
                                    onMouseEnter={playHover}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary text-stone-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </button>
                            </Magnetic>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden btn-ghost btn-sm"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 space-y-4 animate-fade-in border-t border-white/5">
                            <Link
                                href="/products"
                                className="block py-2 text-stone-300 hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Shop All
                            </Link>
                            <Link
                                href="/products?category=clothing"
                                className="block py-2 text-stone-300 hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Clothing
                            </Link>
                            <Link
                                href="/products?category=accessories"
                                className="block py-2 text-stone-300 hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Accessories
                            </Link>
                            <Link
                                href="/products?featured=true"
                                className="block py-2 text-stone-300 hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Featured
                            </Link>
                            <Link
                                href="/account"
                                className="block py-2 text-stone-300 hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                My Account
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
            <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
        </>
    );
}
