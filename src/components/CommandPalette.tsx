import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigation, PageId } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (project: Project) => void;
  onOpenEstimator?: () => void;
}

interface CommandItem {
  id: string;
  category: string;
  label: string;
  sublabel?: string;
  icon: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { navigateTo } = useNavigation();
  const { toggleTheme } = useTheme();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const isJa = language === 'ja';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick(900);
        if (isOpen) onClose();
        else onClose(); // parent toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const commands: CommandItem[] = [
    // Language Selection Commands
    ...SUPPORTED_LANGUAGES.map((langOpt) => ({
      id: `lang-${langOpt.code}`,
      category: t.cmd.categoryActions,
      label: `${langOpt.nativeName} (${langOpt.name} - ${langOpt.flag})`,
      sublabel: `Switch interface language to ${langOpt.nativeName}`,
      icon: 'translate',
      action: () => {
        sound.playClick(900);
        setLanguage(langOpt.code);
        onClose();
      },
    })),

    // Navigation
    {
      id: 'nav-home',
      category: t.cmd.categoryNav,
      label: `${t.nav.home} (${isJa ? 'ホーム' : 'Home Page'})`,
      sublabel: isJa ? 'メイン画面・ヒーローセクション' : 'Overview, hero & featured works',
      icon: 'home',
      action: () => {
        navigateTo('home');
        onClose();
      },
    },
    {
      id: 'nav-work',
      category: t.cmd.categoryNav,
      label: `${t.nav.work} (${isJa ? '制作実績' : 'Selected Work'})`,
      sublabel: isJa ? '本番クライアント制作実績一覧' : 'View all production client builds',
      icon: 'grid_view',
      action: () => {
        navigateTo('work');
        onClose();
      },
    },
    {
      id: 'nav-about',
      category: t.cmd.categoryNav,
      label: `${t.nav.about} (${isJa ? '概要' : 'About Senku'})`,
      sublabel: isJa ? 'エンジニアプロフィールと理念' : 'Engineering profile & philosophies',
      icon: 'person',
      action: () => {
        navigateTo('about');
        onClose();
      },
    },
    {
      id: 'nav-skills',
      category: t.cmd.categoryNav,
      label: `${t.nav.skills} (${isJa ? 'スキル' : 'Skills & Stack'})`,
      sublabel: isJa ? 'Web3技術スタックと提供サービス' : 'Web3 tech stack & offerings',
      icon: 'code',
      action: () => {
        navigateTo('skills');
        onClose();
      },
    },
    {
      id: 'nav-contact',
      category: t.cmd.categoryNav,
      label: `${t.nav.contact} (${isJa ? 'お問い合わせ' : 'Contact & Hire'})`,
      sublabel: isJa ? 'Telegram・X・案件フォーム' : 'Direct Telegram, X & project briefs',
      icon: 'send',
      action: () => {
        navigateTo('contact');
        onClose();
      },
    },

    // Case Studies
    ...PORTFOLIO_DATA.projects.map((proj) => {
      const loc = t.projects[proj.id];
      const title = loc?.title || proj.title;
      const cat = loc?.category || proj.category;
      return {
        id: `proj-${proj.id}`,
        category: t.cmd.categoryProjects,
        label: `${title} ${isJa ? '事例詳細' : 'Case Study'}`,
        sublabel: `${cat} · ${proj.badge}`,
        icon: 'terminal',
        action: () => {
          onClose();
          onOpenProject(proj);
        },
      };
    }),

    // Actions
    {
      id: 'act-theme',
      category: t.cmd.categoryActions,
      label: t.cmd.toggleTheme,
      sublabel: t.cmd.toggleThemeSub,
      icon: 'brightness_medium',
      action: () => {
        toggleTheme();
        sound.playClick(800);
        onClose();
      },
    },
    {
      id: 'act-sound',
      category: t.cmd.categoryActions,
      label: t.cmd.toggleSound,
      sublabel: sound.getMuted()
        ? (isJa ? '効果音をオンにする' : 'Turn sound ON')
        : (isJa ? '効果音をオフにする' : 'Turn sound OFF'),
      icon: sound.getMuted() ? 'volume_off' : 'volume_up',
      action: () => {
        sound.toggleMute();
        onClose();
      },
    },
    {
      id: 'act-tg',
      category: t.cmd.categoryActions,
      label: isJa ? 'Telegramで連絡' : 'Chat on Telegram',
      sublabel: `@${PORTFOLIO_DATA.developer.telegramHandle} (Direct message)`,
      icon: 'chat',
      action: () => {
        window.open(PORTFOLIO_DATA.developer.telegramUrl, '_blank');
        onClose();
      },
    },
    {
      id: 'act-copy-email',
      category: t.cmd.categoryActions,
      label: isJa ? 'メールアドレスをコピー' : 'Copy Contact Email',
      sublabel: PORTFOLIO_DATA.developer.contactEmail,
      icon: 'content_copy',
      action: () => {
        navigator.clipboard?.writeText?.(PORTFOLIO_DATA.developer.contactEmail);
        sound.playChime();
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(q) ||
      (cmd.sublabel && cmd.sublabel.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl glass-panel-elevated rounded-2xl shadow-2xl overflow-hidden font-['Inter']"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-[#747878]/15 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md">
          <span className="material-symbols-outlined text-[#747878] dark:text-[#9ca3af] text-[20px]">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t.cmd.searchPlaceholder}
            className="w-full bg-transparent border-none text-sm text-[#1b1c1a] dark:text-white placeholder-[#747878] dark:placeholder-[#9ca3af] focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px] font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#747878] dark:text-[#9ca3af] font-['JetBrains_Mono']">
              {isJa ? '一致するコマンドや制作事例が見つかりませんでした。' : 'No matching commands or projects found.'}
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#1b1c1a] dark:text-white'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-[#444748] dark:text-[#d1d5db]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        isSelected ? 'text-[#22C55E]' : 'text-[#747878] dark:text-[#9ca3af]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-[#1b1c1a] dark:text-white">
                        {item.label}
                      </div>
                      {item.sublabel && (
                        <div className="text-[11px] text-[#747878] dark:text-[#9ca3af]">
                          {item.sublabel}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#747878] dark:text-[#9ca3af]">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 border-t border-[#747878]/15 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#747878] dark:text-[#9ca3af]">
          <div className="flex items-center gap-3">
            <span>↑↓ {isJa ? '移動' : 'Navigate'}</span>
            <span>↵ {isJa ? '選択' : 'Select'}</span>
            <span>Esc {isJa ? '閉じる' : 'Close'}</span>
          </div>
          <span className="text-[#006e2f] dark:text-[#4ade80] font-medium">Senku Command CLI</span>
        </div>
      </motion.div>
    </div>
  );
};
