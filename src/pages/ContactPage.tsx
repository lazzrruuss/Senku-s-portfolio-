import React from 'react';
import { motion } from 'motion/react';
import { Contact } from '../components/Contact';
import { useNavigation } from '../context/NavigationContext';
import { CyberMotionCanvas } from '../components/CyberMotionCanvas';

export const ContactPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="relative w-full px-6 lg:px-12 py-16 sm:py-24 bg-[#faf9f5] dark:bg-[#090a0c] transition-colors duration-200 min-h-[80vh] overflow-hidden">
      {/* Background Cyber Motion Canvas */}
      <CyberMotionCanvas density="compact" interactive={true} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#006e2f] dark:text-[#4ade80]">
            <button
              onClick={() => navigateTo('home')}
              className="hover:underline flex items-center gap-1 cursor-pointer text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white"
            >
              <span>Home</span>
            </button>
            <span className="text-[#747878]/50">/</span>
            <span>Contact & Inquiries</span>
          </div>
        </motion.div>

        {/* Contact Form and Direct Messaging CTAs */}
        <Contact />

        {/* Back to Home Button */}
        <div className="mt-16 pt-8 border-t border-[#747878]/15 dark:border-white/10 flex justify-center">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 font-['Inter'] text-sm font-medium text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
