'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { totalItems } = useCart();

    return (
        <>
            <header className="sticky top-0 z-50 glass border-b border-white/10">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <h1 className="text-2xl md:text-3xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                                Luxe
                            </h1>
                        </Link>

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
                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <button className="hidden md:flex btn-ghost btn-sm">
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Account */}
                            <Link href="/account" className="hidden md:flex btn-ghost btn-sm">
                                <User className="w-5 h-5" />
                            </Link>

                            {/* Cart */}
                            <button
                                onClick={() => setCartOpen(true)}
                                className="btn-ghost btn-sm relative"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-stone-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

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
                        <div className="md:hidden py-4 space-y-4 animate-fade-in">
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
        </>
    );
}
