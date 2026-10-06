import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { useLanguage, Language } from '../context/LanguageContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [readProgress, setReadProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const jumpText: Record<Language, string> = { en: 'Jump:', ja: '移動:', zh: '跳转:', es: 'Ir a:', ko: '이동:', fr: 'Aller à:' };
  const jumpAbout: Record<Language, string> = { en: 'About', ja: '概要', zh: '概要', es: 'Acerca', ko: '소개', fr: 'À propos' };
  const jumpMetrics: Record<Language, string> = { en: 'Metrics', ja: '指標', zh: '指标', es: 'Métricas', ko: '지표', fr: 'Indicateurs' };
  const jumpFeatures: Record<Language, string> = { en: 'Features', ja: '機能', zh: '功能', es: 'Funciones', ko: '기능', fr: 'Fonctionnalités' };
  const jumpTech: Record<Language, string> = { en: 'Tech', ja: '技術', zh: '技术', es: 'Tecnología', ko: '기술', fr: 'Tech' };

  const readLabel: Record<Language, string> = {
    en: 'READ',
    ja: '読了',
    zh: '已阅读',
    es: 'LEÍDO',
    ko: '읽음',
    fr: 'LU',
  };
  const caseStudyOverviewText: Record<Language, string> = {
    en: 'Case Study Overview',
    ja: '制作事例の概要',
    zh: '案例解析总览',
    es: 'Resumen del Estudio',
    ko: '프로젝트 개요',
    fr: "Aperçu de l'Étude de Cas",
  };
  const aboutHeading: Record<Language, string> = {
    en: 'About this project',
    ja: 'プロジェクト詳細',
    zh: '关于该项目',
    es: 'Acerca de este proyecto',
    ko: '프로젝트 소개',
    fr: 'À propos de ce projet',
  };
  const metricsHeading: Record<Language, string> = {
    en: 'Key Metrics & Architecture',
    ja: '主要指標 & アーキテクチャ',
    zh: '核心指标与架构',
    es: 'Métricas Clave y Arquitectura',
    ko: '핵심 지표 및 아키텍처',
    fr: 'Indicateurs Clés & Architecture',
  };
  const capabilitiesHeading: Record<Language, string> = {
    en: 'Key Frontend Capabilities',
    ja: '主要フロントエンド実装',
    zh: '核心前端功能实现',
    es: 'Capacidades Frontend Clave',
    ko: '주요 프론트엔드 기능',
    fr: 'Fonctionnalités Frontend Clés',
  };
  const techHeading: Record<Language, string> = {
    en: 'Technologies Used',
    ja: '採用技術スタック',
    zh: '所采用技术栈',
    es: 'Tecnologías Utilizadas',
    ko: '사용 기술 스택',
    fr: 'Technologies Utilisées',
  };
  const closeBtnText: Record<Language, string> = {
    en: 'Close',
    ja: '閉じる',
    zh: '关闭',
    es: 'Cerrar',
    ko: '닫기',
    fr: 'Fermer',
  };
  const buildBtnText: Record<Language, string> = {
    en: 'Build Similar Project',
    ja: '開発を相談する',
    zh: '定制类似项目',
    es: 'Crear Proyecto Similar',
    ko: '유사 프로젝트 의뢰',
    fr: 'Créer un Projet Similaire',
  };

  const getReadStr = () => {
    const l = readLabel[language] || 'READ';
    return readProgress >= 99 ? `✓ 100% ${l}` : `${readProgress}% ${l}`;
  };
  const localized = project ? t.projects[project.id] : null;
  const displayTitle = localized?.title || project?.title || '';
  const displayCategory = localized?.category || project?.category || '';
  const displayDetailed = localized?.detailedDescription || project?.detailedDescription || '';
  const displayFeatures = localized?.features || project?.features || [];

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

  // Reset scroll position and progress when project changes
  useEffect(() => {
    setReadProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
      if (maxScroll <= 10) {
        setReadProgress(100);
      }
    }
  }, [project?.id]);

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
  }, [project]);

  if (!project) return null;

  const scrollToSection = (sectionId: string) => {
    sound.playClick(900);
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
            {displayTitle}
          </span>
          <span className="text-white/40 font-mono">|</span>
          <span className="text-[#22C55E] font-bold tracking-tight">
            {getReadStr()}
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
                <span className="text-[11px] font-['JetBrains_Mono'] text-[#006e2f] dark:text-[#4ade80] bg-[#22C55E]/10 px-2 py-0.5 rounded font-medium">
                  {getReadStr()}
                </span>
              </div>
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-medium font-['Space_Grotesk'] text-[#1b1c1a] dark:text-white"
              >
                {displayTitle}
              </h2>
              <p className="text-xs sm:text-sm font-['JetBrains_Mono'] text-[#006e2f] dark:text-[#4ade80] uppercase tracking-wider mt-1">
                {displayCategory} · {project.year}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playClick(500);
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-[#efeeea] dark:bg-[#212328] hover:bg-[#1b1c1a] dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors flex items-center justify-center text-[#1b1c1a] dark:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Section Navigation Quick Jump */}
          <div className="flex items-center justify-between border-b border-[#747878]/15 dark:border-white/10 px-6 py-2.5 bg-[#faf9f5] dark:bg-[#121316] text-[11px] font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af]">
            <span className="text-xs font-semibold text-[#1b1c1a] dark:text-white">
              {caseStudyOverviewText[language] || 'Case Study Overview'}
            </span>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">{jumpText[language] || 'Jump:'}</span>
              <button
                type="button"
                onClick={() => scrollToSection('section-about')}
                className="hover:text-[#22C55E] transition-colors cursor-pointer"
              >
                {jumpAbout[language] || 'About'}
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => scrollToSection('section-highlights')}
                className="hover:text-[#22C55E] transition-colors cursor-pointer"
              >
                {jumpMetrics[language] || 'Metrics'}
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => scrollToSection('section-features')}
                className="hover:text-[#22C55E] transition-colors cursor-pointer"
              >
                {jumpFeatures[language] || 'Features'}
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => scrollToSection('section-tech')}
                className="hover:text-[#22C55E] transition-colors cursor-pointer"
              >
                {jumpTech[language] || 'Tech'}
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Detailed Description */}
            <div id="section-about">
              <h4 className="font-['Space_Grotesk'] text-lg font-medium text-[#1b1c1a] dark:text-white mb-2">
                {aboutHeading[language] || 'About this project'}
              </h4>
              <p className="text-[#444748] dark:text-[#d1d5db] font-['Inter'] leading-relaxed">
                {displayDetailed}
              </p>
            </div>

            {/* Highlights & Metrics */}
            <div id="section-highlights">
              <h4 className="font-['Space_Grotesk'] text-sm uppercase tracking-wider font-medium text-[#1b1c1a] dark:text-white mb-3">
                {metricsHeading[language] || 'Key Metrics & Architecture'}
              </h4>
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
            </div>

            {/* Key Features List */}
            <div id="section-features">
              <h4 className="font-['Space_Grotesk'] text-sm uppercase tracking-wider font-medium text-[#1b1c1a] dark:text-white mb-3">
                {capabilitiesHeading[language] || 'Key Frontend Capabilities'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {displayFeatures.map((feature, idx) => (
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
                {techHeading[language] || 'Technologies Used'}
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
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-[#747878]/15 dark:border-white/10 bg-[#f4f4f0] dark:bg-[#18191e] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#747878] dark:text-[#9ca3af] font-['JetBrains_Mono'] flex items-center gap-2">
              <span>{language === 'ja' || language === 'zh' ? 'Senku (千空)' : 'Senku'}</span>
              <span>·</span>
              <span className="text-[#22C55E] font-semibold">
                {getReadStr()}
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
                  <span>{t.work.launchLive}</span>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  sound.playClick(500);
                  onClose();
                }}
                className="px-4 py-2 bg-transparent border border-[#747878]/30 dark:border-white/20 hover:border-[#1b1c1a] dark:hover:border-white text-xs font-['JetBrains_Mono'] uppercase text-[#1b1c1a] dark:text-white rounded transition-colors cursor-pointer"
              >
                {closeBtnText[language] || 'Close'}
              </button>
              <a
                href="#contact"
                onClick={() => {
                  sound.playClick(800);
                  onClose();
                  const contactEl = document.getElementById('contact');
                  contactEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#000000] dark:bg-white hover:bg-[#22C55E] dark:hover:bg-[#22C55E] text-white dark:text-black dark:hover:text-black text-xs font-['JetBrains_Mono'] uppercase rounded transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <span>{buildBtnText[language] || 'Build Similar Project'}</span>
                <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
