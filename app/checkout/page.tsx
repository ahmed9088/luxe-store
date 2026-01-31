'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, Lock, CreditCard, Truck, ArrowLeft, CheckCircle2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Image from 'next/image';

export default function CheckoutPage() {
    const { items, totalPrice, totalItems, clearCart } = useCart();
    const [isOrdered, setIsOrdered] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const subtotal = totalPrice;
    const shipping = subtotal > 200 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    if (totalItems === 0 && !isOrdered) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center space-y-6 pt-24">
                    <div className="w-20 h-20 rounded-full bg-stone-900 flex items-center justify-center text-stone-500 border border-white/5">
                        <ShoppingCart className="w-10 h-10" />
                    </div>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-display">Your bag is empty</h1>
                        <p className="text-stone-500">Add some items before checking out.</p>
                    </div>
                    <Link href="/products" className="btn-primary px-8">Browse Collection</Link>
                </main>
                <Footer />
            </div>
        );
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setIsOrdered(true);
            toast.success('Order placed successfully!', {
                description: 'We\'ve sent a confirmation email to ' + formData.email,
            });
            setTimeout(() => {
                clearCart();
            }, 1000);
        }
    };

    if (isOrdered) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center space-y-12 py-24 px-4 text-center">
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="p-10 bg-primary/10 rounded-full text-primary border border-primary/20 shadow-[0_0_50px_rgba(var(--color-primary),0.1)]"
                    >
                        <CheckCircle2 className="w-24 h-24" />
                    </motion.div>
                    <div className="space-y-4 max-w-xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-display"
                        >
                            The collection is <span className="text-primary italic">yours.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-stone-400 text-lg leading-relaxed"
                        >
                            Your order <span className="text-white font-medium">#{Math.floor(Math.random() * 90000) + 10000}</span> has been placed successfully.
                            We're preparing your items with the utmost care.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <Link href="/" className="btn-primary px-10 py-4 font-bold">Return to Gallery</Link>
                        <Link href="/products" className="btn-secondary px-10 py-4 font-bold">Continue Shopping</Link>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    const inputClasses = "w-full px-5 py-4 bg-stone-900/50 border-white/10 rounded-2xl text-sm focus:ring-primary/20 transition-all placeholder:text-stone-600 focus:border-white/20";
    const labelClasses = "text-[10px] uppercase tracking-[2px] font-bold text-stone-500 mb-2 block ml-2";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-12 md:pt-20 pb-24">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/5">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Link
                                    href={step === 2 ? "#" : "/products"}
                                    onClick={(e) => {
                                        if (step === 2) {
                                            e.preventDefault();
                                            setStep(1);
                                        }
                                    }}
                                    className="p-3 bg-stone-900 border border-white/5 rounded-2xl text-stone-500 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Step {step} of 2</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display">
                                {step === 1 ? 'Shipping Details' : 'Payment Secure'}
                            </h1>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className={`flex items-center gap-3 ${step === 1 ? 'text-white' : 'text-stone-500'}`}>
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border ${step === 1 ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-stone-900/50 text-stone-500'}`}>1</div>
                                <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Shipping</span>
                            </div>
                            <div className="w-12 h-[1px] bg-white/5" />
                            <div className={`flex items-center gap-3 ${step === 2 ? 'text-white' : 'text-stone-500'}`}>
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border ${step === 2 ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-stone-900/50 text-stone-500'}`}>2</div>
                                <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Payment</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Checkout Form */}
                        <div className="lg:col-span-7">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.form
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        onSubmit={handleNext}
                                        className="space-y-10"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="form-group">
                                                <label className={labelClasses}>First Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Alexander"
                                                    required
                                                    className={inputClasses}
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className={labelClasses}>Last Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. McQueen"
                                                    required
                                                    className={inputClasses}
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className={labelClasses}>Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="alexander@luxe.com"
                                                required
                                                className={inputClasses}
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className={labelClasses}>Delivery Address</label>
                                            <input
                                                type="text"
                                                placeholder="123 Savile Row"
                                                required
                                                className={inputClasses}
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <div className="md:col-span-2 form-group">
                                                <label className={labelClasses}>City</label>
                                                <input
                                                    type="text"
                                                    placeholder="London"
                                                    required
                                                    className={inputClasses}
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className={labelClasses}>Postal Code</label>
                                                <input
                                                    type="text"
                                                    placeholder="W1S 3PR"
                                                    required
                                                    className={inputClasses}
                                                    value={formData.zip}
                                                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <button type="submit" className="btn-primary w-full py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3">
                                                Continue to Payment
                                                <ArrowLeft className="w-5 h-5 rotate-180" />
                                            </button>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.form
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleNext}
                                        className="space-y-10"
                                    >
                                        <div className="p-8 bg-stone-900/50 border border-primary/20 rounded-3xl space-y-8">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                        <CreditCard className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-bold text-white block">Credit / Debit Card</span>
                                                        <span className="text-xs text-stone-500">Secure encryption by Stripe</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="w-10 h-6 bg-stone-800 rounded-md border border-white/5" />
                                                    <div className="w-10 h-6 bg-stone-800 rounded-md border border-white/5" />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="form-group">
                                                    <label className={labelClasses}>Card Number</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="•••• •••• •••• ••••"
                                                            required
                                                            className={inputClasses}
                                                            value={formData.cardNumber}
                                                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                                        />
                                                        <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="form-group">
                                                        <label className={labelClasses}>Expiry Date</label>
                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            required
                                                            className={inputClasses}
                                                            value={formData.expiry}
                                                            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className={labelClasses}>CVV</label>
                                                        <input
                                                            type="text"
                                                            placeholder="•••"
                                                            required
                                                            className={inputClasses}
                                                            value={formData.cvv}
                                                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 space-y-4">
                                            <button type="submit" className="btn-primary w-full py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3">
                                                <ShieldCheck className="w-6 h-6" />
                                                Authorize & Place Order
                                            </button>
                                            <p className="text-center text-stone-500 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                                                <Lock className="w-3 h-3" /> Secure Payment Gateway
                                            </p>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-stone-900/30 border border-white/5 p-8 md:p-10 rounded-[2.5rem] sticky top-28 space-y-10"
                            >
                                <h3 className="text-xl font-display border-b border-white/5 pb-6">Order Masterclass</h3>

                                <div className="space-y-8 max-h-[35vh] overflow-y-auto pr-4 custom-scrollbar">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-6">
                                            <div className="w-20 h-24 relative rounded-2xl overflow-hidden bg-stone-900 border border-white/5 flex-shrink-0 shadow-lg">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-grow space-y-1">
                                                <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                                                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold font-mono">
                                                    <span className="text-stone-500">Qty:</span>
                                                    <span>{item.quantity}</span>
                                                    {item.size && (
                                                        <>
                                                            <div className="w-1 h-1 rounded-full bg-stone-700" />
                                                            <span className="text-stone-500">Size:</span>
                                                            <span>{item.size}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <p className="text-sm font-display text-primary pt-2">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-white/5">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                        <span className="text-stone-500 font-medium">Subtotal</span>
                                        <span className="text-white">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                        <span className="text-stone-500 font-medium">Shipping</span>
                                        <span className="text-white">{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                                        <span className="text-stone-500 font-medium">Estimated Tax</span>
                                        <span className="text-white">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-8 border-t border-white/5">
                                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Total</span>
                                        <span className="text-4xl font-display text-white">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="p-6 bg-stone-950/50 rounded-3xl border border-white/5 space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                                        <Truck className="w-4 h-4 shadow-[0_0_10px_rgba(var(--color-primary),0.3)]" />
                                        <span>Luxury Express Delivery</span>
                                    </div>
                                    <p className="text-[10px] text-stone-500 leading-relaxed uppercase tracking-wider">
                                        Complimentary shipping on orders over $200. Standard delivery window: 2-3 business days.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
