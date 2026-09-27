import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useNavigation } from '../context/NavigationContext';

export const SkillsPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="w-full px-6 lg:px-12 py-16 sm:py-24 bg-[#faf9f5] dark:bg-[#090a0c] transition-colors duration-200 min-h-[80vh]">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#006e2f] dark:text-[#4ade80]">
            <button
              onClick={() => navigateTo('home')}
              className="hover:underline flex items-center gap-1 cursor-pointer text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white"
            >
              <span>Home</span>
            </button>
            <span className="text-[#747878]/50">/</span>
            <span>Skills & Services</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#747878]/15 dark:border-white/10">
            <div>
              <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
                Skills & Capabilities
              </h1>
              <p className="font-['Inter'] text-base sm:text-lg text-[#444748] dark:text-[#d1d5db] max-w-xl mt-3 leading-relaxed">
                Full-spectrum technical capabilities from creative Web3 frontends and DEX integrations to Solidity smart contract development.
              </p>
            </div>

            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3.5 bg-[#000000] dark:bg-white text-white dark:text-black hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black font-['Inter'] text-sm font-medium tracking-wide transition-all duration-200 rounded flex items-center gap-2 cursor-pointer shadow-sm w-fit"
            >
              <span>Hire for a Project</span>
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </button>
          </div>
        </motion.div>

        {/* 2-Column Grid: Services + Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column: Services / What I Do */}
          <div>
            <div className="mb-6">
              <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest block mb-2 font-medium">
                Offerings
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
                What I Build
              </h2>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="p-6 bg-[#f4f4f0] dark:bg-[#16171c] flex items-center gap-4 border border-[#747878]/15 dark:border-white/10 hover:border-[#1b1c1a]/40 dark:hover:border-[#22C55E]/50 transition-colors duration-200 group cursor-default rounded-sm"
                >
                  <span className="material-symbols-outlined text-[#006e2f] dark:text-[#4ade80] group-hover:text-[#22C55E] dark:group-hover:text-[#22C55E] transition-colors text-[24px]">
                    {service.icon}
                  </span>
                  <span className="font-['Inter'] text-[15px] font-medium text-[#1b1c1a] dark:text-white">
                    {service.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Expertise / Tech Stack */}
          <div>
            <div className="mb-6">
              <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest block mb-2 font-medium">
                Technologies
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
                Core Tech Stack
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {PORTFOLIO_DATA.techStack.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="p-6 bg-[#f4f4f0] dark:bg-[#16171c] flex flex-col items-center justify-center text-center gap-2 border border-[#747878]/15 dark:border-white/10 hover:border-[#1b1c1a]/40 dark:hover:border-[#22C55E]/50 transition-colors duration-200 group cursor-default rounded-sm"
                >
                  <span className="font-['JetBrains_Mono'] text-sm sm:text-base text-[#1b1c1a] dark:text-white font-medium group-hover:text-[#22C55E] transition-colors">
                    {tech.name}
                  </span>
                  <span className="font-['Inter'] text-xs text-[#444748] dark:text-[#d1d5db]">
                    {tech.category}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Web3 Ecosystem Skills Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 p-6 bg-[#f4f4f0] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10 rounded-sm"
            >
              <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#747878] dark:text-[#9ca3af] mb-3">
                Web3 Ecosystem & Integration Familiarity
              </div>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.ecosystemSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#faf9f5] dark:bg-[#212328] text-[#1b1c1a] dark:text-white font-['JetBrains_Mono'] text-xs border border-[#747878]/10 dark:border-white/10 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="pt-8 border-t border-[#747878]/15 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigateTo('about')}
            className="flex items-center gap-2 font-['Inter'] text-sm font-medium text-[#1b1c1a] dark:text-white hover:text-[#22C55E] dark:hover:text-[#22C55E] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>About Senku</span>
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 bg-[#000000] dark:bg-white text-white dark:text-black hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black font-['Inter'] text-sm font-medium transition-all duration-200 rounded flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Proceed to Contact</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
