import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, Users, Code, Database, Globe, Landmark } from 'lucide-react';
import Section from './Section';
import { staggerList, riseIn, headingIn } from '@/lib/motion';

const skillClusters = [
  {
    id: 'math-stats',
    label: 'Math & Stats',
    icon: Brain,
    skills: ['CTMC', 'Stochastic Modelling', 'Actuarial-Style Modelling'],
    summary:
      'Core quantitative toolkit for modelling uncertainty, pricing risk, and designing stochastic systems.',
    narrative: [
      'Use continuous-time Markov chains (CTMC) and stochastic processes to describe how systems evolve over time.',
      'Apply actuarial-style modelling to topics like cyber insurance pricing and risk quantification.',
    ],
  },
  {
    id: 'finance',
    label: 'Accounting & Finance',
    icon: Landmark,
    skills: [
      'DCF Valuation',
      'Three-Statement Modelling',
      'WACC & Cost of Capital',
      'Comparable Company Analysis',
      'Financial Statement Analysis',
      'Scenario & Sensitivity Analysis',
      'Excel Financial Modelling',
    ],
    summary:
      'Valuation and financial modelling, from building the statements up to a defensible intrinsic value.',
    narrative: [
      'Build linked three-statement models (income statement, balance sheet, cash flow) that balance and flow through, then stress them with scenario and sensitivity analysis.',
      'Run discounted cash flow valuations end to end: forecast free cash flow, derive WACC and terminal value, then sanity-check the output against trading comparables.',
      'Read financial statements for what they actually say, using ratio and margin analysis to judge profitability, leverage, and cash conversion.',
    ],
  },
  {
    id: 'programming',
    label: 'Programming',
    icon: Code,
    skills: ['Python', 'R', 'JavaScript', 'MATLAB', 'VBA', 'HTML', 'CSS'],
    summary:
      'Practical coding skills for building data pipelines, prototypes, and visual interfaces.',
    narrative: [
      'Use Python/R for modelling, notebooks, and machine learning experiments.',
      'Use JavaScript and basic web tech (HTML/CSS) to turn ideas into interactive tools and dashboards.',
    ],
  },
  {
    id: 'data-science',
    label: 'Data Science & ML',
    icon: BarChart3,
    skills: ['Supervised Learning', 'EDA', 'PCA', 'LightGBM', 'XGBoost'],
    summary:
      'End‑to‑end workflow from cleaning data to deploying competitive predictive models.',
    narrative: [
      'Explore datasets with EDA and dimensionality reduction (e.g. PCA) to find signal and structure.',
      'Train and tune gradient-boosted models such as LightGBM and XGBoost for competitions and projects.',
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Technologies',
    icon: Database,
    skills: ['SQL', 'OpenAI API', 'Supabase', 'Firebase', 'cPanel', 'LaTeX', 'PowerPoint'],
    summary:
      'Ecosystem of tools for storage, deployment, automation, and clear technical communication.',
    narrative: [
      'Use SQL and modern backends (Supabase, Firebase) to manage and query data.',
      'Work with APIs and deployment tools (OpenAI API, cPanel) to ship working products, not just notebooks.',
    ],
  },
  {
    id: 'leadership',
    label: 'Leadership',
    icon: Users,
    skills: ['Community Founding', 'Treasury Management', 'Event Planning'],
    summary:
      'Experience turning ideas into organisations, projects, and events with real stakeholders.',
    narrative: [
      'Found and grow communities, managing volunteers and collaborating with partners.',
      'Handle budgeting and logistics so technical projects and events actually happen on time.',
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: Globe,
    skills: ['Indonesian (native)', 'English (fluent, IELTS 8.0)'],
    summary:
      'Bilingual communication for working in Indonesian and international environments.',
    narrative: [
      'Native Indonesian speaker, comfortable collaborating with local stakeholders, teams, and communities.',
      'Fluent in English with an IELTS score of 8.0, enabling clear technical communication, presentations, and documentation.',
    ],
  },
];

export default function Skills() {
  const [activeId, setActiveId] = useState('math-stats');

  const activeCluster = useMemo(
    () => skillClusters.find((c) => c.id === activeId) ?? skillClusters[0],
    [activeId],
  );

  return (
    <Section className="max-w-6xl mx-auto px-4">
      <motion.div
        variants={headingIn}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4 sm:gap-3 mb-6 sm:mb-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold">Skills</h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
          A quick map of the tools I actually use in projects and competitions,
          from the maths that underpins my models to the code and leadership that
          turns them into something real.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 sm:gap-6 items-start">
        {/* Left: Cluster selector */}
        <motion.div
          className="space-y-3 sm:space-y-4"
          variants={staggerList}
          initial="hidden"
          animate="show"
        >
          {skillClusters.map((cluster) => {
            const Icon = cluster.icon;
            const isActive = cluster.id === activeId;
            return (
              <motion.button
                key={cluster.id}
                type="button"
                variants={riseIn}
                onClick={() => setActiveId(cluster.id)}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left rounded-2xl sm:rounded-3xl border transition-all shadow-sm px-4 sm:px-5 py-3.5 sm:py-4 flex items-center gap-3 sm:gap-4
                  ${
                    isActive
                      ? 'border-primary-400/80 bg-white shadow-lg'
                      : 'border-sky-100 bg-white/80 hover:bg-white hover:border-primary-200 hover:shadow-lg'
                  }`}
              >
                <div
                  className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex-shrink-0 transition-colors ${
                    isActive ? 'bg-primary-700 text-white' : 'bg-primary-50 text-primary-700'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {cluster.label}
                  </p>
                  <p className="text-xs sm:text-[0.8rem] text-gray-500">
                    {cluster.skills.length} {cluster.skills.length === 1 ? 'tool' : 'tools'}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Right: Active cluster detail */}
        <motion.div
          key={activeCluster.id}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          className="surface rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 shadow-lg flex flex-col gap-4 sm:gap-5 lg:sticky lg:top-28"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {activeCluster.label}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
                {activeCluster.summary}
              </p>
            </div>
          </div>

          {/* Skill chips */}
          <div>
            <p className="text-xs sm:text-[0.8rem] font-semibold text-gray-500 mb-2">
              Core tools in this cluster
            </p>
            <div className="flex flex-wrap gap-2">
              {activeCluster.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary-50 text-primary-700 shadow-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Narrative bullets */}
          <div className="mt-1 space-y-2">
            <p className="text-xs sm:text-[0.8rem] font-semibold text-gray-500">
              How this shows up in my work
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
              {activeCluster.narrative.map((line, index) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
