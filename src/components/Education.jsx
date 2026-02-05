import { motion } from 'framer-motion';
import { GraduationCap, Award, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Section from './Section';

const activities = [
  'Founder & Chairman, CaniMath Community',
  'Co-Founder & Head of Treasury, CaniEngineering',
  'Altar Boys Ministry Member',
  'Member, Canisius College Cup Committee',
  'Member, C-Excellence Committee',
  'Badminton Team Member (School Team A)',
];

export default function Education() {
  const [showActivities, setShowActivities] = useState(false);

  return (
    <Section className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Education</h2>

      <div className="space-y-6">
        {/* University of Warwick */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4 flex-col sm:flex-row gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-primary-100 rounded-xl sm:rounded-2xl">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold">University of Warwick</h3>
                <p className="text-sm sm:text-base text-gray-600">Foundation Degree in Mathematics & Statistics</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <span className="text-sm text-gray-500">Expected July 2026</span>
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold flex items-center gap-1">
              <Award className="w-3 h-3" />
              Global Excellence Scholarship
            </span>
          </div>
        </motion.div>

        {/* Canisius College */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-100 rounded-2xl">
                <GraduationCap className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Canisius College</h3>
                <p className="text-gray-600">High School Diploma - Natural Sciences</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-500">July 2022 – May 2025</span>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
              Grade: 92.3 (Magna Cum Laude)
            </span>
          </div>

          {/* Activities Accordion */}
          <div className="mt-6">
            <button
              onClick={() => setShowActivities(!showActivities)}
              className="flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              <span>High School Activities</span>
              <motion.div
                animate={{ rotate: showActivities ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
            
            <motion.div
              initial={false}
              animate={{ height: showActivities ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showActivities ? 1 : 0, x: showActivities ? 0 : -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-primary-500 mt-1">•</span>
                    <span>{activity}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
