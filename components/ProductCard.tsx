'use client';

import Image from 'next/image';
import { ShoppingCart, Eye, Star, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState } from 'react';
import QuickViewModal from './QuickViewModal';
import Link from 'next/link';
import { useHapticFeedback } from '@/lib/haptics';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    category: string;
    featured?: boolean;
    description?: string;
    details?: string[];
    priority?: boolean;
}

export default function ProductCard({ id, name, slug, price, image, category, featured, description, details, priority = false }: ProductCardProps) {
    const router = useRouter();
    const { playClick, playHover } = useHapticFeedback();
    const { addItem } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [quickViewOpen, setQuickViewOpen] = useState(false);

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { damping: 20, stiffness: 150 });
    const mouseYSpring = useSpring(y, { damping: 20, stiffness: 150 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: '',
            productId: id,
            name,
            price,
            image,
            quantity: 1,
        });
    };

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInWishlist(id)) {
            removeFromWishlist(id);
        } else {
            addToWishlist({ id, name, slug, price, image, category });
        }
    };

    return (
        <>
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => {
                    playHover();
                    router.prefetch(`/products/${slug}`);
                }}
                className="group relative h-full perspective-1000"
            >
                <div className="card-hover overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(194,120,97,0.15)] group-hover:border-primary/20 bg-stone-900/40 backdrop-blur-sm border border-white/5 rounded-2xl">
                    {/* Image Container */}
                    <div className="img-container aspect-[4/5] img-hover-zoom relative flex-shrink-0">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            priority={priority}
                        />

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center gap-4 z-20">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="flex gap-3"
                            >
                                <button
                                    onClick={() => { playClick(); setQuickViewOpen(true); }}
                                    className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-stone-950 transition-colors"
                                    title="Quick View"
                                    onMouseEnter={playHover}
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-stone-950 transition-colors"
                                    title="Add to Bag"
                                    onMouseEnter={playHover}
                                    onMouseDown={playClick}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                </button>
                            </motion.div>
                        </div>

                        {/* Wishlist Button */}
                        <button
                            onClick={toggleWishlist}
                            className={`absolute top-4 right-4 z-30 p-2 rounded-full glass border-white/10 transition-all duration-300 ${isInWishlist(id) ? 'text-primary fill-primary scale-110' : 'text-white hover:scale-110'
                                }`}
                            onMouseEnter={playHover}
                            onMouseDown={playClick}
                        >
                            <Heart className={`w-4 h-4 ${isInWishlist(id) ? 'fill-primary' : ''}`} />
                        </button>

                        {/* Badges */}
                        {featured && (
                            <div className="absolute top-4 left-4 z-10">
                                <span className="badge-featured flex items-center gap-1 shadow-lg bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                    <Star className="w-3 h-3 fill-primary" />
                                    Featured
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow p-5 space-y-3 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
                        <div>
                            <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-semibold mb-1">{category}</p>
                            <Link href={`/products/${slug}`}>
                                <h3 className="text-lg font-display font-medium group-hover:text-primary transition-colors line-clamp-2 leading-tight">{name}</h3>
                            </Link>

                            {/* Data-Rich Product Details */}
                            {details && details.length > 0 && (
                                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    {details.slice(0, 3).map((detail, idx) => (
                                        <span key={idx} className="text-[9px] uppercase tracking-widest flex items-center gap-1 whitespace-nowrap bg-white/5 px-1.5 py-0.5 rounded-sm">
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="pt-4 flex justify-between items-center border-t border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">Price</span>
                                <p className="font-display font-semibold text-xl text-primary">${price.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="btn-primary btn-sm rounded-xl px-4 py-2"
                            >
                                Add +
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <QuickViewModal
                isOpen={quickViewOpen}
                onClose={() => setQuickViewOpen(false)}
                product={{ id, name, slug, price, image, category, featured, description }}
            />
        </>
    );
}
