import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { downloadDistZip, downloadSourceZip } from '../utils/downloadZip';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elPosition = el.getBoundingClientRect().top;
      const offset = elPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="w-full bg-[#f4f4f0] dark:bg-[#111216] py-12 border-t border-[#747878]/15 dark:border-white/10 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[#444748] dark:text-[#d1d5db] text-[13px]"
      >
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-['Space_Grotesk'] text-base font-semibold text-[#1b1c1a] dark:text-white tracking-tight">
            SENKU<span className="text-[#22C55E]">.</span>
          </span>
          <span className="hidden sm:inline text-[#747878] dark:text-[#9ca3af]">·</span>
          <span>© 2024 Senku. Built for the decentralized web.</span>
        </div>

        {/* Footer Navigation & Social Links */}
        <div className="flex items-center gap-6 font-['JetBrains_Mono'] text-xs">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('work');
            }}
            className="hover:text-[#1b1c1a] dark:hover:text-white transition-colors"
          >
            Work
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
            className="hover:text-[#1b1c1a] dark:hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
            className="hover:text-[#1b1c1a] dark:hover:text-white transition-colors"
          >
            Skills
          </a>
          <a
            href={PORTFOLIO_DATA.developer.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#22C55E] transition-colors"
          >
            Telegram
          </a>
          <a
            href={PORTFOLIO_DATA.developer.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#22C55E] transition-colors"
          >
            X
          </a>
        </div>

        {/* Tech Badges & Scroll to Top */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex gap-4 font-['JetBrains_Mono'] text-xs text-[#747878] dark:text-[#9ca3af]">
            <span className="uppercase tracking-widest">Solidity</span>
            <span className="uppercase tracking-widest">Rust</span>
            <span className="uppercase tracking-widest">TypeScript</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={downloadDistZip}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#22C55E] text-black font-['JetBrains_Mono'] text-[11px] font-semibold transition-all hover:bg-[#16a34a] active:scale-95 shadow-xs cursor-pointer"
              title="Download compiled dist bundle (Ready for Netlify Drop)"
            >
              <span className="material-symbols-outlined text-[14px]">archive</span>
              <span>dist.zip (Netlify)</span>
            </button>

            <button
              type="button"
              onClick={downloadSourceZip}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#efeeea] dark:bg-[#1e1f26] hover:bg-[#1b1c1a] dark:hover:bg-[#22C55E] hover:text-white dark:hover:text-black font-['JetBrains_Mono'] text-[11px] transition-colors text-[#1b1c1a] dark:text-white border border-[#747878]/15 dark:border-white/10 cursor-pointer"
              title="Download full TypeScript source code"
            >
              <span className="material-symbols-outlined text-[14px]">code</span>
              <span>Source .zip</span>
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-[#efeeea] dark:bg-[#1e1f26] hover:bg-[#1b1c1a] dark:hover:bg-[#22C55E] hover:text-white dark:hover:text-black flex items-center justify-center transition-colors text-[#1b1c1a] dark:text-white cursor-pointer"
            aria-label="Scroll to top"
            title="Back to top"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
};
