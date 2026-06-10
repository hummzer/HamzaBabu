import React from 'react';
import { ExternalLink, Github, Terminal, Cpu, ShieldCheck, Globe } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const projects = [
  {
    title: 'NEXUS',
    description: 'Central hub for portfolio, marketplace, and licensing.',
    tech: ['Next.js', 'Go', 'PostgreSQL', 'Stripe'],
    icon: Globe,
    link: '#',
    github: 'https://github.com/hummzer/HamzaBabu'
  },
  {
    title: 'AXIS',
    description: 'Lightweight offline AI assistant running on 4GB RAM.',
    tech: ['Rust', 'llama.cpp', 'Tauri', 'whisper.cpp'],
    icon: Cpu,
    link: '#',
    github: '#'
  },
  {
    title: 'CRUCIBLE',
    description: 'Isolated security sandbox for suspicious file analysis.',
    tech: ['React', 'Python', 'QEMU', 'YARA'],
    icon: ShieldCheck,
    link: '#',
    github: '#'
  },
  {
    title: 'CANOPY',
    description: 'Self-hosted developer OS for project management and deployment.',
    tech: ['Go', 'Docker SDK', 'Next.js', 'Prometheus'],
    icon: Terminal,
    link: '#',
    github: '#'
  }
];

const ProjectsPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Projects Showcase</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            A deliberate ecosystem of production-grade software across systems, AI, and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-indigo-50 rounded-xl">
                    <project.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="flex space-x-3">
                    <a href={project.github} className="text-gray-400 hover:text-gray-900 transition-colors">
                      <Github className="h-6 w-6" />
                    </a>
                    <a href={project.link} className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <ExternalLink className="h-6 w-6" />
                    </a>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-md uppercase tracking-wider">
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
