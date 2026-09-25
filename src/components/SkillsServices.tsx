import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const SkillsServices: React.FC = () => {
  return (
    <section
      className="w-full px-6 lg:px-12 py-24 bg-[#f4f4f0] dark:bg-[#111216] border-b border-[#747878]/15 dark:border-white/10 transition-colors duration-200"
      id="skills"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Services / What I Do */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest block mb-3 font-medium">
              Services
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-medium text-[#1b1c1a] dark:text-white tracking-tight mb-8">
              What I Do
            </h2>
          </motion.div>

          <div className="space-y-4">
            {PORTFOLIO_DATA.services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ x: 6 }}
                className="p-6 bg-[#faf9f5] dark:bg-[#16171c] flex items-center gap-4 border border-[#747878]/15 dark:border-white/10 hover:border-[#1b1c1a]/40 dark:hover:border-[#22C55E]/50 transition-colors duration-200 group cursor-default"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest block mb-3 font-medium">
              Expertise
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-medium text-[#1b1c1a] dark:text-white tracking-tight mb-8">
              Tech Stack
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -4 }}
                className="p-6 bg-[#faf9f5] dark:bg-[#16171c] flex flex-col items-center justify-center text-center gap-2 border border-[#747878]/15 dark:border-white/10 hover:border-[#1b1c1a]/40 dark:hover:border-[#22C55E]/50 transition-colors duration-200 group cursor-default"
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
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 p-6 bg-[#faf9f5] dark:bg-[#16171c] border border-[#747878]/15 dark:border-white/10"
          >
            <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#747878] dark:text-[#9ca3af] mb-3">
              Web3 Ecosystem Familiarity
            </div>
            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_DATA.ecosystemSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-[#f4f4f0] dark:bg-[#212328] text-[#1b1c1a] dark:text-white font-['JetBrains_Mono'] text-xs border border-[#747878]/10 dark:border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
