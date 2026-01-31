'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ShoppingCart, Heart, Share2, ShieldCheck, Truck, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const PRODUCTS = {
    'essential-linen-shirt': {
        id: '1',
        name: 'Essential Linen Shirt',
        price: 120.00,
        images: ['/images/linen-shirt.png'],
        category: 'Clothing',
        description: 'A breathable, high-quality white linen shirt perfect for any season. Features a relaxed fit, sustainable natural buttons, and premium stitching details.',
        features: ['100% Organic Linen', 'Breathable fabric', 'Sustainable production', 'Relaxed fit'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Off-white'],
    },
    'tan-leather-tote': {
        id: '2',
        name: 'Tan Leather Tote',
        price: 280.00,
        images: ['/images/leather-bag.png'],
        category: 'Accessories',
        description: 'A minimalist tan leather tote handcrafted from premium full-grain leather. Durable, spacious, and designed to age beautifully with time.',
        features: ['Full-grain leather', 'Handcrafted', 'Spruce interior', 'Reinforced straps'],
        sizes: ['One Size'],
        colors: ['Tan', 'Cognac'],
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
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow pt-8 pb-24">
                <div className="container-custom">
                    {/* Breadcrumbs */}
                    <motion.nav
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex text-sm text-stone-500 mb-8 items-center gap-2"
                    >
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                        <span>/</span>
                        <span className="text-stone-300 font-medium">{product.name}</span>
                    </motion.nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="aspect-[4/5] relative rounded-3xl overflow-hidden bg-stone-900 border border-white/5 shadow-2xl">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full w-full"
                                    >
                                        <Image
                                            src={product.images[activeImage]}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <div className="absolute top-6 left-6">
                                    <span className="badge-featured bg-stone-950/80 backdrop-blur-md">Exclusive</span>
                                </div>
                            </div>

                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImage(i)}
                                            className={`aspect-square relative rounded-2xl overflow-hidden bg-stone-900 border-2 transition-all ${activeImage === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        >
                                            <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col"
                        >
                            <div className="space-y-6 pb-8 border-b border-white/5">
                                <motion.div variants={itemVariants} className="space-y-3">
                                    <p className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">{product.category}</p>
                                    <h1 className="text-4xl md:text-6xl font-display leading-[1.1]">{product.name}</h1>
                                </motion.div>

                                <motion.div variants={itemVariants} className="flex items-center gap-6">
                                    <p className="text-3xl md:text-4xl font-display text-white font-medium">${product.price.toFixed(2)}</p>
                                    <div className="h-8 w-[1px] bg-white/10" />
                                    <div className="flex items-center gap-1.5 text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                        <span className="text-xs text-stone-500 ml-2 font-medium">4.9 (48 Reviews)</span>
                                    </div>
                                </motion.div>

                                <motion.p variants={itemVariants} className="text-stone-400 leading-relaxed text-lg max-w-xl">
                                    {product.description}
                                </motion.p>
                            </div>

                            {/* Selectors */}
                            <div className="py-10 space-y-10">
                                {/* Size Selector */}
                                {product.sizes.length > 1 && (
                                    <motion.div variants={itemVariants} className="space-y-5">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-300">Select Size</h4>
                                            <button className="text-xs text-stone-500 hover:text-primary transition-colors">Size Guide</button>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`w-14 h-14 rounded-2xl border-2 text-sm font-bold transition-all ${selectedSize === size ? 'bg-white border-white text-stone-950 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-white/10 text-stone-500 hover:border-white/30 hover:text-white'}`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Color Selector */}
                                <motion.div variants={itemVariants} className="space-y-5">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-300">Select Color</h4>
                                    <div className="flex flex-wrap gap-4">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`group flex items-center gap-3 px-5 py-3 rounded-2xl border-2 transition-all ${selectedColor === color ? 'border-primary bg-primary/5 text-white' : 'border-white/10 text-stone-500 hover:border-white/30'}`}
                                            >
                                                <div className={`w-3 h-3 rounded-full ${color.toLowerCase().includes('white') ? 'bg-white shadow-inner border border-white/20' : 'bg-stone-700'}`} />
                                                <span className="text-sm font-medium">{color}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Quantity and Actions */}
                                <motion.div variants={itemVariants} className="space-y-8 pt-4">
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                        <div className="flex items-center bg-stone-900/50 border border-white/10 rounded-2xl px-2 py-2">
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-white transition-colors">-</button>
                                            <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                                            <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-white transition-colors">+</button>
                                        </div>

                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-grow btn-primary py-5 px-8 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20"
                                        >
                                            Add to Bag — ${(product.price * quantity).toFixed(2)}
                                        </button>

                                        <button className="hidden sm:flex w-16 h-16 rounded-2xl border-2 border-white/10 items-center justify-center text-stone-400 hover:text-white hover:border-white/30 transition-all">
                                            <Heart className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="flex justify-center gap-8 text-stone-500 text-xs font-semibold tracking-widest uppercase">
                                        <button className="flex items-center gap-2 hover:text-white transition-colors">
                                            <Share2 className="w-4 h-4" /> Share
                                        </button>
                                        <button className="flex items-center gap-2 hover:text-white transition-colors">
                                            <Heart className="w-4 h-4" /> Wishlist
                                        </button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Trust Indicators */}
                            <motion.div variants={itemVariants} className="mt-auto grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-3xl bg-stone-900 flex items-center justify-center text-primary border border-white/5">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-white tracking-wide uppercase">Free Shipping</h5>
                                        <p className="text-[10px] text-stone-500">Over $200</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-3xl bg-stone-900 flex items-center justify-center text-primary border border-white/5">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-white tracking-wide uppercase">2 Year Warranty</h5>
                                        <p className="text-[10px] text-stone-500">Quality Assured</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Related Products */}
                    <div className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-display">Something you might like</h2>
                            <p className="text-stone-500">Hand-picked additions to complement your style.</p>
                        </div>
                        <div className="product-grid">
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
