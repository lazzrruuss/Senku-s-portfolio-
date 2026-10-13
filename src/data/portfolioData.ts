export interface Project {
  id: string;
  number: string;
  title: string;
  badge: 'Live Project' | 'Featured Project' | 'Concept Project' | 'Personal Project';
  category: string;
  description: string;
  detailedDescription: string;
  tags: string[];
  year: string;
  demoUrl?: string;
  repoUrl?: string;
  actionText: string;
  actionType: 'demo' | 'repo';
  features: string[];
  highlights: { label: string; value: string }[];
  metrics?: { label: string; value: string }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TechItem {
  name: string;
  category: string;
  description: string;
  level: string;
}

export const PORTFOLIO_DATA = {
  developer: {
    name: 'Senku',
    title: 'Independent Web3 Developer',
    headline: 'Websites for crypto projects that want to stand out.',
    subheadline:
      'I design and build modern websites for crypto projects, memecoins, Web3 startups and founders.',
    availability: 'Available for projects',
    location: 'Remote / Global (UTC timezone aligned)',
    contactEmail: 'adukudavidmi713@gmail.com',
    telegramHandle: 'dragonofthe_westt',
    telegramUrl: 'https://t.me/dragonofthe_westt',
    xHandle: 'web3_biggie',
    xUrl: 'https://x.com/web3_biggie',
    bioParagraphs: [
      "I'm Senku, an independent developer focused on turning crypto project ideas into polished, responsive websites. I believe that decentralized tech deserves exceptional frontend craftsmanship.",
      'No corporate fluff or opaque processes—just direct, transparent collaboration to bring your memecoin, protocol, or startup online with speed and high-end aesthetic precision.',
    ],
    experienceYears: '4+',
    completedProjects: '30+',
    codePrinciples: [
      {
        title: 'Pixel Precision',
        description: 'Every layout, font size, border, and whitespace is tuned for visual balance and impact.',
      },
      {
        title: 'Crypto-Native UX',
        description: 'Intuitive tokenomics charts, live contracts display, swap widget readiness, and mobile wallet responsiveness.',
      },
      {
        title: 'Performance & Speed',
        description: 'Sub-second load times, lightweight bundle sizes, and zero laggy overhead.',
      },
    ],
  },

  projects: [
    {
      id: 'grim-memecoin',
      number: '01 / 04',
      title: 'GRIM ($GRIM)',
      badge: 'Live Project',
      category: 'Web3 Terminal & Memecoin Portal',
      description:
        "The Internet's Worst Financial Decision. Multi-page Web3 terminal and interactive meme lab with real-time liquidity streams and dark cyberpunk aesthetics.",
      detailedDescription:
        "A full-featured multi-page Web3 terminal and portal built for the $GRIM memecoin ecosystem. Includes an interactive live transaction stream, real-time token price charts, a dedicated meme generator / cultural lab, dark cyber-cult visual identity, and seamless DEX integration.",
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      year: '2024',
      demoUrl: 'https://work-sample-grim.vercel.app/memes',
      actionText: 'Visit Live Site',
      actionType: 'demo',
      features: [
        'Live terminal feed with real-time simulated DEX trade logs',
        'Custom interactive Meme Lab / Community Culture Generator',
        'Immersive dark cyber-editorial aesthetics & custom SVG glow animations',
        'Direct multi-tab portal navigation across tokenomics, memes & swap',
      ],
      highlights: [
        { label: 'Platform', value: 'Web3 Terminal' },
        { label: 'Token', value: '$GRIM' },
        { label: 'Status', value: 'Production Ready' },
      ],
      metrics: [
        { label: 'Supply', value: '1,000,000,000' },
        { label: 'Tax', value: '0% / 0%' },
        { label: 'Fair Launch', value: '100% Community' },
      ],
    },
    {
      id: 'pepeak-memecoin',
      number: '02 / 04',
      title: 'PEPEAK ($PEAK)',
      badge: 'Live Project',
      category: 'Memecoin Website',
      description:
        'The Top is a State of Mind. High-energy, summit-themed memecoin website engineered with vibrant branding, tokenomics charts, and conversion-focused UX.',
      detailedDescription:
        'A high-octane community memecoin landing page built around ambition, reaching the summit, and internet culture. Features bold retro-modern typography, instant one-click contract address copy, interactive tokenomics allocation breakdowns, and mobile-optimized DEX routing.',
      tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      year: '2024',
      demoUrl: 'https://senku-sample-pepeak.netlify.app/',
      actionText: 'Visit Live Site',
      actionType: 'demo',
      features: [
        'High-contrast typography & vibrant meme culture brand identity',
        'One-click contract address copy with instant toast confirmation',
        'Responsive tokenomics breakdown with interactive summit milestones',
        'Engineered for maximum retention and seamless Telegram/X viral sharing',
      ],
      highlights: [
        { label: 'Theme', value: 'Summit / Ambition' },
        { label: 'Token', value: '$PEAK' },
        { label: 'Hosting', value: 'Netlify Edge' },
      ],
      metrics: [
        { label: 'Circulating', value: '100% Fair' },
        { label: 'Buy/Sell Tax', value: '0% / 0%' },
        { label: 'Network', value: 'Multi-Chain Ready' },
      ],
    },
    {
      id: 'ronnie-coin',
      number: '03 / 04',
      title: 'RONNIE ($RONNIE)',
      badge: 'Live Project',
      category: 'Solana Rhino Memecoin',
      description:
        'Built Like a Rhino. Decentralized Solana asset site featuring rapid DEX routing, live Raydium links, tokenomics breakdown, and aggressive branding.',
      detailedDescription:
        'Channeling the unstoppable raw power of the rhino on Solana. Designed and coded with ultra-responsive layout structures, direct DexScreener & Raydium swap CTAs, audited tokenomics transparency, and mobile wallet compatibility.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Solana Ecosystem'],
      year: '2024',
      demoUrl: 'https://ronniecoin.netlify.app/',
      actionText: 'Visit Live Site',
      actionType: 'demo',
      features: [
        'Solana-native branding with Raydium & DexScreener direct swap links',
        'Dynamic Rhino Ethos community roadmap & launch milestone tracking',
        'Transparent tokenomics cards with locked liquidity verification',
        'Sub-second load times engineered for high-volume crypto traffic',
      ],
      highlights: [
        { label: 'Network', value: 'Solana (SPL)' },
        { label: 'Token', value: '$RONNIE' },
        { label: 'Hosting', value: 'Netlify Edge' },
      ],
      metrics: [
        { label: 'Speed', value: '< 400ms Finality' },
        { label: 'Gas Fee', value: '< $0.001' },
        { label: 'Ecosystem', value: 'Raydium & DexScreener' },
      ],
    },
    {
      id: 'rocket-flow',
      number: '04 / 04',
      title: 'Rocket Flow ($FLOW)',
      badge: 'Live Project',
      category: 'Solana Memecoin & Launchpad',
      description:
        'We Were Never Built To Stay Grounded. High-velocity community memecoin on Solana powered by internet culture, interactive rocket liftoff sequence, and neo-brutalist aesthetics.',
      detailedDescription:
        'An electrifying high-velocity Solana memecoin portal and launch pad engineered with neo-brutalist styling, interactive blast-off countdown animation, verified tokenomics, direct Telegram alpha community routing, and rapid DEX swap accessibility. Built to showcase raw kinetic energy, bold typography, and seamless viral community onboarding.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Solana Ecosystem'],
      year: '2024',
      demoUrl: 'https://rocket-flow.netlify.app/',
      actionText: 'Visit Live Site',
      actionType: 'demo',
      features: [
        'Interactive rocket liftoff sequence with custom sound FX and blast-off states',
        'Neo-brutalist high-contrast typography & jet-black/acid-emerald visual palette',
        'Pre-launch and live liquidity routing with exclusive Telegram community alerts',
        'Mobile-first responsive architecture deployed on Netlify Edge with instant loading',
      ],
      highlights: [
        { label: 'Network', value: 'Solana (SPL)' },
        { label: 'Token', value: '$FLOW' },
        { label: 'Hosting', value: 'Netlify Edge' },
      ],
      metrics: [
        { label: 'Total Supply', value: '1,000,000,000' },
        { label: 'Buy/Sell Tax', value: '0% / 0%' },
        { label: 'Fair Launch', value: '100% Community' },
      ],
    },
  ] as Project[],

  services: [
    {
      id: 's1',
      title: 'Web3 & crypto landing pages',
      description: 'High-conversion, brand-tailored landing pages engineered to captivate holders, VCs, and community members.',
      icon: 'web',
    },
    {
      id: 's2',
      title: 'Memecoin & token websites',
      description: 'Rapid turnaround token sites equipped with live DEX charts, tokenomics breakdowns, and roadmaps.',
      icon: 'token',
    },
    {
      id: 's3',
      title: 'Responsive frontend development',
      description: 'Flawless mobile, tablet, and widescreen execution so your users enjoy a seamless experience on any device.',
      icon: 'devices',
    },
    {
      id: 's4',
      title: 'Modern website UI implementation',
      description: 'Translating Figma or conceptual sketches into clean, maintainable, production-ready React code.',
      icon: 'palette',
    },
    {
      id: 's5',
      title: 'Website deployment & integrations',
      description: 'End-to-end continuous deployment, custom domain setup, analytics integration, and wallet connection prep.',
      icon: 'bolt',
    },
  ] as Service[],

  techStack: [
    { name: 'HTML5', category: 'Markup', description: 'Semantic structure & accessibility', level: 'Expert' },
    { name: 'CSS3', category: 'Styling', description: 'Custom layouts & animations', level: 'Expert' },
    { name: 'JavaScript', category: 'ES6+', description: 'Modern asynchronous runtime', level: 'Expert' },
    { name: 'React', category: 'UI Library', description: 'Modular component architecture', level: 'Expert' },
    { name: 'Tailwind CSS', category: 'Framework', description: 'Utility-first rapid styling', level: 'Expert' },
    { name: 'Git / Vite', category: 'Tooling', description: 'Ultra-fast build & version control', level: 'Advanced' },
  ] as TechItem[],

  ecosystemSkills: [
    'TypeScript',
    'Ethers.js / Viem',
    'Wagmi / RainbowKit',
    'DEX Screener Embeds',
    'CoinGecko APIs',
    'Responsive Grid',
    'Performance Optimization',
    'Vercel / Cloudflare Deploys',
  ],

  faqs: [
    {
      question: 'What is the typical turnaround time for a crypto website?',
      answer: 'Memecoin and launchpad landing pages typically take 2-4 days. Full protocol sites or multi-page Web3 applications usually take 1-2 weeks depending on scope.',
    },
    {
      question: 'Can you work with our designer or Figma file?',
      answer: 'Yes! I can translate your Figma files into pixel-perfect React code, or design the entire website from scratch based on your project vision and brand assets.',
    },
    {
      question: 'Do you implement wallet connections or smart contracts?',
      answer: 'I specialize in frontend and user experience. I can integrate wallet connectors (Wagmi, RainbowKit, Web3Modal) and connect your existing smart contract ABIs to interactive buttons and forms.',
    },
  ],
};
