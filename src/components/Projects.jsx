import { motion } from 'framer-motion';
import { ExternalLink, Award, Info } from 'lucide-react';
import { useState, lazy, Suspense } from 'react';
import Section from './Section';
import Modal from './Modal';

const InfiniticsVisualizer = lazy(() => import('./InfiniticsVisualizer'));
const DRWPipelineVisualizer = lazy(() => import('./DRWPipelineVisualizer'));
const DiabetesBenchmarkDashboard = lazy(() => import('./DiabetesBenchmarkDashboard'));
const BayesQuizSimulator = lazy(() => import('./BayesQuizSimulator'));

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
    id: 'infinitics-8',
    title: 'Infinitics 8 Competition - Cyber Insurance Pricing',
    description: '1st Place. Modelled computer transitions (Susceptible, Infected, Quarantined, Damaged) as CTMC for cyber insurance pricing using stochastic modeling and Monte Carlo simulation. Offered scholarship to study actuarial mathematics at Universitas Pelita Harapan (Indonesia).',
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
    id: 'diabetes-benchmark',
    title: 'Diabetes Prediction',
    description: 'Review of supervised learning algorithms for predicting diabetes.',
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
    description: 'EDA using PCA, feature selection, and forecasting with LightGBM/XGBoost.',
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

export default function Projects() {
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <Section className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden group"
          >
            {project.award && (
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <div className="p-1.5 sm:p-2 bg-yellow-400 rounded-full" aria-hidden="true">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-900" />
                </div>
              </div>
            )}

            <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2.5 pr-10 sm:pr-12">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-3 leading-relaxed text-justify">
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
              <motion.button
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <Info className="w-4 h-4" aria-hidden="true" />
                <span>More Details</span>
              </motion.button>
              
              <motion.button
                onClick={() => setShowGithubModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium group-hover:bg-primary-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                aria-label="GitHub profile coming soon"
              >
                <span>GitHub</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/5 group-hover:to-primary-600/5 transition-all duration-300 rounded-3xl pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          message={selectedProject.details}
        >
          <Suspense fallback={null}>
            {selectedProject.id === 'bayesquiz-sim' && (
              <BayesQuizSimulator />
            )}
            {selectedProject.id === 'infinitics-8' && (
              <InfiniticsVisualizer />
            )}
            {selectedProject.id === 'drw-crypto' && (
              <DRWPipelineVisualizer />
            )}
            {selectedProject.id === 'diabetes-benchmark' && (
              <DiabetesBenchmarkDashboard />
            )}
          </Suspense>
        </Modal>
      )}

      {/* GitHub Modal */}
      <Modal
        isOpen={showGithubModal}
        onClose={() => setShowGithubModal(false)}
        title="Coming Soon"
        message="My GitHub profile is currently being set up. Check back soon to see my latest projects and contributions!"
      />
    </Section>
  );
}
