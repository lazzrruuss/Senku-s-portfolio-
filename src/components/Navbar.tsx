import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useNavigation, PageId } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const { currentPage, navigateTo } = useNavigation();
  const { language, t } = useLanguage();

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

  const handleNavClick = (page: PageId) => {
    sound.playClick(800);
    setMobileMenuOpen(false);
    navigateTo(page);
  };

  const handleToggleSound = () => {
    const newMuted = sound.toggleMute();
    setIsMuted(newMuted);
  };

  const navLinks: { id: PageId; label: string; num: string }[] = [
    { id: 'home', label: t.nav.home, num: '00' },
    { id: 'work', label: t.nav.work, num: '01' },
    { id: 'about', label: t.nav.about, num: '02' },
    { id: 'skills', label: t.nav.skills, num: '03' },
    { id: 'contact', label: t.nav.contact, num: '04' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf9f5]/95 dark:bg-[#090a0c]/95 backdrop-blur-md border-b border-[#747878]/15 dark:border-white/10 shadow-sm'
          : 'bg-[#faf9f5]/90 dark:bg-[#090a0c]/90 backdrop-blur-md border-b border-[#747878]/10 dark:border-white/10'
      }`}
    >
      {/* Scroll Progress Bar at the top of the viewport */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-black/5 dark:bg-white/5 pointer-events-none z-50">
        <motion.div
          style={{ scaleX }}
          className="h-full bg-gradient-to-r from-[#22C55E] via-[#4ade80] to-[#22C55E] origin-left shadow-[0_0_8px_rgba(34,197,94,0.7)]"
        />
      </div>

      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand & Availability Status */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            className="text-lg sm:text-xl font-medium tracking-tighter text-[#1b1c1a] dark:text-white uppercase flex items-center gap-1 font-['Space_Grotesk'] group cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            SENKU{(language === 'ja' || language === 'zh') && (
              <span className="text-xs normal-case font-normal text-[#747878] dark:text-[#9ca3af] ml-1 tracking-normal font-['JetBrains_Mono']">
                千空
              </span>
            )}
            <span className="text-[#22C55E] group-hover:scale-125 transition-transform duration-200">.</span>
          </button>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10 text-xs text-[#006e2f] dark:text-[#4ade80] font-['JetBrains_Mono']">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
            </span>
            <span>{t.nav.available}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 font-['JetBrains_Mono'] text-xs uppercase tracking-widest"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors duration-200 relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#006e2f] dark:text-[#4ade80] font-bold after:w-full'
                    : 'text-[#444748] dark:text-[#d1d5db] hover:text-[#1b1c1a] dark:hover:text-white'
                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#22C55E] hover:after:w-full after:transition-all ${
                  isActive ? 'after:w-full' : 'after:w-0'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Search/Command Palette + Language Switcher + Sound Toggle + Theme Toggle + Contact */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Command Palette Button (⌘K) */}
          <button
            type="button"
            onClick={() => {
              sound.playClick(900);
              onOpenCommandPalette?.();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/20 dark:border-white/10 text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white hover:border-[#22C55E] transition-all cursor-pointer font-['JetBrains_Mono'] text-xs"
            title={t.nav.search}
          >
            <span className="material-symbols-outlined text-[15px]">search</span>
            <span className="text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded">⌘K</span>
          </button>

          {/* Language Switcher (EN / JA) */}
          <LanguageSwitcher />

          {/* Sound FX Toggle Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
              !isMuted
                ? 'bg-[#22C55E]/10 border-[#22C55E]/40 text-[#006e2f] dark:text-[#4ade80]'
                : 'bg-[#f4f4f0] dark:bg-[#16171c] border-[#747878]/20 dark:border-white/10 text-[#747878] dark:text-[#9ca3af]'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label="Toggle sound effects"
          >
            <span className="material-symbols-outlined text-[17px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Quick Contact Button */}
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${
              currentPage === 'contact'
                ? 'bg-[#22C55E] text-black font-bold'
                : 'bg-[#000000] dark:bg-white text-white dark:text-black hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black'
            }`}
            aria-label="Jump to Contact page"
            title="Let's talk"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/20 dark:border-white/10 text-[#1b1c1a] dark:text-white hover:bg-[#efeeea] dark:hover:bg-[#212328] transition-colors cursor-pointer"
            onClick={() => {
              sound.playClick(600);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
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
          <div className="flex flex-col gap-3 font-['JetBrains_Mono'] text-sm tracking-wider uppercase">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#747878]/15 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs text-[#006e2f] dark:text-[#4ade80]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span>{t.nav.available}</span>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher compact />
                <ThemeToggle showLabel />
              </div>
            </div>

            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`py-2 flex items-center justify-between transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'text-[#22C55E] font-bold'
                      : 'text-[#1b1c1a] dark:text-white hover:text-[#22C55E]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#747878] dark:text-[#9ca3af]">
                    {link.num}
                  </span>
                </button>
              );
            })}

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
