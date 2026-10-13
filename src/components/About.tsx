import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const bioParagraphs = t.about.bioParagraphs || PORTFOLIO_DATA.developer.bioParagraphs;
  const principles = t.about.principlesList || PORTFOLIO_DATA.developer.codePrinciples;

  return (
    <section className="w-full px-6 lg:px-12 py-24 bg-transparent border-b border-[#747878]/15 dark:border-white/10 transition-colors duration-200" id="about">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest font-medium">
            {t.about.badge}
          </span>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
            {t.about.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6 font-['Inter'] text-lg sm:text-[18px] text-[#444748] dark:text-[#d1d5db] leading-relaxed"
        >
          {bioParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 mt-4 border-t border-[#747878]/15 dark:border-white/10">
          {principles.map((principle, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -4 }}
              className="p-6 glass-card rounded-xl transition-all duration-200"
            >
              <div className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase mb-2 font-medium">
                0{idx + 1} // {t.about.principles}
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
    </section>
  );
};
