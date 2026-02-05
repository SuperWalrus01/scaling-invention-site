import { motion } from 'framer-motion';
import { Github, Linkedin, MapPin } from 'lucide-react';
import { useState } from 'react';
import Section from './Section';
import Modal from './Modal';

export default function Profile() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Section className="text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent px-4">
          Keenan Jusak
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 px-4">
          Mathematics & Statistics Student
        </p>
        
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-8 text-sm sm:text-base px-4">
          <MapPin className="w-4 h-4" />
          <span>Based in Warwick, UK & Jakarta, ID</span>
        </div>

        <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
          <motion.button
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow cursor-pointer text-sm sm:text-base"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            GitHub
          </motion.button>
          <motion.a
            href="https://www.kaggle.com/keenanjusak"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#20BEFF] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
            </svg>
            Kaggle
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/damianus-keenan-jusak-74552623b/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0A66C2] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            LinkedIn
          </motion.a>
        </div>

        <div className="mt-8 sm:mt-12 p-6 sm:p-8 glass rounded-2xl sm:rounded-3xl text-left mx-4 sm:mx-0">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">About Me</h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            I'm a mathematics and statistics student with a passion for quantitative finance 
            and data science. Currently pursuing my Foundation Degree at the University of Warwick, 
            I specialize in stochastic modeling, actuarial mathematics, and machine learning. 
            My work focuses on applying mathematical rigor to real-world problems, from cyber 
            insurance pricing to predictive modeling competitions.
          </p>
        </div>
      </motion.div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Coming Soon"
        message="My GitHub profile is currently being set up. Check back soon to see my latest projects and contributions!"
      />
    </Section>
  );
}
