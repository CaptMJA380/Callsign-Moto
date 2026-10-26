import React from 'react';
import { storageService } from '../../services/storageService';

export const Footer: React.FC = () => {
  const brandConfig = storageService.getBrandConfig();

  return (
    <footer className="bg-[#EBEBF0]/85 dark:bg-black/85 backdrop-blur-md border-t border-black/[0.08] dark:border-white/[0.06] text-[#86868B] text-xs py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-mono font-bold text-xs">
                CM
              </div>
              <span className="font-sans font-semibold text-sm text-[#1D1D1F] dark:text-white">
                {brandConfig.brandName}
              </span>
            </div>

            <p className="text-[#86868B] text-xs leading-relaxed max-w-sm mb-4">
              {brandConfig.subTagline}
            </p>

            <div className="text-[11px] font-mono text-[#86868B]">
              Handcrafted in India • Pan-India Courier Dispatches
            </div>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-[#1D1D1F] dark:text-white text-xs mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#86868B]">
              <li><a href="#customise" className="hover:text-black dark:hover:text-white transition-colors">Studio Customiser</a></li>
              <li><a href="#variants" className="hover:text-black dark:hover:text-white transition-colors">Lineup &amp; Editions</a></li>
              <li><a href="#built-for-your-ride" className="hover:text-black dark:hover:text-white transition-colors">Jacket Placement Guide</a></li>
              <li><a href="#faq" className="hover:text-black dark:hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-[#1D1D1F] dark:text-white text-xs mb-3">
              Legal &amp; Privacy
            </h4>
            <div className="space-y-2 text-[11px] text-[#86868B] leading-relaxed">
              <p>
                <strong>Triumph Reference:</strong> Triumph and Triumph Tiger are registered trademarks of Triumph Motorcycles Ltd. Mentioned solely as physical touring context.
              </p>
              <p>
                <strong>Privacy:</strong> Device location is only used on click to assist delivery address completion and is never permanently retained.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/[0.08] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86868B]">
          <div>
            Copyright © {brandConfig.establishedYear} {brandConfig.brandName}. All rights reserved.
          </div>
          <div>
            Minimalist engineering for touring motorcyclists.
          </div>
        </div>

      </div>
    </footer>
  );
};
