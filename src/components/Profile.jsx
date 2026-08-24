import { motion } from 'framer-motion';
import { Github, Linkedin, MapPin } from 'lucide-react';
import Section from './Section';
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from '@/components/ui/animated-modal';
import { ContentPreview } from '@/components/ui/content-preview';
const Portrait = '/images/portrait.png';
import { staggerList, riseIn } from '@/lib/motion';

export default function Profile({ setActiveTab }) {

  return (
    <Section className="text-center max-w-3xl mx-auto">
      <motion.div variants={staggerList} initial="hidden" animate="show">
        {/* Modest drop from the navbar, not a full-screen centre. */}
        <div className="pt-[3vh] sm:pt-[6vh]">
        <motion.h1
          variants={riseIn}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent px-4"
        >
          Keenan Jusak
        </motion.h1>
        <motion.p variants={riseIn} className="text-base sm:text-lg md:text-xl text-black mb-6 px-4">
          Mathematics & Statistics student with a deep interest in finance. I design
          stochastic models and turn them into tools people actually use.
        </motion.p>

        <motion.div variants={riseIn} className="flex items-center justify-center gap-2 text-black mb-8 text-sm sm:text-base px-4">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <span>Based in Coventry, UK &amp; Jakarta, ID</span>
        </motion.div>

        <motion.div variants={riseIn} className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4 mb-2">
          {/* GitHub */}
          <Modal>
            <ModalTrigger className="group/modal-btn flex justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2">
              <span className="flex items-center gap-2 group-hover/modal-btn:translate-x-40 group-hover/modal-btn:opacity-0 transition duration-500">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                GitHub
              </span>
              <span className="absolute inset-0 flex items-center justify-center -translate-x-10 opacity-0 group-hover/modal-btn:translate-x-0 group-hover/modal-btn:opacity-100 transition duration-500">
                <Github className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
              </span>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
                    <Github className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-black">GitHub</h4>
                  <p className="text-sm text-black max-w-xs">
                    My GitHub profile is currently being set up. Check back soon to see my latest projects and contributions!
                  </p>
                </div>
              </ModalContent>
              <ModalFooter>
                <ModalClose className="px-4 py-2 bg-gray-200 text-black rounded-md text-sm w-28 hover:bg-gray-300 transition-colors">
                  Close
                </ModalClose>
              </ModalFooter>
            </ModalBody>
          </Modal>

          {/* Kaggle */}
          <Modal>
            <ModalTrigger className="group/modal-btn flex justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-[#20BEFF] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2">
              <span className="flex items-center gap-2 group-hover/modal-btn:translate-x-40 group-hover/modal-btn:opacity-0 transition duration-500">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                </svg>
                Kaggle
              </span>
              <span className="absolute inset-0 flex items-center justify-center -translate-x-10 opacity-0 group-hover/modal-btn:translate-x-0 group-hover/modal-btn:opacity-100 transition duration-500">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                </svg>
              </span>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-14 h-14 bg-[#20BEFF] rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-black">Kaggle</h4>
                  <p className="text-sm text-black max-w-xs">
                    View my machine learning competitions, notebooks, and datasets on Kaggle.
                  </p>
                </div>
              </ModalContent>
              <ModalFooter className="gap-3">
                <ModalClose className="px-4 py-2 bg-gray-200 text-black rounded-md text-sm hover:bg-gray-300 transition-colors">
                  Cancel
                </ModalClose>
                <a
                  href="https://www.kaggle.com/keenanjusak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#20BEFF] text-white rounded-md text-sm hover:bg-[#00a8e8] transition-colors"
                >
                  Visit Profile
                </a>
              </ModalFooter>
            </ModalBody>
          </Modal>

          {/* LinkedIn */}
          <Modal>
            <ModalTrigger className="group/modal-btn flex justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0A66C2] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2">
              <span className="flex items-center gap-2 group-hover/modal-btn:translate-x-40 group-hover/modal-btn:opacity-0 transition duration-500">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                LinkedIn
              </span>
              <span className="absolute inset-0 flex items-center justify-center -translate-x-10 opacity-0 group-hover/modal-btn:translate-x-0 group-hover/modal-btn:opacity-100 transition duration-500">
                <Linkedin className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
              </span>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-14 h-14 bg-[#0A66C2] rounded-full flex items-center justify-center shrink-0">
                    <Linkedin className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-black">LinkedIn</h4>
                  <p className="text-sm text-black max-w-xs">
                    Connect with me on LinkedIn to follow my professional journey and experience.
                  </p>
                </div>
              </ModalContent>
              <ModalFooter className="gap-3">
                <ModalClose className="px-4 py-2 bg-gray-200 text-black rounded-md text-sm hover:bg-gray-300 transition-colors">
                  Cancel
                </ModalClose>
                <a
                  href="https://www.linkedin.com/in/damianus-keenan-jusak-74552623b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0A66C2] text-white rounded-md text-sm hover:bg-[#085299] transition-colors"
                >
                  Visit Profile
                </a>
              </ModalFooter>
            </ModalBody>
          </Modal>
        </motion.div>

        </div>

        <motion.div
          variants={riseIn}
          className="relative mt-24 sm:mt-32 mx-4 sm:mx-0"
        >
          {/* Sits above the card in the DOM, so the card's opaque surface covers
              its lower edge and it reads as peeking over the top. On the right
              because the portrait faces left, looking into the card. */}
          <img
            src={Portrait}
            alt="Keenan Jusak"
            width="219"
            height="281"
            className="pointer-events-none select-none absolute right-1 sm:right-8 bottom-full translate-y-7 sm:translate-y-9 w-28 sm:w-40 md:w-44 h-auto drop-shadow-xl"
          />
          <div className="relative p-6 sm:p-8 surface rounded-2xl sm:rounded-3xl text-center shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">About Me</h2>
          <p className="text-sm sm:text-base text-black leading-relaxed">
            I'm a mathematics and statistics student with a deep interest in finance,
            especially quantitative finance, markets, and risk. I completed the Mathematics
            &amp; Statistics Foundation at the University of Warwick with an overall grade of 93,
            and I'm now reading for a BSc in Mathematics and Statistics there as a Global
            Excellence Scholar. I specialise in stochastic modelling, actuarial mathematics,
            and machine learning, applying mathematical rigour to real-world problems, from
            cyber insurance pricing to predictive modelling competitions.
          </p>
          </div>
        </motion.div>

        <motion.div variants={riseIn} className="mt-4 sm:mt-6 p-6 sm:p-7 surface rounded-2xl sm:rounded-3xl mx-4 sm:mx-0 text-left shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1">What I'm looking for</h2>
              <p className="text-xs sm:text-sm text-black max-w-xl">
                Opportunities where I can bring maths, statistics, and data science to
                real problems, especially in finance, risk, and education technology.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
            <span className="px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 ring-1 ring-primary-100 text-xs sm:text-sm font-medium">
              Summer data &amp; quant internships
            </span>
            <span className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 text-xs sm:text-sm font-medium">
              Research &amp; competition teams
            </span>
            <span className="px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 ring-1 ring-teal-100 text-xs sm:text-sm font-medium">
              Analytics work with non-profits
            </span>
          </div>

          <div className="mt-2">
            <p className="text-xs sm:text-[0.8rem] font-semibold text-gray-500 mb-2">
              Highlights
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <ContentPreview
                content={
                  <div className="flex flex-col gap-2.5 h-full">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">🏆 Top 10%</span>
                      <span className="text-xs text-gray-500">of 18,800 teams</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 leading-snug">IMC Prosperity 4</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Algorithmic trading across a 50-product simulated market, entered solo. Regression and EMA fair value feeding mean-reversion and market-making logic, with Black-Scholes for the options book.
                    </p>
                    <div className="flex items-center gap-3 pt-0.5">
                      <span className="text-xs font-semibold text-gray-800">50 products</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-xs font-semibold text-gray-800">Solo entry</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['Market Making', 'Black-Scholes', 'Mean Reversion'].map(tag => (
                        <span key={tag} className="text-[0.65rem] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                    <p className="mt-auto text-[0.65rem] text-gray-500 pt-1 border-t border-gray-100">Click to see full details →</p>
                  </div>
                }
              >
                <button
                  type="button"
                  onClick={() => setActiveTab && setActiveTab('projects')}
                  className="text-left rounded-2xl border border-amber-200 bg-gradient-to-b from-white to-amber-50/70 px-3 py-3 sm:px-4 sm:py-3 shadow-sm hover:shadow-md transition-shadow w-full"
                >
                  <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-wide text-amber-700 font-semibold mb-1">
                    Project · IMC Prosperity 4
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    Top 10% finish among 18,800 teams
                  </p>
                  <p className="text-[0.7rem] sm:text-xs text-gray-500 mt-1">
                    Solo entry across a 50-product market
                  </p>
                </button>
              </ContentPreview>

              <ContentPreview
                content={
                  <div className="flex flex-col gap-2.5 h-full">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">EdTech</span>
                      <span className="text-xs text-gray-500">by TigaData</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 leading-snug">BayesQuiz</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Educational quiz platform using Bayesian inference to continuously update question difficulty estimates as students answer.
                    </p>
                    <div className="flex items-center gap-3 pt-0.5">
                      <span className="text-xs font-semibold text-gray-800">70+ quizzes</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-xs font-semibold text-gray-800">400+ accounts</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['React', 'Firebase', 'Bayesian Statistics'].map(tag => (
                        <span key={tag} className="text-[0.65rem] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                    <p className="mt-auto text-[0.65rem] text-gray-500 pt-1 border-t border-gray-100">Click to see full details →</p>
                  </div>
                }
              >
                <button
                  type="button"
                  onClick={() => setActiveTab && setActiveTab('projects')}
                  className="text-left rounded-2xl border border-primary-200 bg-gradient-to-b from-white to-primary-50/70 px-3 py-3 sm:px-4 sm:py-3 shadow-sm hover:shadow-md transition-shadow w-full"
                >
                  <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-wide text-primary-700 font-semibold mb-1">
                    Project · BayesQuiz
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    70+ quizzes, 400+ student accounts
                  </p>
                  <p className="text-[0.7rem] sm:text-xs text-gray-500 mt-1">
                    Bayesian classroom tool for teachers
                  </p>
                </button>
              </ContentPreview>

              <ContentPreview
                content={
                  <div className="flex flex-col gap-2.5 h-full">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Non-profit</span>
                      <span className="text-xs text-gray-500">Founder</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 leading-snug">TigaData Consulting</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Data analytics consultancy for non-profit organisations and university societies. Team of 4 engineers across 5+ ongoing projects.
                    </p>
                    <div className="flex items-center gap-3 pt-0.5">
                      <span className="text-xs font-semibold text-gray-800">4 engineers</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-xs font-semibold text-gray-800">5+ projects</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['Data Analytics', 'Consulting', 'Non-profit'].map(tag => (
                        <span key={tag} className="text-[0.65rem] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                    <p className="mt-auto text-[0.65rem] text-gray-500 pt-1 border-t border-gray-100">Click to see full details →</p>
                  </div>
                }
              >
                <button
                  type="button"
                  onClick={() => setActiveTab && setActiveTab('leadership')}
                  className="text-left rounded-2xl border border-teal-200 bg-gradient-to-b from-white to-teal-50/70 px-3 py-3 sm:px-4 sm:py-3 shadow-sm hover:shadow-md transition-shadow w-full"
                >
                  <p className="text-[0.7rem] sm:text-[0.75rem] uppercase tracking-wide text-teal-700 font-semibold mb-1">
                    Leadership · TigaData
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    Non-profit analytics consulting
                  </p>
                  <p className="text-[0.7rem] sm:text-xs text-gray-500 mt-1">
                    Supporting student societies with data
                  </p>
                </button>
              </ContentPreview>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </Section>
  );
}
