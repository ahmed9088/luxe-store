'use client';

import { motion } from 'framer-motion';

export function ProductSkeleton() {
    return (
        <div className="space-y-4">
            <div className="aspect-[4/5] bg-stone-900 animate-pulse rounded-3xl" />
            <div className="space-y-2 px-2">
                <div className="h-4 bg-stone-900 animate-pulse rounded w-1/3" />
                <div className="h-6 bg-stone-900 animate-pulse rounded w-3/4" />
                <div className="h-5 bg-stone-900 animate-pulse rounded w-1/4" />
            </div>
        </div>
    );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="product-grid">
            {[...Array(count)].map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
}

export function DetailSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="aspect-[4/5] bg-stone-900 animate-pulse rounded-3xl" />
            <div className="space-y-8">
                <div className="space-y-4">
                    <div className="h-4 bg-stone-900 animate-pulse rounded w-20" />
                    <div className="h-12 bg-stone-900 animate-pulse rounded w-3/4" />
                    <div className="h-10 bg-stone-900 animate-pulse rounded w-32" />
                </div>
                <div className="h-32 bg-stone-900 animate-pulse rounded-2xl" />
                <div className="space-y-4">
                    <div className="h-6 bg-stone-900 animate-pulse rounded w-24" />
                    <div className="flex gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-14 h-14 bg-stone-900 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                </div>
                <div className="h-16 bg-stone-900 animate-pulse rounded-2xl w-full" />
            </div>
        </div>
    );
}
