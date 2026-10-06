import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    handleOrEmail: '',
    projectType: 'Memecoin Website',
    message: '',
  });

  const copyToClipboard = (text: string, type: string) => {
    sound.playClick(900);
    navigator.clipboard?.writeText?.(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.handleOrEmail) return;

    // Formulate mailto draft and open client's default email composer
    const subject = encodeURIComponent(`Project Brief: ${formState.projectType} — ${formState.name}`);
    const bodyContent = `Hi Senku,

I'm reaching out regarding a project with the following brief:

• Client / Alias: ${formState.name}
• Contact Handle / Email: ${formState.handleOrEmail}
• Project Type: ${formState.projectType}

Project Scope & Timeline Details:
${formState.message || 'Looking forward to discussing scope, timeline, and pricing.'}

Best regards,
${formState.name}`;

    const mailtoUrl = `mailto:${PORTFOLIO_DATA.developer.contactEmail}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    
    // Open email composer
    window.location.href = mailtoUrl;

    // Show confirmation UI
    setFormSubmitted(true);
  };

  const handleSendViaTelegram = () => {
    if (!formState.name || !formState.handleOrEmail) return;
    const text = encodeURIComponent(`🚀 *New Project Inquiry*
• *Name:* ${formState.name}
• *Contact:* ${formState.handleOrEmail}
• *Project:* ${formState.projectType}
• *Brief:* ${formState.message || 'Looking to discuss details'}`);

    const tgUrl = `https://t.me/dragonofthe_westt?text=${text}`;
    window.open(tgUrl, '_blank', 'noopener,noreferrer');
    setFormSubmitted(true);
  };

  return (
    <section className="w-full px-6 lg:px-12 py-24 bg-[#faf9f5] dark:bg-[#090a0c] transition-colors duration-200" id="contact">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest font-medium">
            {t.contact.badge}
          </span>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
            {t.contact.title}
          </h2>

          <p className="font-['Inter'] text-lg sm:text-[18px] text-[#444748] dark:text-[#d1d5db] max-w-xl leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* Primary Contact CTAs matching design with scroll and hover animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4 w-full"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <a
              className="px-8 py-4 bg-[#000000] dark:bg-white text-white dark:text-black font-['Inter'] text-[15px] hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black transition-all duration-200 flex items-center gap-2.5 font-medium shadow-sm"
              href={PORTFOLIO_DATA.developer.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Telegram @{PORTFOLIO_DATA.developer.telegramHandle}</span>
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard(`@${PORTFOLIO_DATA.developer.telegramHandle}`, 'telegram')}
              className="mt-2 text-xs font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white flex items-center justify-center gap-1 w-full transition-colors cursor-pointer"
              title="Copy handle"
            >
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
              <span>
                {copiedType === 'telegram' ? 'Handle copied!' : 'Copy handle'}
              </span>
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <a
              className="px-8 py-4 bg-transparent text-[#1b1c1a] dark:text-white border border-[#747878]/30 dark:border-white/20 hover:border-[#1b1c1a] dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 font-['Inter'] text-[15px] transition-all duration-200 flex items-center gap-2.5 font-medium"
              href={PORTFOLIO_DATA.developer.xUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>X @{PORTFOLIO_DATA.developer.xHandle}</span>
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard(`@${PORTFOLIO_DATA.developer.xHandle}`, 'x')}
              className="mt-2 text-xs font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white flex items-center justify-center gap-1 w-full transition-colors cursor-pointer"
              title="Copy handle"
            >
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
              <span>
                {copiedType === 'x' ? 'Handle copied!' : 'Copy handle'}
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Project Brief Quick Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full max-w-xl mt-8 pt-8 border-t border-[#747878]/15 dark:border-white/10 text-left"
        >
          <div className="text-center mb-6">
            <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#747878] dark:text-[#9ca3af]">
              {t.contact.formTitle}
            </span>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-[#f4f4f0] dark:bg-[#16171c] border border-[#22C55E]/40 rounded text-center animate-in fade-in">
              <span className="material-symbols-outlined text-[#22C55E] text-3xl mb-2">
                check_circle
              </span>
              <h3 className="font-['Space_Grotesk'] text-lg font-medium text-[#1b1c1a] dark:text-white">
                {t.contact.successTitle}
              </h3>
              <p className="font-['Inter'] text-sm text-[#444748] dark:text-[#d1d5db] mt-1 mb-4">
                {t.contact.successDesc}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormState({
                    name: '',
                    handleOrEmail: '',
                    projectType: 'Memecoin Website',
                    message: '',
                  });
                }}
                className="text-xs font-['JetBrains_Mono'] text-[#1b1c1a] dark:text-white underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-['JetBrains_Mono'] text-[#444748] dark:text-[#d1d5db] uppercase tracking-wider mb-1"
                  >
                    {t.contact.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="e.g. Satoshi or Protocol Lead"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-[#16171c] border border-[#747878]/25 dark:border-white/20 rounded text-sm text-[#1b1c1a] dark:text-white placeholder-[#747878] dark:placeholder-[#71717a] focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-handle"
                    className="block text-xs font-['JetBrains_Mono'] text-[#444748] dark:text-[#d1d5db] uppercase tracking-wider mb-1"
                  >
                    {t.contact.contactLabel}
                  </label>
                  <input
                    id="contact-handle"
                    name="handleOrEmail"
                    type="text"
                    required
                    value={formState.handleOrEmail}
                    onChange={(e) =>
                      setFormState({ ...formState, handleOrEmail: e.target.value })
                    }
                    placeholder="@telegram_handle or email"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-[#16171c] border border-[#747878]/25 dark:border-white/20 rounded text-sm text-[#1b1c1a] dark:text-white placeholder-[#747878] dark:placeholder-[#71717a] focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-project-type"
                  className="block text-xs font-['JetBrains_Mono'] text-[#444748] dark:text-[#d1d5db] uppercase tracking-wider mb-1"
                >
                  {t.contact.typeLabel}
                </label>
                <select
                  id="contact-project-type"
                  name="projectType"
                  value={formState.projectType}
                  onChange={(e) =>
                    setFormState({ ...formState, projectType: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#16171c] border border-[#747878]/25 dark:border-white/20 rounded text-sm text-[#1b1c1a] dark:text-white focus:outline-none focus:border-[#22C55E]"
                >
                  <option value="Memecoin Website" className="dark:bg-[#16171c] dark:text-white">Memecoin / Token Website</option>
                  <option value="Web3 Startup Landing Page" className="dark:bg-[#16171c] dark:text-white">Web3 Startup Landing Page</option>
                  <option value="Crypto Dashboard" className="dark:bg-[#16171c] dark:text-white">Crypto Dashboard / DApp UI</option>
                  <option value="Figma to Code Implementation" className="dark:bg-[#16171c] dark:text-white">Figma to Code Implementation</option>
                  <option value="Other Frontend Development" className="dark:bg-[#16171c] dark:text-white">Other Frontend Development</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-['JetBrains_Mono'] text-[#444748] dark:text-[#d1d5db] uppercase tracking-wider mb-1"
                >
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  placeholder="Tell me a bit about your token/protocol, target launch date, or design links..."
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#16171c] border border-[#747878]/25 dark:border-white/20 rounded text-sm text-[#1b1c1a] dark:text-white placeholder-[#747878] dark:placeholder-[#71717a] focus:outline-none focus:border-[#22C55E]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full py-3 bg-[#000000] dark:bg-white text-white dark:text-black hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black font-['Inter'] text-sm font-medium transition-colors rounded cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">email</span>
                  <span>{t.contact.submitMail}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={handleSendViaTelegram}
                  className="w-full py-3 bg-[#0088cc]/15 dark:bg-[#0088cc]/25 text-[#0088cc] dark:text-[#38bdf8] border border-[#0088cc]/40 hover:bg-[#0088cc] hover:text-white dark:hover:bg-[#0088cc] dark:hover:text-white font-['Inter'] text-sm font-medium transition-colors rounded cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>{t.contact.submitTg}</span>
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
