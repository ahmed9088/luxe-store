'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
                    {/* Brand */}
                    <div className="lg:col-span-4 space-y-12">
                        <Link href="/" className="inline-block group">
                            <span className="text-5xl font-serif font-black tracking-tighter text-white transition-all duration-700 group-hover:tracking-widest">
                                LUXE
                            </span>
                        </Link>
                        <p className="text-white/40 text-base max-w-sm leading-[1.8] font-medium italic">
                            The definitive destination for curated luxury. Bridging the abyss between timeless craftsmanship and modern existential aesthetics.
                        </p>
                        <div className="flex space-x-6">
                            <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
                            <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
                            <SocialLink href="#" icon={<Mail className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Navigation Groups */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Curation</h4>
                            <ul className="space-y-4">
                                <FooterLink href="/products">All Pieces</FooterLink>
                                <FooterLink href="/products?category=clothing">Apparel</FooterLink>
                                <FooterLink href="/products?category=accessories">Objects</FooterLink>
                                <FooterLink href="/products?featured=true">Signature Selection</FooterLink>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Concierge</h4>
                            <ul className="space-y-4">
                                <FooterLink href="#">Client Service</FooterLink>
                                <FooterLink href="#">Global Shipping</FooterLink>
                                <FooterLink href="#">Vault Insurance</FooterLink>
                                <FooterLink href="#">Bespoke Sizing</FooterLink>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Maison</h4>
                            <ul className="space-y-4">
                                <FooterLink href="#">Our Narrative</FooterLink>
                                <FooterLink href="#">Ethical Charter</FooterLink>
                                <FooterLink href="#">Private Viewings</FooterLink>
                                <FooterLink href="#">Career Legacy</FooterLink>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Legal</h4>
                            <ul className="space-y-4">
                                <FooterLink href="#">Privacy Vault</FooterLink>
                                <FooterLink href="#">Terms of Intent</FooterLink>
                                <FooterLink href="#">Cookie Protocol</FooterLink>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <p className="text-[9px] uppercase font-black tracking-[0.4em] text-white/20">
                        &copy; 2026 LUXE STUDIO INC. — ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-12">
                        {['Modernity', 'Tradition', 'Intention'].map((v) => (
                            <p key={v} className="text-[9px] uppercase font-black tracking-[0.6em] text-white/20 hover:text-primary transition-all duration-700 cursor-default">
                                {v}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-primary hover:text-black hover:border-primary transition-all duration-500"
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-white/40 hover:text-white transition-all duration-500 text-sm font-medium italic"
            >
                {children}
            </Link>
        </li>
    );
}
