'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Truck, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

    if (items.length === 0) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center space-y-12 py-32">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />
                        <div className="relative p-16 bg-black rounded-full border border-white/10 text-primary shadow-2xl">
                            <ShoppingBag className="w-24 h-24 stroke-[1]" />
                        </div>
                    </div>
                    <div className="text-center space-y-6 max-w-xl px-6">
                        <Badge variant="outline" className="border-primary/30 text-primary py-1.5 px-6 rounded-full text-[10px] tracking-[0.5em] uppercase font-black italic">
                            Archive Empty
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter">Deserted <br /><span className="text-primary italic font-light lowercase">Curations.</span></h1>
                        <p className="text-muted-foreground text-xl md:text-2xl font-medium italic leading-relaxed">
                            The repository is silent. Embark on a journey through our collection to find objects that resonate with your narrative.
                        </p>
                    </div>
                    <Link href="/products">
                        <Button variant="gold" className="h-20 px-12 rounded-full text-[11px] uppercase font-black tracking-[0.5em] shadow-[0_30px_60px_rgba(197,160,89,0.2)]">
                            Explore Repository <ArrowRight className="w-5 h-5 ml-4" />
                        </Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />

            <main className="flex-grow pt-40 pb-32">
                <div className="container-custom">
                    {/* Cinematic Header */}
                    <div className="relative mb-24 overflow-hidden rounded-[3rem] bg-black p-12 md:p-20 text-white">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(circle_at_70%_20%,rgba(197,160,89,0.1),transparent_60%)]" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                            <div className="space-y-4">
                                <Badge variant="outline" className="border-primary/30 text-primary py-1 px-4 rounded-full text-[9px] tracking-[0.4em] uppercase font-black italic">
                                    Order Manifest — 2026
                                </Badge>
                                <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter">Your <span className="text-primary italic font-light lowercase">Curation.</span></h1>
                            </div>
                            <div className="flex flex-col items-center md:items-end space-y-2">
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Subtotal Accumulation</p>
                                <p className="text-4xl font-serif font-black text-white tabular-nums">${totalPrice.toFixed(0)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-24">
                        {/* Cart Items */}
                        <div className="lg:col-span-8 space-y-12">
                            <div className="hidden md:grid grid-cols-6 pb-8 border-b border-border text-[10px] uppercase font-black tracking-[0.4em] text-muted-foreground">
                                <div className="col-span-3">Object Details</div>
                                <div className="text-center">Count</div>
                                <div className="text-center">Unit</div>
                                <div className="text-right">Aggregate</div>
                            </div>

                            <div className="space-y-12">
                                {items.map((item) => (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 items-center gap-10 pb-12 border-b border-border group transition-all duration-700">
                                        {/* Product Info */}
                                        <div className="md:col-span-3 flex items-center gap-8">
                                            <div className="w-28 h-36 relative rounded-3xl overflow-hidden bg-black border border-white/5 flex-shrink-0 shadow-2xl transition-transform duration-700 group-hover:scale-105">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="space-y-4">
                                                <Link href={`/products/${item.productId}`} className="text-2xl font-serif font-black hover:text-primary transition-all duration-500 tracking-tight">
                                                    {item.name}
                                                </Link>
                                                <div className="flex flex-wrap gap-4">
                                                    {item.size && (
                                                        <Badge variant="secondary" className="bg-black/5 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                                                            DIM: {item.size}
                                                        </Badge>
                                                    )}
                                                    {item.color && (
                                                        <Badge variant="secondary" className="bg-black/5 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg italic">
                                                            TONE: {item.color}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/40 hover:text-red-500 flex items-center gap-3 pt-2 transition-all duration-500"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Discard From Curation
                                                </button>
                                            </div>
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex justify-center">
                                            <div className="flex items-center bg-black/5 rounded-2xl p-1 border border-black/5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-black hover:text-white rounded-xl transition-all duration-500"
                                                >
                                                    -
                                                </button>
                                                <span className="w-10 text-center font-black text-sm tabular-nums">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-black hover:text-white rounded-xl transition-all duration-500"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-center font-serif font-black text-muted-foreground md:block hidden tabular-nums text-lg">
                                            ${item.price.toFixed(0)}
                                        </div>

                                        {/* Total */}
                                        <div className="text-right font-serif font-black text-foreground text-2xl tabular-nums">
                                            ${(item.price * item.quantity).toFixed(0)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/products" className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all duration-500 pt-8 group">
                                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-3" /> Resume Repository Exploration
                            </Link>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4">
                            <div className="glass-dark p-12 space-y-10 rounded-[3rem] sticky top-32 border border-white/5 shadow-2xl group">
                                <h3 className="text-2xl font-serif font-black tracking-tighter border-b border-white/5 pb-6 text-white">Consolidated Abstract</h3>

                                <div className="space-y-6 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">Registry Value ({totalItems} items)</span>
                                        <span className="text-white font-black tabular-nums">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">Logistics Logistics</span>
                                        <span className={totalPrice > 200 ? 'text-primary font-black uppercase tracking-widest text-[10px]' : 'text-white font-black tabular-nums'}>
                                            {totalPrice > 200 ? 'Complimentary' : '$15.00'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px]">Projected Revenue Tax</span>
                                        <span className="text-white font-black tabular-nums">${(totalPrice * 0.08).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-8 flex justify-between items-baseline">
                                    <span className="text-lg font-black uppercase tracking-[0.4em] text-primary">Total Obligation</span>
                                    <div className="text-right">
                                        <span className="text-5xl font-serif font-black text-white tabular-nums tracking-tighter">
                                            ${(totalPrice * 1.08 + (totalPrice > 200 ? 0 : 15)).toFixed(0)}
                                        </span>
                                        <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-2">USD CURRENCY</p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Link href="/checkout">
                                        <Button variant="gold" className="w-full h-20 rounded-full text-[11px] uppercase font-black tracking-[0.5em] shadow-[0_30px_60px_rgba(197,160,89,0.2)] transition-all duration-700 hover:scale-[1.03] group-hover:shadow-[0_45px_90px_rgba(197,160,89,0.3)]">
                                            Proceed to Fulfillment <ArrowRight className="w-5 h-5 ml-4" />
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-6 pt-6 opacity-30">
                                    <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-white">
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                        Encrypted Transaction Protocol
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-white">
                                        <Truck className="w-4 h-4 text-primary" />
                                        Prioritized Global Logistics
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
