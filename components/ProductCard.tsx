'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    category: string;
    featured?: boolean;
}

export default function ProductCard({ id, name, slug, price, image, category, featured }: ProductCardProps) {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: Math.random().toString(36).substr(2, 9),
            productId: id,
            name,
            price,
            image,
            quantity: 1,
        });
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative"
        >
            <div className="card-hover overflow-hidden h-full flex flex-col">
                {/* Image Container */}
                <div className="img-container aspect-[4/5] img-hover-zoom relative flex-shrink-0">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ scale: 1.1 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3"
                        >
                            <Link
                                href={`/products/${slug}`}
                                className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-stone-950 transition-colors"
                                title="View Details"
                            >
                                <Eye className="w-5 h-5" />
                            </Link>
                            <button
                                onClick={handleAddToCart}
                                className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-stone-950 transition-colors"
                                title="Add to Bag"
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Badges */}
                    {featured && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="badge-featured flex items-center gap-1 shadow-lg">
                                <Star className="w-3 h-3 fill-amber-400" />
                                Featured
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-grow p-4 space-y-2 flex flex-col justify-between">
                    <div>
                        <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-medium">{category}</p>
                        <Link href={`/products/${slug}`}>
                            <h3 className="text-base font-semibold group-hover:text-primary transition-colors line-clamp-2 leading-snug">{name}</h3>
                        </Link>
                    </div>
                    <div className="pt-2 flex justify-between items-center border-t border-white/5">
                        <p className="font-display font-medium text-lg">${price.toFixed(2)}</p>
                        <button
                            onClick={handleAddToCart}
                            className="text-xs font-semibold text-primary hover:text-white transition-colors"
                        >
                            + Quick Add
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
