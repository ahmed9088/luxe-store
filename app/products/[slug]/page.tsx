'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ShoppingBag, Heart, Share2, ShieldCheck, Truck, Star, ChevronLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PRODUCTS = {
    'essential-linen-shirt': {
        id: '1',
        name: 'Essential Linen Shirt',
        price: 120.00,
        images: ['/images/linen-shirt.png'],
        category: 'Clothing',
        description: 'A masterpiece of minimalism, our linen shirt is crafted from the finest European flax for ultimate breathability and comfort. Features a relaxed silhouette, sustainable natural buttons, and meticulous tailoring.',
        features: ['100% Organic French Flax', 'Superior Breathability', 'Ethical European Craftsmanship', 'Architectural Boxy Fit'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Antique White', 'Ethereal Gray'],
    },
    'tan-leather-tote': {
        id: '2',
        name: 'Tan Leather Tote',
        price: 280.00,
        images: ['/images/leather-bag.png'],
        category: 'Accessories',
        description: 'Handcrafted from full-grain vegetable-tanned leather, this tote is designed to age beautifully and last a lifetime. Features a spacious interior and reinforced construction for daily use.',
        features: ['Full-Grain Veg-Tanned Leather', 'Artisanal Hand-Stitching', 'Signature Suede Interior', 'Ergonomic Shoulder Straps'],
        sizes: ['Universal Size'],
        colors: ['Classic Tan', 'Deep Cognac'],
    },
};

const FEATURED_PRODUCTS = [
    {
        id: '1',
        name: 'Essential Linen Shirt',
        slug: 'essential-linen-shirt',
        price: 120.00,
        image: '/images/linen-shirt.png',
        category: 'Clothing',
        featured: true,
    },
    {
        id: '2',
        name: 'Tan Leather Tote',
        slug: 'tan-leather-tote',
        price: 280.00,
        image: '/images/leather-bag.png',
        category: 'Accessories',
        featured: true,
    },
    {
        id: '3',
        name: 'Silver Mesh Watch',
        slug: 'silver-mesh-watch',
        price: 185.00,
        image: '/images/silver-watch.png',
        category: 'Accessories',
        featured: true,
    },
    {
        id: '4',
        name: 'Matte Charcoal Mug',
        slug: 'matte-charcoal-mug',
        price: 35.00,
        image: '/images/ceramic-mug.png',
        category: 'Lifestyle',
        featured: true,
    },
];

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { addItem } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const product = PRODUCTS[slug as keyof typeof PRODUCTS] || PRODUCTS['essential-linen-shirt'];
    const relatedProducts = FEATURED_PRODUCTS.filter(p => p.slug !== slug).slice(0, 4);

    const handleAddToCart = () => {
        addItem({
            id: Math.random().toString(36).substr(2, 9),
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity,
            size: selectedSize,
            color: selectedColor,
        });
        toast.success('Successfully added to bag', {
            description: `${product.name} is now awaiting checkout.`
        });
    };

    const isProductInWishlist = isInWishlist(product.id);

    const toggleWishlist = () => {
        if (isProductInWishlist) {
            removeFromWishlist(product.id);
            toast.info('Removed from wishlist');
        } else {
            addToWishlist({ ...product, slug, image: product.images[0] } as any);
            toast.success('Added to wishlist');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <main className="flex-grow pt-40 pb-40">
                <div className="container-custom">
                    {/* Navigation Bar */}
                    <nav className="flex items-center justify-between mb-24">
                        <Link href="/products" className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground hover:text-foreground transition-all duration-500">
                            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-3 text-primary" />
                            Return to Repository
                        </Link>
                        <div className="flex gap-6">
                            <button className="w-14 h-14 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 border border-border">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 xl:gap-32">
                        {/* Interactive Gallery */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="aspect-[3/4] relative rounded-[4rem] overflow-hidden bg-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] group">
                                <Image
                                    src={product.images[activeImage]}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
                                    priority
                                />
                                <div className="absolute top-12 left-12">
                                    <Badge variant="outline" className="bg-black/80 backdrop-blur-2xl text-primary py-2 px-6 rounded-full border-primary/30 shadow-2xl text-[10px] tracking-[0.4em] font-black uppercase italic">
                                        Certified Archive
                                    </Badge>
                                </div>
                            </div>

                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-8">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImage(i)}
                                            className={`aspect-[3/4] relative rounded-[2rem] overflow-hidden transition-all duration-700 hover:scale-105 ${activeImage === i
                                                ? 'ring-4 ring-primary ring-offset-8 ring-offset-background'
                                                : 'opacity-40 hover:opacity-100 border border-border'}`}
                                        >
                                            <Image src={img} alt={`${product.name} selection ${i}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Order Configuration */}
                        <div className="lg:col-span-5 flex flex-col pt-8">
                            <div className="space-y-12 pb-16 border-b border-border">
                                <div className="space-y-6">
                                    <Badge variant="outline" className="border-primary/20 text-primary/60 py-1.5 px-6 rounded-full text-[10px] tracking-[0.6em] uppercase font-black">
                                        {product.category}
                                    </Badge>
                                    <h1 className="text-6xl md:text-[5.5rem] font-serif font-black text-foreground leading-[0.85] tracking-tighter">
                                        {product.name}.
                                    </h1>
                                </div>

                                <div className="flex items-center gap-10">
                                    <p className="text-5xl font-serif font-black text-foreground tabular-nums">
                                        <span className="text-xl font-light text-muted-foreground mr-2">$</span>
                                        {product.price.toFixed(0)}
                                    </p>
                                    <div className="h-12 w-px bg-border" />
                                    <div className="flex items-center gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                                        ))}
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-6">
                                            Aesthetic Benchmark
                                        </span>
                                    </div>
                                </div>

                                <p className="text-muted-foreground leading-[1.8] text-xl font-medium italic">
                                    {product.description}
                                </p>

                                <ul className="grid grid-cols-1 gap-5">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] text-foreground/70 group">
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary/20 transition-all duration-500 group-hover:bg-primary group-hover:scale-150" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="py-16 space-y-14">
                                {/* Configuration */}
                                <div className="grid grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Volume Archive</h4>
                                        <div className="flex items-center bg-black/5 rounded-[2rem] p-1.5 w-fit border border-black/5">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-14 h-14 flex items-center justify-center text-foreground hover:bg-black hover:text-white rounded-[1.5rem] transition-all duration-500"
                                            >
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <span className="w-14 text-center font-black text-lg text-foreground tabular-nums">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-14 h-14 flex items-center justify-center text-foreground hover:bg-black hover:text-white rounded-[1.5rem] transition-all duration-500"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Aesthetic Tone</h4>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-black/5 border border-black/5 rounded-[2rem] h-16 px-8 appearance-none text-[11px] font-black uppercase tracking-[0.2em] outline-none focus:ring-8 focus:ring-primary/5 italic"
                                                value={selectedColor}
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                            >
                                                <option value="">Spectral Choice</option>
                                                {product.colors.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Sizes */}
                                {product.sizes.length > 1 && (
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-center border-b border-border pb-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Dimensional Index</h4>
                                            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:tracking-[0.5em] transition-all duration-500">Guideline Vault</button>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`w-18 h-18 rounded-[1.5rem] border-2 transition-all duration-500 font-black text-[11px] uppercase tracking-tighter ${selectedSize === size
                                                        ? 'bg-black border-black text-white shadow-[0_25px_50px_rgba(0,0,0,0.2)] scale-110'
                                                        : 'border-border text-muted-foreground hover:border-black hover:text-foreground'}`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Main Actions */}
                                <div className="flex gap-6">
                                    <Button
                                        onClick={handleAddToCart}
                                        variant="gold"
                                        className="flex-grow h-24 rounded-[2rem] text-[11px] uppercase font-black tracking-[0.5em] transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_45px_90px_rgba(197,160,89,0.3)]"
                                    >
                                        Acquire for Archive <ArrowRight className="w-5 h-5 ml-4" />
                                    </Button>
                                    <Button
                                        onClick={toggleWishlist}
                                        variant="outline"
                                        className={`w-24 h-24 rounded-[2rem] flex items-center justify-center border-border transition-all duration-700 ${isProductInWishlist ? 'bg-primary text-black border-primary shadow-2xl shadow-primary/40' : 'hover:bg-black hover:text-white'}`}
                                    >
                                        <Heart className={`w-6 h-6 ${isProductInWishlist ? 'fill-current' : ''}`} />
                                    </Button>
                                </div>
                            </div>

                            {/* Trust Footnotes */}
                            <div className="mt-auto grid grid-cols-2 gap-12 pt-12 border-t border-border">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-black/5 flex items-center justify-center text-primary border border-black/5">
                                        <Truck className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="text-[10px] font-black text-foreground tracking-[0.3em] uppercase leading-none">Global Dispatch</h5>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold italic">Expedited Logistics</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-black/5 flex items-center justify-center text-primary border border-black/5">
                                        <ShieldCheck className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="text-[10px] font-black text-foreground tracking-[0.3em] uppercase leading-none">Maison Vault</h5>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold italic">Secure Holdings</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Curation */}
                    <div className="pt-56">
                        <div className="flex flex-col items-center text-center space-y-8 mb-24">
                            <Badge variant="outline" className="border-primary/30 text-primary py-1.5 px-6 rounded-full text-[10px] tracking-[0.6em] uppercase font-black italic">The Narrative Continued</Badge>
                            <h2 className="text-7xl font-serif font-black text-foreground tracking-tighter">Synchronous Objects.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function ChevronDown(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}
