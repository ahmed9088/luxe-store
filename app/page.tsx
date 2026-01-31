'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import BrandStory from '@/components/BrandStory';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Essential Linen Shirt',
    slug: 'essential-linen-shirt',
    price: 120.00,
    image: '/images/linen-shirt.png',
    category: 'Clothing',
    featured: true,
    description: 'A masterpiece of minimalism, our linen shirt is crafted from the finest European flax for ultimate breathability and comfort.',
    details: ['100% French Flax', 'Breathable Weave', 'Relaxed Fit'],
    priority: true
  },
  {
    id: '2',
    name: 'Tan Leather Tote',
    slug: 'tan-leather-tote',
    price: 280.00,
    image: '/images/leather-bag.png',
    category: 'Accessories',
    featured: true,
    description: 'Handcrafted from full-grain vegetable-tanned leather, this tote is designed to age beautifully and last a lifetime.',
    details: ['Veg-Tanned Leather', 'Internal Pockets', 'Hand-Stitched'],
    priority: true
  },
  {
    id: '3',
    name: 'Silver Mesh Watch',
    slug: 'silver-mesh-watch',
    price: 185.00,
    image: '/images/silver-watch.png',
    category: 'Accessories',
    featured: true,
    description: 'Sleek, precise, and understated. Featuring a Japanese movement and surgical-grade stainless steel mesh band.',
    details: ['Japanese Quartz', '5ATM Water Resistance', 'Steel Mesh'],
    priority: true
  },
  {
    id: '4',
    name: 'Matte Charcoal Mug',
    slug: 'matte-charcoal-mug',
    price: 35.00,
    image: '/images/ceramic-mug.png',
    category: 'Lifestyle',
    featured: true,
    description: 'Hand-thrown by local artisans, each charcoal mug features a unique texture and a perfectly balanced weight.',
    details: ['Hand-Thrown Ceramic', 'Dishwasher Safe', 'Ergonomic Grip'],
    priority: true
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center overflow-hidden">
          {/* Background Gradient & Pattern */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(194,120,97,0.1),transparent_70%)]"
            />
          </div>

          <div className="container-custom relative">
            <div className="max-w-4xl space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
              >
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">
                  Spring Collection 2026
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="text-5xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter"
              >
                Curated Luxury for the <br />
                <span className="text-gradient-primary italic">Modern Mind</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-stone-400 text-lg md:text-xl max-w-xl leading-relaxed font-light"
              >
                Experience the perfect blend of minimalist design and premium craftsmanship. Hand-thrown, hand-stitched, handpicked.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="/products" className="btn-primary px-8 py-4 text-base group overflow-hidden relative">
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/products?category=featured" className="btn-secondary px-8 py-4 text-base backdrop-blur-md">
                  Explore Featured
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Abstract geometric element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 0.15, scale: 1, x: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="hidden lg:block absolute right-[-10%] top-1/2 -translate-y-1/2 w-2/3 aspect-square border border-white/5 rounded-full"
          />
        </section>

        {/* Brand Story Section */}
        <BrandStory />

        {/* Featured Products Grid */}
        <section className="py-24 md:py-32 container-custom relative">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left">
            <div className="space-y-4">
              <span className="text-stone-500 font-bold tracking-[0.3em] uppercase text-xs">Essential Selection</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Featured Pieces</h2>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {FEATURED_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  featured={product.featured}
                  description={product.description}
                  details={product.details}
                  priority={product.priority}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-y border-white/5 bg-stone-900/10 backdrop-blur-sm">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Global delivery over $200' },
                { icon: ShieldCheck, label: 'Secure Checkout', sub: 'Fully encrypted payments' },
                { icon: Star, label: 'Quality Guarantee', sub: 'Hand-picked with care' },
                { icon: ShieldCheck, label: '2 Year Warranty', sub: 'On all curated items' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-stone-900 border border-white/10 flex items-center justify-center text-primary shadow-lg">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold tracking-wide uppercase">{item.label}</h4>
                    <p className="text-xs text-stone-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
