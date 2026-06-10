import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-earth-tan/10 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a 
              href="#" 
              className="inline-flex items-center text-earth-rusty hover:text-earth-rusty/80 font-semibold text-sm transition-colors"
            >
              <Heart className="h-4 w-4 mr-1 fill-current" />
              Donate to a Dev
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1 text-center md:text-left">
            <p className="text-base text-earth-moss dark:text-earth-tan/60">
              Salim Hamza &copy; {new Date().getFullYear()} • Building the future, one block at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
