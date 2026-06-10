import React from 'react';
import { ExternalLink, Cpu, Globe, Workflow, Code2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Layout from '../../components/layout/Layout';

const projects = [
  {
    title: 'NursingMedics',
    description: 'A comprehensive education platform for nursing school preparation, featuring interactive study materials and backend logic for student tracking.',
    tech: ['Next.js', 'Laravel', 'PHP', 'MySQL'],
    icon: Globe,
    link: '#',
    github: '#'
  },
  {
    title: 'Exquisite Hour',
    description: 'A modern luxury website built with a premium design aesthetic, featuring high-performance frontend delivery and a robust Prisma-backed database.',
    tech: ['Prisma', 'TypeScript', 'Next.js', 'Tailwind'],
    icon: Globe,
    link: '#',
    github: '#'
  },
  {
    title: 'Trading Bots & Systems',
    description: 'Advanced algorithmic trading tools and strategy systems translating complex market logic into mechanical execution flows.',
    tech: ['MQL5', 'MQL4', 'Pine Script'],
    icon: Cpu,
    link: '#',
    github: '#'
  },
  {
    title: 'HTML Template Automation',
    description: 'An n8n-powered workflow that generates professional HTML templates from raw source data, eliminating repetitive manual assembly.',
    tech: ['n8n', 'JSON', 'Automation'],
    icon: Workflow,
    link: '#',
    github: '#'
  },
  {
    title: 'Python Utility Suite',
    description: 'A collection of Python scripts for workflow automation, including YouTube playlist manipulation and repetitive task optimization.',
    tech: ['Python', 'Automation', 'CLI'],
    icon: Code2,
    link: '#',
    github: '#'
  }
];

const ProjectsPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-earth-rusty dark:text-white sm:text-5xl tracking-tight transition-colors">
            Projects Showcase
          </h1>
          <p className="mt-4 text-xl text-earth-moss dark:text-earth-tan/80 max-w-2xl mx-auto transition-colors">
            A practical portfolio of web products, automation systems, and algorithmic trading tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-earth-tan/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-earth-cream/50 dark:bg-earth-dark rounded-2xl">
                    <project.icon className="h-8 w-8 text-earth-rusty transition-colors" />
                  </div>
                  <div className="flex space-x-2">
                    <a href={project.github} className="p-2 text-earth-moss dark:text-earth-tan hover:text-earth-rusty dark:hover:text-white transition-colors">
                      <FaGithub className="h-5 w-5" />
                    </a>
                    <a href={project.link} className="p-2 text-earth-moss dark:text-earth-tan hover:text-earth-rusty dark:hover:text-white transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">{project.title}</h2>
                <p className="text-earth-moss dark:text-earth-tan/70 mb-6 leading-relaxed text-sm transition-colors">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-earth-tan/5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-earth-tan/10 text-earth-tan dark:text-earth-tan/80 text-[10px] font-bold rounded-full uppercase tracking-widest transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;
