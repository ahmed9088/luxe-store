'use client';

import React from 'react';
import { ShoppingBag, Heart, ArrowRight, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuickViewModalProps {
    product: any;
    onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
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
        <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Image Preview */}
            <div className="w-full md:w-1/2 relative bg-secondary overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {product.featured && (
                        <Badge variant="luxe" className="bg-white/95 text-primary border-none shadow-sm">
                            <Star className="w-3 h-3 fill-primary mr-1" />
                            Featured Piece
                        </Badge>
                    )}
                </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-8 bg-background">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary">
                            {product.category}
                        </p>
                        <h2 className="text-4xl font-serif font-bold text-foreground leading-tight">
                            {product.name}
                        </h2>
                    </div>
                    <p className="text-3xl font-serif font-bold text-foreground">
                        ${product.price.toFixed(2)}
                    </p>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm font-medium italic">
                    {product.description || 'An expression of refined craftsmanship and timeless elegance. Designed for the discerning individual who values detail and quality above all else.'}
                </p>

                <div className="space-y-6">
                    <div className="flex gap-4">
                        <Button
                            onClick={handleAddToCart}
                            className="flex-grow rounded-full h-14 font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
                        >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Add to Bag
                        </Button>
                        <Button
                            variant="outline"
                            onClick={toggleWishlist}
                            className={`h-14 w-14 rounded-full border-border/50 ${isInWishlist(product.id) ? 'bg-primary/5 text-primary border-primary/20' : ''}`}
                        >
                            <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-primary' : ''}`} />
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full rounded-full border border-border/40 hover:bg-secondary h-12 text-[10px] font-bold uppercase tracking-widest gap-2"
                        onClick={() => {
                            onClose();
                            window.location.href = `/products/${product.slug}`;
                        }}
                    >
                        Explore Full Narrative
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
