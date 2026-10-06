import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'ja' | 'zh' | 'es' | 'ko' | 'fr';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'EN' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: 'JA' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: 'ZH' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'ES' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: 'KO' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: 'FR' },
];

export interface LocalizedProject {
  title: string;
  category: string;
  description: string;
  detailedDescription?: string;
  features?: string[];
}

export interface LocalizedPrinciple {
  title: string;
  description: string;
}

export interface LocalizedService {
  id: string;
  title: string;
  description: string;
}

export interface Translations {
  nav: {
    home: string;
    work: string;
    about: string;
    skills: string;
    contact: string;
    available: string;
    search: string;
    theme: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    headline3: string;
    headlineHighlight: string;
    subheadline: string;
    viewWork: string;
    letsTalk: string;
    tagFrontend: string;
    tagWeb3: string;
    tagCreative: string;
    tagChains: string;
  };
  work: {
    badge: string;
    title: string;
    subtitle: string;
    deployments: string;
    caseStudy: string;
    launchLive: string;
    needLaunch: string;
    needLaunchSub: string;
    startBrief: string;
    exploreServices: string;
    viewAll: string;
  };
  about: {
    badge: string;
    title: string;
    role: string;
    status: string;
    speed: string;
    motion: string;
    principles: string;
    philosophies: string;
    bioParagraphs: string[];
    principlesList: LocalizedPrinciple[];
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    servicesTitle: string;
    techTitle: string;
    ecosystemTitle: string;
    hireCta: string;
    servicesList: LocalizedService[];
  };
  estimator: {
    badge: string;
    title: string;
    pricingNote: string;
    step1: string;
    step2: string;
    timeLabel: string;
    bookTg: string;
    copyBrief: string;
    copied: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    directTitle: string;
    formTitle: string;
    nameLabel: string;
    contactLabel: string;
    typeLabel: string;
    messageLabel: string;
    submitMail: string;
    submitTg: string;
    successTitle: string;
    successDesc: string;
    backHome: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    socials: string;
    legal: string;
    rights: string;
  };
  cmd: {
    searchPlaceholder: string;
    categoryNav: string;
    categoryProjects: string;
    categoryActions: string;
    switchLang: string;
    switchLangSub: string;
    toggleTheme: string;
    toggleThemeSub: string;
    toggleSound: string;
    toggleSoundSub: string;
    close: string;
  };
  projects: Record<string, LocalizedProject>;
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      work: 'Work',
      about: 'About',
      skills: 'Skills',
      contact: 'Contact',
      available: 'Available for projects',
      search: 'Search ⌘K',
      theme: 'Theme',
    },
    hero: {
      badge: 'INDEPENDENT WEB3 DEVELOPER',
      headline1: 'WEBSITES',
      headline2: 'FOR CRYPTO',
      headline3: 'PROJECTS THAT',
      headlineHighlight: 'STAND OUT.',
      subheadline:
        'I design and build modern websites for crypto projects, memecoins, Web3 startups and founders.',
      viewWork: 'VIEW WORK',
      letsTalk: "LET'S TALK",
      tagFrontend: 'Frontend',
      tagWeb3: 'Web3',
      tagCreative: 'Creative Development',
      tagChains: 'Solana & EVM',
    },
    work: {
      badge: 'Selected Work',
      title: 'Selected Work',
      subtitle:
        'Live client builds, memecoin portals, and production Web3 applications designed and developed by Senku.',
      deployments: '3 Production Deployments',
      caseStudy: 'Case Study',
      launchLive: 'Launch Live Site',
      needLaunch: 'Have a token, protocol, or dApp to build?',
      needLaunchSub:
        'From viral memecoin launch portals to decentralized dashboards with live swaps and custom frontend architectures.',
      startBrief: 'Start Project Brief',
      exploreServices: 'Explore Services',
      viewAll: 'View All Projects',
    },
    about: {
      badge: 'Engineering Profile',
      title: 'Building for the next wave of Web3.',
      role: 'Frontend & Web3',
      status: 'Available Now',
      speed: '24–48h Launch',
      motion: 'Bespoke UX',
      principles: 'Engineering Principles',
      philosophies: 'Philosophies',
      bioParagraphs: [
        "I'm Senku, an independent developer focused on turning crypto project ideas into polished, responsive websites. I believe that decentralized tech deserves exceptional frontend craftsmanship.",
        'No corporate fluff or opaque processes—just direct, transparent collaboration to bring your memecoin, protocol, or startup online with speed and high-end aesthetic precision.',
      ],
      principlesList: [
        {
          title: 'Pixel Precision',
          description:
            'Every layout, font size, border, and whitespace is tuned for visual balance and impact.',
        },
        {
          title: 'Crypto-Native UX',
          description:
            'Intuitive tokenomics charts, live contracts display, swap widget readiness, and mobile wallet responsiveness.',
        },
        {
          title: 'Performance & Speed',
          description:
            'Sub-second load times, lightweight bundle sizes, and zero laggy overhead.',
        },
      ],
    },
    skills: {
      badge: 'Skills & Capabilities',
      title: 'Skills & Capabilities',
      subtitle:
        'Full-spectrum technical capabilities from creative Web3 frontends and DEX integrations to Solidity smart contract development.',
      servicesTitle: 'What I Build',
      techTitle: 'Core Tech Stack',
      ecosystemTitle: 'Web3 Ecosystem & Integration Familiarity',
      hireCta: 'Hire for a Project',
      servicesList: [
        {
          id: 's1',
          title: 'Memecoin & Token Launch Websites',
          description:
            'High-converting viral landing pages with tokenomics, roadmap, buy portals, and live contract addresses.',
        },
        {
          id: 's2',
          title: 'Web3 Frontends & dApp Interfaces',
          description:
            'Connecting wallets, DEX swaps (Uniswap, Raydium), staking dashboards, and blockchain interactions.',
        },
        {
          id: 's3',
          title: 'Custom Branding & Responsive Design',
          description:
            'Modern visual direction, brutalist/cyber aesthetics, and mobile-first responsive architecture.',
        },
        {
          id: 's4',
          title: 'Performance Tuning & Auditing',
          description:
            'Lightweight builds, sub-second load times, SEO optimization, and clean accessible markup.',
        },
      ],
    },
    estimator: {
      badge: 'Instant Scope & Cost Calculator',
      title: 'Estimate Your Web3 Project',
      pricingNote: 'Affordable Beginner-Friendly Rates',
      step1: '1. Select Project Tier:',
      step2: '2. Customize Add-ons:',
      timeLabel: 'Estimated Investment · Turnaround:',
      bookTg: 'Book Via Telegram',
      copyBrief: 'Copy Brief',
      copied: '✓ Brief Copied!',
    },
    contact: {
      badge: 'Direct Inquiry',
      title: 'Start a Project',
      subtitle:
        'Have a memecoin, protocol, or creative project in mind? Reach out directly on Telegram, X, or email.',
      directTitle: 'Direct Channels',
      formTitle: 'Or Send a Direct Brief',
      nameLabel: 'Your Name or Alias',
      contactLabel: 'Telegram Handle or Email',
      typeLabel: 'Project Type',
      messageLabel: 'Project Scope & Timeline Details (Optional)',
      submitMail: 'Send Via Email Draft',
      submitTg: 'Send Directly on Telegram',
      successTitle: 'Brief Formulated!',
      successDesc: 'Opening your default communication client with the pre-filled brief.',
      backHome: 'Return to Homepage',
    },
    footer: {
      tagline: 'Websites for crypto projects that stand out.',
      quickLinks: 'Navigation',
      socials: 'Direct Channels',
      legal: 'Decentralized Frontends',
      rights: 'Independent Web3 Developer. All rights reserved.',
    },
    cmd: {
      searchPlaceholder: 'Search commands, projects, actions...',
      categoryNav: 'Navigation',
      categoryProjects: 'Projects & Case Studies',
      categoryActions: 'Interactive Actions',
      switchLang: 'Change Language / 语言 / 言語',
      switchLangSub: 'Switch site interface to another language',
      toggleTheme: 'Toggle Color Theme',
      toggleThemeSub: 'Switch between Dark and Light mode',
      toggleSound: 'Toggle Audio FX',
      toggleSoundSub: 'Turn cyber clicks and haptic sound effects on/off',
      close: 'ESC to close',
    },
    projects: {
      'grim-memecoin': {
        title: 'GRIM ($GRIM)',
        category: 'Web3 Terminal & Memecoin Portal',
        description:
          "The Internet's Worst Financial Decision. Multi-page Web3 terminal and interactive meme lab with real-time liquidity streams and dark cyberpunk aesthetics.",
        detailedDescription:
          'A full-featured multi-page Web3 terminal and portal built for the $GRIM memecoin ecosystem. Includes an interactive live transaction stream, real-time token price charts, a dedicated meme generator / cultural lab, dark cyber-cult visual identity, and seamless DEX integration.',
        features: [
          'Live terminal feed with real-time simulated DEX trade logs',
          'Custom interactive Meme Lab / Community Culture Generator',
          'Immersive dark cyber-editorial aesthetics & custom SVG glow animations',
          'Direct multi-tab portal navigation across tokenomics, memes & swap',
        ],
      },
      'pepeak-solana': {
        title: 'PEPEAK ($PEPEAK)',
        category: 'Solana Cultural Launchpad & DEX',
        description:
          'High-voltage Solana token launchpad featuring live price action, contract copy utility, high-contrast streetwear branding, and lightning-fast responsiveness.',
        detailedDescription:
          'A high-performance Solana memecoin launchpad landing page engineered for high conversion and social engagement. Features instant contract address verification, responsive mobile-first typography, dex charts link integration, and dynamic social proofing.',
        features: [
          'Instant 1-click contract address copy with haptic confirmation',
          'High-contrast streetwear brutalist typography & neon accents',
          'Dynamic price chart embeds & direct Raydium swap shortcuts',
          'Optimized for mobile viral traffic from Twitter / Telegram',
        ],
      },
      'ronnie-coin': {
        title: 'RONNIE ($RONNIE)',
        category: 'Narrative Memecoin Brand & Hub',
        description:
          'Playful character-driven crypto brand with responsive media gallery, live community ticker, roadmap milestones, and fluid micro-interactions.',
        detailedDescription:
          'A custom interactive brand hub and token portal for the $RONNIE ecosystem. Highlights include a custom illustration showcase, token distribution visualizer, direct links to liquidity pools, and community social feeds.',
        features: [
          'Interactive illustration and narrative media gallery',
          'Clear, engaging tokenomics breakdown with graphic charts',
          'Community roadmap milestones & upcoming catalyst trackers',
          'Fast lightweight asset delivery and mobile responsiveness',
        ],
      },
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      work: '制作実績',
      about: '概要',
      skills: 'スキル',
      contact: 'お問い合わせ',
      available: '新規案件受付中',
      search: '検索 ⌘K',
      theme: 'テーマ',
    },
    hero: {
      badge: '独立系 Web3 フロントエンドエンジニア',
      headline1: '際立つ',
      headline2: 'クリプトの',
      headline3: 'ための',
      headlineHighlight: 'WEBサイト。',
      subheadline:
        '暗号資産プロジェクト、ミームコイン、Web3スタートアップ向けのモダンで高速なWebサイトを企画・設計・開発します。',
      viewWork: '実績を見る',
      letsTalk: '案件を相談する',
      tagFrontend: 'フロントエンド',
      tagWeb3: 'Web3',
      tagCreative: 'クリエイティブ開発',
      tagChains: 'Solana & EVM対応',
    },
    work: {
      badge: '主な実績',
      title: '制作実績',
      subtitle:
        '本番稼働中のクライアント案件、ミームコインポータル、高パフォーマンスなWeb3フロントエンド。',
      deployments: '3件の本番デプロイ実績',
      caseStudy: '詳細を見る',
      launchLive: '本番サイトを開く',
      needLaunch: 'トークンやdAppのWebサイトが必要ですか？',
      needLaunchSub:
        '拡散性の高いミームコインのローンチサイトから、DEXスワップ連携の分散型ダッシュボードまで対応します。',
      startBrief: '案件を相談する',
      exploreServices: '提供サービス一覧',
      viewAll: '全プロジェクトを見る',
    },
    about: {
      badge: 'エンジニアプロフィール',
      title: '次世代Web3のフロントエンドを創造する。',
      role: 'Frontend & Web3',
      status: '受付中',
      speed: '24–48時間納品',
      motion: '洗練されたUX',
      principles: '開発理念',
      philosophies: 'エンジニアリング哲学',
      bioParagraphs: [
        'こんにちは、Senku（千空）です。クリプトプロジェクトのアイデアを、洗練された高パフォーマンスなWebサイトとして形にする独立系Web3エンジニアです。',
        '無駄な形式主義や不透明な工程は一切ありません。迅速な納品、美しいタイポグラフィ、暗号資産特有のUXを重視し、透明性の高い直接のコミュニケーションで開発を進めます。',
      ],
      principlesList: [
        {
          title: 'ピクセル精度の美学',
          description:
            'レイアウト、フォントサイズ、境界線、余白のすべてを視覚的な調和とインパクトのために調整します。',
        },
        {
          title: 'クリプトネイティブなUX',
          description:
            '直感的なトークノミクス表示、コントラクト検証、DEXスワップウィジェット、モバイルウォレット対応を徹底。',
        },
        {
          title: '圧倒的な表示速度',
          description:
            '1秒未満の初期表示、軽量なバンドルサイズ、無駄なオーバーヘッドの排除により最高の離脱防止を実現。',
        },
      ],
    },
    skills: {
      badge: '技術・提供サービス',
      title: 'スキル & 開発領域',
      subtitle:
        '魅力的なWeb3フロントエンド、RaydiumやUniswapのDEX連携からスマートコントラクト実装まで幅広く対応。',
      servicesTitle: '提供サービス',
      techTitle: 'コア技術スタック',
      ecosystemTitle: '対応Web3エコシステム & ライブラリ',
      hireCta: '開発を依頼する',
      servicesList: [
        {
          id: 's1',
          title: 'ミームコイン & トークンローンチサイト',
          description:
            'トークノミクス、ロードマップ、購入ポータル、ライブコントラクト検証を備えた高転換率のWebサイト。',
        },
        {
          id: 's2',
          title: 'Web3フロントエンド & dAppインターフェース',
          description:
            'ウォレット接続、DEXスワップ（Uniswap, Raydium）、ステーキング画面、オンチェーン連携の実装。',
        },
        {
          id: 's3',
          title: '独自ブランディング & レスポンシブ設計',
          description:
            'サイバー/ミニマルな世界観、現代的なタイポグラフィ、モバイルファーストの高速レイアウト。',
        },
        {
          id: 's4',
          title: 'パフォーマンス最適化 & 表示高速化',
          description:
            '超軽量コードベース、高速CDN配信、検索エンジン対策（SEO）、アクセシビリティ対応。',
        },
      ],
    },
    estimator: {
      badge: '費用・納期の目安シミュレーター',
      title: '案件見積もりシミュレーター',
      pricingNote: '安心の初期導入価格設定',
      step1: '1. 開発プランを選択:',
      step2: '2. 追加オプションを選択:',
      timeLabel: '費用の目安 · 想定納期:',
      bookTg: 'Telegramで依頼する',
      copyBrief: '要件をコピー',
      copied: '✓ コピー完了！',
    },
    contact: {
      badge: '直接相談',
      title: 'プロジェクトのご相談',
      subtitle:
        'ミームコイン、プロトコル、スタートアップ案件のご相談はTelegram、X、またはメールでお気軽にお寄せください。',
      directTitle: '連絡先一覧',
      formTitle: '簡易案件フォーム',
      nameLabel: 'お名前 または ハンドルネーム',
      contactLabel: 'Telegramアカウント または メールアドレス',
      typeLabel: '案件種別',
      messageLabel: 'プロジェクト概要・希望納期（任意）',
      submitMail: 'メール下書きを作成',
      submitTg: 'Telegramで送信する',
      successTitle: '要件を作成しました！',
      successDesc: 'メッセージアプリを開いて連絡を開始します。',
      backHome: 'トップページに戻る',
    },
    footer: {
      tagline: '際立つクリプトプロジェクトのためのWebサイト制作。',
      quickLinks: 'サイトマップ',
      socials: '連絡先チャンネル',
      legal: '分散型フロントエンド',
      rights: 'Senku (千空). All rights reserved.',
    },
    cmd: {
      searchPlaceholder: 'コマンド、プロジェクト、操作を検索...',
      categoryNav: 'ページ移動',
      categoryProjects: 'プロジェクト & 制作事例',
      categoryActions: 'クイックアクション',
      switchLang: '言語を変更 (Change Language)',
      switchLangSub: '表示言語を切り替えます',
      toggleTheme: 'テーマ切り替え',
      toggleThemeSub: 'ダークモード / ライトモードを切り替えます',
      toggleSound: '効果音のオン/オフ',
      toggleSoundSub: 'UIクリック音と触覚フィードバックの切り替え',
      close: 'ESCキーで閉じる',
    },
    projects: {
      'grim-memecoin': {
        title: 'GRIM ($GRIM)',
        category: 'Web3 ターミナル & ミームポータル',
        description:
          'ネット上で最も狂気的な金融実験。リアルタイム流動性ストリームとダークサイバーパンクな世界観を備えたマルチページWeb3ターミナル。',
        detailedDescription:
          '$GRIMミームコインエコシステム向けに構築された高機能マルチページWeb3ターミナル。リアルタイム取引ストリーム、ライブ価格チャート、ミーム文化生成ラボ、ダークサイバーの世界観を完全統合。',
        features: [
          'リアルタイムのDEX取引シミュレーションフィード',
          'コミュニティ向けインタラクティブ・ミーム生成ラボ',
          'ダークサイバーパンクな独自グラフィックとSVGアニメーション',
          'トークノミクス、ミーム、スワップの直感的マルチタブUI',
        ],
      },
      'pepeak-solana': {
        title: 'PEPEAK ($PEPEAK)',
        category: 'Solana カルチュラル・ローンチパッド',
        description:
          'ストリートウェア調のタイポグラフィとハイコントラストな配色。Solana高速取引とシームレスなコントラクト連携を融合したローンチハブ。',
        detailedDescription:
          '拡散性と高いコンバージョン率を追求したSolanaミームコインのローンチハブ。ワンクリックでのコントラクト検証、モバイル特化のタイポグラフィ、DexScreener連携を完備。',
        features: [
          '1タップでのコントラクトアドレス即時コピー',
          'ストリートカルチャーに触発されたハイコントラストデザイン',
          'リアルタイム価格チャート埋め込みとRaydiumスワップ連携',
          'X / Telegramからの拡散流入に最適化された高速表示',
        ],
      },
      'ronnie-coin': {
        title: 'RONNIE ($RONNIE)',
        category: 'ナラティブ型ミームコイン・ブランド',
        description:
          'キャラクター主導のポップなクリプトブランド。メディアギャラリー、リアルタイムコミュニティティッカー、ロードマップを滑らかに統合。',
        detailedDescription:
          '$RONNIEコミュニティのための対話型ブランドポータル。イラストレーションギャラリー、トークン配分チャート、流動性プールへのショートカットを洗練されたアニメーションで提示。',
        features: [
          'インタラクティブなイラストレーション・メディアギャラリー',
          '視覚的で分かりやすいトークノミクスのグラフィカル表示',
          'コミュニティ主導のロードマップと進捗トラッカー',
          'モバイルでも軽快に動作する超軽量アセット配信',
        ],
      },
    },
  },
  zh: {
    nav: {
      home: '首页',
      work: '作品案例',
      about: '关于我',
      skills: '技术能力',
      contact: '联系合作',
      available: '正在承接新项目',
      search: '搜索 ⌘K',
      theme: '主题',
    },
    hero: {
      badge: '独立 WEB3 前端工程师',
      headline1: '为加密项目',
      headline2: '打造引人注目的',
      headline3: '高转化率',
      headlineHighlight: '官方网站。',
      subheadline:
        '为加密货币项目、Meme代币、Web3初创团队与创始人设计并开发现代化、高速响应的Web界面。',
      viewWork: '查看作品',
      letsTalk: '立即沟通',
      tagFrontend: '前端开发',
      tagWeb3: 'Web3',
      tagCreative: '创意交互',
      tagChains: 'Solana & EVM 跨链支持',
    },
    work: {
      badge: '精选案例',
      title: '制作案例',
      subtitle:
        '由 Senku 设计与开发的线上生产级客户项目、Meme代币发射门户与高性能Web3前端应用。',
      deployments: '3 个正式部署案例',
      caseStudy: '查看详情',
      launchLive: '访问线上网站',
      needLaunch: '需要定制专属代币或 dApp 网站？',
      needLaunchSub:
        '从具备病毒式裂变能力的 Meme 币发射门户，到整合实时兑换与定制前端架构的去中心化看板。',
      startBrief: '发起项目需求',
      exploreServices: '浏览服务列表',
      viewAll: '查看全部案例',
    },
    about: {
      badge: '工程师履历',
      title: '为下一代 Web3 构建极致前端体验。',
      role: '前端 & Web3',
      status: '随时可接单',
      speed: '24–48小时交付',
      motion: '高品质交互',
      principles: '工程原则',
      philosophies: '开发理念',
      bioParagraphs: [
        '我是 Senku（千空），一名致力于将加密项目创意转化为精致、高速响应网站的独立 Web3 开发者。',
        '拒绝冗杂流程与繁琐推诿——通过透明、直接的沟通，以高水准的设计美感和极致速度协助您的代币或协议迅速上线。',
      ],
      principlesList: [
        {
          title: '像素级精准',
          description:
            '布局、字阶、边框和留白均针对视觉平衡与冲击力深度调校。',
        },
        {
          title: '加密原生 UX',
          description:
            '直观的代币经济学图表、合约地址即时验证、DEX兑换组件与移动端钱包完美适配。',
        },
        {
          title: '极致性能与速度',
          description:
            '秒级首屏加载、轻量代码包与零卡顿体验，最大化留存访问用户。',
        },
      ],
    },
    skills: {
      badge: '技能与开发领域',
      title: '技术能力与服务范围',
      subtitle:
        '涵盖创意 Web3 前端、Raydium/Uniswap DEX 整合、到智能合约全链路技术能力。',
      servicesTitle: '承接服务',
      techTitle: '核心技术栈',
      ecosystemTitle: 'Web3 生态与工具库集成经验',
      hireCta: '预约开发合作',
      servicesList: [
        {
          id: 's1',
          title: 'Meme 币与代币发射门户',
          description:
            '具备代币经济学、路线图、购买通道与合约即时验证的高转化页面。',
        },
        {
          id: 's2',
          title: 'Web3 前端与 dApp 界面',
          description:
            '钱包连接、DEX 兑换组件（Uniswap, Raydium）、质押看板与链上交互。',
        },
        {
          id: 's3',
          title: '专属品牌视觉与响应式设计',
          description:
            '赛博朋克/极简美学风格、现代排版布局与移动端优先架构。',
        },
        {
          id: 's4',
          title: '性能调优与前端审计',
          description:
            '超轻量构建、秒级加载、SEO 优化与可访问性规范。',
        },
      ],
    },
    estimator: {
      badge: '实时预算与工期估算器',
      title: '预估您的 Web3 项目',
      pricingNote: '亲民友好的新手起步价',
      step1: '1. 选择项目级别:',
      step2: '2. 定制附加选项:',
      timeLabel: '预估投资 · 交付周期:',
      bookTg: '通过 Telegram 预订',
      copyBrief: '复制需求单',
      copied: '✓ 需求单已复制！',
    },
    contact: {
      badge: '直接咨询',
      title: '启动您的项目',
      subtitle:
        '无论是 Meme 币、DeFi 协议还是创意项目，欢迎通过 Telegram、X 或邮件直接交流。',
      directTitle: '直接联系渠道',
      formTitle: '发送快速需求单',
      nameLabel: '您的称呼 / 代号',
      contactLabel: 'Telegram 账号或电子邮箱',
      typeLabel: '项目类型',
      messageLabel: '项目范围与预期时间（选填）',
      submitMail: '生成邮件草稿',
      submitTg: '直接发送至 Telegram',
      successTitle: '需求单已生成！',
      successDesc: '正在打开您的通讯工具以便直接沟通。',
      backHome: '返回首页',
    },
    footer: {
      tagline: '为渴望脱颖而出的加密项目打造专属网站。',
      quickLinks: '页面导航',
      socials: '直接渠道',
      legal: '去中心化前端',
      rights: 'Senku (千空). 保留所有权利。',
    },
    cmd: {
      searchPlaceholder: '搜索页面、项目、命令...',
      categoryNav: '页面导航',
      categoryProjects: '项目案例',
      categoryActions: '快捷操作',
      switchLang: '切换语言 (Change Language)',
      switchLangSub: '在多国语言之间快速切换',
      toggleTheme: '切换颜色主题',
      toggleThemeSub: '在深色与浅色模式间切换',
      toggleSound: '音效开关',
      toggleSoundSub: '开启或关闭点击声与触感反馈',
      close: 'ESC 关闭',
    },
    projects: {
      'grim-memecoin': {
        title: 'GRIM ($GRIM)',
        category: 'Web3 终端 & Meme 币门户',
        description:
          '互联网最疯狂的金融实验。具备实时流动性数据流与赛博暗黑美学的多页面 Web3 终端。',
        detailedDescription:
          '为 $GRIM 生态打造的全功能多页面 Web3 终端与社区实验室。集成了实时交易流、代币走势图、社区 Meme 生成器与暗黑赛博视觉体系。',
        features: [
          '实时 DEX 交易模拟数据流',
          '专属交互式 Meme 社区文化生成实验室',
          '沉浸式暗黑赛博视觉与定制 SVG 动效',
          '代币经济学、Meme 与 Swap 的多标签切换',
        ],
      },
      'pepeak-solana': {
        title: 'PEPEAK ($PEPEAK)',
        category: 'Solana 潮流发射台 & DEX',
        description:
          '高压电感 Solana 代币发射台，融合实时行情、合约快速复制与高对比度街头潮牌美学。',
        detailedDescription:
          '专为高转化率与社交裂变设计的 Solana Meme 币着陆页。具备 1 键合约验证、移动端优先排版、DexScreener 图表与 Raydium 快捷入口。',
        features: [
          '1 键复制合约地址并带触感确认',
          '高对比度街头粗犷主义排版与荧光绿配色',
          '实时价格图表嵌入与 Raydium 直达',
          '针对 X / Telegram 移动端病毒式流量专项优化',
        ],
      },
      'ronnie-coin': {
        title: 'RONNIE ($RONNIE)',
        category: '叙事型 Meme 币品牌官网',
        description:
          '趣味角色驱动的加密品牌，具备响应式画廊、社区动态滚动栏、路线图节点与流体微交互。',
        detailedDescription:
          '为 $RONNIE 生态量身打造的互动品牌中心与代币门户。包含定制插画展区、代币分布图、流动性池直达与社区动态追踪。',
        features: [
          '交互式插画与叙事媒体展示画廊',
          '清晰直观的代币经济学图形分解',
          '社区路线图里程碑与催化剂跟踪器',
          '极速轻量化资源加载与全屏响应式设计',
        ],
      },
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      work: 'Proyectos',
      about: 'Perfil',
      skills: 'Habilidades',
      contact: 'Contacto',
      available: 'Disponible para proyectos',
      search: 'Buscar ⌘K',
      theme: 'Tema',
    },
    hero: {
      badge: 'DESARROLLADOR WEB3 INDEPENDIENTE',
      headline1: 'SITIOS WEB',
      headline2: 'PARA PROYECTOS',
      headline3: 'CRIPTO QUE',
      headlineHighlight: 'DESTACAN.',
      subheadline:
        'Diseño y desarrollo sitios web modernos para proyectos cripto, memecoins, startups Web3 y fundadores.',
      viewWork: 'VER PROYECTOS',
      letsTalk: 'HABLEMOS',
      tagFrontend: 'Frontend',
      tagWeb3: 'Web3',
      tagCreative: 'Desarrollo Creativo',
      tagChains: 'Solana y EVM',
    },
    work: {
      badge: 'Proyectos Destacados',
      title: 'Proyectos Seleccionados',
      subtitle:
        'Sitios en producción para clientes, portales de memecoins y aplicaciones Web3 diseñadas por Senku.',
      deployments: '3 Proyectos en Producción',
      caseStudy: 'Ver Estudio',
      launchLive: 'Abrir Sitio Web',
      needLaunch: '¿Tienes un token, protocolo o dApp por construir?',
      needLaunchSub:
        'Desde portales virales de memecoins hasta dashboards descentralizados con swaps en vivo.',
      startBrief: 'Enviar Requisitos',
      exploreServices: 'Ver Servicios',
      viewAll: 'Ver Todos los Proyectos',
    },
    about: {
      badge: 'Perfil de Ingeniería',
      title: 'Construyendo para la nueva ola de Web3.',
      role: 'Frontend y Web3',
      status: 'Disponible Ahora',
      speed: 'Lanzamiento 24–48h',
      motion: 'UX a Medida',
      principles: 'Principios de Ingeniería',
      philosophies: 'Filosofía',
      bioParagraphs: [
        'Soy Senku, desarrollador independiente enfocado en transformar ideas cripto en sitios web pulidos y de alto rendimiento.',
        'Sin procesos burocráticos ni opacos: colaboración directa y transparente para lanzar tu memecoin, protocolo o startup con máxima velocidad y estética de primer nivel.',
      ],
      principlesList: [
        {
          title: 'Precisión al Píxel',
          description:
            'Cada diseño, tipografía y espacio está calibrado para máximo equilibrio e impacto visual.',
        },
        {
          title: 'UX Nativo Cripto',
          description:
            'Gráficos de tokenomics claros, contratos verificables al instante y compatibilidad total con wallets móviles.',
        },
        {
          title: 'Velocidad y Rendimiento',
          description:
            'Tiempos de carga inferiores a un segundo, código ultra ligero y cero latencia.',
        },
      ],
    },
    skills: {
      badge: 'Habilidades y Capacidades',
      title: 'Habilidades y Servicios',
      subtitle:
        'Capacidad técnica completa desde frontends creativos para Web3 hasta contratos inteligentes Solidity.',
      servicesTitle: 'Lo Que Construyo',
      techTitle: 'Stack Tecnológico',
      ecosystemTitle: 'Ecosistema Web3 e Integraciones',
      hireCta: 'Contratar para Proyecto',
      servicesList: [
        {
          id: 's1',
          title: 'Sitios Web para Memecoins y Tokens',
          description:
            'Páginas de alto impacto con tokenomics, roadmap y verificación de contrato en vivo.',
        },
        {
          id: 's2',
          title: 'Frontends Web3 e Interfaces dApp',
          description:
            'Conexión de wallets, swaps DEX (Uniswap, Raydium) y paneles de control.',
        },
        {
          id: 's3',
          title: 'Branding y Diseño Responsive',
          description:
            'Dirección visual moderna, estilo ciber-editorial y arquitectura móvil de alta velocidad.',
        },
        {
          id: 's4',
          title: 'Optimización y Rendimiento',
          description:
            'Carga ultrarrápida, optimización SEO y marcado accesible de primer nivel.',
        },
      ],
    },
    estimator: {
      badge: 'Calculadora de Costos y Plazos',
      title: 'Estima Tu Proyecto Web3',
      pricingNote: 'Tarifas Accesibles para Empezar',
      step1: '1. Selecciona el Paquete:',
      step2: '2. Personaliza Opciones:',
      timeLabel: 'Inversión Estimada · Tiempo de Entrega:',
      bookTg: 'Reservar por Telegram',
      copyBrief: 'Copiar Resumen',
      copied: '✓ ¡Resumen Copiado!',
    },
    contact: {
      badge: 'Contacto Directo',
      title: 'Inicia un Proyecto',
      subtitle:
        '¿Tienes en mente una memecoin, protocolo o startup? Escríbeme por Telegram, X o correo.',
      directTitle: 'Canales Directos',
      formTitle: 'Enviar Propuesta Rápida',
      nameLabel: 'Tu Nombre o Alias',
      contactLabel: 'Usuario de Telegram o Correo',
      typeLabel: 'Tipo de Proyecto',
      messageLabel: 'Alcance y Plazo Estimado (Opcional)',
      submitMail: 'Enviar Borrador por Email',
      submitTg: 'Enviar Directo a Telegram',
      successTitle: '¡Propuesta Creada!',
      successDesc: 'Abriendo tu cliente de mensajería para iniciar contacto.',
      backHome: 'Volver al Inicio',
    },
    footer: {
      tagline: 'Sitios web para proyectos cripto que quieren destacar.',
      quickLinks: 'Navegación',
      socials: 'Canales Directos',
      legal: 'Frontends Descentralizados',
      rights: 'Senku. Todos los derechos reservados.',
    },
    cmd: {
      searchPlaceholder: 'Buscar comandos, proyectos, acciones...',
      categoryNav: 'Navegación',
      categoryProjects: 'Proyectos y Casos de Estudio',
      categoryActions: 'Acciones Interactivas',
      switchLang: 'Cambiar Idioma (Change Language)',
      switchLangSub: 'Seleccionar idioma de la interfaz',
      toggleTheme: 'Cambiar Tema de Color',
      toggleThemeSub: 'Alternar entre modo oscuro y claro',
      toggleSound: 'Alternar Efectos de Sonido',
      toggleSoundSub: 'Activar o desactivar clics y sonidos hápticos',
      close: 'ESC para cerrar',
    },
    projects: {
      'grim-memecoin': {
        title: 'GRIM ($GRIM)',
        category: 'Terminal Web3 y Portal de Memecoin',
        description:
          'La peor decisión financiera de Internet. Terminal Web3 interactivo y laboratorio de memes con flujo de liquidez en tiempo real.',
        detailedDescription:
          'Terminal multipágina y portal completo construido para el ecosistema $GRIM. Flujo de operaciones en vivo, gráficos de precios, laboratorio cultural de memes e integración DEX fluida.',
        features: [
          'Transmisión en vivo con simulación de operaciones DEX',
          'Laboratorio interactivo de memes y cultura comunitaria',
          'Estética ciber-editorial oscura con animaciones SVG brillantes',
          'Navegación multipestaña fluida entre tokenomics, memes y swap',
        ],
      },
      'pepeak-solana': {
        title: 'PEPEAK ($PEPEAK)',
        category: 'Plataforma Cultural en Solana & DEX',
        description:
          'Plataforma de alta energía en Solana con cotizaciones en vivo, copia de contrato rápida y diseño streetwear de alto contraste.',
        detailedDescription:
          'Página de aterrizaje en Solana diseñada para alta conversión y viralidad social. Copia instantánea de contrato, tipografía optimizada para móviles y accesos directos a Raydium.',
        features: [
          'Copia de contrato con un toque y respuesta háptica',
          'Tipografía brutalista de alto contraste con acentos neón',
          'Gráficos de precios integrados y accesos directos a Raydium',
          'Optimizado para tráfico viral desde X y Telegram',
        ],
      },
      'ronnie-coin': {
        title: 'RONNIE ($RONNIE)',
        category: 'Marca y Hub de Memecoin con Historia',
        description:
          'Marca cripto con personaje carismático, galería interactiva, teletipo comunitario y microinteracciones fluidas.',
        detailedDescription:
          'Portal de marca interactivo para el ecosistema $RONNIE. Destaca galería de ilustraciones, desglose visual de tokenomics y enlaces a pools de liquidez.',
        features: [
          'Galería interactiva de ilustraciones y narrativa',
          'Desglose claro de tokenomics con gráficos visuales',
          'Hitos del roadmap comunitario y seguimiento de catalizadores',
          'Entrega ultrarrápida de recursos y diseño responsive total',
        ],
      },
    },
  },
  ko: {
    nav: {
      home: '홈',
      work: '프로젝트',
      about: '소개',
      skills: '기술스택',
      contact: '문의',
      available: '프로젝트 의뢰 가능',
      search: '검색 ⌘K',
      theme: '테마',
    },
    hero: {
      badge: '독립형 WEB3 프론트엔드 개발자',
      headline1: '차별화된',
      headline2: '크립토 프로젝트를',
      headline3: '위한 최고의',
      headlineHighlight: '웹사이트.',
      subheadline:
        '크립토 프로젝트, 밈코인, Web3 스타트업 및 파운더를 위한 고성능 모던 웹사이트를 기획·디자인·개발합니다.',
      viewWork: '포트폴리오 보기',
      letsTalk: '프로젝트 문의하기',
      tagFrontend: '프론트엔드',
      tagWeb3: 'Web3',
      tagCreative: '크리에이티브 인터랙션',
      tagChains: 'Solana & EVM 지원',
    },
    work: {
      badge: '주요 프로젝트',
      title: '제작 포트폴리오',
      subtitle:
        'Senku가 직접 디자인 및 개발한 실서비스 배포 프로젝트, 밈코인 포털 및 Web3 프론트엔드입니다.',
      deployments: '3개 상용 서비스 배포',
      caseStudy: '상세 분석 보기',
      launchLive: '라이브 사이트 방문',
      needLaunch: '새로운 토큰이나 dApp 웹사이트가 필요하신가요?',
      needLaunchSub:
        '바이럴 밈코인 런칭 포털부터 스왑 위젯이 연동된 탈중앙화 대시보드까지 완벽히 구현합니다.',
      startBrief: '프로젝트 의뢰서 작성',
      exploreServices: '서비스 목록 보기',
      viewAll: '전체 프로젝트 보기',
    },
    about: {
      badge: '엔지니어 프로필',
      title: '차세대 Web3의 프론트엔드를 구축합니다.',
      role: '프론트엔드 & Web3',
      status: '현재 의뢰 가능',
      speed: '24–48시간 내 배포',
      motion: '정교한 UX',
      principles: '엔지니어링 원칙',
      philosophies: '개발 철학',
      bioParagraphs: [
        '저는 크립토 프로젝트 아이디어를 반응형 고성능 웹사이트로 완성하는 독립형 Web3 개발자 Senku(센쿠)입니다.',
        '불필요한 형식주의나 지연 없이, 투명하고 직접적인 커뮤니케이션을 통해 귀하의 밈코인이나 프로토콜을 신속하고 감각적으로 런칭합니다.',
      ],
      principlesList: [
        {
          title: '픽셀 단위의 정밀함',
          description:
            '레이아웃, 폰트 스케일, 경계선과 여백을 완벽한 시각적 균형감으로 설계합니다.',
        },
        {
          title: '크립토 네이티브 UX',
          description:
            '직관적인 토크노믹스, 실시간 컨트랙트 검증, 스왑 위젯 및 모바일 지갑 완벽 대응.',
        },
        {
          title: '초고속 로딩과 성능',
          description:
            '1초 미만의 첫 페이지 로딩, 초경량 번들 크기, 지연 없는 렌더링.',
        },
      ],
    },
    skills: {
      badge: '기술 및 역량',
      title: '기술 스택 및 제공 서비스',
      subtitle:
        '크리에이티브 Web3 프론트엔드, Raydium/Uniswap DEX 연동부터 Solidity 스마트 컨트랙트까지 포괄적인 기술력을 제공합니다.',
      servicesTitle: '제공하는 서비스',
      techTitle: '핵심 기술 스택',
      ecosystemTitle: 'Web3 생태계 및 라이브러리 연동 경험',
      hireCta: '개발 의뢰하기',
      servicesList: [
        {
          id: 's1',
          title: '밈코인 & 토큰 런칭 웹사이트',
          description:
            '토크노믹스, 로드맵, 구매 포털, 컨트랙트 주소 복사가 탑재된 고전환율 랜딩 페이지.',
        },
        {
          id: 's2',
          title: 'Web3 프론트엔드 & dApp 인터페이스',
          description:
            '지갑 연결, DEX 스왑(Uniswap, Raydium), 스테이킹 대시보드 및 온체인 상호작용.',
        },
        {
          id: 's3',
          title: '브랜드 아이덴티티 & 반응형 디자인',
          description:
            '사이버/모던 비주얼 디렉션, 모바일 퍼스트 고성능 레이아웃.',
        },
        {
          id: 's4',
          title: '성능 튜닝 및 최적화',
          description:
            '경량화 빌드, 빠른 CDN 로딩, 검색 엔진 최적화(SEO) 및 접근성 준수.',
        },
      ],
    },
    estimator: {
      badge: '실시간 견적 및 일정 계산기',
      title: 'Web3 프로젝트 견적 계산기',
      pricingNote: '합리적인 스타트업 맞춤 단가',
      step1: '1. 프로젝트 등급 선택:',
      step2: '2. 추가 옵션 선택:',
      timeLabel: '예상 투자 비용 · 제작 기간:',
      bookTg: 'Telegram으로 예약하기',
      copyBrief: '의뢰서 복사하기',
      copied: '✓ 의뢰서가 복사되었습니다!',
    },
    contact: {
      badge: '직접 문의',
      title: '프로젝트 시작하기',
      subtitle:
        '밈코인, 프로토콜, 스타트업 프로젝트 문의는 Telegram, X, 이메일로 언제든 연락주세요.',
      directTitle: '직접 연락 채널',
      formTitle: '간편 프로젝트 의뢰서',
      nameLabel: '성함 또는 닉네임',
      contactLabel: 'Telegram 아이디 또는 이메일',
      typeLabel: '프로젝트 유형',
      messageLabel: '프로젝트 범위 및 희망 일정 (선택사항)',
      submitMail: '이메일 초안 생성',
      submitTg: 'Telegram으로 바로 전송',
      successTitle: '의뢰서가 작성되었습니다!',
      successDesc: '메신저 또는 이메일 앱을 실행하여 바로 대화를 시작합니다.',
      backHome: '홈으로 돌아가기',
    },
    footer: {
      tagline: '차별화된 크립토 프로젝트를 위한 맞춤형 웹사이트 제작.',
      quickLinks: '사이트맵',
      socials: '연락 채널',
      legal: '탈중앙화 프론트엔드',
      rights: 'Senku. All rights reserved.',
    },
    cmd: {
      searchPlaceholder: '페이지, 프로젝트, 명령어 검색...',
      categoryNav: '페이지 이동',
      categoryProjects: '프로젝트 및 사례',
      categoryActions: '빠른 동작',
      switchLang: '언어 변경 (Change Language)',
      switchLangSub: '인터페이스 언어를 변경합니다',
      toggleTheme: '색상 테마 전환',
      toggleThemeSub: '다크 모드와 라이트 모드를 전환합니다',
      toggleSound: '효과음 켜기/끄기',
      toggleSoundSub: '클릭 사운드 및 햅틱 효과 토글',
      close: 'ESC 키로 닫기',
    },
    projects: {
      'grim-memecoin': {
        title: 'GRIM ($GRIM)',
        category: 'Web3 터미널 & 밈코인 포털',
        description:
          '인터넷 역사상 가장 도발적인 금융 실험. 실시간 유동성 스트림과 다크 사이버펑크 미학이 결합된 멀티페이지 터미널.',
        detailedDescription:
          '$GRIM 생태계를 위해 제작된 풀스택 Web3 터미널 포털. 실시간 거래 스트림, 토큰 가격 차트, 커뮤니티 밈 랩, DEX 연동 완벽 탑재.',
        features: [
          '실시간 DEX 거래 시뮬레이션 스트림',
          '커뮤니티 인터랙티브 밈 생성 연구소',
          '다크 사이버 무드와 커스텀 SVG 네온 애니메이션',
          '토크노믹스, 밈, 스왑 간 매끄러운 탭 전환',
        ],
      },
      'pepeak-solana': {
        title: 'PEPEAK ($PEPEAK)',
        category: 'Solana 컬처 런칭패드 & DEX',
        description:
          '스트리트웨어 타이포그래피와 고대비 네온 컬러. 실시간 가격 차트와 원터치 컨트랙트 복사가 결합된 Solana 런치패드.',
        detailedDescription:
          '높은 전환율과 바이럴 확산을 위해 설계된 Solana 밈코인 랜딩 페이지. 즉각적인 컨트랙트 검증, 모바일 최적화 레이아웃, Raydium 스왑 바로가기 제공.',
        features: [
          '1회 탭으로 컨트랙트 주소 즉시 복사 및 햅틱 확인',
          '고대비 스트리트웨어 타이포그래피와 네온 액센트',
          '실시간 가격 차트 임베드 및 Raydium 스왑 연동',
          'X / Telegram 모바일 바이럴 유입에 최적화된 로딩 속도',
        ],
      },
      'ronnie-coin': {
        title: 'RONNIE ($RONNIE)',
        category: '내러티브 밈코인 브랜드 허브',
        description:
          '매력적인 캐릭터 기반의 크립토 브랜드. 반응형 미디어 갤러리, 커뮤니티 티커, 로드맵 마일스톤과 유려한 인터랙션.',
        detailedDescription:
          '$RONNIE 커뮤니티를 위한 대화형 브랜드 허브 및 토큰 포털. 일러스트 갤러리, 토크노믹스 시각화, 유동성 풀 바로가기 완비.',
        features: [
          '인터랙티브 일러스트레이션 및 스토리 갤러리',
          '그래픽 차트를 통한 명확한 토크노믹스 설명',
          '커뮤니티 로드맵 진행률 및 카탈리스트 트래커',
          '가볍고 빠른 에셋 전송 및 모바일 완벽 대응',
        ],
      },
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      work: 'Projets',
      about: 'Profil',
      skills: 'Compétences',
      contact: 'Contact',
      available: 'Disponible pour projets',
      search: 'Rechercher ⌘K',
      theme: 'Thème',
    },
    hero: {
      badge: 'DÉVELOPPEUR WEB3 INDÉPENDANT',
      headline1: 'DES SITES WEB',
      headline2: 'POUR PROJETS',
      headline3: 'CRYPTO QUI SE',
      headlineHighlight: 'DÉMARQUENT.',
      subheadline:
        'Je conçois et développe des sites modernes pour projets crypto, memecoins, startups Web3 et fondateurs.',
      viewWork: 'VOIR LES PROJETS',
      letsTalk: 'PARLONS-EN',
      tagFrontend: 'Frontend',
      tagWeb3: 'Web3',
      tagCreative: 'Développement Créatif',
      tagChains: 'Solana & EVM',
    },
    work: {
      badge: 'Projets Sélectionnés',
      title: 'Projets Sélectionnés',
      subtitle:
        'Réalisations clients en production, portails memecoins et interfaces Web3 performantes créées par Senku.',
      deployments: '3 Déploiements en Production',
      caseStudy: 'Étude de Cas',
      launchLive: 'Ouvrir le Site',
      needLaunch: 'Vous avez un token, protocole ou une dApp à construire ?',
      needLaunchSub:
        'Des portails de memecoins viraux aux tableaux de bord décentralisés avec swap en direct.',
      startBrief: 'Lancer un Brief',
      exploreServices: 'Découvrir les Services',
      viewAll: 'Voir Tous les Projets',
    },
    about: {
      badge: "Profil d'Ingénierie",
      title: 'Bâtir pour la prochaine vague du Web3.',
      role: 'Frontend & Web3',
      status: 'Disponible Immédiatement',
      speed: 'Lancement en 24–48h',
      motion: 'Expérience Sur-Mesure',
      principles: "Principes d'Ingénierie",
      philosophies: 'Philosophie',
      bioParagraphs: [
        'Je suis Senku, développeur indépendant dédié à transformer les concepts crypto en sites web réactifs et soignés.',
        'Aucun processus opaque ni lenteur inutile : une collaboration directe et limpide pour lancer votre memecoin, protocole ou startup avec vitesse et exigence esthétique.',
      ],
      principlesList: [
        {
          title: 'Précision au Pixel',
          description:
            'Chaque composition, typographie et marge est ajustée pour un équilibre visuel parfait.',
        },
        {
          title: 'UX Crypto-Natif',
          description:
            'Graphiques de tokenomics clairs, vérification instantanée des contrats et support mobile impeccable.',
        },
        {
          title: 'Performance & Vitesse',
          description:
            'Chargement sous la seconde, bundles légers et fluidité absolue.',
        },
      ],
    },
    skills: {
      badge: 'Compétences & Capacités',
      title: 'Compétences & Offres',
      subtitle:
        'Un savoir-faire technique complet allant du frontend Web3 créatif et intégrations DEX aux smart contracts Solidity.',
      servicesTitle: 'Ce Que Je Développe',
      techTitle: 'Stack Technique',
      ecosystemTitle: 'Écosystème Web3 & Outils Intégrés',
      hireCta: 'Réserver un Projet',
      servicesList: [
        {
          id: 's1',
          title: 'Sites Web pour Memecoins & Tokens',
          description:
            'Landing pages à haute conversion avec tokenomics, roadmap et contrat vérifiable.',
        },
        {
          id: 's2',
          title: 'Frontends Web3 & Interfaces dApp',
          description:
            'Connexion de portefeuilles, swaps DEX (Uniswap, Raydium) et dashboards on-chain.',
        },
        {
          id: 's3',
          title: 'Branding & Design Responsive',
          description:
            'Direction artistique moderne, univers cyber-éditorial et réactivité mobile totale.',
        },
        {
          id: 's4',
          title: 'Optimisation & Audit de Vitesse',
          description:
            'Builds ultra-légers, affichage instantané, optimisation SEO et accessibilité.',
        },
      ],
    },
    estimator: {
      badge: 'Simulateur de Coût & Délais',
      title: 'Estimez Votre Projet Web3',
      pricingNote: 'Tarifs Accessibles pour Démarrer',
      step1: '1. Choisissez la Formule:',
      step2: '2. Personnalisez les Options:',
      timeLabel: 'Investissement Estimé · Délai de Livraison:',
      bookTg: 'Réserver via Telegram',
      copyBrief: 'Copier le Brief',
      copied: '✓ Brief Copié !',
    },
    contact: {
      badge: 'Demande Directe',
      title: 'Démarrer un Projet',
      subtitle:
        'Vous avez un memecoin, un protocole ou une startup en vue ? Contactez-moi directement sur Telegram, X ou par email.',
      directTitle: 'Canaux Directs',
      formTitle: 'Formulaire de Brief Rapide',
      nameLabel: 'Votre Nom ou Alias',
      contactLabel: 'Identifiant Telegram ou Email',
      typeLabel: 'Type de Projet',
      messageLabel: 'Portée du Projet & Calendrier (Optionnel)',
      submitMail: "Générer le Brouillon d'Email",
      submitTg: 'Envoyer Directement sur Telegram',
      successTitle: 'Brief Formulé !',
      successDesc: 'Ouverture de votre application de messagerie pour échanger.',
      backHome: "Retour à l'Accueil",
    },
    footer: {
      tagline: 'Des sites web pour projets crypto qui veulent se démarquer.',
      quickLinks: 'Navigation',
      socials: 'Canaux Directs',
      legal: 'Frontends Décentralisés',
      rights: 'Senku. Tous droits réservés.',
    },
    cmd: {
      searchPlaceholder: 'Rechercher pages, projets, commandes...',
      categoryNav: 'Navigation',
      categoryProjects: 'Projets & Études de Cas',
      categoryActions: 'Actions Interactives',
      switchLang: 'Changer de Langue (Change Language)',
      switchLangSub: "Basculer la langue de l'interface",
      toggleTheme: 'Basculer le Thème',
      toggleThemeSub: 'Basculer entre mode sombre et clair',
      toggleSound: 'Effets Sonores On/Off',
      toggleSoundSub: 'Activer ou désactiver les clics et sons haptiques',
      close: 'ESC pour fermer',
    },
    projects: {
      'grim-memecoin': {
        title: 'GRIM ($GRIM)',
        category: 'Terminal Web3 & Portail Memecoin',
        description:
          "La pire décision financière d'Internet. Terminal Web3 multi-pages et laboratoire de mèmes avec flux de liquidité en direct.",
        detailedDescription:
          "Un terminal et portail complet conçu pour l'écosystème $GRIM. Flux de transactions en direct, graphiques de prix, laboratoire communautaire de mèmes et intégration DEX fluide.",
        features: [
          'Flux de transactions DEX simulé en temps réel',
          'Meme Lab interactif et générateur de culture communautaire',
          'Identité visuelle cyber-sombre avec animations SVG lumineuses',
          'Navigation multi-onglets fluide entre tokenomics, memes et swap',
        ],
      },
      'pepeak-solana': {
        title: 'PEPEAK ($PEPEAK)',
        category: 'Launchpad Culturel sur Solana & DEX',
        description:
          'Launchpad Solana à haute énergie avec cours en direct, copie de contrat rapide et style streetwear à fort contraste.',
        detailedDescription:
          'Landing page Solana conçue pour une conversion maximale et un partage viral. Vérification instantanée de contrat, typographie mobile-first et raccourcis vers Raydium.',
        features: [
          'Copie de contrat en 1 clic avec confirmation haptique',
          'Typographie streetwear brutale à fort contraste et néons',
          'Graphiques de prix intégrés et raccourcis de swap Raydium',
          'Optimisé pour le trafic viral mobile depuis X et Telegram',
        ],
      },
      'ronnie-coin': {
        title: 'RONNIE ($RONNIE)',
        category: 'Marque & Hub Memecoin Narratif',
        description:
          'Marque crypto ludique avec galerie multimédia responsive, bandeau communautaire en direct et micro-interactions soignées.',
        detailedDescription:
          "Portail de marque interactif pour l'écosystème $RONNIE. Galerie d'illustrations sur-mesure, visualiseur de distribution de tokens et liens directs vers les pools de liquidité.",
        features: [
          "Galerie interactive d'illustrations et récits",
          'Présentation claire des tokenomics avec graphiques visuels',
          'Feuille de route communautaire et suivi des jalons',
          'Chargement ultra-rapide des assets et réactivité mobile totale',
        ],
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  supportedLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('senku-language') as Language | null;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) return saved;
      // Auto-detect browser language
      const navLang = navigator.language ? navigator.language.toLowerCase() : '';
      if (navLang.startsWith('ja')) return 'ja';
      if (navLang.startsWith('zh')) return 'zh';
      if (navLang.startsWith('es')) return 'es';
      if (navLang.startsWith('ko')) return 'ko';
      if (navLang.startsWith('fr')) return 'fr';
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      localStorage.setItem('senku-language', language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    const list: Language[] = ['en', 'ja', 'zh', 'es', 'ko', 'fr'];
    setLanguageState((prev) => {
      const idx = list.indexOf(prev);
      return list[(idx + 1) % list.length];
    });
  };

  const t = DICTIONARY[language] || DICTIONARY.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
