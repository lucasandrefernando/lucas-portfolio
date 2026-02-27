import { useState } from 'react';
import {
  Code2,
  Database,
  Zap,
  Brain,
  Layers,
  GitBranch,
  Smartphone,
  Shield,
} from 'lucide-react';

interface Skill {
  name: string;
  level: 'Sênior' | 'Pleno' | 'Júnior';
  icon: React.ReactNode;
  proficiency: number;
  category: 'Backend' | 'Frontend' | 'Database' | 'Tools' | 'AI/Automation';
}

const skills: Skill[] = [
  {
    name: 'PHP',
    level: 'Sênior',
    icon: <Code2 className="w-6 h-6" />,
    proficiency: 95,
    category: 'Backend',
  },
  {
    name: 'JavaScript',
    level: 'Pleno',
    icon: <Zap className="w-6 h-6" />,
    proficiency: 85,
    category: 'Backend',
  },
  {
    name: 'Node.js',
    level: 'Pleno',
    icon: <Layers className="w-6 h-6" />,
    proficiency: 80,
    category: 'Backend',
  },
  {
    name: 'React',
    level: 'Pleno',
    icon: <Code2 className="w-6 h-6" />,
    proficiency: 85,
    category: 'Frontend',
  },
  {
    name: 'HTML/CSS',
    level: 'Sênior',
    icon: <Smartphone className="w-6 h-6" />,
    proficiency: 90,
    category: 'Frontend',
  },
  {
    name: 'Tailwind CSS',
    level: 'Pleno',
    icon: <Layers className="w-6 h-6" />,
    proficiency: 85,
    category: 'Frontend',
  },
  {
    name: 'MySQL',
    level: 'Sênior',
    icon: <Database className="w-6 h-6" />,
    proficiency: 90,
    category: 'Database',
  },
  {
    name: 'SQL',
    level: 'Sênior',
    icon: <Database className="w-6 h-6" />,
    proficiency: 92,
    category: 'Database',
  },
  {
    name: 'Git',
    level: 'Pleno',
    icon: <GitBranch className="w-6 h-6" />,
    proficiency: 85,
    category: 'Tools',
  },
  {
    name: 'Docker',
    level: 'Pleno',
    icon: <Layers className="w-6 h-6" />,
    proficiency: 75,
    category: 'Tools',
  },
  {
    name: 'Linux/Ubuntu',
    level: 'Pleno',
    icon: <Shield className="w-6 h-6" />,
    proficiency: 85,
    category: 'Tools',
  },
  {
    name: 'ChatGPT/IA',
    level: 'Pleno',
    icon: <Brain className="w-6 h-6" />,
    proficiency: 80,
    category: 'AI/Automation',
  },
  {
    name: 'Automação de Processos',
    level: 'Sênior',
    icon: <Zap className="w-6 h-6" />,
    proficiency: 88,
    category: 'AI/Automation',
  },
];

const categories = ['Backend', 'Frontend', 'Database', 'Tools', 'AI/Automation'];

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = selectedCategory
    ? skills.filter((skill) => skill.category === selectedCategory)
    : skills;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Backend: 'from-blue-500 to-blue-600',
      Frontend: 'from-purple-500 to-purple-600',
      Database: 'from-green-500 to-green-600',
      Tools: 'from-orange-500 to-orange-600',
      'AI/Automation': 'from-pink-500 to-pink-600',
    };
    return colors[category] || 'from-blue-500 to-blue-600';
  };

  const getCategoryBg = (category: string) => {
    const colors: Record<string, string> = {
      Backend: 'bg-blue-50',
      Frontend: 'bg-purple-50',
      Database: 'bg-green-50',
      Tools: 'bg-orange-50',
      'AI/Automation': 'bg-pink-50',
    };
    return colors[category] || 'bg-blue-50';
  };

  const getCategoryBorder = (category: string) => {
    const colors: Record<string, string> = {
      Backend: 'border-blue-200',
      Frontend: 'border-purple-200',
      Database: 'border-green-200',
      Tools: 'border-orange-200',
      'AI/Automation': 'border-pink-200',
    };
    return colors[category] || 'border-blue-200';
  };

  const getLevelColor = (level: string) => {
    if (level === 'Sênior') return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (level === 'Pleno') return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    return 'bg-gradient-to-r from-green-500 to-emerald-500';
  };

  return (
    <section id="habilidades" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Habilidades Técnicas
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Expertise Técnica Consolidada
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mais de 10 anos de experiência em desenvolvimento e infraestrutura, combinando expertise em backend robusto com inovação em frontend moderno.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
            }`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg`
                  : `bg-white text-gray-700 border border-gray-300 hover:border-gray-900`
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${getCategoryBg(
                skill.category
              )} ${getCategoryBorder(skill.category)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${getCategoryColor(
                    skill.category
                  )} text-white`}
                >
                  {skill.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{skill.name}</h3>

              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Proficiência</span>
                  <span className="text-sm font-bold text-gray-900">{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getCategoryColor(skill.category)} transition-all duration-500`}
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-300">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {skill.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
