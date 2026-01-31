'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          {/* Background Gradient & Pattern */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(194,120,97,0.15),transparent_70%)]"
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          </div>

          <div className="container-custom py-20 md:py-32">
            <div className="max-w-3xl space-y-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-medium tracking-[0.2em] uppercase text-sm block"
              >
                New Collection 2026
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="leading-tight"
              >
                Curated Luxury for the <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent italic">Modern Individual</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-stone-400 text-lg md:text-xl max-w-xl leading-relaxed"
              >
                Experience the perfect blend of minimalist design and premium craftsmanship.
                Discover items that define your lifestyle.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="/products" className="btn-primary btn-lg group">
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/products?category=featured" className="btn-secondary btn-lg">
                  Explore Featured
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Abstract geometric element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 0.2, scale: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-1/2 aspect-square glass rounded-full border-white/5"
          />
        </section>

        {/* Stats / Proof */}
        <section className="py-12 border-y border-stone-800 bg-stone-900/20">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'On orders over $200' },
                { icon: ShieldCheck, label: 'Secure Payment', sub: '100% encrypted' },
                { icon: Star, label: 'Premium Quality', sub: 'Handpicked items' },
                { icon: ShieldCheck, label: '2 Year Warranty', sub: 'On all accessories' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <div className="p-3 bg-stone-900 rounded-full text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold">{item.label}</h4>
                  <p className="text-xs text-stone-500">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="py-24 container-custom">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl">Featured Essentials</h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>
            <Link href="/products" className="link flex items-center gap-2 group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="product-grid">
            {FEATURED_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  featured={product.featured}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto glass p-12 md:p-20 text-center space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />
            <h2 className="text-3xl md:text-5xl">Join the Inner Circle</h2>
            <p className="text-stone-400 max-w-2xl mx-auto text-lg">
              Subscribe to stay updated on new releases, exclusive events, and lifestyle inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow focus:ring-primary/30"
              />
              <button className="btn-primary">Subscribe</button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

