import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';
import { downloadDistZip } from '../utils/downloadZip';

interface NavbarProps {
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf9f5]/95 dark:bg-[#090a0c]/95 backdrop-blur-xl border-b border-[#747878]/15 dark:border-white/10 shadow-xs'
          : 'bg-[#faf9f5]/90 dark:bg-[#090a0c]/90 backdrop-blur-md border-b border-[#747878]/10 dark:border-white/10'
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#22C55E] origin-left pointer-events-none z-50"
      />

      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand & Availability Status */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#"
            className="text-lg sm:text-xl font-medium tracking-tighter text-[#1b1c1a] dark:text-white uppercase flex items-center gap-1 font-['Space_Grotesk'] group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            SENKU<span className="text-[#22C55E] group-hover:scale-125 transition-transform duration-200">.</span>
          </a>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10 text-xs text-[#006e2f] dark:text-[#4ade80] font-['JetBrains_Mono']">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
            </span>
            <span>{PORTFOLIO_DATA.developer.availability}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10 font-['JetBrains_Mono'] text-xs uppercase tracking-widest"
          aria-label="Main Navigation"
        >
          <a
            href="#work"
            onClick={(e) => scrollToSection(e, 'work')}
            className="transition-colors duration-200 text-[#1b1c1a] dark:text-white hover:text-[#22C55E] dark:hover:text-[#22C55E] relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#22C55E] hover:after:w-full after:transition-all"
          >
            Work
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            className="transition-colors duration-200 text-[#444748] dark:text-[#d1d5db] hover:text-[#1b1c1a] dark:hover:text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1b1c1a] dark:after:bg-white hover:after:w-full after:transition-all"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => scrollToSection(e, 'skills')}
            className="transition-colors duration-200 text-[#444748] dark:text-[#d1d5db] hover:text-[#1b1c1a] dark:hover:text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1b1c1a] dark:after:bg-white hover:after:w-full after:transition-all"
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="transition-colors duration-200 text-[#444748] dark:text-[#d1d5db] hover:text-[#1b1c1a] dark:hover:text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1b1c1a] dark:after:bg-white hover:after:w-full after:transition-all"
          >
            Contact
          </a>
        </nav>

        {/* Action Controls: Theme Toggle + Contact Button + Mobile Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick ZIP Export Button */}
          <button
            type="button"
            onClick={downloadDistZip}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#006e2f] dark:text-[#4ade80] hover:bg-[#22C55E] hover:text-black font-['JetBrains_Mono'] text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            title="Download ZIP with latest features (for Netlify/hosting)"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            <span>Get ZIP</span>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Quick Contact Button */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#000000] dark:bg-white text-white dark:text-black hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black transition-all duration-200 shadow-sm active:scale-95"
            aria-label="Jump to Contact section"
            title="Let's talk"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/20 dark:border-white/10 text-[#1b1c1a] dark:text-white hover:bg-[#efeeea] dark:hover:bg-[#212328] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf9f5] dark:bg-[#090a0c] border-b border-[#747878]/15 dark:border-white/10 px-6 py-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-4 font-['JetBrains_Mono'] text-sm tracking-wider uppercase">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#747878]/15 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs text-[#006e2f] dark:text-[#4ade80]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span>Available for projects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#747878] dark:text-[#9ca3af]">Theme</span>
                <ThemeToggle showLabel />
              </div>
            </div>

            <a
              href="#work"
              onClick={(e) => scrollToSection(e, 'work')}
              className="py-2 text-[#1b1c1a] dark:text-white hover:text-[#22C55E] transition-colors flex items-center justify-between"
            >
              <span>Work</span>
              <span className="text-xs text-[#444748] dark:text-[#9ca3af]">01</span>
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="py-2 text-[#444748] dark:text-[#d1d5db] hover:text-[#1b1c1a] dark:hover:text-white transition-colors flex items-center justify-between"
            >
              <span>About</span>
              <span className="text-xs text-[#444748] dark:text-[#9ca3af]">02</span>
            </a>
            <a
              href="#skills"
              onClick={(e) => scrollToSection(e, 'skills')}
              className="py-2 text-[#444748] dark:text-[#d1d5db] hover:text-[#1b1c1a] dark:hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Skills & Services</span>
              <span className="text-xs text-[#444748] dark:text-[#9ca3af]">03</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="py-2 text-[#444748] dark:text-[#d1d5db] hover:text-[#1b1c1a] dark:hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Contact</span>
              <span className="text-xs text-[#444748] dark:text-[#9ca3af]">04</span>
            </a>

            <div className="pt-4 border-t border-[#747878]/15 dark:border-white/10 flex gap-3">
              <a
                href={PORTFOLIO_DATA.developer.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-[#000000] dark:bg-white text-white dark:text-black text-center text-xs rounded hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black transition-colors font-medium"
              >
                Telegram
              </a>
              <a
                href={PORTFOLIO_DATA.developer.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 border border-[#747878]/30 dark:border-white/20 text-center text-xs text-[#1b1c1a] dark:text-white rounded hover:border-[#1b1c1a] dark:hover:border-white transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
