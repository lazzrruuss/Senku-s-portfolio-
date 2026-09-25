export interface Project {
  id: string;
  number: string;
  title: string;
  badge: 'Concept Project' | 'Personal Project';
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
    contactEmail: 'senku.web3@gmail.com',
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
      id: 'aura-protocol',
      number: '01 / 03',
      title: '$AURA Protocol',
      badge: 'Concept Project',
      category: 'Memecoin Website',
      description:
        'Fictional memecoin website featuring clean dark-mode inspired layout, vibrant branding, and tokenomics overview.',
      detailedDescription:
        'Designed and prototyped for high-momentum crypto launches. Features interactive live token liquidity bar, one-click contract address copy, interactive roadmap checkpoints, and decentralized community hub links.',
      tags: ['React', 'Tailwind', 'JavaScript'],
      year: '2024',
      demoUrl: '#',
      actionText: 'View Demo',
      actionType: 'demo',
      features: [
        'Dynamic tokenomics distribution visualization',
        'One-click contract address copy with instant toast confirmation',
        'High-contrast typography with custom crypto micro-interactions',
        'Mobile-first responsive design for Twitter/Telegram traffic',
      ],
      highlights: [
        { label: 'Token Type', value: 'ERC-20 / SPL' },
        { label: 'Liquidity', value: '100% Burned' },
        { label: 'Theme', value: 'Dark Editorial' },
      ],
      metrics: [
        { label: 'Supply', value: '1,000,000,000' },
        { label: 'Tax', value: '0% / 0%' },
        { label: 'LP Lock', value: '10 Years' },
      ],
    },
    {
      id: 'nexus-layer',
      number: '02 / 03',
      title: 'Nexus Layer',
      badge: 'Concept Project',
      category: 'Web3 Startup Landing Page',
      description:
        'Fictional Web3 startup landing page demonstrating modular rollup architecture concepts and sleek grid interfaces.',
      detailedDescription:
        'An ultra-crisp Swiss typography layout tailored for developer tooling and L2/L3 modular scaling protocols. Built with high-efficiency Vite and TypeScript, featuring interactive architectural diagrams and live TPS benchmarks.',
      tags: ['Vite', 'Tailwind', 'TypeScript'],
      year: '2024',
      demoUrl: '#',
      actionText: 'View Demo',
      actionType: 'demo',
      features: [
        'Interactive modular stack architecture explorer',
        'Live benchmark simulation (TPS, finality, gas cost comparison)',
        'Technical documentation navigation drawer',
        'Developer-first dark/light aesthetic accents',
      ],
      highlights: [
        { label: 'Architecture', value: 'Optimistic Rollup' },
        { label: 'Throughput', value: '45,200 TPS' },
        { label: 'Target', value: 'B2B Protocols' },
      ],
      metrics: [
        { label: 'Avg Finality', value: '250ms' },
        { label: 'Gas Savings', value: '99.4%' },
        { label: 'EVM Compatible', value: 'Full Bytecode' },
      ],
    },
    {
      id: 'gastracker',
      number: '03 / 03',
      title: 'GasTracker',
      badge: 'Personal Project',
      category: 'Crypto Dashboard',
      description:
        'Personal crypto dashboard for real-time gas visualization concepts, featuring clean data tables and responsive layouts.',
      detailedDescription:
        'A streamlined dashboard utility that monitors multi-chain gas fees (Ethereum, Arbitrum, Optimism, Base). Provides historical trend graphs, optimal swap hour recommendations, and customizable fee alerts.',
      tags: ['React', 'CSS3', 'API Integration'],
      year: '2024',
      repoUrl: '#',
      actionText: 'View Repo',
      actionType: 'repo',
      features: [
        'Real-time multi-chain gas price polling simulator',
        'Heatmap of weekly low-congestion transaction windows',
        'Instant transaction cost calculator for Uniswap swaps & NFT mints',
        'Accessible, minimal data tables with keyboard navigation',
      ],
      highlights: [
        { label: 'Chains', value: 'ETH, ARB, OP, BASE' },
        { label: 'Latency', value: '< 1.5s' },
        { label: 'Interface', value: 'Compact Grid' },
      ],
      metrics: [
        { label: 'Rapid Gas', value: '14 Gwei' },
        { label: 'Standard Gas', value: '12 Gwei' },
        { label: 'Slow Gas', value: '9 Gwei' },
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
