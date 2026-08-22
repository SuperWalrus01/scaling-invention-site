import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const WINDOW = 46;      // ticks kept on screen
const FAIR = 50;        // long-run fair value the product reverts to
const ALPHA = 0.22;     // EMA smoothing
const MAX_POSITION = 5; // inventory limit, same idea as a risk cap

const W = 480;
const H = 150;
const PAD = 10;

const seedTicks = () => {
  const out = [];
  let price = FAIR;
  let ema = FAIR;
  for (let i = 0; i < WINDOW; i += 1) {
    price += 0.3 * (FAIR - price) + (Math.random() - 0.5) * 2.2;
    ema = ALPHA * price + (1 - ALPHA) * ema;
    out.push({ price, ema });
  }
  return out;
};

export default function IMCTradingSimulator() {
  const [ticks, setTicks] = useState(seedTicks);
  const [spread, setSpread] = useState(0.9);
  const [position, setPosition] = useState(0);
  const [cash, setCash] = useState(0);
  const [fills, setFills] = useState([]);
  const [running, setRunning] = useState(false);

  // Read the latest spread/position inside the interval without restarting it.
  const spreadRef = useRef(spread);
  const positionRef = useRef(position);
  useEffect(() => { spreadRef.current = spread; }, [spread]);
  useEffect(() => { positionRef.current = position; }, [position]);

  const step = useCallback(() => {
    setTicks((prev) => {
      const last = prev[prev.length - 1];
      const price = last.price + 0.3 * (FAIR - last.price) + (Math.random() - 0.5) * 2.2;

      // Quotes are placed around the fair value we already hold, then the new
      // price either crosses them or it doesn't.
      const quoted = last.ema;
      const band = spreadRef.current;
      const pos = positionRef.current;
      let side = null;
      if (price < quoted - band && pos < MAX_POSITION) side = 'buy';
      else if (price > quoted + band && pos > -MAX_POSITION) side = 'sell';

      const ema = ALPHA * price + (1 - ALPHA) * last.ema;

      if (side === 'buy') {
        setPosition((p) => p + 1);
        setCash((c) => c - price);
        setFills((f) => [{ side, price, id: Date.now() + Math.random() }, ...f].slice(0, 4));
      } else if (side === 'sell') {
        setPosition((p) => p - 1);
        setCash((c) => c + price);
        setFills((f) => [{ side, price, id: Date.now() + Math.random() }, ...f].slice(0, 4));
      }

      return [...prev.slice(1), { price, ema, side }];
    });
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(step, 380);
    return () => window.clearInterval(timer);
  }, [running, step]);

  const reset = () => {
    setTicks(seedTicks());
    setPosition(0);
    setCash(0);
    setFills([]);
    setRunning(false);
  };

  const { pricePath, emaPath, upperPath, lowerPath, marks, last } = useMemo(() => {
    const prices = ticks.map((t) => t.price);
    const lo = Math.min(...prices, ...ticks.map((t) => t.ema - spread)) - 0.8;
    const hi = Math.max(...prices, ...ticks.map((t) => t.ema + spread)) + 0.8;
    const x = (i) => (W * i) / (ticks.length - 1);
    const y = (v) => H - PAD - ((v - lo) / (hi - lo)) * (H - PAD * 2);
    const path = (fn) => 'M' + ticks.map((t, i) => `${x(i).toFixed(1)} ${y(fn(t)).toFixed(1)}`).join('L');

    return {
      pricePath: path((t) => t.price),
      emaPath: path((t) => t.ema),
      upperPath: path((t) => t.ema + spread),
      lowerPath: path((t) => t.ema - spread),
      marks: ticks
        .map((t, i) => (t.side ? { x: x(i), y: y(t.price), side: t.side } : null))
        .filter(Boolean),
      last: ticks[ticks.length - 1],
    };
  }, [ticks, spread]);

  const pnl = cash + position * last.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      className="w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700/60 shadow-inner p-3 sm:p-4 md:p-5 mt-4"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-amber-300/90 uppercase mb-1">
            IMC Prosperity Visual
          </p>
          <h4 className="text-base sm:text-lg font-semibold text-slate-50">
            Market Making Around Fair Value
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[0.7rem] sm:text-xs font-medium px-3 py-1.5 transition-colors"
          >
            {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {running ? 'Pause' : 'Run'}
          </button>
          <button
            type="button"
            onClick={step}
            className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-[0.7rem] sm:text-xs font-medium px-3 py-1.5 transition-colors"
          >
            Step
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset simulation"
            className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 px-2 py-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-slate-900/70 border border-slate-700/60 p-2 sm:p-3">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-32 sm:h-40" aria-hidden="true">
          <path d={`${upperPath}L${W} ${H}L0 ${H}Z`} fill="rgba(56,189,248,0.10)" />
          <path d={`${lowerPath}L${W} ${H}L0 ${H}Z`} fill="rgba(15,23,42,0.85)" />
          <path d={upperPath} fill="none" stroke="rgba(125,211,252,0.65)" strokeWidth="1.5" strokeDasharray="5 4" />
          <path d={lowerPath} fill="none" stroke="rgba(125,211,252,0.65)" strokeWidth="1.5" strokeDasharray="5 4" />
          <path d={emaPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <path d={pricePath} fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.85" />
          {marks.map((m, i) => (
            <circle
              key={i}
              cx={m.x}
              cy={m.y}
              r="4"
              fill={m.side === 'buy' ? '#34d399' : '#fb7185'}
              stroke="#0f172a"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        <div className="flex items-center gap-3 mt-2 px-1">
          <label htmlFor="imc-spread" className="text-[0.65rem] sm:text-xs text-slate-300 whitespace-nowrap">
            Quoted spread
          </label>
          <input
            id="imc-spread"
            type="range"
            min="0.3"
            max="2"
            step="0.1"
            value={spread}
            onChange={(e) => setSpread(Number(e.target.value))}
            className="flex-1 accent-sky-400"
          />
          <span className="font-mono text-[0.65rem] sm:text-xs text-sky-300 w-10 text-right">
            ±{spread.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3">
        {[
          { label: 'Inventory', value: `${position > 0 ? '+' : ''}${position}`,
            tone: position === 0 ? 'text-slate-100' : position > 0 ? 'text-emerald-300' : 'text-rose-300' },
          { label: 'Mark-to-market', value: `${pnl >= 0 ? '+' : ''}${pnl.toFixed(1)}`,
            tone: pnl >= 0 ? 'text-emerald-300' : 'text-rose-300' },
          { label: 'Last price', value: last.price.toFixed(2), tone: 'text-slate-100' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-slate-900/70 border border-slate-700/60 px-2.5 py-2">
            <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wide text-slate-400">{stat.label}</p>
            <p className={`font-mono text-sm sm:text-base font-semibold ${stat.tone}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Legend: the chart has five distinct marks and none of them are obvious. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
        {[
          { key: 'price', swatch: <span className="block w-4 h-0.5 bg-slate-200 rounded-full" />, label: 'Traded price' },
          { key: 'ema', swatch: <span className="block w-4 h-[3px] bg-sky-400 rounded-full" />, label: 'EMA fair value' },
          {
            key: 'band',
            swatch: (
              <span className="block w-4 border-t-2 border-dashed border-sky-300/70" />
            ),
            label: 'Quoted bid / ask',
          },
          { key: 'buy', swatch: <span className="block w-2 h-2 rounded-full bg-emerald-400" />, label: 'Bought' },
          { key: 'sell', swatch: <span className="block w-2 h-2 rounded-full bg-rose-400" />, label: 'Sold' },
        ].map((item) => (
          <span key={item.key} className="inline-flex items-center gap-1.5 text-[0.6rem] sm:text-[0.65rem] text-slate-400">
            {item.swatch}
            {item.label}
          </span>
        ))}
      </div>

      <div className="mt-3 space-y-2 text-[0.65rem] sm:text-xs text-slate-400 leading-relaxed">
        <p className="text-slate-300 font-semibold text-[0.7rem] sm:text-xs">What this is doing</p>
        <ol className="space-y-1.5 list-decimal pl-4 marker:text-slate-500">
          <li>
            Every tick the price jumps randomly but is pulled back toward a long-run fair value. That
            pull is the mean reversion the whole strategy leans on: moves away from fair value are more
            likely to be undone than continued.
          </li>
          <li>
            The model can&apos;t see that fair value, so it estimates it with an exponential moving
            average of what has traded so far, then posts a bid and an ask that far either side. That
            distance is the <span className="text-sky-300">quoted spread</span> you control.
          </li>
          <li>
            When the next price crosses a quote, that side fills, so it buys below its own estimate and
            sells above it. Inventory is capped at ±{MAX_POSITION}, so a one-way run can&apos;t force it
            to keep adding to a losing position.
          </li>
          <li>
            <span className="text-slate-300">Mark-to-market</span> is cash plus whatever inventory is
            worth at the last price. Profit comes from repeatedly buying under fair value and selling
            over it, not from predicting which way the market goes next.
          </li>
        </ol>
        <p className="pt-0.5">
          <span className="text-slate-300 font-medium">Try the slider.</span> At ±0.3 it fills on about
          69% of ticks, earning a sliver each time while holding real inventory risk. At ±0.9 that drops
          to roughly 25%. By ±2.0 the quotes are so wide almost nothing reaches them and it barely
          trades at all. That trade-off between edge per fill and how often you fill is the core of
          market making.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2 min-h-[1.5rem]">
        {fills.map((f) => (
          <motion.span
            key={f.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-mono text-[0.6rem] sm:text-[0.65rem] px-2 py-0.5 rounded-full border ${
              f.side === 'buy'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/40'
                : 'bg-rose-500/10 text-rose-300 border-rose-400/40'
            }`}
          >
            {f.side === 'buy' ? 'BUY' : 'SELL'} @ {f.price.toFixed(2)}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
