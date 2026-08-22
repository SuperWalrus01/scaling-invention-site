import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Database, CreditCard, UserPlus, LogIn, BadgeCheck, BookOpen, RotateCcw } from 'lucide-react';

const TIERS = [
  { id: 'frontend', label: 'React / Vite', sub: 'frontend', icon: Monitor, accent: '#7dd3fc' },
  { id: 'supabase', label: 'Supabase', sub: 'database · auth', icon: Database, accent: '#34d399' },
  { id: 'stripe', label: 'Stripe', sub: 'subscriptions', icon: CreditCard, accent: '#a78bfa' },
];

// Each action is the real hop sequence through the stack.
const FLOWS = [
  {
    id: 'signup',
    label: 'Sign up',
    icon: UserPlus,
    hops: [
      { tier: 'frontend', text: 'Form validated client-side, then submitted' },
      { tier: 'supabase', text: 'auth.signUp() creates the user and hashes the password' },
      { tier: 'supabase', text: 'Row-level security scopes the new profile row to that user' },
      { tier: 'frontend', text: 'Session token stored, app redirects to the dashboard' },
    ],
  },
  {
    id: 'login',
    label: 'Log in',
    icon: LogIn,
    hops: [
      { tier: 'frontend', text: 'Credentials posted to Supabase auth' },
      { tier: 'supabase', text: 'JWT issued and refreshed automatically by the client' },
      { tier: 'frontend', text: 'Protected routes unlock once the session resolves' },
    ],
  },
  {
    id: 'subscribe',
    label: 'Subscribe',
    icon: BadgeCheck,
    hops: [
      { tier: 'frontend', text: 'Checkout started for the selected plan' },
      { tier: 'stripe', text: 'Stripe Checkout collects payment off-site, so no card data is handled' },
      { tier: 'stripe', text: 'Webhook fires on checkout.session.completed' },
      { tier: 'supabase', text: 'Entitlement row updated, keeping access in sync with payment state' },
    ],
  },
  {
    id: 'practice',
    label: 'Open a paper',
    icon: BookOpen,
    hops: [
      { tier: 'frontend', text: 'Paper requested for the signed-in user' },
      { tier: 'supabase', text: 'RLS policy checks the subscription before returning questions' },
      { tier: 'frontend', text: 'Questions render; answers and progress saved as they go' },
    ],
  },
];

export default function TMUAStackTracer() {
  const [flowId, setFlowId] = useState('subscribe');
  const [hopIndex, setHopIndex] = useState(-1);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // Each hop carries a full sentence, so it holds long enough to read before
  // the next one replaces it.
  const HOP_MS = 2600;

  const run = useCallback((id) => {
    clearTimers();
    setFlowId(id);
    setHopIndex(-1);
    const flow = FLOWS.find((f) => f.id === id);
    flow.hops.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setHopIndex(i), 350 + i * HOP_MS));
    });
  }, []);


  useEffect(() => {
    run('subscribe');
    return clearTimers;
  }, [run]);

  const flow = FLOWS.find((f) => f.id === flowId);
  const activeTier = hopIndex >= 0 ? flow.hops[hopIndex].tier : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      className="w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700/60 shadow-inner p-3 sm:p-4 md:p-5 mt-4"
    >
      <div className="mb-3">
        <p className="text-xs font-semibold tracking-wide text-violet-300/90 uppercase mb-1">
          TMUA Wizzz Visual
        </p>
        <h4 className="text-base sm:text-lg font-semibold text-slate-50">
          Trace a request through the stack
        </h4>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {FLOWS.map((f) => {
          const Icon = f.icon;
          const isActive = f.id === flowId;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => run(f.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg text-[0.7rem] sm:text-xs font-medium px-2.5 py-1.5 border transition-colors ${
                isActive
                  ? 'bg-violet-500/20 text-violet-200 border-violet-400/50'
                  : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {TIERS.map((tier) => {
          const Icon = tier.icon;
          const isActive = activeTier === tier.id;
          return (
            <motion.div
              key={tier.id}
              animate={{
                borderColor: isActive ? tier.accent : 'rgba(51,65,85,0.8)',
                backgroundColor: isActive ? 'rgba(30,41,59,0.95)' : 'rgba(15,23,42,0.7)',
                scale: isActive ? 1.015 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                style={{ backgroundColor: isActive ? tier.accent : 'rgba(51,65,85,0.9)' }}
              >
                <Icon className="w-4 h-4" style={{ color: isActive ? '#0f172a' : '#cbd5e1' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-slate-50 leading-tight">{tier.label}</p>
                <p className="text-[0.6rem] sm:text-[0.65rem] text-slate-400">{tier.sub}</p>
              </div>
              {isActive && (
                <motion.span
                  layoutId="tmua-pulse"
                  className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tier.accent }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 rounded-xl border border-slate-700/70 bg-slate-900/85 px-3 py-2.5 min-h-[3.25rem] flex items-center gap-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${flowId}-${hopIndex}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex-1 text-[0.7rem] sm:text-xs text-slate-200 leading-relaxed"
          >
            {hopIndex >= 0 ? (
              <>
                <span className="font-mono text-violet-300 mr-1.5">
                  {hopIndex + 1}/{flow.hops.length}
                </span>
                {flow.hops[hopIndex].text}
              </>
            ) : (
              <span className="text-slate-400">Tracing {flow.label.toLowerCase()}…</span>
            )}
          </motion.p>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => run(flow.id)}
          aria-label={`Replay ${flow.label}`}
          className="flex-shrink-0 text-slate-500 hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[0.65rem] sm:text-xs text-slate-400 leading-relaxed mt-3">
        Built solo end to end. The interesting part is the last hop of Subscribe: payment state lives
        in Stripe, access control lives in Supabase, and a webhook is what keeps the two agreeing.
      </p>
    </motion.div>
  );
}
