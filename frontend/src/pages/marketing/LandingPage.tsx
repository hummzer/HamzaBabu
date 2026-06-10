import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Shield, ShoppingCart, Sparkles } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <div className="relative font-body">
        {/* Decorative background element - Contained strictly to hero */}
        <div className="absolute top-0 left-0 w-full h-[600px] -z-10 opacity-10 dark:opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-earth-rusty rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-earth-moss rounded-full blur-[100px]"></div>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center lg:pt-32">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-earth-tan/10 rounded-full text-earth-rusty dark:text-earth-tan text-[10px] font-black font-accent uppercase tracking-[0.3em] mb-12 animate-fade-in border border-earth-tan/20">
            <Sparkles className="h-3 w-3" />
            <span>Co-Founder @ 33 Solutions</span>
          </div>
          
          <h1 className="text-6xl tracking-tighter font-black font-heading text-gray-900 dark:text-white sm:text-8xl md:text-9xl transition-colors duration-300 leading-[0.9] mb-8">
            <span className="block">DIGITAL</span>
            <span className="block text-earth-rusty">HEADQUARTERS</span>
          </h1>
          
          <p className="mt-12 max-w-2xl mx-auto text-lg text-earth-moss dark:text-earth-tan/70 sm:text-xl font-medium leading-relaxed transition-colors duration-300">
            Building world-class open-source ecosystems. Nexus is the central hub for my <strong>portfolio, software marketplace, and technical documentation</strong>.
          </p>
          
          <div className="mt-16 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/projects"
              className="group inline-flex items-center px-10 py-5 border border-transparent text-[11px] font-black font-accent uppercase tracking-widest rounded-full text-white bg-earth-rusty hover:bg-earth-rusty/90 shadow-2xl hover:shadow-earth-rusty/40 hover:-translate-y-1 transition-all duration-300"
            >
              Explore Ecosystem
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center px-10 py-5 border-2 border-earth-tan/20 text-[11px] font-black font-accent uppercase tracking-widest rounded-full text-earth-moss dark:text-earth-tan bg-transparent hover:bg-earth-tan/5 transition-all duration-300"
            >
              Visit the Shop
            </Link>
          </div>
        </div>

        {/* Value Proposition Grid */}
        <div className="bg-white/30 dark:bg-zinc-900/30 backdrop-blur-md py-32 border-y border-earth-tan/10 transition-colors duration-300 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3 text-left">
              <div className="p-10 bg-white/50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-earth-tan/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="p-5 bg-earth-cream dark:bg-earth-dark rounded-3xl w-fit mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <Code className="h-7 w-7 text-earth-rusty" />
                </div>
                <h3 className="text-2xl font-black font-display text-gray-900 dark:text-white mb-5 tracking-tight transition-colors">Production-Grade</h3>
                <p className="text-earth-moss dark:text-earth-tan/60 font-medium leading-relaxed text-sm transition-colors">
                  Every project in the Nexus ecosystem is built with a focus on stability, scalability, and clean system architecture.
                </p>
              </div>
              
              <div className="p-10 bg-white/50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-earth-tan/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group text-center md:text-left">
                <div className="p-5 bg-earth-cream dark:bg-earth-dark rounded-3xl w-fit mb-8 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <ShoppingCart className="h-7 w-7 text-earth-rusty" />
                </div>
                <h3 className="text-2xl font-black font-display text-gray-900 dark:text-white mb-5 tracking-tight transition-colors">Marketplace</h3>
                <p className="text-earth-moss dark:text-earth-tan/60 font-medium leading-relaxed text-sm transition-colors">
                  A dedicated space for high-quality digital products, including trading tools, automation scripts, and custom APIs.
                </p>
              </div>
              
              <div className="p-10 bg-white/50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-earth-tan/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group text-right md:text-left">
                <div className="p-5 bg-earth-cream dark:bg-earth-dark rounded-3xl w-fit mb-8 ml-auto md:ml-0 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <Shield className="h-7 w-7 text-earth-rusty" />
                </div>
                <h3 className="text-2xl font-black font-display text-gray-900 dark:text-white mb-5 tracking-tight transition-colors">Secure Licensing</h3>
                <p className="text-earth-moss dark:text-earth-tan/60 font-medium leading-relaxed text-sm transition-colors">
                  Integrated automated licensing system ensures your purchased tools are always verified and up to date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
