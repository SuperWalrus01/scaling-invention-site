import { motion } from 'framer-motion';
import { Award, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Section from './Section';
import { staggerList, riseIn, headingIn } from '@/lib/motion';
const WarwickLogo = '/images/Warwick_logo.png?v=2';
const CanisiusLogo = '/images/canisius.png?v=2';

const activities = [
  'Founder & Chairman, CaniMath Community',
  'Co-Founder & Head of Treasury, CaniEngineering',
  'Altar Boys Ministry Member',
  'Member, Canisius College Cup Committee',
  'Member, C-Excellence Committee',
  'Badminton Team Member (School Team A)',
];

const education = [
  {
    id: 'warwick-bsc',
    school: 'University of Warwick',
    qualification: 'BSc Mathematics and Statistics',
    period: '2026 – 2029',
    logo: WarwickLogo,
    logoAlt: 'University of Warwick logo',
    current: true,
    badges: [
      {
        label: 'Global Excellence Scholarship',
        icon: Award,
        className: 'bg-yellow-400 text-yellow-900',
      },
    ],
  },
  {
    id: 'warwick-foundation',
    school: 'University of Warwick',
    qualification: 'Foundation Degree in Mathematics & Statistics',
    period: 'September 2025 – June 2026',
    logo: WarwickLogo,
    logoAlt: 'University of Warwick logo',
    badges: [
      {
        label: 'Overall grade: 93',
        className: 'bg-primary-100 text-primary-700',
      },
      {
        label: 'Global Excellence Scholarship',
        icon: Award,
        className: 'bg-yellow-400 text-yellow-900',
      },
    ],
  },
  {
    id: 'canisius',
    school: 'Canisius College',
    qualification: 'High School Diploma - Natural Sciences',
    period: 'July 2022 – May 2025',
    logo: CanisiusLogo,
    logoAlt: 'Canisius College logo',
    badges: [
      {
        label: 'Grade: 92.3 (Magna Cum Laude)',
        className: 'bg-primary-100 text-primary-700',
      },
    ],
    activities,
  },
];

export default function Education() {
  const [showActivities, setShowActivities] = useState(false);

  return (
    <Section className="max-w-4xl mx-auto px-4">
      <motion.h2
        variants={headingIn}
        initial="hidden"
        animate="show"
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8"
      >
        Education
      </motion.h2>

      <motion.div
        className="space-y-6"
        variants={staggerList}
        initial="hidden"
        animate="show"
      >
        {education.map((item) => (
          <motion.div
            key={item.id}
            variants={riseIn}
            whileHover={{ y: -4 }}
            className={`surface rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow ${
              item.current ? 'ring-2 ring-primary-500/20' : ''
            }`}
          >
            {/* The institution logo is the real identifier, so it leads. Everything
                after it shares one left edge instead of stepping in and out. */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white border border-gray-200 flex items-center justify-center p-2">
                <img
                  src={item.logo}
                  alt={item.logoAlt}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-semibold leading-tight">{item.school}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.qualification}</p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                  <span className="text-sm text-gray-500">{item.period}</span>
                  {item.current && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                      Current
                    </span>
                  )}
                  {item.badges.map((badge) => {
                    const BadgeIcon = badge.icon;
                    return (
                      <span
                        key={badge.label}
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${badge.className}`}
                      >
                        {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
                        {badge.label}
                      </span>
                    );
                  })}
                </div>

            {/* Activities Accordion */}
            {item.activities && (
              <div className="mt-5">
                <button
                  onClick={() => setShowActivities(!showActivities)}
                  aria-expanded={showActivities}
                  className="flex items-center gap-2 text-primary-700 font-medium hover:text-primary-800 transition-colors"
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
                    {item.activities.map((activity, index) => (
                      <motion.div
                        key={activity}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: showActivities ? 1 : 0,
                          x: showActivities ? 0 : -10,
                        }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="text-primary-700 mt-1">•</span>
                        <span>{activity}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
