'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-12 pb-24">
                <div className="container-custom">
                    <h1 className="text-4xl mb-12">My Account</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar Navigation */}
                        <aside className="space-y-2">
                            {[
                                { icon: User, label: 'Profile Settings', active: true },
                                { icon: Package, label: 'Order History', active: false },
                                { icon: MapPin, label: 'Shipping Addresses', active: false },
                                { icon: Heart, label: 'My Wishlist', active: false },
                                { icon: Settings, label: 'Account Preferences', active: false },
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${item.active ? 'bg-primary text-stone-950 font-bold' : 'text-stone-400 hover:bg-stone-900/50 hover:text-white'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon className="w-5 h-5" />
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 ${item.active ? 'text-stone-950/50' : 'text-stone-700'}`} />
                                </button>
                            ))}
                            <div className="pt-8">
                                <button className="w-full flex items-center gap-4 p-4 text-red-500/70 hover:text-red-500 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                    <span className="text-sm">Sign Out</span>
                                </button>
                            </div>
                        </aside>

                        {/* Profile Content */}
                        <div className="lg:col-span-3 space-y-12">
                            <div className="glass p-8 md:p-12 space-y-10 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                                    <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-3xl font-display text-stone-950 font-bold border-4 border-stone-800 shadow-xl">
                                        JS
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl">John Sullivan</h2>
                                        <p className="text-stone-500">Member since January 2026</p>
                                        <div className="flex gap-2 justify-center md:justify-start">
                                            <span className="badge bg-primary/10 text-primary border border-primary/20">Pro Member</span>
                                            <span className="badge bg-stone-800 text-stone-400">5 Orders</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div className="form-group">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" defaultValue="John Sullivan" className="w-full" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input type="email" defaultValue="hello@sullivan.design" className="w-full" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input type="text" defaultValue="+1 (555) 000-1234" className="w-full" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Location</label>
                                        <input type="text" defaultValue="New York, NY" className="w-full" />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button className="btn-primary">Save Changes</button>
                                </div>
                            </div>

                            {/* Recent Orders Preview */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest px-4">Recent Orders</h3>
                                <div className="glass overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-stone-900/50 text-xs uppercase tracking-widest font-bold text-stone-500 border-b border-stone-800">
                                            <tr>
                                                <th className="px-6 py-4">Order ID</th>
                                                <th className="px-6 py-4">Date</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {[
                                                { id: '#LX-8921', date: 'Jan 28, 2026', status: 'Delivered', color: 'text-green-500', amount: '$435.00' },
                                                { id: '#LX-8742', date: 'Jan 15, 2026', status: 'Processing', color: 'text-primary', amount: '$120.00' },
                                            ].map((order, i) => (
                                                <tr key={i} className="border-b border-stone-800/50 hover:bg-stone-900/20 transition-colors cursor-pointer">
                                                    <td className="px-6 py-4 font-mono">{order.id}</td>
                                                    <td className="px-6 py-4 text-stone-400">{order.date}</td>
                                                    <td className="px-6 py-4"><span className={order.color}>{order.status}</span></td>
                                                    <td className="px-6 py-4 text-right font-display">{order.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
