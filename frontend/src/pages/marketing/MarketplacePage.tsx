import React from 'react';
import { ShoppingBag, Star, Package, ArrowUpRight } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const products = [
  {
    id: '1',
    name: 'Nexus EA - Pro',
    category: 'Trading Bot',
    price: '$129',
    rating: 4.9,
    reviews: 124,
    description: 'High-frequency algorithmic trading system for MQL5 with built-in risk management and optimized for low-latency execution.',
    tags: ['MQL5', 'Trading', 'Automation']
  },
  {
    id: '2',
    name: 'Auto-Doc Workflow',
    category: 'n8n Template',
    price: '$49',
    rating: 4.8,
    reviews: 86,
    description: 'Complete n8n workflow for generating professional technical documentation from codebases. Supports multiple output formats.',
    tags: ['n8n', 'DevOps', 'Utility']
  },
  {
    id: '3',
    name: 'CyberScan CLI',
    category: 'Security Tool',
    price: 'Free / OS',
    rating: 5.0,
    reviews: 215,
    description: 'A lightweight Python-based port and vulnerability scanner for network diagnostics. Open-source and highly extensible.',
    tags: ['Python', 'Security', 'Open Source']
  }
];

const MarketplacePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-body">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-earth-rusty/10 rounded-full text-earth-rusty text-[10px] font-black font-accent uppercase tracking-[0.3em] mb-6 border border-earth-rusty/10">
              <ShoppingBag className="h-3 w-3" />
              <span>Digital Products</span>
            </div>
            <h1 className="text-5xl font-black font-heading text-earth-rusty dark:text-white sm:text-7xl tracking-tighter transition-colors duration-300">
              Nexus Shop
            </h1>
            <p className="mt-6 text-xl text-earth-moss dark:text-earth-tan/80 max-w-2xl transition-colors duration-300 font-medium leading-relaxed">
              Acquire production-grade technical tools, trading systems, and automation workflows.
            </p>
          </div>
          
          <div className="flex gap-6">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-earth-tan/10 text-center shadow-sm min-w-[140px] transition-colors">
              <span className="block text-3xl font-black font-display text-earth-rusty transition-colors">15+</span>
              <span className="text-[10px] font-bold font-accent uppercase text-earth-moss dark:text-earth-tan/60 tracking-[0.2em] mt-1">Products</span>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-earth-tan/10 text-center shadow-sm min-w-[140px] transition-colors">
              <span className="block text-3xl font-black font-display text-earth-rusty transition-colors">1.2k</span>
              <span className="text-[10px] font-bold font-accent uppercase text-earth-moss dark:text-earth-tan/60 tracking-[0.2em] mt-1">Users</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden border border-earth-tan/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="h-56 bg-earth-cream dark:bg-earth-dark relative overflow-hidden flex items-center justify-center transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-earth-rusty/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Package className="h-24 w-24 text-earth-rusty/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700" />
                <div className="absolute top-8 right-8">
                  <span className="px-5 py-2.5 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-xl rounded-full text-earth-rusty font-black font-accent text-sm shadow-xl border border-earth-tan/10">
                    {product.price}
                  </span>
                </div>
              </div>
              
              <div className="p-12">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-earth-tan/10 rounded-md text-[10px] font-black font-accent text-earth-tan uppercase tracking-widest">{product.category}</span>
                  <div className="flex items-center text-yellow-500 text-xs font-black font-accent">
                    <Star className="h-3 w-3 fill-current mr-1" />
                    {product.rating}
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-5 group-hover:text-earth-rusty transition-colors leading-tight">
                  {product.name}
                </h3>
                
                <p className="text-earth-moss dark:text-earth-tan/60 text-sm leading-relaxed mb-10 font-medium transition-colors">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-12">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-earth-cream/40 dark:bg-earth-dark/40 text-earth-moss dark:text-earth-tan/80 text-[10px] font-bold font-mono rounded-lg transition-colors uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-center gap-2 py-5 bg-earth-rusty text-white font-black font-accent text-xs uppercase tracking-[0.2em] rounded-[1.5rem] hover:bg-earth-rusty/90 shadow-xl shadow-earth-rusty/20 group-hover:shadow-earth-rusty/40 hover:-translate-y-0.5 transition-all duration-300">
                  <span>Get Started</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MarketplacePage;
