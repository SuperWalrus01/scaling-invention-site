import { motion } from 'framer-motion';
import { ExternalLink, Award, Info } from 'lucide-react';
import { useState } from 'react';
import Section from './Section';
import Modal from './Modal';

const projects = [
  {
    title: 'BayesQuiz - by TigaData',
    description: 'Educational quiz platform using Bayesian inference to update question difficulty assessments. Built with Firebase and React, facilitating 70+ quizzes with 400+ user accounts.',
    tags: ['React', 'Firebase', 'Bayesian Statistics'],
    github: '#',
    details: 'BayesQuiz is an innovative educational platform that leverages Bayesian inference to dynamically assess and update question difficulty. Educators can set prior beliefs about question difficulty, and the system updates these beliefs based on student performance data. The platform uses Firebase for real-time data synchronization and authentication, ensuring a seamless experience across devices. With over 70 quizzes created and 400+ active user accounts, BayesQuiz has proven to be an effective tool for identifying crucial topics that require review, helping educators make data-driven decisions about their curriculum.',
  },
  {
    title: 'Infinitics 8 Competition - Cyber Insurance Pricing',
    description: '1st Place. Modelled computer transitions (Susceptible, Infected, Quarantined, Damaged) as CTMC for cyber insurance pricing using stochastic modeling and Monte Carlo simulation.',
    tags: ['Winner', 'Stochastic Modelling', 'Actuarial'],
    github: '#',
    award: true,
    details: 'Winner of the Infinitics 8 Competition. This project developed a sophisticated stochastic model for cyber insurance pricing using continuous-time Markov chains (CTMC). The model adapts the epidemiological SIR framework to computer systems, representing different states: Susceptible (vulnerable but uninfected), Infected (compromised by malware), Quarantined (isolated for cleaning), and Damaged (permanently compromised). Using CTMC to model state transitions and Monte Carlo simulation for uncertainty quantification, the project captures the dynamic nature of cyber risk and probabilistic transitions between states. The solution combines actuarial principles with stochastic calculus to develop pricing frameworks that account for time-dependent cyber threats and correlations between risk factors. This winning approach demonstrated both mathematical rigor and practical applicability to real-world cyber insurance scenarios, providing insurers with a foundation for setting premiums that accurately reflect underlying cyber risk exposure.',
  },
  {
    title: 'Diabetes Prediction',
    description: 'Review of supervised learning algorithms for predicting diabetes.',
    tags: ['Machine Learning', 'Python'],
    github: '#',
    details: 'A comprehensive study comparing various supervised learning algorithms for predicting diabetes onset based on medical diagnostic measurements. The project evaluates multiple approaches including logistic regression, decision trees, random forests, support vector machines, and gradient boosting methods. Each algorithm is assessed based on accuracy, precision, recall, and F1-score. The analysis includes feature importance evaluation, cross-validation, and hyperparameter tuning to optimize model performance. The project provides insights into which algorithms perform best for medical prediction tasks and identifies the most significant predictive features for diabetes diagnosis.',
  },
  {
    title: 'DRW Crypto Forecasting Competition',
    description: 'EDA using PCA, feature selection, and forecasting with LightGBM/XGBoost.',
    tags: ['Forecasting', 'Competition'],
    github: '#',
    details: 'Participated in the DRW Crypto Forecasting Competition, developing a comprehensive forecasting model for cryptocurrency price movements. The project involved extensive exploratory data analysis (EDA) to understand market patterns and relationships. Principal Component Analysis (PCA) was employed to reduce dimensionality and identify the most influential factors affecting crypto prices. Multiple feature engineering techniques were applied, including technical indicators, rolling statistics, and lag features. The final model combined LightGBM and XGBoost ensemble methods, leveraging their complementary strengths to capture both linear and non-linear patterns in the highly volatile cryptocurrency market.',
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
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden group"
          >
            {project.award && (
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <div className="p-1.5 sm:p-2 bg-yellow-400 rounded-full">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-900" />
                </div>
              </div>
            )}

            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 pr-10 sm:pr-12">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

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
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4" />
                <span>More Details</span>
              </motion.button>
              
              <motion.button
                onClick={() => setShowGithubModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium group-hover:bg-primary-600 transition-colors cursor-pointer"
              >
                <span>GitHub</span>
                <ExternalLink className="w-4 h-4" />
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
        />
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
