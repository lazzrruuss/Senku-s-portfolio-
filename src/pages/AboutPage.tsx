import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useNavigation } from '../context/NavigationContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="w-full px-6 lg:px-12 py-16 sm:py-24 bg-[#faf9f5] dark:bg-[#090a0c] transition-colors duration-200 min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#006e2f] dark:text-[#4ade80]">
            <button
              onClick={() => navigateTo('home')}
              className="hover:underline flex items-center gap-1 cursor-pointer text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white"
            >
              <span>Home</span>
            </button>
            <span className="text-[#747878]/50">/</span>
            <span>About Senku</span>
          </div>

          <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest font-medium block mb-2">
            Engineering Profile
          </span>
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
            Building for the next wave of Web3.
          </h1>
        </motion.div>

        {/* Story & Biography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 font-['Inter'] text-lg sm:text-[19px] text-[#444748] dark:text-[#d1d5db] leading-relaxed pb-12 border-b border-[#747878]/15 dark:border-white/10"
        >
          {PORTFOLIO_DATA.developer.bioParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-12"
        >
          <div className="p-6 bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10">
            <div className="text-[11px] font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af] uppercase">Role</div>
            <div className="text-sm sm:text-base font-bold text-[#1b1c1a] dark:text-white mt-1">Frontend & Web3</div>
          </div>
          <div className="p-6 bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10">
            <div className="text-[11px] font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af] uppercase">Status</div>
            <div className="text-sm sm:text-base font-bold text-[#22C55E] mt-1">Available Now</div>
          </div>
          <div className="p-6 bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10">
            <div className="text-[11px] font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af] uppercase">Speed</div>
            <div className="text-sm sm:text-base font-bold text-[#1b1c1a] dark:text-white mt-1">24–48h Launch</div>
          </div>
          <div className="p-6 bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10">
            <div className="text-[11px] font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af] uppercase">Design</div>
            <div className="text-sm sm:text-base font-bold text-[#1b1c1a] dark:text-white mt-1">Swiss High-End</div>
          </div>
        </motion.div>

        {/* Code Principles */}
        <div className="pt-4">
          <div className="mb-8">
            <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest font-medium block mb-2">
              Philosophies
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
              Engineering Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.developer.codePrinciples.map((principle, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10 rounded-sm hover:border-[#1b1c1a]/30 dark:hover:border-white/30 transition-colors"
              >
                <div className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase mb-2 font-medium">
                  0{idx + 1} // Principle
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-medium text-[#1b1c1a] dark:text-white mb-2">
                  {principle.title}
                </h3>
                <p className="font-['Inter'] text-sm text-[#444748] dark:text-[#d1d5db] leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="mt-16 pt-8 border-t border-[#747878]/15 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigateTo('work')}
            className="flex items-center gap-2 font-['Inter'] text-sm font-medium text-[#1b1c1a] dark:text-white hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Explore Work</span>
          </button>

          <button
            onClick={() => navigateTo('skills')}
            className="px-6 py-3 bg-[#000000] dark:bg-white text-white dark:text-black hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black font-['Inter'] text-sm font-medium transition-all duration-200 rounded flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>View Skills & Stack</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
