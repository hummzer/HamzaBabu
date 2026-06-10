import React from 'react';
import { ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const certifications = [
  {
    title: 'BSc. Information Technology',
    issuer: 'JKUAT',
    date: '2026',
    description: 'Degree in Information Technology focusing on software engineering and systems.',
    link: '#'
  },
  {
    title: 'Cybersecurity Fundamentals',
    issuer: 'Credly / Cisco',
    date: '2025',
    description: 'Foundational knowledge in network security, ethical hacking, and risk management.',
    link: 'https://www.credly.com/users/salim-hamza.bea036d1'
  },
  {
    title: 'Full-Stack Web Development',
    issuer: 'Meta / Coursera',
    date: '2024',
    description: 'Professional certification covering modern frontend and backend frameworks.',
    link: '#'
  }
];

const CertificationsPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-earth-rusty dark:text-white sm:text-5xl tracking-tight transition-colors">
            Education & Credentials
          </h1>
          <p className="mt-4 text-xl text-earth-moss dark:text-earth-tan/80 max-w-2xl mx-auto transition-colors font-medium">
            Academic achievements and professional industry certifications.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {certifications.map((cert, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-earth-tan/10 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-earth-cream dark:bg-earth-dark rounded-2xl group-hover:scale-110 transition-transform">
                    <Award className="h-8 w-8 text-earth-rusty" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">{cert.title}</h2>
                    <p className="text-earth-rusty font-bold text-sm uppercase tracking-widest mt-1">{cert.issuer} • {cert.date}</p>
                    <p className="mt-4 text-earth-moss dark:text-earth-tan/70 leading-relaxed font-medium transition-colors">
                      {cert.description}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-2 border-2 border-earth-tan/20 text-sm font-black rounded-full text-earth-moss dark:text-earth-tan hover:bg-earth-rusty hover:text-white hover:border-earth-rusty transition-all"
                  >
                    View Credential
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-16 p-8 bg-earth-rusty/5 dark:bg-earth-rusty/10 rounded-3xl border border-earth-rusty/10 text-center">
            <CheckCircle2 className="h-10 w-10 text-earth-rusty mx-auto mb-4" />
            <p className="text-earth-moss dark:text-earth-tan font-bold uppercase tracking-widest text-xs">More coming soon</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Currently pursuing advanced certifications in Cloud Architecture and AI Systems.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CertificationsPage;
