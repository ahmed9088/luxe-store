'use client';

import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';

export default function WishlistDrawer() {
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
        <div className="flex flex-col h-[calc(100vh-80px)] mt-6">
            {/* Items List */}
            <div className="flex-grow overflow-y-auto pr-2 space-y-6 scrollbar-hide">
                {wishlist.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-muted-foreground/30">
                            <Heart className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl font-serif font-bold">Your wishlist is empty</p>
                            <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                                Save the pieces you love for later.
                            </p>
                        </div>
                        <SheetClose asChild>
                            <Button variant="outline" className="rounded-full px-8">
                                Browse Collection
                            </Button>
                        </SheetClose>
                    </div>
                ) : (
                    wishlist.map((product) => (
                        <div
                            key={product.id}
                            className="flex gap-4 group"
                        >
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex-grow flex flex-col justify-between py-1">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">
                                        {product.category}
                                    </p>
                                    <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-primary font-bold text-sm">${product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button
                                        onClick={() => handleMoveToCart(product)}
                                        size="sm"
                                        className="flex-grow rounded-full text-[10px] uppercase tracking-widest font-bold h-9"
                                    >
                                        <ShoppingBag className="w-3 h-3 mr-2" />
                                        Add to Cart
                                    </Button>
                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="p-2 hover:text-destructive transition-colors text-muted-foreground"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
                <div className="pt-4 border-t border-border">
                    <Button
                        onClick={clearWishlist}
                        variant="ghost"
                        className="w-full text-muted-foreground hover:text-foreground text-[10px] uppercase tracking-[0.2em] font-bold"
                    >
                        Clear All Items
                    </Button>
                </div>
            )}
        </div>
    );
}
