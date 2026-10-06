import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('overview');
  const [copiedContract, setCopiedContract] = useState(false);
  const [simulatedGasAmount, setSimulatedGasAmount] = useState(12);
  const [readProgress, setReadProgress] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate scroll progress percentage through the project description
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollHeight - target.clientHeight;
    if (maxScroll <= 0) {
      setReadProgress(100);
      return;
    }
    const current = target.scrollTop;
    const percentage = Math.min(100, Math.max(0, Math.round((current / maxScroll) * 100)));
    setReadProgress(percentage);
  };

  // Reset scroll position and progress when project or tab changes
  useEffect(() => {
    setReadProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      // Check if content fits in container without scrolling
      const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
      if (maxScroll <= 10) {
        setReadProgress(100);
      }
    }
  }, [project?.id, activeTab]);

  // Recalculate on initial render or resize
  useEffect(() => {
    if (!project) return;
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const target = scrollContainerRef.current;
        const maxScroll = target.scrollHeight - target.clientHeight;
        if (maxScroll <= 0) {
          setReadProgress(100);
        } else {
          setReadProgress(Math.min(100, Math.max(0, Math.round((target.scrollTop / maxScroll) * 100))));
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [project, activeTab]);

  if (!project) return null;

  const mockContractAddress = '0x71C...392F8e5';

  const handleCopyContract = () => {
    navigator.clipboard?.writeText?.(mockContractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el && scrollContainerRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* 1. SCROLL-PROGRESS INDICATOR BAR AT THE TOP OF THE VIEWPORT */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] h-[3.5px] bg-black/25 dark:bg-white/10 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#22C55E] via-[#4ade80] to-[#22C55E] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(34,197,94,0.95)] relative"
          style={{ width: `${readProgress}%` }}
        >
          {/* Glowing lead tip on the progress bar */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>

      {/* 2. VIEWPORT READING STATUS FEEDBACK PILL (TOP CENTER) */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="fixed top-3 left-1/2 -translate-x-1/2 z-[101] px-4 py-1.5 rounded-full bg-[#111216]/95 border border-[#22C55E]/40 text-[11px] font-['JetBrains_Mono'] text-white flex items-center gap-2.5 shadow-2xl backdrop-blur-md pointer-events-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-white/80 uppercase tracking-wider font-medium truncate max-w-[140px] sm:max-w-xs">
            {project.title}
          </span>
          <span className="text-white/40 font-mono">|</span>
          <span className="text-[#22C55E] font-bold tracking-tight">
            {readProgress >= 99 ? '✓ 100% READ' : `${readProgress}% READ`}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* 3. MODAL OVERLAY */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="bg-[#faf9f5] dark:bg-[#121316] border border-[#747878]/25 dark:border-white/15 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col transition-colors duration-200 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Synchronized Header Top Progress Bar */}
          <div className="sticky top-0 left-0 right-0 z-20 h-[2.5px] bg-[#747878]/10 dark:bg-white/5 pointer-events-none">
            <div
              className="h-full bg-[#22C55E] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(34,197,94,0.7)]"
              style={{ width: `${readProgress}%` }}
            />
          </div>

          {/* Header Bar */}
          <div className="p-6 border-b border-[#747878]/15 dark:border-white/10 flex items-start justify-between bg-[#f4f4f0] dark:bg-[#18191e] sticky top-[2.5px] z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 bg-[#efeeea] dark:bg-[#212328] border border-[#747878]/20 dark:border-white/10 font-['JetBrains_Mono'] text-xs uppercase text-[#444748] dark:text-[#d1d5db]">
                  {project.badge}
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#747878] dark:text-[#9ca3af]">
                  {project.number}
                </span>
                <span className="text-[11px] font-['JetBrains_Mono'] text-[#006e2f] dark:text-[#4ade80] bg-[#22C55E]/10 px-2 py-0.5 rounded">
                  {readProgress}% READ
                </span>
              </div>
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-medium font-['Space_Grotesk'] text-[#1b1c1a] dark:text-white"
              >
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-['JetBrains_Mono'] text-[#006e2f] dark:text-[#4ade80] uppercase tracking-wider mt-1">
                {project.category} · {project.year}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#efeeea] dark:bg-[#212328] hover:bg-[#1b1c1a] dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors flex items-center justify-center text-[#1b1c1a] dark:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Tab Navigation & Quick Jump */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#747878]/15 dark:border-white/10 px-6 bg-[#faf9f5] dark:bg-[#121316]">
            <div className="flex">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 font-['JetBrains_Mono'] text-xs uppercase tracking-wider border-b-2 font-medium transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-[#22C55E] text-[#1b1c1a] dark:text-white'
                    : 'border-transparent text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white'
                }`}
              >
                Project Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('interactive')}
                className={`py-3 px-4 font-['JetBrains_Mono'] text-xs uppercase tracking-wider border-b-2 font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'border-[#22C55E] text-[#1b1c1a] dark:text-white'
                    : 'border-transparent text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                Interactive Demo Preview
              </button>
            </div>

            {/* Quick jump navigation for description sections */}
            {activeTab === 'overview' && (
              <div className="hidden sm:flex items-center gap-2 py-2 text-[11px] font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af]">
                <span>Jump:</span>
                <button
                  type="button"
                  onClick={() => scrollToSection('section-about')}
                  className="hover:text-[#22C55E] transition-colors cursor-pointer"
                >
                  About
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => scrollToSection('section-features')}
                  className="hover:text-[#22C55E] transition-colors cursor-pointer"
                >
                  Features
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => scrollToSection('section-tech')}
                  className="hover:text-[#22C55E] transition-colors cursor-pointer"
                >
                  Tech
                </button>
              </div>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {activeTab === 'overview' ? (
              <>
                {/* Detailed Description */}
                <div id="section-about">
                  <h4 className="font-['Space_Grotesk'] text-lg font-medium text-[#1b1c1a] dark:text-white mb-2">
                    About this project
                  </h4>
                  <p className="text-[#444748] dark:text-[#d1d5db] font-['Inter'] leading-relaxed">
                    {project.detailedDescription}
                  </p>
                </div>

                {/* Highlights & Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#f4f4f0] dark:bg-[#18191e] border border-[#747878]/15 dark:border-white/10 rounded text-center"
                    >
                      <div className="text-[11px] font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af] uppercase mb-1">
                        {h.label}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-[#1b1c1a] dark:text-white font-['Space_Grotesk']">
                        {h.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Features List */}
                <div id="section-features">
                  <h4 className="font-['Space_Grotesk'] text-sm uppercase tracking-wider font-medium text-[#1b1c1a] dark:text-white mb-3">
                    Key Frontend Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 bg-white dark:bg-[#18191e] border border-[#747878]/15 dark:border-white/10 rounded text-sm text-[#1b1c1a] dark:text-white"
                      >
                        <span className="material-symbols-outlined text-[#22C55E] text-[18px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div id="section-tech">
                  <h4 className="font-['Space_Grotesk'] text-sm uppercase tracking-wider font-medium text-[#1b1c1a] dark:text-white mb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#efeeea] dark:bg-[#212328] font-['JetBrains_Mono'] text-xs text-[#1b1c1a] dark:text-white rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Interactive Simulation Tab */
              <div className="space-y-6">
                <div className="p-4 bg-[#111111] dark:bg-[#0c0d10] text-white rounded-lg border border-white/10 dark:border-white/20 font-['JetBrains_Mono']">
                  <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                      <span className="text-white/80">{project.title.toUpperCase()} // SANDBOX</span>
                    </div>
                    <span className="text-[#22C55E] text-[10px] bg-[#22C55E]/15 px-2 py-0.5 rounded">
                      INTERACTIVE PROTOTYPE
                    </span>
                  </div>

                  {project.id === 'grim-memecoin' && (
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded border border-white/10">
                        <div className="text-xs text-white/60 mb-1">Contract Address</div>
                        <div className="flex items-center justify-between gap-2 bg-black/40 p-2 rounded">
                          <span className="text-xs text-[#22C55E] font-mono">
                            0xGRIM...42069
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText?.('0xGRIM...42069');
                              setCopiedContract(true);
                              setTimeout(() => setCopiedContract(false), 2000);
                            }}
                            className="px-2 py-1 bg-white/10 hover:bg-[#22C55E] hover:text-black text-[10px] rounded transition-colors cursor-pointer"
                          >
                            {copiedContract ? 'COPIED!' : 'COPY'}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-3 bg-white/5 rounded">
                          <div className="text-[10px] text-white/50">TOTAL SUPPLY</div>
                          <div className="text-xs font-bold text-white mt-1">1,000,000,000</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded">
                          <div className="text-[10px] text-white/50">COMMUNITY LP</div>
                          <div className="text-xs font-bold text-[#22C55E] mt-1">100% Fair</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded">
                          <div className="text-[10px] text-white/50">MEME LAB</div>
                          <div className="text-xs font-bold text-white mt-1">Active Terminal</div>
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 rounded text-xs text-white/80 flex items-center justify-between">
                        <span>⚡ Live Web3 Terminal & Portal</span>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#22C55E] underline flex items-center gap-1 font-bold"
                        >
                          <span>Open Live Terminal</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {project.id === 'pepeak-memecoin' && (
                    <div className="space-y-4">
                      <div className="text-xs text-white/70">
                        Summit-Themed Tokenomics & Viral Mechanics
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                          <div className="text-[10px] text-white/50">THEME</div>
                          <div className="text-xs text-[#22C55E] font-bold mt-1">The Summit</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                          <div className="text-[10px] text-white/50">BUY / SELL TAX</div>
                          <div className="text-xs text-[#22C55E] font-bold mt-1">0% / 0%</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                          <div className="text-[10px] text-white/50">MOBILE UX</div>
                          <div className="text-xs text-[#22C55E] font-bold mt-1">100% Responsive</div>
                        </div>
                      </div>
                      <div className="p-3 bg-white/5 rounded text-xs text-white/80 flex items-center justify-between">
                        <span>🏔️ "The Top is a State of Mind"</span>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#22C55E] underline flex items-center gap-1 font-bold"
                        >
                          <span>Open Live $PEAK Site</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {project.id === 'ronnie-coin' && (
                    <div className="space-y-4">
                      <div className="text-xs text-white/70">
                        Solana High-Performance Ecosystem Integration
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                          <div className="text-[10px] text-white/50">NETWORK</div>
                          <div className="text-xs text-[#22C55E] font-bold mt-1">Solana SPL</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                          <div className="text-[10px] text-white/50">ROUTING</div>
                          <div className="text-xs text-[#22C55E] font-bold mt-1">Raydium & DEX</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                          <div className="text-[10px] text-white/50">SPEED</div>
                          <div className="text-xs text-[#22C55E] font-bold mt-1">&lt; 400ms</div>
                        </div>
                      </div>
                      <div className="p-3 bg-white/5 rounded text-xs text-white/80 flex items-center justify-between">
                        <span>🦏 "Built Like a Rhino on Solana"</span>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#22C55E] underline flex items-center gap-1 font-bold"
                        >
                          <span>Open Live $RONNIE Site</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-[#747878] dark:text-[#9ca3af] font-['JetBrains_Mono']">
                  * Click "Launch Live Site" to test full live animations, swap routing, interactive features, and responsive layouts.
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-[#747878]/15 dark:border-white/10 bg-[#f4f4f0] dark:bg-[#18191e] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#747878] dark:text-[#9ca3af] font-['JetBrains_Mono'] flex items-center gap-2">
              <span>Designed & Developed by Senku</span>
              <span>·</span>
              <span className="text-[#22C55E] font-semibold">
                {readProgress >= 99 ? '100% Read' : `${readProgress}% Read`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#22C55E] hover:bg-[#16a34a] text-black text-xs font-['JetBrains_Mono'] uppercase rounded transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
                >
                  <span>Launch Live Site</span>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-transparent border border-[#747878]/30 dark:border-white/20 hover:border-[#1b1c1a] dark:hover:border-white text-xs font-['JetBrains_Mono'] uppercase text-[#1b1c1a] dark:text-white rounded transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => {
                  onClose();
                  const contactEl = document.getElementById('contact');
                  contactEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#000000] dark:bg-white hover:bg-[#22C55E] dark:hover:bg-[#22C55E] text-white dark:text-black dark:hover:text-black text-xs font-['JetBrains_Mono'] uppercase rounded transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <span>Build Similar Project</span>
                <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
