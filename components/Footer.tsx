'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-stone-800 mt-20">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                            Luxe
                        </h3>
                        <p className="text-stone-400 text-sm">
                            Curated premium lifestyle and fashion for the modern individual.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-stone-400 hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-stone-400 hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-stone-400 hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li><Link href="/products" className="text-stone-400 hover:text-primary transition-colors text-sm">All Products</Link></li>
                            <li><Link href="/products?category=clothing" className="text-stone-400 hover:text-primary transition-colors text-sm">Clothing</Link></li>
                            <li><Link href="/products?category=accessories" className="text-stone-400 hover:text-primary transition-colors text-sm">Accessories</Link></li>
                            <li><Link href="/products?featured=true" className="text-stone-400 hover:text-primary transition-colors text-sm">Featured</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-stone-400 hover:text-primary transition-colors text-sm">Contact Us</Link></li>
                            <li><Link href="#" className="text-stone-400 hover:text-primary transition-colors text-sm">Shipping & Returns</Link></li>
                            <li><Link href="#" className="text-stone-400 hover:text-primary transition-colors text-sm">Size Guide</Link></li>
                            <li><Link href="#" className="text-stone-400 hover:text-primary transition-colors text-sm">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-stone-400 hover:text-primary transition-colors text-sm">About Us</Link></li>
                            <li><Link href="#" className="text-stone-400 hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-stone-400 hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
                            <li><Link href="#" className="text-stone-400 hover:text-primary transition-colors text-sm">Careers</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-stone-400">
                    <p>&copy; 2026 Luxe. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Crafted with care for premium experiences</p>
                </div>
            </div>
        </footer>
    );
}
