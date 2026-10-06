import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useNavigation, PageId } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { currentPage, navigateTo } = useNavigation();
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'work', label: t.nav.work },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

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
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="font-['Space_Grotesk'] text-base font-semibold text-[#1b1c1a] dark:text-white tracking-tight cursor-pointer flex items-center gap-1"
          >
            SENKU{(language === 'ja' || language === 'zh') ? <span className="text-xs normal-case font-normal text-[#747878] dark:text-[#9ca3af] font-['JetBrains_Mono']">千空</span> : ''}<span className="text-[#22C55E]">.</span>
          </button>
          <span className="hidden sm:inline text-[#747878] dark:text-[#9ca3af]">·</span>
          <span>© 2026 {t.footer.rights}</span>
        </div>

        {/* Footer Navigation & Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-['JetBrains_Mono'] text-xs">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => navigateTo(link.id)}
              className={`transition-colors cursor-pointer ${
                currentPage === link.id
                  ? 'text-[#22C55E] font-bold'
                  : 'hover:text-[#1b1c1a] dark:hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}

          <span className="text-[#747878]/30 dark:text-white/20">|</span>

          <a
            href={PORTFOLIO_DATA.developer.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1b1c1a] dark:hover:text-white transition-colors"
          >
            Telegram
          </a>
          <a
            href={PORTFOLIO_DATA.developer.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1b1c1a] dark:hover:text-white transition-colors"
          >
            X (Twitter)
          </a>
        </div>

        {/* Tech Badges & Scroll to Top */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex gap-4 font-['JetBrains_Mono'] text-xs text-[#747878] dark:text-[#9ca3af]">
            <span className="uppercase tracking-widest">Solidity</span>
            <span className="uppercase tracking-widest">Rust</span>
            <span className="uppercase tracking-widest">TypeScript</span>
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
