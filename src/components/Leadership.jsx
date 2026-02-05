import { motion } from 'framer-motion';
import { Trophy, Building, Award, Briefcase } from 'lucide-react';
import Section from './Section';

const leadership = [
  {
    title: 'TigaData Consulting',
    location: 'Coventry, UK',
    role: 'Founder',
    period: 'June 2025 – Present',
    description: 'Founded non-profit consultancy providing data analytics services to non-profit organisations and university societies. Manage team of four engineers across 5+ ongoing projects.',
    icon: Briefcase,
    highlight: true,
  },
  {
    title: 'CaniMath',
    role: 'Founder & Chairman',
    period: 'October 2024 – Present',
    description: 'Organized seminars and tutored students in mathematics, fostering a community of mathematical learning and excellence.',
    icon: Building,
  },
  {
    title: 'CaniEngineering',
    role: 'Co-Founder & Head of Treasury',
    period: 'July 2024 – May 2025',
    description: 'Organized factory tours and secured funding for engineering-focused initiatives and activities.',
    icon: Building,
  },
  {
    title: 'Badminton',
    role: 'School Team A Member',
    period: '2023 – 2025',
    description: '3rd Place Springfield Cup (February 2024). Active member of the school\'s competitive badminton team.',
    icon: Trophy,
  },
  {
    title: 'Committees',
    role: 'Member',
    period: '2024 – 2025',
    description: 'Active member of both the Canisius College Cup Committee and C-Excellence Committee, contributing to school event planning and excellence initiatives.',
    icon: Award,
  },
];

export default function Leadership() {
  return (
    <Section className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Leadership & Activities</h2>

      <div className="space-y-4 sm:space-y-6">
        {leadership.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 8 }}
              className={`glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all ${item.highlight ? 'ring-2 ring-primary-500/20' : ''}`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2.5 sm:p-3 ${item.highlight ? 'bg-primary-600' : 'bg-primary-600'} rounded-xl sm:rounded-2xl flex-shrink-0`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                    {item.location && (
                      <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">{item.location}</span>
                    )}
                  </div>
                  <p className="text-primary-600 font-medium text-xs sm:text-sm mb-1">{item.role}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">{item.period}</p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
