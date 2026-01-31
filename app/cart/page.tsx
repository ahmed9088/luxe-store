'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

    if (items.length === 0) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center space-y-8 py-24">
                    <div className="p-8 bg-stone-900 rounded-full text-stone-700">
                        <ShoppingBag className="w-16 h-16" />
                    </div>
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl text-white">Your cart is empty</h1>
                        <p className="text-stone-500 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Explore our collection and find something you love.</p>
                    </div>
                    <Link href="/products" className="btn-primary btn-lg">
                        Start Shopping
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-12 pb-24">
                <div className="container-custom">
                    <h1 className="text-4xl mb-12">Shopping Cart</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="hidden md:grid grid-cols-6 pb-6 border-b border-stone-800 text-xs uppercase tracking-widest font-bold text-stone-500">
                                <div className="col-span-3">Product</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-center">Price</div>
                                <div className="text-right">Total</div>
                            </div>

                            {items.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 pb-8 border-b border-stone-800 group">
                                    {/* Product Info */}
                                    <div className="md:col-span-3 flex items-center gap-6">
                                        <div className="w-24 h-32 relative rounded-lg overflow-hidden bg-stone-900 border border-stone-800 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="space-y-1">
                                            <Link href={`/products/${item.productId}`} className="text-lg font-medium hover:text-primary transition-colors">
                                                {item.name}
                                            </Link>
                                            <div className="text-sm text-stone-500 flex flex-wrap gap-x-4">
                                                {item.size && <span>Size: {item.size}</span>}
                                                {item.color && <span>Color: {item.color}</span>}
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-xs text-red-500/70 hover:text-red-500 flex items-center gap-1 pt-2 transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3" /> Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex justify-center">
                                        <div className="flex items-center border border-stone-800 rounded-lg p-1 bg-stone-900/50">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-white"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-white"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-center text-stone-400 md:block hidden">
                                        ${item.price.toFixed(2)}
                                    </div>

                                    {/* Total */}
                                    <div className="text-right font-display text-primary text-lg">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}

                            <Link href="/products" className="inline-flex items-center gap-2 text-stone-400 hover:text-primary transition-colors text-sm pt-4">
                                <ArrowLeft className="w-4 h-4" /> Continue Shopping
                            </Link>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-8">
                            <div className="glass p-8 space-y-6 sticky top-28">
                                <h3 className="text-xl font-bold uppercase tracking-widest border-b border-stone-800 pb-4">Order Summary</h3>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-stone-400">Subtotal ({totalItems} items)</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-400">Shipping</span>
                                        <span className="text-green-500">{totalPrice > 200 ? 'Free' : '$15.00'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-400">Estimated Tax</span>
                                        <span>${(totalPrice * 0.08).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-stone-800 pt-6 flex justify-between items-end">
                                    <span className="text-lg uppercase tracking-widest font-bold">Total</span>
                                    <span className="text-2xl font-display text-primary">
                                        ${(totalPrice * 1.08 + (totalPrice > 200 ? 0 : 15)).toFixed(2)}
                                    </span>
                                </div>

                                <Link href="/checkout" className="btn-primary w-full py-4 flex items-center justify-center gap-2 group">
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-3 text-xs text-stone-500">
                                        <ShieldCheck className="w-4 h-4" />
                                        Secure checkout with SSL encryption
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-stone-500">
                                        <Truck className="w-4 h-4" />
                                        Eligible for free express shipping
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
