'use client';

import Image from 'next/image';
import { ShoppingBag, Eye, Star, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState } from 'react';
import QuickViewModal from './QuickViewModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ProductCardProps {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    category: string;
    featured?: boolean;
    description?: string;
    details?: string[];
    priority?: boolean;
}

export default function ProductCard({ id, name, slug, price, image, category, featured, description, details, priority = false }: ProductCardProps) {
    const router = useRouter();
    const { addItem } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [quickViewOpen, setQuickViewOpen] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: '',
            productId: id,
            name,
            price,
            image,
            quantity: 1,
        });
    };

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInWishlist(id)) {
            removeFromWishlist(id);
        } else {
            addToWishlist({ id, name, slug, price, image, category });
        }
    };

    return (
        <Card
            className="group relative overflow-visible bg-transparent border-none shadow-none card-trendy"
            onMouseEnter={() => router.prefetch(`/products/${slug}`)}
        >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] group-hover:rounded-[1.5rem]">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    priority={priority}
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Badges */}
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                    {featured && (
                        <Badge variant="outline" className="bg-black/80 backdrop-blur-xl text-primary border-primary/30 py-1.5 px-4 rounded-full text-[8px] tracking-[0.4em] uppercase font-black">
                            Signature
                        </Badge>
                    )}
                </div>

                {/* Wishlist */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-6 right-6 z-20 h-12 w-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-2xl border border-white/20 text-white transition-all duration-500 hover:bg-primary hover:text-black hover:scale-110 active:scale-95 group/heart"
                >
                    <Heart className={`w-4 h-4 transition-all duration-500 ${isInWishlist(id) ? 'fill-white' : 'text-white'}`} />
                </button>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-x-6 bottom-6 z-20 translate-y-8 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:opacity-100 hidden lg:block">
                    <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full rounded-full bg-white/95 backdrop-blur-xl border-none shadow-2xl h-14 font-black uppercase tracking-[0.3em] text-[9px] hover:bg-primary hover:text-white transition-all duration-500">
                                <Eye className="w-4 h-4 mr-3" />
                                Inspect Piece
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl p-0 overflow-hidden border-none sm:rounded-[4rem] glass-card">
                            <QuickViewModal
                                product={{ id, name, slug, price, image, category, featured, description, details }}
                                onClose={() => setQuickViewOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <CardContent className="pt-8 px-2">
                <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                            <p className="text-[9px] uppercase font-black tracking-[0.4em] text-primary/60">
                                {category}
                            </p>
                            <Link href={`/products/${slug}`} className="block group/title">
                                <h3 className="text-xl md:text-2xl font-serif font-black leading-tight text-foreground transition-all duration-500 group-hover/title:text-primary">
                                    {name}
                                </h3>
                                <div className="h-px w-0 bg-primary group-hover/title:w-full transition-all duration-700" />
                            </Link>
                        </div>
                        <p className="font-serif font-black text-2xl text-foreground/90 tabular-nums">
                            <span className="text-sm font-light text-muted-foreground mr-1">$</span>
                            {price.toFixed(0)}
                        </p>
                    </div>

                    <div className="pt-2 overflow-hidden">
                        <div className="transform translate-y-full opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                            <Button
                                onClick={handleAddToCart}
                                variant="gold"
                                className="w-full h-14"
                            >
                                Acquire Piece
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Button - Always visible slightly */}
                    <Button
                        onClick={handleAddToCart}
                        variant="gold"
                        className="w-full lg:hidden h-14"
                    >
                        Acquire Piece
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
