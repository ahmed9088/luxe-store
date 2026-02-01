'use client';

import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';

export default function CartDrawer() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] mt-6">
            {/* Content */}
            <div className="flex-grow overflow-y-auto pr-2 space-y-6 scrollbar-hide">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                        <div className="p-8 bg-secondary rounded-full text-muted-foreground/30">
                            <ShoppingBag className="w-16 h-16" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-serif font-bold">Your bag is empty</h3>
                            <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">
                                Looks like you haven't added any luxury pieces yet.
                            </p>
                        </div>
                        <SheetClose asChild>
                            <Button variant="outline" className="rounded-full px-8">
                                Continue Shopping
                            </Button>
                        </SheetClose>
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 group"
                        >
                            <div className="relative w-24 h-24 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex-grow flex flex-col justify-between py-1">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h4>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-medium">
                                        {item.size && `Size: ${item.size}`} {item.color && ` • ${item.color}`}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center bg-secondary rounded-full px-2 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:text-primary transition-colors text-muted-foreground"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:text-primary transition-colors text-muted-foreground"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <span className="font-serif font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
                <div className="pt-6 border-t border-border space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-medium">Subtotal</span>
                        <span className="text-2xl font-serif font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground text-center uppercase tracking-[0.2em] font-medium">
                        Shipping and taxes calculated at checkout
                    </p>
                    <SheetClose asChild>
                        <Link href="/checkout" className="block">
                            <Button className="w-full rounded-full h-14 font-bold uppercase tracking-widest text-xs gap-2">
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </SheetClose>
                </div>
            )}
        </div>
    );
}
