import { motion } from 'framer-motion';
import { Brain, BarChart3, Users, Code, Database } from 'lucide-react';
import Section from './Section';

const skillsData = [
  {
    category: 'Math & Stats',
    icon: Brain,
    skills: ['CTMC', 'Stochastic Modelling', 'Actuarial-Style Modelling'],
    color: 'bg-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
  },
  {
    category: 'Programming',
    icon: Code,
    skills: ['Python', 'R', 'JavaScript', 'MATLAB', 'VBA', 'HTML', 'CSS'],
    color: 'bg-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    category: 'Data Science',
    icon: BarChart3,
    skills: ['Supervised Learning', 'EDA', 'PCA', 'LightGBM', 'XGBoost'],
    color: 'bg-indigo-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
  },
  {
    category: 'Tools & Technologies',
    icon: Database,
    skills: ['SQL', 'OpenAI API', 'Supabase', 'Firebase', 'cPanel', 'LaTeX', 'PowerPoint'],
    color: 'bg-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
  },
  {
    category: 'Leadership',
    icon: Users,
    skills: ['Community Founding', 'Treasury Management', 'Event Planning'],
    color: 'bg-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
  },
];

export default function Skills() {
  return (
    <Section className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Skills</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {skillsData.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className={`inline-flex p-2.5 sm:p-3 ${category.color} rounded-xl sm:rounded-2xl mb-3 sm:mb-4`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{category.category}</h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className={`px-3 py-1.5 ${category.bgColor} ${category.textColor} rounded-full text-sm font-medium cursor-default`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
