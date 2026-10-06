import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BlockTx {
  id: string;
  hash: string;
  time: string;
  type: 'SWAP' | 'MINT' | 'TRANSFER';
  val: string;
}

export const InteractiveMotionVisualizer: React.FC = () => {
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [tps, setTps] = useState<number>(45820);
  const [blockHeight, setBlockHeight] = useState<number>(28491204);
  const [activeTxList, setActiveTxList] = useState<BlockTx[]>([
    { id: '1', hash: '0x8f2...41a', time: 'Just now', type: 'SWAP', val: '12.4 SOL' },
    { id: '2', hash: '0x1e9...b72', time: '1s ago', type: 'MINT', val: '2,500 $RONNIE' },
    { id: '3', hash: '0x4c2...99e', time: '2s ago', type: 'SWAP', val: '50,000 $PEAK' },
  ]);
  const [pulseCount, setPulseCount] = useState<number>(0);
  const [wavePoints, setWavePoints] = useState<number[]>([14, 28, 45, 32, 60, 48, 70, 82, 65, 50, 68, 75, 90, 84, 72]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Live block update loop
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight((b) => b + 1);
      const deltaTps = Math.floor(Math.random() * 600) - 300;
      setTps((prev) => Math.max(42000, Math.min(54000, prev + deltaTps)));

      // Oscillate waveform points
      setWavePoints((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        const randomVal = Math.max(15, Math.min(95, last + (Math.random() * 30 - 15)));
        next.push(randomVal);
        return next;
      });
    }, 1200 / speedMultiplier);

    return () => clearInterval(interval);
  }, [speedMultiplier]);

  const triggerFlashTx = () => {
    setPulseCount((c) => c + 1);
    setTps((t) => t + 2400);

    const randomHash = '0x' + Math.random().toString(16).substring(2, 6) + '...' + Math.random().toString(16).substring(2, 5);
    const types: ('SWAP' | 'MINT' | 'TRANSFER')[] = ['SWAP', 'MINT', 'TRANSFER'];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    const val = chosenType === 'SWAP' ? '18.2 SOL' : chosenType === 'MINT' ? '100,000 $PEAK' : '3.4 ETH';

    const newTx: BlockTx = {
      id: Date.now().toString(),
      hash: randomHash,
      time: 'Just now',
      type: chosenType,
      val,
    };

    setActiveTxList((prev) => [newTx, ...prev.slice(0, 3)]);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl bg-[#111216] text-white p-6 sm:p-7 border border-white/10 shadow-2xl overflow-hidden font-['Inter'] group"
    >
      {/* Background cyber grid & glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Telemetry & Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22C55E]" />
          </div>
          <div>
            <div className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">
              Interactive Motion Engine
            </div>
            <div className="font-['Space_Grotesk'] text-sm sm:text-base font-semibold text-white tracking-wide">
              Mempool & Block Stream
            </div>
          </div>
        </div>

        {/* Speed Multiplier Pill Control */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-lg">
          <span className="font-['JetBrains_Mono'] text-[10px] text-white/50 px-1.5 uppercase">
            Speed
          </span>
          {[1, 2, 5].map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => setSpeedMultiplier(spd)}
              className={`px-2 py-0.5 rounded text-[11px] font-['JetBrains_Mono'] transition-all cursor-pointer ${
                speedMultiplier === spd
                  ? 'bg-[#22C55E] text-black font-bold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Central Visualizer: Dynamic Orbital Ring + Live Waveform */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
        {/* Left: Cryptographic Orbital Gyroscope */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Outer Rotating Dotted Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20 / speedMultiplier, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-[#22C55E]/40"
            />

            {/* Middle Reverse Rotating Hexagonal Aura */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 12 / speedMultiplier, ease: 'linear' }}
              className="absolute inset-3 rounded-full border border-white/20 border-t-[#22C55E] border-b-white/50"
            />

            {/* Inner Pulsing Radar Sweep */}
            <motion.div
              animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#22C55E]/20 to-transparent border border-[#22C55E]/60 flex items-center justify-center"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_12px_#22c55e]" />
            </motion.div>

            {/* Animated Satellites orbiting */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6 / speedMultiplier, ease: 'linear' }}
              className="absolute inset-0 flex items-start justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white] -translate-y-1" />
            </motion.div>

            {/* Orbiting Satellite 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 8 / speedMultiplier, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-start"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22c55e] -translate-x-1" />
            </motion.div>
          </div>

          <div className="mt-3 text-center">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#22C55E] tracking-wider font-medium">
              BLOCK #{blockHeight.toLocaleString()}
            </span>
            <div className="text-[10px] text-white/50 font-['JetBrains_Mono']">
              Finality: &lt; 380ms
            </div>
          </div>
        </div>

        {/* Right: Real-time Telemetry & Dynamic Waveform */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="text-[10px] font-['JetBrains_Mono'] text-white/50 uppercase">Network TPS</div>
              <div className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#22C55E]">
                {tps.toLocaleString()}
              </div>
              <div className="text-[10px] text-white/60 font-['JetBrains_Mono']">
                ▲ +4.2% Peak Velocity
              </div>
            </div>

            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="text-[10px] font-['JetBrains_Mono'] text-white/50 uppercase">Gas Unit</div>
              <div className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white">
                0.000005 SOL
              </div>
              <div className="text-[10px] text-[#22C55E] font-['JetBrains_Mono']">
                Instant Settlement
              </div>
            </div>
          </div>

          {/* Dynamic Frequency Bars */}
          <div className="bg-white/5 p-3 rounded-lg border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-['JetBrains_Mono'] text-white/50 uppercase">
                Dynamic Throughput Frequency
              </span>
              <span className="text-[10px] font-['JetBrains_Mono'] text-[#22C55E]">
                60 FPS STREAM
              </span>
            </div>

            {/* Harmonic equalizer bars with real-time dynamic animation */}
            <div className="h-10 flex items-end gap-1.5 w-full pt-1">
              {wavePoints.map((val, idx) => (
                <motion.div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-[#22C55E]/40 to-[#22C55E] rounded-t-xs"
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stream of Live Transactions */}
      <div className="relative z-10 space-y-2 mb-5">
        <div className="text-[11px] font-['JetBrains_Mono'] text-white/50 uppercase flex items-center justify-between">
          <span>Live Verified Operations</span>
          <span className="text-[#22C55E]">Auto Sync</span>
        </div>

        <div className="space-y-1.5 overflow-hidden">
          <AnimatePresence initial={false}>
            {activeTxList.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded border border-white/5 font-['JetBrains_Mono'] text-xs text-white/90"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      tx.type === 'MINT'
                        ? 'bg-[#22C55E]/20 text-[#22C55E]'
                        : tx.type === 'SWAP'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}
                  >
                    {tx.type}
                  </span>
                  <span className="text-white/80">{tx.hash}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">{tx.val}</span>
                  <span className="text-[10px] text-white/40">{tx.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Action: Trigger Flash Tx & Burst Wave */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
        <span className="text-xs text-white/60 font-['Inter']">
          Interact with the live kinetic visualizer
        </span>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={triggerFlashTx}
          className="px-4 py-2 bg-[#22C55E] hover:bg-[#16a34a] text-black font-['JetBrains_Mono'] text-xs font-bold rounded flex items-center gap-2 shadow-lg shadow-[#22c55e]/20 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span>SIMULATE TRANSACTION</span>
        </motion.button>
      </div>

      {/* Flash Wave Ripple Effect upon Trigger */}
      {pulseCount > 0 && (
        <motion.div
          key={pulseCount}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0 m-auto w-40 h-40 rounded-full border-2 border-[#22C55E] pointer-events-none"
        />
      )}
    </div>
  );
};
