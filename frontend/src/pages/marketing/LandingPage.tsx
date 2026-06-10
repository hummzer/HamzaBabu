import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Shield, ShoppingCart } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Digital Headquarters</span>
            <span className="block text-indigo-600">Built for Serious Software</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Nexus is a full-stack platform that combines a personal portfolio, a software marketplace, a licensing system, and project documentation under one roof.
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition-colors"
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Code className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Portfolio Showcase</h3>
                <p className="mt-2 text-gray-500">Highlighting production-grade software across systems, AI, and security.</p>
              </div>
              <div className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Software Marketplace</h3>
                <p className="mt-2 text-gray-500">Sell EAs, scripts, and AI tools with built-in version history and product pages.</p>
              </div>
              <div className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Licensing Portal</h3>
                <p className="mt-2 text-gray-500">Automated license key generation and validation for your digital products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
