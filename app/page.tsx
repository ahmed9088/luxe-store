'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import BrandStory from '@/components/BrandStory';
import { ArrowRight, Star, ShieldCheck, Truck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow">
        {/* Cinematic Hero Section */}
        <section className="relative min-h-[110vh] flex items-center overflow-hidden bg-black text-white">
          {/* Advanced Background Effects */}
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.15),transparent_50%)]" />
            <div className="absolute top-[10%] right-[10%] w-[50rem] h-[50rem] bg-primary/20 blur-[180px] rounded-full animate-pulse-slow" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[40rem] h-[40rem] bg-white/5 blur-[150px] rounded-full" />
          </div>

          <div className="container-custom relative z-10 py-32">
            <div className="max-w-6xl mx-auto text-center space-y-20">
              <div className="flex flex-col items-center space-y-10">
                <Badge variant="outline" className="border-primary/40 text-primary py-2 px-8 rounded-full text-[11px] tracking-[0.6em] uppercase font-black italic animate-in fade-in slide-in-from-bottom-6 duration-1000">
                  Genesis Selection — 2026
                </Badge>
                <div className="space-y-6">
                  <h1 className="text-8xl md:text-[13rem] font-serif font-black leading-[0.8] tracking-tighter animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                    Quiet <br />
                    <span className="text-primary italic font-light lowercase">Absolutism.</span>
                  </h1>
                </div>
                <p className="text-white/50 text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed font-medium italic animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-400">
                  Transcending the ephemeral. We curate for the few who find silence in the profound and meaning in the essential.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-10 pt-10 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-600">
                <Link href="/products">
                  <Button variant="gold" className="h-24 px-20 text-[11px] uppercase font-black tracking-[0.5em] group shadow-[0_30px_60px_rgba(197,160,89,0.3)] hover:scale-105 transition-all duration-700">
                    Enter the Archive
                    <ArrowRight className="ml-4 w-6 h-6 transition-transform group-hover:translate-x-4" />
                  </Button>
                </Link>
                <Link href="/products?featured=true">
                  <Button variant="outline" className="h-24 px-20 text-[11px] uppercase font-black tracking-[0.5em] border-white/10 hover:bg-white/5 bg-transparent rounded-full backdrop-blur-2xl transition-all duration-700">
                    The Editorial
                  </Button>
                </Link>
              </div>

              {/* Scroll Indicator */}
              <div className="flex flex-col items-center pt-24 animate-in fade-in duration-1000 delay-1000">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 mb-8 rotate-180 [writing-mode:vertical-lr]">Scroll</p>
                <div className="w-px h-32 bg-gradient-to-b from-primary via-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Interlude */}
        <section className="bg-background relative">
          <BrandStory />
        </section>

        {/* Curation Display */}
        <section className="py-56 container-custom relative">
          <div className="absolute -top-40 left-0 w-full text-center pointer-events-none -z-10 overflow-hidden">
            <span className="text-[30rem] font-serif font-black text-white/[0.02] leading-none select-none tracking-tighter italic">
              Legacy
            </span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-16">
            <div className="space-y-8 max-w-2xl">
              <Badge variant="outline" className="border-primary/20 text-primary py-1 px-4 rounded-full text-[9px] tracking-[0.4em] uppercase font-black italic">Signature Array — Repository Index</Badge>
              <h2 className="text-7xl md:text-9xl font-serif font-black text-foreground tracking-tighter leading-[0.85]">Material <br /><span className="text-primary italic font-light lowercase">Grammar.</span></h2>
              <p className="text-muted-foreground text-2xl font-medium max-w-lg italic">Objects that speak an ancestral language of form, void, and function.</p>
            </div>
            <Link href="/products" className="group">
              <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-foreground hover:text-primary transition-all duration-500">
                Witness Full Index <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-700 group-hover:rotate-[360deg]"><ArrowRight className="w-5 h-5" /></div>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </section>

        {/* Values Archive */}
        <section className="py-56 border-y border-white/5 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(197,160,89,0.08),transparent_40%)]" />
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
              {[
                { icon: Truck, label: 'Global Dispatch', sub: 'Calculated logistics for an uncompromising global audience.' },
                { icon: ShieldCheck, label: 'Vault Security', sub: 'End-to-end encryption and physical security for private holdings.' },
                { icon: Star, label: 'Aesthetic Audit', sub: 'Every piece survives a rigorous testament of timeless intent.' },
                { icon: Globe, label: 'Heritage Future', sub: 'A lifelong commitment to ethical and sustainable luxury.' },
              ].map((item, i) => (
                <div key={i} className="space-y-10 group">
                  <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-primary transition-all duration-1000 group-hover:bg-primary group-hover:text-black group-hover:rotate-[15deg] group-hover:shadow-[0_0_40px_rgba(197,160,89,0.3)]">
                    <item.icon className="w-9 h-9 stroke-[1]" />
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-black tracking-[0.4em] uppercase text-white border-l-2 border-primary/40 pl-6">{item.label}</h4>
                    <p className="text-base text-white/40 leading-relaxed font-medium italic pr-6">{item.sub}</p>
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
