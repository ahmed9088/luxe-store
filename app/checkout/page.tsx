'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, Lock, CreditCard, Truck, ArrowLeft, CheckCircle2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
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
                <main className="flex-grow flex flex-col items-center justify-center space-y-6 pt-24 bg-white">
                    <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center text-stone-200 border border-stone-100">
                        <ShoppingCart className="w-8 h-8" />
                    </div>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-display font-bold text-stone-900">Your bag is empty</h1>
                        <p className="text-stone-500 font-light">Add some items before checking out.</p>
                    </div>
                    <Link href="/products" className="bg-stone-900 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors">Browse Collection</Link>
                </main>
                <Footer />
            </div>
        );
    }

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            window.scrollTo({ top: 0 });
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
                <main className="flex-grow flex flex-col items-center justify-center space-y-12 py-24 px-4 text-center bg-white">
                    <div className="p-10 bg-stone-50 rounded-full text-primary border border-stone-100 shadow-sm">
                        <CheckCircle2 className="w-24 h-24" />
                    </div>
                    <div className="space-y-4 max-w-xl">
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-stone-900">
                            The collection is <span className="text-primary italic">yours.</span>
                        </h1>
                        <p className="text-stone-500 text-lg font-light leading-relaxed">
                            Your order <span className="text-stone-900 font-bold">#{Math.floor(Math.random() * 90000) + 10000}</span> has been placed successfully.
                            We're preparing your items with the utmost care.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/" className="bg-stone-900 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors">Return to Gallery</Link>
                        <Link href="/products" className="bg-white text-stone-900 border border-stone-200 px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-stone-50 transition-colors">Continue Shopping</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const inputClasses = "w-full px-5 py-4 bg-white border border-stone-200 rounded-xl text-sm focus:ring-0 focus:border-stone-900 transition-colors placeholder:text-stone-300 text-stone-900 shadow-sm";
    const labelClasses = "text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block ml-1";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-12 md:pt-20 pb-24 bg-white">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-stone-100">
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
                                    className="p-3 bg-stone-50 border border-stone-100 rounded-xl text-stone-400 hover:text-stone-900 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Step {step} of 2</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-900">
                                {step === 1 ? 'Shipping Details' : 'Payment Secure'}
                            </h1>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className={`flex items-center gap-3 ${step === 1 ? 'text-stone-900' : 'text-stone-300'}`}>
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold border transition-colors ${step === 1 ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-stone-100 bg-stone-50'}`}>1</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Shipping</span>
                            </div>
                            <div className="w-12 h-[1px] bg-stone-100" />
                            <div className={`flex items-center gap-3 ${step === 2 ? 'text-stone-900' : 'text-stone-300'}`}>
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold border transition-colors ${step === 2 ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-stone-100 bg-stone-50'}`}>2</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Payment</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Checkout Form */}
                        <div className="lg:col-span-7">
                            {step === 1 ? (
                                <form
                                    onSubmit={handleNext}
                                    className="space-y-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                        <button type="submit" className="bg-stone-900 text-white w-full py-5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-3 shadow-md">
                                            Continue to Payment
                                            <ArrowLeft className="w-4 h-4 rotate-180" />
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form
                                    onSubmit={handleNext}
                                    className="space-y-8"
                                >
                                    <div className="p-8 bg-stone-50 border border-stone-100 rounded-3xl space-y-8 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-stone-100">
                                                    <CreditCard className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-bold text-stone-900 block uppercase tracking-widest">Credit / Debit Card</span>
                                                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Secure encryption by Stripe</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-30">
                                                <div className="w-10 h-6 bg-stone-200 rounded-md" />
                                                <div className="w-10 h-6 bg-stone-200 rounded-md" />
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
                                                    <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-200" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
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
                                        <button type="submit" className="bg-stone-900 text-white w-full py-5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-3 shadow-md">
                                            <ShieldCheck className="w-5 h-5" />
                                            Authorize & Place Order
                                        </button>
                                        <p className="text-center text-stone-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                            <Lock className="w-3 h-3" /> Secure Payment Gateway
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-5">
                            <div className="bg-stone-50 border border-stone-100 p-8 md:p-10 rounded-[2.5rem] sticky top-28 space-y-8 shadow-sm">
                                <h3 className="text-xl font-display font-bold text-stone-900 border-b border-stone-100 pb-6 uppercase tracking-widest">Order Summary</h3>

                                <div className="space-y-6 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-5">
                                            <div className="w-16 h-20 relative rounded-xl overflow-hidden bg-white border border-stone-100 flex-shrink-0 shadow-sm">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-grow space-y-1">
                                                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest line-clamp-1">{item.name}</h4>
                                                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-stone-400">
                                                    <span>Qty: {item.quantity}</span>
                                                    {item.size && (
                                                        <>
                                                            <div className="w-1 h-1 rounded-full bg-stone-200" />
                                                            <span>Size: {item.size}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <p className="text-xs font-bold text-primary pt-1">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-stone-100">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <span className="text-stone-400">Subtotal</span>
                                        <span className="text-stone-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <span className="text-stone-400">Shipping</span>
                                        <span className="text-stone-900">{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <span className="text-stone-400">Estimated Tax</span>
                                        <span className="text-stone-900">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-8 border-t border-stone-100">
                                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Total</span>
                                        <span className="text-4xl font-display font-bold text-stone-900">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="p-6 bg-white rounded-2xl border border-stone-100 space-y-3 shadow-sm">
                                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                                        <Truck className="w-4 h-4" />
                                        <span>Luxury Express Delivery</span>
                                    </div>
                                    <p className="text-[10px] text-stone-400 leading-relaxed uppercase tracking-widest text-center sm:text-left">
                                        Complimentary shipping on orders over $200. Standard delivery window: 2-3 business days.
                                    </p>
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
