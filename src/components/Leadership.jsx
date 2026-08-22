import { motion } from 'framer-motion';
import { Trophy, Building, Award, Briefcase } from 'lucide-react';
import Section from './Section';
import { staggerList, riseIn, headingIn } from '@/lib/motion';
const TigaDataLogo = '/images/tigadata.png?v=2';
const CaniMathLogo = '/images/Logo_CaniMath.png?v=2';
const CaniEngineeringLogo = '/images/caniengineering.png?v=2';

const leadership = [
  {
    title: 'TigaData Consulting',
    logo: TigaDataLogo,
    logoBg: 'bg-slate-800 border-slate-800',
    location: 'Coventry, UK',
    role: 'Founder',
    period: 'June 2025 – Present',
    description: 'Founded non-profit consultancy providing data analytics services to non-profit organisations and university societies. Manage team of four engineers across 5+ ongoing projects.',
    icon: Briefcase,
    highlight: true,
  },
  {
    title: 'CaniMath',
    logo: CaniMathLogo,
    logoBg: 'bg-[#cd0000] border-[#cd0000]',
    location: 'Canisius College, Jakarta',
    role: 'Founder & Chairman',
    period: 'October 2024 – June 2025',
    description:
      'Founded the "CaniMath" maths club in Canisius College as a forum for students to grow their interest in mathematics. ' +
      'Tutored peers and prepared them for mathematics competitions. ' +
      'Competed in several mathematics competitions.',
    icon: Building,
  },
  {
    title: 'CaniEngineering',
    logo: CaniEngineeringLogo,
    location: 'Canisius College, Jakarta',
    role: 'Co-Founder & Head of Treasury',
    period: 'July 2024 – June 2025',
    description:
      'Co-founded the "CaniEngineering" community in Canisius College for aspiring engineers. ' +
      'Secured funding and managed club finances (£1500), budgeting for community events. ' +
      'Organised a tour to a car parts factory to allow club members to gain insights into the engineering processes behind automotive parts production.',
    icon: Building,
  },
  {
    title: 'Badminton',
    location: 'Canisius College, Jakarta',
    role: 'School Team A Member',
    period: '2023 – 2025',
    description: '3rd Place Springfield Cup (February 2024). Active member of the school\'s competitive badminton team.',
    icon: Trophy,
  },
  {
    title: 'Committees',
    location: 'Canisius College, Jakarta',
    role: 'Member',
    period: '2024 – 2025',
    description: 'Active member of both the Canisius College Cup Committee and C-Excellence Committee, contributing to school event planning and excellence initiatives.',
    icon: Award,
  },
];

export default function Leadership() {
  return (
    <Section className="max-w-4xl mx-auto px-4">
      <motion.h2
        variants={headingIn}
        initial="hidden"
        animate="show"
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8"
      >
        Leadership &amp; Activities
      </motion.h2>

      <motion.div
        className="space-y-4 sm:space-y-6"
        variants={staggerList}
        initial="hidden"
        animate="show"
      >
        {leadership.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              variants={riseIn}
              whileHover={{ x: 4 }}
              className={`surface rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-shadow ${item.highlight ? 'ring-2 ring-primary-500/20' : ''}`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Header: logo + title/location (+ role/year on larger screens) */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Neutral container: the logos carry their own backgrounds, so a
                      coloured tile made them read as squares pasted onto blue. */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border flex-shrink-0 flex items-center justify-center overflow-hidden p-1.5 ${
                      item.logoBg ?? 'bg-white border-gray-200'
                    }`}
                  >
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={`${item.title} logo`}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                      {item.location && (
                        <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">{item.location}</span>
                      )}
                    </div>
                    {/* On laptop/tablet: show role + year inline with header */}
                    <div className="hidden sm:flex flex-col items-end text-right gap-0.5">
                      <p className="text-primary-700 font-medium text-xs sm:text-sm">{item.role}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">{item.period}</p>
                    </div>
                  </div>
                </div>

                {/* Body text: role, period, description, full-width under header */}
                <div className="text-left">
                  {/* On phones: keep role + year stacked above description */}
                  <div className="mb-1 sm:hidden">
                    <p className="text-primary-700 font-medium text-xs sm:text-sm">{item.role}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{item.period}</p>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
