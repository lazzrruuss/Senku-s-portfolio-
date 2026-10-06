import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { useLanguage, Language } from '../context/LanguageContext';

interface ScopeOption {
  id: string;
  price: number;
  name: Record<Language, string>;
  time: Record<Language, string>;
  desc: Record<Language, string>;
}

const SCOPES: ScopeOption[] = [
  {
    id: 'memecoin',
    price: 250,
    name: {
      en: 'Memecoin Launchpad',
      ja: 'ミームコイン ローンチパッド',
      zh: 'Meme币 发射门户',
      es: 'Plataforma para Memecoin',
      ko: '밈코인 런칭패드',
      fr: 'Launchpad Memecoin',
    },
    time: {
      en: '24 Hours',
      ja: '24時間納品',
      zh: '24小时交付',
      es: '24 Horas',
      ko: '24시간 내 배포',
      fr: '24 Heures',
    },
    desc: {
      en: 'High-converting viral landing page, buy portal, tokenomics, and live contract verification.',
      ja: '高転換率のランディングページ、購入ポータル、トークノミクス、コントラクト即時検証。',
      zh: '高转化率代币发射页、购买通道、代币经济学与合约地址验证。',
      es: 'Landing page de alto impacto, portal de compra, tokenomics y verificación de contrato en vivo.',
      ko: '고전환율 랜딩 페이지, 구매 포털, 토크노믹스 및 컨트랙트 즉시 검증.',
      fr: 'Landing page virale à haute conversion, portail d’achat, tokenomics et vérification on-chain.',
    },
  },
  {
    id: 'dapp',
    price: 480,
    name: {
      en: 'Full dApp & Web3 Portal',
      ja: 'dApp & Web3 ポータル',
      zh: '完整 dApp & Web3 门户',
      es: 'Portal dApp y Web3 Completo',
      ko: '풀스택 dApp & Web3 포털',
      fr: 'Portail dApp & Web3 Complet',
    },
    time: {
      en: '48 Hours',
      ja: '48時間納品',
      zh: '48小时交付',
      es: '48 Horas',
      ko: '48시간 내 배포',
      fr: '48 Heures',
    },
    desc: {
      en: 'Custom decentralized frontend with live RPC queries, token swap embed, and responsive wallet UI.',
      ja: '独自分散型フロントエンド、RPCリアルタイムクエリ、トークンスワップ埋め込み、ウォレットUI。',
      zh: '定制去中心化前端、实时 RPC 数据查询、代币兑换组件嵌入与响应式钱包交互。',
      es: 'Frontend descentralizado a medida, consultas RPC en vivo, swap integrado y UI para wallets.',
      ko: '커스텀 탈중앙화 프론트엔드, 실시간 RPC 쿼리, 토큰 스왑 임베드 및 반응형 지갑 UI.',
      fr: 'Frontend décentralisé sur-mesure avec requêtes RPC en direct, widget de swap et UI responsive.',
    },
  },
  {
    id: 'protocol',
    price: 850,
    name: {
      en: 'Bespoke Protocol Suite',
      ja: 'フルスケール・プロトコルサイト',
      zh: '高阶协议专属全套站点',
      es: 'Suite de Protocolo a Medida',
      ko: '맞춤형 프로토콜 풀 스위트',
      fr: 'Suite de Protocole Sur-Mesure',
    },
    time: {
      en: '3–5 Days',
      ja: '3〜5日納品',
      zh: '3–5天交付',
      es: '3–5 Días',
      ko: '3–5일 소요',
      fr: '3–5 Jours',
    },
    desc: {
      en: 'Multi-page website, custom design system, interactive canvas styling, and clean documentation.',
      ja: 'マルチページ構成、独自デザインシステム、インタラクティブキャンバス、技術ドキュメント。',
      zh: '多页面官方网站、定制设计规范系统、交互式 Canvas 动效与技术文档页面。',
      es: 'Sitio multipágina, sistema de diseño exclusivo, animaciones interactivas y documentación clara.',
      ko: '멀티페이지 웹사이트, 맞춤형 디자인 시스템, 인터랙티브 캔버스 및 깔끔한 문서화.',
      fr: 'Site multi-pages, design system dédié, animations interactives canvas et documentation soignée.',
    },
  },
];

interface Addon {
  id: string;
  price: number;
  name: Record<Language, string>;
}

const ADDONS: Addon[] = [
  {
    id: 'motion',
    price: 50,
    name: {
      en: 'Smooth Custom Motion & Micro-interactions',
      ja: '滑らかなカスタムモーション & マイクロアニメーション',
      zh: '丝滑定制动效与微交互系统',
      es: 'Animaciones Suaves y Microinteracciones',
      ko: '유려한 커스텀 모션 및 마이크로 인터랙션',
      fr: 'Animations Fluides & Micro-interactions',
    },
  },
  {
    id: 'swap',
    price: 80,
    name: {
      en: 'Live Raydium / Uniswap DEX Swap Widget',
      ja: 'リアルタイム DEX スワップウィジェット埋め込み',
      zh: '实时 Raydium / Uniswap DEX 兑换组件',
      es: 'Widget de Swap DEX en Vivo (Raydium / Uniswap)',
      ko: '실시간 Raydium / Uniswap DEX 스왑 위젯',
      fr: 'Widget de Swap DEX en Direct (Raydium / Uniswap)',
    },
  },
  {
    id: 'chart',
    price: 40,
    name: {
      en: 'DexScreener & Live Price Chart Embed',
      ja: 'DexScreener & リアルタイム価格チャート',
      zh: 'DexScreener 与实时 K 线图表嵌入',
      es: 'Gráfico de Precios en Vivo y DexScreener',
      ko: 'DexScreener 및 실시간 가격 차트 임베드',
      fr: 'Intégration DexScreener & Graphique en Direct',
    },
  },
  {
    id: 'branding',
    price: 70,
    name: {
      en: 'Custom Branding & Social Assets Tuning',
      ja: '独自ブランディング & SNS用アセット最適化',
      zh: '专属视觉品牌规范与社交媒体物料调优',
      es: 'Branding Personalizado y Material para Redes',
      ko: '맞춤형 브랜딩 및 소셜 미디어 애셋 최적화',
      fr: 'Branding Personnalisé & Assets Réseaux Sociaux',
    },
  },
];

export const ProjectEstimator: React.FC = () => {
  const [selectedScope, setSelectedScope] = useState<string>('memecoin');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['motion']);
  const [copied, setCopied] = useState<boolean>(false);
  const { language, t } = useLanguage();

  const currentScope = SCOPES.find((s) => s.id === selectedScope) || SCOPES[0];
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return acc + (addon ? addon.price : 0);
  }, 0);
  const totalPrice = currentScope.price + addonsTotal;

  const toggleAddon = (id: string) => {
    sound.playClick(650);
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getScopeName = (scope: ScopeOption) => scope.name[language] || scope.name.en;
  const getScopeTime = (scope: ScopeOption) => scope.time[language] || scope.time.en;
  const getScopeDesc = (scope: ScopeOption) => scope.desc[language] || scope.desc.en;
  const getAddonName = (addon: Addon) => addon.name[language] || addon.name.en;

  const getBriefSummary = () => {
    const addonNames = selectedAddons
      .map((id) => {
        const a = ADDONS.find((item) => item.id === id);
        return a ? getAddonName(a) : '';
      })
      .filter(Boolean);

    const sName = getScopeName(currentScope);
    const sTime = getScopeTime(currentScope);
    const aList = addonNames.length > 0 ? addonNames.join(', ') : 'None';

    if (language === 'ja') {
      return `Senkuさん、プロジェクトの相談です：
- 選択プラン: ${sName}
- 目安納期: ${sTime}
- 追加オプション: ${addonNames.length > 0 ? addonNames.join('、') : 'なし'}
- 概算費用: 約 $${totalPrice} USD
詳細について相談したいです！`;
    }

    if (language === 'zh') {
      return `Senku您好，我想咨询Web3项目开发需求：
- 选定方案: ${sName}
- 预计周期: ${sTime}
- 附加功能: ${addonNames.length > 0 ? addonNames.join('、') : '无'}
- 预估预算: 约 $${totalPrice} USD
希望能进一步沟通合作细节！`;
    }

    if (language === 'es') {
      return `¡Hola Senku! Me gustaría cotizar un proyecto:
- Paquete: ${sName}
- Tiempo Estimado: ${sTime}
- Opciones: ${addonNames.length > 0 ? addonNames.join(', ') : 'Ninguna'}
- Presupuesto Estimado: ~$${totalPrice} USD
¡Hablemos de los detalles!`;
    }

    if (language === 'ko') {
      return `Senku님, 프로젝트 제작 문의드립니다:
- 선택 플랜: ${sName}
- 예상 납기: ${sTime}
- 추가 옵션: ${addonNames.length > 0 ? addonNames.join(', ') : '없음'}
- 예상 견적: 약 $${totalPrice} USD
자세한 내용을 상의하고 싶습니다!`;
    }

    if (language === 'fr') {
      return `Bonjour Senku ! Je souhaite lancer un projet :
- Formule : ${sName}
- Délai Estimé : ${sTime}
- Options : ${addonNames.length > 0 ? addonNames.join(', ') : 'Aucune'}
- Budget Estimé : ~$${totalPrice} USD
Échangeons sur les détails !`;
    }

    return `Hey Senku! I'd like to book a project:
- Package: ${sName}
- Target Delivery: ${sTime}
- Add-ons: ${aList}
- Estimated Budget: ~$${totalPrice} USD
Let's discuss details!`;
  };

  const handleSendTelegram = () => {
    sound.playChime();
    const text = encodeURIComponent(getBriefSummary());
    window.open(`https://t.me/${PORTFOLIO_DATA.developer.telegramHandle}?text=${text}`, '_blank');
  };

  const handleCopyBrief = () => {
    sound.playClick(900);
    navigator.clipboard?.writeText?.(getBriefSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const baseLabel: Record<Language, string> = {
    en: 'base',
    ja: '基本料金',
    zh: '基础费用',
    es: 'base',
    ko: '기본가',
    fr: 'base',
  };

  return (
    <div className="w-full p-6 sm:p-8 rounded-xl bg-[#faf9f5] dark:bg-[#111216] border border-[#747878]/20 dark:border-white/10 shadow-xl transition-colors font-['Inter']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#747878]/15 dark:border-white/10">
        <div>
          <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest font-semibold block mb-1">
            {t.estimator.badge}
          </span>
          <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-medium text-[#1b1c1a] dark:text-white">
            {t.estimator.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs font-['JetBrains_Mono'] text-[#006e2f] dark:text-[#4ade80] shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
          <span>{t.estimator.pricingNote}</span>
        </div>
      </div>

      {/* 1. Scope Selection Cards */}
      <div className="my-6">
        <label className="block text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-[#747878] dark:text-[#9ca3af] mb-3">
          {t.estimator.step1}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCOPES.map((scope) => (
            <motion.div
              key={scope.id}
              whileHover={{ y: -3 }}
              onClick={() => {
                sound.playClick(700);
                setSelectedScope(scope.id);
              }}
              className={`p-5 rounded-lg border cursor-pointer transition-all ${
                selectedScope === scope.id
                  ? 'bg-white dark:bg-[#181920] border-[#22C55E] shadow-lg shadow-[#22c55e]/10 ring-1 ring-[#22c55e]'
                  : 'bg-[#f4f4f0] dark:bg-[#16171c] border-[#747878]/15 dark:border-white/10 hover:border-[#1b1c1a]/40 dark:hover:border-white/30'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-['Space_Grotesk'] text-base font-bold text-[#1b1c1a] dark:text-white">
                  {getScopeName(scope)}
                </span>
                <span className="text-xs font-['JetBrains_Mono'] text-[#006e2f] dark:text-[#4ade80] font-semibold">
                  ~{getScopeTime(scope)}
                </span>
              </div>
              <div className="text-xl font-bold font-['Space_Grotesk'] text-[#1b1c1a] dark:text-white mb-2">
                ${scope.price} <span className="text-xs font-normal text-[#747878] dark:text-[#9ca3af]">{baseLabel[language] || 'base'}</span>
              </div>
              <p className="text-xs text-[#444748] dark:text-[#d1d5db] leading-relaxed">
                {getScopeDesc(scope)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Add-ons Selection */}
      <div className="my-6">
        <label className="block text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-[#747878] dark:text-[#9ca3af] mb-3">
          {t.estimator.step2}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADDONS.map((addon) => {
            const isChecked = selectedAddons.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`p-3.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-white dark:bg-[#181920] border-[#22C55E] text-[#1b1c1a] dark:text-white'
                    : 'bg-[#f4f4f0] dark:bg-[#16171c] border-[#747878]/15 dark:border-white/10 text-[#444748] dark:text-[#d1d5db] hover:border-[#747878]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-[#22C55E] text-black font-bold' : 'border border-[#747878]/40'
                    }`}
                  >
                    {isChecked && <span className="material-symbols-outlined text-[13px]">check</span>}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{getAddonName(addon)}</span>
                </div>
                <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#006e2f] dark:text-[#4ade80]">
                  +${addon.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Total & Action Row */}
      <div className="pt-6 border-t border-[#747878]/15 dark:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#f4f4f0] dark:bg-[#16171c] p-6 rounded-lg">
        <div>
          <div className="text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-[#747878] dark:text-[#9ca3af]">
            {t.estimator.timeLabel} <span className="text-[#22C55E] font-bold">{getScopeTime(currentScope)}</span>
          </div>
          <div className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-[#1b1c1a] dark:text-white mt-1">
            ${totalPrice.toLocaleString()} <span className="text-sm font-normal text-[#747878] dark:text-[#9ca3af]">USD</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={handleCopyBrief}
            className="flex-1 md:flex-initial px-4 py-3 border border-[#747878]/30 dark:border-white/20 hover:border-[#1b1c1a] dark:hover:border-white rounded text-xs font-['JetBrains_Mono'] uppercase transition-colors cursor-pointer text-[#1b1c1a] dark:text-white"
          >
            {copied ? t.estimator.copied : t.estimator.copyBrief}
          </button>

          <button
            type="button"
            onClick={handleSendTelegram}
            className="flex-1 md:flex-initial px-6 py-3 bg-[#22C55E] hover:bg-[#16a34a] text-black font-bold text-xs font-['JetBrains_Mono'] uppercase rounded transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#22c55e]/25 cursor-pointer"
          >
            <span>{t.estimator.bookTg}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
