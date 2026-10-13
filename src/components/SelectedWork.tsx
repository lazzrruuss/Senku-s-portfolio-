import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';

interface SelectedWorkProps {
  onOpenProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onOpenProject }) => {
  const { navigateTo } = useNavigation();
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse drag support without interrupting natural page scrolling
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < maxScroll - 15);

    const progress = maxScroll > 0 ? Math.min(Math.max(scrollLeft / maxScroll, 0), 1) : 0;
    setScrollProgress(progress);

    // Compute active index based on card positions relative to container
    const cardElements = el.children;
    if (cardElements.length > 0) {
      let closestIdx = 0;
      let minDiff = Infinity;
      const containerLeft = el.getBoundingClientRect().left;

      for (let i = 0; i < cardElements.length; i++) {
        const cardRect = (cardElements[i] as HTMLElement).getBoundingClientRect();
        const diff = Math.abs(cardRect.left - containerLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      }
      setActiveIndex(closestIdx);
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.children;
    if (cards[index]) {
      sound.playClick(950);
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  const handlePrev = () => {
    const el = trackRef.current;
    if (!el) return;
    sound.playClick(900);
    const scrollAmount = Math.min(el.clientWidth * 0.85, 580);
    el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const handleNext = () => {
    const el = trackRef.current;
    if (!el) return;
    sound.playClick(1000);
    const scrollAmount = Math.min(el.clientWidth * 0.85, 580);
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Mouse Drag Handlers: allows natural horizontal dragging on desktop
  // without preventing normal vertical wheel or page touch scrolling.
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;

    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = trackRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = x - startX.current;

    if (Math.abs(walk) > 6) {
      hasDragged.current = true;
      el.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => {
      hasDragged.current = false;
    }, 80);
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setTimeout(() => {
        hasDragged.current = false;
      }, 80);
    }
  };

  return (
    <section
      className="w-full px-6 lg:px-12 py-24 bg-black/[0.015] dark:bg-white/[0.015] border-b border-[#747878]/15 dark:border-white/10 transition-colors duration-200"
      id="work"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and Horizontal Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6"
        >
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest block mb-3 font-medium">
              {t.work.badge}
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
              {t.work.title}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-['Inter'] text-[15px] text-[#444748] dark:text-[#d1d5db] max-w-sm leading-relaxed">
              {t.work.subtitle}
            </p>

            {/* Carousel Navigation Buttons & Counter */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Project Counter Indicator */}
              <div className="px-3 py-2 rounded-lg glass-pill font-['JetBrains_Mono'] text-xs font-semibold text-[#1b1c1a] dark:text-white tracking-wider flex items-center gap-1.5">
                <span className="text-[#22C55E]">0{activeIndex + 1}</span>
                <span className="text-[#747878]/40">/</span>
                <span>0{PORTFOLIO_DATA.projects.length}</span>
              </div>

              {/* Previous Slide Button */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={!canScrollLeft}
                aria-label="Previous project"
                className={`p-2 rounded-lg glass-btn transition-all duration-200 flex items-center justify-center ${
                  !canScrollLeft
                    ? 'opacity-40 cursor-not-allowed text-[#747878]'
                    : 'text-[#1b1c1a] dark:text-white hover:text-[#22C55E] cursor-pointer'
                }`}
              >
                <span className="material-symbols-outlined text-[19px]">arrow_back</span>
              </button>

              {/* Next Slide Button */}
              <button
                type="button"
                onClick={handleNext}
                disabled={!canScrollRight}
                aria-label="Next project"
                className={`p-2 rounded-lg glass-btn transition-all duration-200 flex items-center justify-center ${
                  !canScrollRight
                    ? 'opacity-40 cursor-not-allowed text-[#747878]'
                    : 'text-[#1b1c1a] dark:text-white hover:text-[#22C55E] cursor-pointer'
                }`}
              >
                <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
              </button>

              {/* View All Button */}
              <button
                type="button"
                onClick={() => navigateTo('work')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg glass-btn font-['JetBrains_Mono'] text-xs font-semibold text-[#1b1c1a] dark:text-white hover:text-[#22C55E] transition-all cursor-pointer whitespace-nowrap ml-1"
                title="View full work archive"
              >
                <span>{t.work.viewAll}</span>
                <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Project Jump Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
          {PORTFOLIO_DATA.projects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#22C55E]/15 text-[#006e2f] dark:text-[#4ade80] border border-[#22C55E]/40 shadow-xs'
                    : 'glass-btn text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white'
                }`}
              >
                <span className="text-[10px] font-bold opacity-70">0{idx + 1}</span>
                <span>{proj.title.split(' ')[0]}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Horizontal Track Wrapper with Left/Right Ambient Edge Fades */}
        <div className="relative group/track">
          {/* Left subtle edge shadow fade (shows only when scrolled) */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#faf9f5] dark:from-[#090a0c] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Right subtle edge shadow fade (shows only when more cards exist) */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#faf9f5] dark:from-[#090a0c] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Horizontal Track Container:
              - touch-pan-y allows mobile users to scroll page vertically without interference
              - no-scrollbar keeps interface clean
              - snap-x snap-mandatory gently snaps cards into clean alignment
              - zero wheel hijacking preserves natural trackpad & mouse wheel page scrolling
          */}
          <div
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1 touch-pan-y cursor-grab active:cursor-grabbing select-none"
            style={{ overscrollBehaviorX: 'contain' }}
          >
            {PORTFOLIO_DATA.projects.map((project, index) => (
              <div
                key={project.id}
                className="shrink-0 w-[86vw] sm:w-[480px] md:w-[540px] lg:w-[580px] snap-start flex flex-col"
                onClickCapture={(e) => {
                  if (hasDragged.current) {
                    e.stopPropagation();
                    e.preventDefault();
                  }
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onOpenDetails={onOpenProject}
                  className="h-full select-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project Track Status & Progress Bar */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-[#747878]/15 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="font-['JetBrains_Mono'] text-xs font-medium text-[#1b1c1a] dark:text-white">
              {PORTFOLIO_DATA.projects[activeIndex]?.title}
            </span>
          </div>

          {/* Mini progress line indicator */}
          <div className="w-32 sm:w-56 h-[2.5px] bg-black/10 dark:bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#22C55E]/60 to-[#22C55E] rounded-full"
              style={{
                width: `${Math.max(scrollProgress * 100, 25)}%`,
              }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
