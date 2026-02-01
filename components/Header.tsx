'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import { Badge } from '@/components/ui/badge';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { totalItems } = useCart();
    const { wishlist } = useWishlist();

    return (
        <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-2xl transition-all duration-500 hover:bg-background/90">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="container-custom">
                <div className="flex items-center justify-between h-20 md:h-28">
                    {/* Mobile Menu */}
                    <div className="flex lg:hidden">
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                                    <Menu className="w-5 h-5 text-foreground" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px] glass-card border-r border-white/10">
                                <SheetHeader>
                                    <SheetTitle className="font-serif text-3xl tracking-tighter text-left">Curated Selection</SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-8 mt-16 px-4">
                                    {[
                                        { name: 'Shop All', href: '/products' },
                                        { name: 'Apparel', href: '/products?category=clothing' },
                                        { name: 'Objects', href: '/products?category=accessories' },
                                        { name: 'Exclusives', href: '/products?featured=true' },
                                    ].map((item, i) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="group flex items-center justify-between text-2xl font-serif italic font-bold tracking-tight hover:text-primary transition-all duration-500"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                            <span className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ))}
                                    <div className="pt-10 border-t border-border/50">
                                        <Link
                                            href="/account"
                                            className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            Member Account
                                        </Link>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex items-center group relative px-4">
                        <span className="text-2xl md:text-3xl font-serif font-black tracking-tighter text-foreground transition-all duration-700 group-hover:tracking-[0.2em]">
                            LUXE
                        </span>
                        <div className="absolute -bottom-1 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-12">
                        {[
                            { name: 'Archive', href: '/products' },
                            { name: 'Clothing', href: '/products?category=clothing' },
                            { name: 'Accessories', href: '/products?category=accessories' },
                            { name: 'Editorial', href: '/products?featured=true' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group relative py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all duration-500"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-primary/5 rounded-full">
                            <Search className="w-4 h-4" />
                        </Button>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 rounded-full group">
                                    <Heart className={`w-4 h-4 transition-transform duration-500 group-hover:scale-110 ${wishlist.length > 0 ? "fill-primary text-primary" : ""}`} />
                                    {wishlist.length > 0 && (
                                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[8px] bg-primary text-background border-none animate-in zoom-in" variant="default">
                                            {wishlist.length}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="glass-card">
                                <SheetHeader>
                                    <SheetTitle className="font-serif text-3xl italic font-bold">Whispered Desires</SheetTitle>
                                </SheetHeader>
                                <WishlistDrawer />
                            </SheetContent>
                        </Sheet>

                        <div className="w-px h-6 bg-border/50 mx-2 hidden md:block" />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 rounded-full group">
                                    <ShoppingBag className="w-4 h-4 transition-transform duration-500 group-hover:scale-110" />
                                    {totalItems > 0 && (
                                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[8px] bg-foreground text-background border-none animate-in scale-in" variant="default">
                                            {totalItems}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="glass-card">
                                <SheetHeader>
                                    <SheetTitle className="font-serif text-3xl italic font-bold">Objects in Transit</SheetTitle>
                                </SheetHeader>
                                <CartDrawer />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
