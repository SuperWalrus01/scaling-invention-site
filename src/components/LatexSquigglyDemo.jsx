import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

// A small subset of the real engine's 202 symbols, enough to show the idea.
const SYMBOLS = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ϵ', varepsilon: 'ε',
  zeta: 'ζ', eta: 'η', theta: 'θ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ',
  nu: 'ν', xi: 'ξ', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', phi: 'ϕ',
  varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
  Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π',
  Sigma: 'Σ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
  in: '∈', notin: '∉', subset: '⊂', subseteq: '⊆', cup: '∪', cap: '∩',
  emptyset: '∅', forall: '∀', exists: '∃', neg: '¬', land: '∧', lor: '∨',
  infty: '∞', partial: '∂', nabla: '∇', sum: '∑', prod: '∏', int: '∫',
  leq: '≤', geq: '≥', neq: '≠', approx: '≈', equiv: '≡', sim: '∼',
  pm: '±', times: '×', cdot: '·', div: '÷', circ: '∘',
  to: '→', rightarrow: '→', leftarrow: '←', Rightarrow: '⇒', iff: '⟺',
  mapsto: '↦', implies: '⟹', ldots: '…', cdots: '⋯',
};

const BB = {
  N: 'ℕ', Z: 'ℤ', Q: 'ℚ', R: 'ℝ', C: 'ℂ', P: 'ℙ', E: '𝔼',
};

const SUP = {
  0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', n: 'ⁿ', i: 'ⁱ', x: 'ˣ', y: 'ʸ', k: 'ᵏ', T: 'ᵀ',
};
const SUB = {
  0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎', n: 'ₙ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', x: 'ₓ',
};

// Every character must have a script form, otherwise the whole thing is left
// alone: a half-converted result is worse than none.
const script = (text, table) =>
  [...text].every((ch) => ch in table) ? [...text].map((ch) => table[ch]).join('') : null;

const convertMath = (body) => {
  let failed = false;
  const out = body
    .replace(/\\([a-zA-Z]+)/g, (m, name) => SYMBOLS[name] ?? ((failed = true), m))
    .replace(/([\^_])(\{[^}]*\}|.)/g, (m, op, arg) => {
      const inner = arg.startsWith('{') ? arg.slice(1, -1) : arg;
      const res = script(inner, op === '^' ? SUP : SUB);
      if (res === null) failed = true;
      return res ?? m;
    });
  return failed ? null : out;
};

// Returns { from, to, note } for the token just before the caret, or null.
const convertToken = (before) => {
  let m = before.match(/\$([^$]+)\$$/);
  if (m) {
    const out = convertMath(m[1]);
    return out
      ? { from: m[0], to: out }
      : { from: m[0], to: null, note: 'Left as typed: part of it has no Unicode form.' };
  }

  m = before.match(/\\mathbb\{([A-Z])\}$/);
  if (m) {
    return BB[m[1]]
      ? { from: m[0], to: BB[m[1]] }
      : { from: m[0], to: null, note: `Left as typed: this demo has no \\mathbb{${m[1]}}.` };
  }

  m = before.match(/\\frac\{([^}]*)\}\{([^}]*)\}$/);
  if (m) {
    if (/^\d+$/.test(m[1]) && /^\d+$/.test(m[2])) {
      return { from: m[0], to: `${script(m[1], SUP)}⁄${script(m[2], SUB)}` };
    }
    const wrap = (part) => (part.length > 1 ? `(${part})` : part);
    return {
      from: m[0],
      to: `${wrap(m[1])}/${wrap(m[2])}`,
      note: 'Approximated: no stacked form exists, so it was written on one line.',
    };
  }

  m = before.match(/(?:^|\s)\\([a-zA-Z]+)\{[^}]*\}$/);
  if (m) {
    return {
      from: m[0].trim(),
      to: null,
      note: `Left as typed: \\${m[1]} has no exact Unicode form.`,
    };
  }

  // Only a command that starts a word counts, so a path like C:\Users stays quiet.
  m = before.match(/(?:^|\s)\\([a-zA-Z]+)$/);
  if (m) {
    const from = `\\${m[1]}`;
    if (SYMBOLS[m[1]]) return { from, to: SYMBOLS[m[1]] };
    return { from, to: null, note: `Left as typed: ${from} isn't in this demo's table.` };
  }

  return null;
};

const EXAMPLES = [
  '\\forall \\epsilon > 0',
  'x \\in \\mathbb{R}',
  '$x^2 + y_1$',
  '\\frac{3}{7}',
  '\\frac{x+1}{2}',
];

export default function LatexSquigglyDemo() {
  const [text, setText] = useState('');
  const [log, setLog] = useState(null);
  const ref = useRef(null);

  const placeCaret = (pos) => {
    window.requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(pos, pos);
    });
  };

  // Converts the token ending at `end` (just before a typed space), the way
  // the app does when space is pressed.
  const apply = (value, end) => {
    const before = value.slice(0, end);
    const result = convertToken(before);
    if (!result) return { value, caret: end + 1 };
    if (result.to === null) {
      setLog({ from: result.from, to: null, note: result.note });
      return { value, caret: end + 1 };
    }
    setLog({ from: result.from, to: result.to, note: result.note });
    const start = end - result.from.length;
    const next = value.slice(0, start) + result.to + value.slice(end);
    return { value: next, caret: start + result.to.length + 1 };
  };

  const onChange = (e) => {
    const { value, selectionStart } = e.target;
    const typedSpace =
      value.length === text.length + 1 && value[selectionStart - 1] === ' ';
    if (!typedSpace) {
      setText(value);
      return;
    }
    const res = apply(value, selectionStart - 1);
    setText(res.value);
    if (res.value !== value) placeCaret(res.caret);
  };

  const tryExample = (example) => {
    // Feed the example word by word, converting at each space.
    let value = '';
    let last = null;
    for (const word of `${example} `.split(/(?<= )/)) {
      value += word;
      const before = value.slice(0, -1);
      const result = convertToken(before);
      if (result) {
        last = result;
        if (result.to !== null) {
          value = before.slice(0, -result.from.length) + result.to + ' ';
        }
      }
    }
    setText(value);
    setLog(last);
    placeCaret(value.length);
  };

  const reset = () => {
    setText('');
    setLog(null);
    placeCaret(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      className="w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700/60 shadow-inner p-3 sm:p-4 md:p-5 mt-4"
    >
      <div className="mb-3">
        <p className="text-xs font-semibold tracking-wide text-orange-300/90 uppercase mb-1">
          LaTeX Squiggly Demo
        </p>
        <h4 className="text-base sm:text-lg font-semibold text-slate-50">
          Type LaTeX, press space
        </h4>
      </div>

      <div className="relative">
        <textarea
          ref={ref}
          value={text}
          onChange={onChange}
          rows={3}
          placeholder="Type \theta, then press space"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="LaTeX Squiggly demo text box"
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 pr-9 text-sm sm:text-base text-slate-50 font-mono leading-relaxed focus:outline-none focus:border-orange-400/70 focus:ring-2 focus:ring-orange-400/20"
        />
        <button
          type="button"
          onClick={reset}
          aria-label="Clear the text box"
          className="absolute top-2.5 right-2.5 text-slate-500 hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => tryExample(example)}
            className="rounded-lg text-[0.7rem] sm:text-xs font-mono px-2.5 py-1.5 border bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-700 transition-colors"
          >
            {example}
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-slate-700/70 bg-slate-900/85 px-3 py-2.5 min-h-[3.25rem] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={log ? `${log.from}-${log.to}` : 'idle'}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[0.7rem] sm:text-xs text-slate-200 leading-relaxed"
          >
            {log ? (
              <>
                <span className="font-mono text-slate-400">{log.from}</span>
                <span className="mx-1.5 text-slate-500">→</span>
                <span className="font-semibold text-orange-300">{log.to ?? 'unchanged'}</span>
                {log.note && <span className="block text-slate-400 mt-0.5">{log.note}</span>}
              </>
            ) : (
              <span className="text-slate-400">Conversions show up here as you type.</span>
            )}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="text-[0.65rem] sm:text-xs text-slate-400 leading-relaxed mt-3">
        A cut-down version of the converter with a subset of its symbols. The real app does this in
        any program, stays quiet in LaTeX editors and code, and covers 202 symbols.
      </p>
    </motion.div>
  );
}
