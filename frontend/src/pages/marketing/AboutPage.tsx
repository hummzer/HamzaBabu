import React from 'react';
import { Download, Mail, MapPin } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="inline-block h-32 w-32 rounded-full overflow-hidden bg-gray-100 mb-4 border-4 border-white shadow-md">
                {/* Placeholder for profile pic */}
                <div className="h-full w-full flex items-center justify-center bg-indigo-50 text-indigo-400">
                  <span className="text-4xl font-bold font-mono">SH</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Salim Hamza</h1>
              <p className="text-indigo-600 font-medium mt-1">Full-Stack Systems Engineer</p>
              
              <div className="mt-6 flex flex-col space-y-3 items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Remote / World
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  salim@33solutions.dev
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="/assets/Salim_Hamza_CV.docx"
                  download="Salim_Hamza_CV.docx"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors w-full justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Skills Matrix</h3>
              <div className="flex flex-wrap gap-2">
                {['Go', 'Rust', 'TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AI/LLM', 'Security'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Biography & Story */}
          <div className="mt-12 lg:mt-0 lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
              <div className="prose prose-indigo prose-lg text-gray-500 max-w-none">
                <p>
                  I build serious software. My focus is on creating world-class open-source ecosystems that bridge the gap between high-level applications and low-level systems engineering.
                </p>
                <p>
                  As the co-founder of 33 Solutions, I lead the development of complex platforms across multiple domains including financial systems (trading EAs), offline-first AI assistants, and security sandboxes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience Timeline</h2>
              <div className="space-y-8">
                {[
                  {
                    year: '2026 - Present',
                    role: 'Co-Founder & Lead Engineer',
                    company: '33 Solutions',
                    description: 'Architecting the Nexus ecosystem and its underlying technologies.'
                  },
                  {
                    year: '2024 - 2026',
                    role: 'Senior Systems Developer',
                    company: 'Innovation Lab',
                    description: 'Developed high-frequency trading indicators and automated n8n workflows.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-8 border-l-2 border-gray-200">
                    <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-indigo-600"></div>
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">{item.year}</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{item.role}</h3>
                    <p className="text-gray-500 font-medium">{item.company}</p>
                    <p className="mt-2 text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
