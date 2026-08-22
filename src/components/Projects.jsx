import { motion } from 'framer-motion';
import { ExternalLink, Award, Info, Github } from 'lucide-react';
import { lazy, Suspense, useEffect } from 'react';
import Section from './Section';
import ProjectPreview from './ProjectPreview';
import { staggerList, riseIn, headingIn } from '@/lib/motion';
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDeferred,
  ModalFooter,
  ModalTrigger,
} from '@/components/ui/animated-modal';

// Loaders are kept separate from the lazy components so a hover or press can
// warm the chunk (fetch + evaluate) before the modal ever opens.
const visualizerLoaders = {
  'bayesquiz-sim': () => import('./BayesQuizSimulator'),
  'tmua-wizzz': () => import('./TMUAStackTracer'),
  'infinitics-8': () => import('./InfiniticsVisualizer'),
  'imc-prosperity': () => import('./IMCTradingSimulator'),
  'drw-crypto': () => import('./DRWPipelineVisualizer'),
  'diabetes-benchmark': () => import('./DiabetesBenchmarkDashboard'),
};

const visualizerMap = Object.fromEntries(
  Object.entries(visualizerLoaders).map(([id, load]) => [id, lazy(load)]),
);

const warmVisualizer = (id) => {
  const load = visualizerLoaders[id];
  if (load) load().catch(() => {});
};

// Phones have no hover, so a tap gives only ~90ms of warning: not enough for
// the chart bundle to evaluate before the modal wants it, which showed up as
// ~218ms of blocked main thread on a throttled device. Warming during idle
// moves that work off the interaction path entirely.
const warmAllVisualizers = () => {
  const connection = navigator.connection;
  if (connection && (connection.saveData || /2g/.test(connection.effectiveType ?? ''))) {
    return undefined;
  }

  const run = () => Object.keys(visualizerLoaders).forEach(warmVisualizer);

  if (typeof window.requestIdleCallback === 'function') {
    const handle = window.requestIdleCallback(run, { timeout: 2500 });
    return () => window.cancelIdleCallback(handle);
  }
  const timer = window.setTimeout(run, 1200);
  return () => window.clearTimeout(timer);
};

const projects = [
  {
    id: 'bayesquiz-sim',
    title: 'BayesQuiz - by TigaData',
    description: 'Educational quiz platform using Bayesian inference to update question difficulty assessments. Built with Firebase and React, facilitating 70+ quizzes with 400+ user accounts.',
    impact: '70+ quizzes and 400+ student accounts used by teachers to target revision.',
    tags: ['React', 'Firebase', 'Bayesian Statistics'],
    github: '#',
    details: (
      <>
        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Overview</h4>
        <p>
          BayesQuiz is an educational platform that helps teachers understand how difficult their
          questions really are. It uses Bayesian inference to continuously update difficulty
          estimates as more students answer each question.
        </p>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Approach</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Model question difficulty with priors that are updated using student response data,
            giving a posterior difficulty distribution for every item.
          </li>
          <li>
            Built the web app with React, using Firebase for authentication, real‑time updates,
            and cloud data storage.
          </li>
          <li>
            Designed dashboards so educators can quickly see which topics or questions need
            revision based on posterior difficulty and performance statistics.
          </li>
        </ul>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Impact</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>Supported 70+ quizzes and more than 400 active user accounts.</li>
          <li>
            Helped teachers target revision time on genuinely hard topics instead of relying on
            intuition alone.
          </li>
          <li>Demonstrated how Bayesian thinking can be packaged into a practical classroom tool.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'tmua-wizzz',
    title: 'TMUA Wizzz - by TigaData',
    description: 'Full-stack TMUA exam-prep platform built solo end to end: a React and Vite frontend, Supabase for the backend and authentication, and Stripe for subscription billing. Owned authentication, subscriptions, and deployment.',
    impact: 'Shipped a complete subscription product single-handedly, from auth to billing to deployment.',
    tags: ['React', 'Supabase', 'Stripe', 'Full-Stack'],
    github: '#',
    details: (
      <>
        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Overview</h4>
        <p>
          TMUA Wizzz is an exam-preparation platform for the Test of Mathematics for University
          Admission, built under TigaData. I owned the entire build: frontend, backend, payments,
          and deployment.
        </p>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Stack</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>React with Vite for the frontend, giving fast builds and a responsive practice interface.</li>
          <li>
            Supabase for the database, row-level security, and authentication, so accounts and
            progress are stored and protected without running a bespoke server.
          </li>
          <li>
            Stripe for subscription billing, including checkout, plan management, and webhook
            handling to keep entitlements in sync with payment state.
          </li>
        </ul>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Outcome</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>Delivered a working subscription product solo, rather than a prototype.</li>
          <li>
            Handled the parts that usually need a team: auth flows, payment state, and deployment.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'infinitics-8',
    title: 'Infinitics 8 Competition - Cyber Insurance Pricing',
    description: '1st Place. Modelled computer transitions (Susceptible, Infected, Quarantined, Damaged) as CTMC for cyber insurance pricing using stochastic modelling and Monte Carlo simulation. Offered scholarship to study actuarial mathematics at Universitas Pelita Harapan (Indonesia).',
    impact: '1st place plus scholarship offer to study actuarial mathematics.',
    tags: ['Winner', 'Stochastic Modelling', 'Actuarial'],
    github: '#',
    award: true,
    details: (
      <>
        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Overview</h4>
        <p>
          Winner of the Infinitics 8 Competition on cyber insurance pricing. I built a
          stochastic model that treats computer networks like an epidemic, tracking how
          machines move between vulnerable, infected, quarantined, and damaged states to
          quantify cyber risk.
        </p>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Approach</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Modelled system health with a continuous‑time Markov chain (CTMC) using states
            Susceptible, Infected, Quarantined, and Damaged.
          </li>
          <li>
            Adapted the epidemiological SIR framework to computer systems, defining transition
            rates that capture infection, isolation, and permanent damage.
          </li>
          <li>
            Used Monte Carlo simulation to generate loss distributions under different security
            postures and estimate expected cyber losses over time.
          </li>
          <li>
            Linked CTMC outputs to actuarial pricing formulas, producing premiums that respond
            to time‑dependent cyber‑attack dynamics instead of static assumptions.
          </li>
        </ul>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Impact</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Gave insurers a principled framework for pricing cyber insurance based on
            underlying attack dynamics.
          </li>
          <li>
            Illustrated how stochastic processes and actuarial science can be combined for
            modern cyber‑risk problems.
          </li>
          <li>
            As a result of this work, I was offered a scholarship to study actuarial
            mathematics at Universitas Pelita Harapan (Indonesia).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'imc-prosperity',
    title: 'IMC Prosperity 4 - Algorithmic Trading',
    description: 'Top 10% of 18,800 teams, entered solo. Built algorithmic trading models across a 50-product simulated market, combining linear regression and EMA-based fair value forecasting with mean-reversion and market-making logic, and pricing options positions with Black-Scholes.',
    impact: 'Top 10% of 18,800 teams as a solo entrant.',
    tags: ['Top 10%', 'Algorithmic Trading', 'Black-Scholes'],
    github: '#',
    details: (
      <>
        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Overview</h4>
        <p>
          IMC Prosperity 4 is a global algorithmic trading competition run over a simulated market of
          50 products. I entered solo and finished in the top 10% of 18,800 teams.
        </p>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Approach</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Estimated fair value per product using linear regression and exponential moving averages,
            then traded the gap between quoted price and that estimate.
          </li>
          <li>
            Layered mean-reversion and market-making logic on top: quoting a spread around fair value
            and taking positions when price broke out of the band.
          </li>
          <li>
            Priced options positions with the Black-Scholes model to trade volatility rather than
            direction alone.
          </li>
          <li>
            Applied game-theoretic bid optimisation in the manual auction rounds, reasoning about how
            other teams would bid rather than bidding on private value alone.
          </li>
        </ul>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Outcome</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>Placed in the top 10% of 18,800 teams without a team to split the work across.</li>
          <li>
            Practical experience with the full loop: signal construction, execution logic, inventory
            risk, and derivatives pricing under time pressure.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'diabetes-benchmark',
    title: 'Diabetes Prediction',
    description: 'Benchmarking study of supervised learning algorithms for predicting diabetes onset from clinical measurements. Compared logistic regression, trees, random forests, SVMs, and gradient boosting under cross-validation, then used feature importance to identify the strongest risk drivers.',
    impact: 'Benchmarked multiple model families and clarified trade-offs between accuracy and interpretability.',
    tags: ['Machine Learning', 'Python'],
    github: '#',
    details: (
      <>
        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Overview</h4>
        <p>
          A benchmarking study of supervised learning algorithms for predicting diabetes onset
          from clinical measurements. The goal was to compare models fairly and understand which
          features drive predictions.
        </p>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Approach</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Cleaned and preprocessed a medical dataset, handling missing values and scaling
            features where appropriate.
          </li>
          <li>
            Trained logistic regression, decision trees, random forests, support vector
            machines, and gradient‑boosting models.
          </li>
          <li>
            Evaluated each model using cross‑validation with metrics such as accuracy,
            precision, recall, and F1‑score.
          </li>
          <li>
            Used feature importance and coefficient analysis to identify the strongest
            predictors of diabetes risk.
          </li>
        </ul>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Findings</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Tree‑based ensemble methods generally offered the best balance between accuracy and
            robustness.
          </li>
          <li>
            Certain clinical measures (such as glucose levels and BMI) consistently appeared as
            key drivers of predictions.
          </li>
          <li>
            Highlighted trade‑offs between model interpretability and performance, which is
            crucial in healthcare settings.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'drw-crypto',
    title: 'DRW Crypto Forecasting Competition',
    description: 'Short-horizon crypto price forecasting on a noisy, high-dimensional feature set. Used PCA and feature selection to cut dimensionality, engineered momentum and mean-reversion signals, and tuned LightGBM and XGBoost models against regime shifts and heavy tails.',
    impact: 'Built a resilient forecasting pipeline for noisy crypto time series using gradient-boosted models.',
    tags: ['Forecasting', 'Competition'],
    github: '#',
    details: (
      <>
        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Overview</h4>
        <p>
          Entry for the DRW Crypto Forecasting Competition, focused on predicting short‑term
          cryptocurrency price movements using a mix of statistical techniques and gradient‑
          boosted models.
        </p>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Approach</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Performed extensive exploratory data analysis (EDA) to understand volatility,
            seasonality, and correlations between assets and features.
          </li>
          <li>
            Applied Principal Component Analysis (PCA) to reduce dimensionality and highlight
            major latent factors driving price movements.
          </li>
          <li>
            Engineered features including technical indicators, rolling statistics, and lagged
            returns to capture momentum and mean‑reversion patterns.
          </li>
          <li>
            Trained LightGBM and XGBoost models, tuning hyperparameters to handle noisy,
            highly non‑linear relationships.
          </li>
        </ul>

        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mt-3 mb-1">Outcome</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Built a forecasting pipeline that generalised reasonably well across different
            time periods and coins.
          </li>
          <li>
            Gained practical experience dealing with regime shifts, heavy tails, and
            overfitting risks in financial time series.
          </li>
        </ul>
      </>
    ),
  },
];

function VisualizerSkeleton() {
  return (
    <div
      className="h-56 sm:h-64 rounded-2xl bg-gray-100 animate-pulse"
      aria-hidden="true"
    />
  );
}

export default function Projects() {
  useEffect(warmAllVisualizers, []);

  return (
    <Section className="max-w-6xl mx-auto px-4">
      <motion.h2
        variants={headingIn}
        initial="hidden"
        animate="show"
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8"
      >
        Projects
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        variants={staggerList}
        initial="hidden"
        animate="show"
      >
        {projects.map((project) => {
          const Visualizer = visualizerMap[project.id];
          return (
            <motion.div
              key={project.id}
              variants={riseIn}
              whileHover={{ y: -8, scale: 1.02 }}
              className="surface rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden group"
            >
              <div className="-mx-5 sm:-mx-6 -mt-5 sm:-mt-6 mb-4 rounded-t-2xl sm:rounded-t-3xl overflow-hidden bg-gradient-to-b from-primary-50/70 to-transparent">
                <ProjectPreview id={project.id} />
              </div>

              <div className="flex items-start justify-between gap-3 mb-1.5 sm:mb-2.5">
                <h3 className="text-lg sm:text-xl font-semibold">{project.title}</h3>
                {project.award && (
                  <span className="shrink-0 mt-0.5 inline-flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 bg-yellow-400 text-yellow-900 rounded-full text-[0.7rem] font-bold shadow-sm">
                    <Award className="w-3.5 h-3.5" aria-hidden="true" />
                    1st Place
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {project.description}
              </p>

              {project.impact && (
                <p className="text-[0.7rem] sm:text-xs text-gray-500 mb-3">
                  <span className="font-semibold text-gray-700">Impact: </span>
                  {project.impact}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                {/* More Details modal */}
                <Modal>
                  <ModalTrigger
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-full text-sm font-medium shadow-sm hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    onPointerEnter={() => warmVisualizer(project.id)}
                    onPointerDown={() => warmVisualizer(project.id)}
                    onFocus={() => warmVisualizer(project.id)}
                  >
                    <Info className="w-4 h-4" aria-hidden="true" />
                    More Details
                  </ModalTrigger>
                  <ModalBody className="md:max-w-[65%] max-h-[85%]">
                    <ModalContent className="overflow-y-auto">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                      <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {project.details}
                      </div>
                      {Visualizer && (
                        <div className="mt-6">
                          {/* Mounts after the open animation lands, so the chart
                              never competes with the transition for the main thread. */}
                          <ModalDeferred fallback={<VisualizerSkeleton />}>
                            <Suspense fallback={<VisualizerSkeleton />}>
                              <Visualizer />
                            </Suspense>
                          </ModalDeferred>
                        </div>
                      )}
                    </ModalContent>
                    <ModalFooter>
                      <ModalClose className="px-4 py-2 bg-gray-200 text-black dark:bg-neutral-800 dark:text-white rounded-md text-sm hover:bg-gray-300 transition-colors w-28">
                        Close
                      </ModalClose>
                    </ModalFooter>
                  </ModalBody>
                </Modal>

                {/* GitHub modal */}
                <Modal>
                  <ModalTrigger className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white/70 rounded-full text-sm font-medium hover:bg-white hover:border-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                    GitHub
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </ModalTrigger>
                  <ModalBody>
                    <ModalContent>
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
                          <Github className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-neutral-100">GitHub</h4>
                        <p className="text-sm text-gray-600 dark:text-neutral-400 max-w-xs">
                          My GitHub profile is currently being set up. Check back soon to see my latest projects and contributions!
                        </p>
                      </div>
                    </ModalContent>
                    <ModalFooter>
                      <ModalClose className="px-4 py-2 bg-gray-200 text-black dark:bg-neutral-800 dark:text-white rounded-md text-sm hover:bg-gray-300 transition-colors w-28">
                        Close
                      </ModalClose>
                    </ModalFooter>
                  </ModalBody>
                </Modal>
              </div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/5 group-hover:to-primary-600/5 transition-all duration-300 rounded-3xl pointer-events-none" />
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
