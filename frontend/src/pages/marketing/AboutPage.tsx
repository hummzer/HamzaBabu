import React from 'react';
import { Download, Mail, MapPin, Calendar, BarChart3, Briefcase } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-body">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-earth-tan/10 p-8 text-center transition-colors">
              <div className="inline-block h-36 w-36 rounded-3xl overflow-hidden bg-earth-cream dark:bg-earth-dark mb-6 border-4 border-white dark:border-zinc-800 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="h-full w-full flex items-center justify-center text-earth-rusty">
                  <span className="text-5xl font-black font-mono">SH</span>
                </div>
              </div>
              <h1 className="text-3xl font-black font-heading text-earth-rusty dark:text-white transition-colors tracking-tight">Salim Hamza</h1>
              <p className="text-earth-tan font-extrabold font-accent mt-2 uppercase text-[10px] tracking-[0.2em]">Co-Founder @ 33 Solutions</p>
              
              <div className="mt-8 flex flex-col space-y-4 items-center text-sm text-earth-moss dark:text-earth-tan/60 transition-colors font-medium">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-earth-rusty" />
                  Nairobi, Kenya / Remote
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-earth-rusty" />
                  zaeh888@gmail.com
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="/assets/Salim_Hamza_CV.docx"
                  download="Salim_Hamza_CV.docx"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-xs font-black font-accent uppercase tracking-widest rounded-full text-white bg-earth-rusty hover:bg-earth-rusty/90 shadow-md hover:shadow-lg transition-all w-full justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-earth-tan/10 p-8 transition-colors">
              <h3 className="text-[10px] font-black font-accent text-earth-rusty uppercase tracking-[0.3em] mb-6 border-b border-earth-tan/10 pb-2">Skills Matrix</h3>
              <div className="flex flex-wrap gap-2">
                {['Go', 'Laravel', 'TypeScript', 'React', 'Next.js', 'Python', 'n8n', 'MQL5', 'Pine Script', 'PostgreSQL', 'Docker', 'Linux', 'Cybersecurity'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-earth-cream/30 dark:bg-earth-dark text-earth-moss dark:text-earth-tan/80 rounded-lg text-[9px] font-black font-sans uppercase tracking-wider border border-earth-tan/5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Biography & Story */}
          <div className="mt-12 lg:mt-0 lg:col-span-2 space-y-12">
            <section className="bg-white dark:bg-zinc-900 rounded-3xl p-10 border border-earth-tan/10 shadow-sm transition-colors">
              <h2 className="text-4xl font-black font-display text-earth-rusty dark:text-white mb-8 tracking-tighter">Open Source Explorer</h2>
              <div className="prose prose-stone dark:prose-invert lg:prose-lg max-w-none text-earth-moss dark:text-earth-tan/70 font-medium leading-relaxed">
                <p>
                  As the <strong>Co-Founder of 33 Solutions</strong>, I build practical software across web products, automation, trading systems, and technical tooling. My focus is on turning rough ideas into dependable systems using <strong>Next.js, Laravel, TypeScript, and Python</strong>.
                </p>
                <p>
                  My value lies in bridging product logic and implementation: understanding the problem, shaping the workflow, and delivering a working result without forcing unnecessary complexity.
                </p>
              </div>
            </section>

            {/* Stats Placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-earth-tan/10 shadow-sm transition-colors">
                <div className="flex items-center mb-6">
                  <BarChart3 className="h-5 w-5 mr-3 text-earth-rusty" />
                  <h3 className="text-sm font-black font-accent text-earth-rusty dark:text-white uppercase tracking-[0.2em]">WakaTime Stats</h3>
                </div>
                <div className="h-48 flex items-center justify-center bg-earth-cream/20 dark:bg-earth-dark rounded-2xl border border-dashed border-earth-tan/30">
                  <span className="text-earth-tan font-bold text-[10px] font-mono uppercase tracking-[0.3em] animate-pulse text-center px-4">Syncing Development Patterns...</span>
                </div>
              </section>

              <section className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-earth-tan/10 shadow-sm transition-colors">
                <div className="flex items-center mb-6">
                  <Calendar className="h-5 w-5 mr-3 text-earth-rusty" />
                  <h3 className="text-sm font-black font-accent text-earth-rusty dark:text-white uppercase tracking-[0.2em]">GitHub Activity</h3>
                </div>
                <div className="h-48 flex items-center justify-center bg-earth-cream/20 dark:bg-earth-dark rounded-2xl border border-dashed border-earth-tan/30">
                  <span className="text-earth-tan font-bold text-[10px] font-mono uppercase tracking-[0.3em] animate-pulse text-center px-4">Tracking Open Source Pulsar...</span>
                </div>
              </section>
            </div>

            <section>
              <h2 className="text-3xl font-black font-display text-earth-rusty dark:text-white mb-10 tracking-tight flex items-center">
                <Briefcase className="h-7 w-7 mr-4 text-earth-tan" />
                Professional Roadmap
              </h2>
              <div className="space-y-12">
                {[
                  {
                    year: 'CURRENT',
                    role: 'Co-Founder & Lead Engineer',
                    company: '33 Solutions',
                    description: 'Directing technical strategy and architecture for digital products, automation workflows, and specialized trading systems.'
                  },
                  {
                    year: '2026 - Present',
                    role: 'Freelance Developer',
                    company: 'Independent Projects',
                    description: 'Building full-stack web products, automation scripts, and custom technical tools including NursingMedics and Exquisite Hour.'
                  },
                  {
                    year: '2024 - 2026',
                    role: 'Systems Builder',
                    company: 'Algorithmic Trading Lab',
                    description: 'Translating complex market logic into mechanical trading systems using MQL4, MQL5, and Pine Script.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-12 border-l-2 border-earth-tan/20">
                    <div className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full ${item.year === 'CURRENT' ? 'bg-earth-rusty animate-ping' : 'bg-earth-tan'} opacity-75 shadow-sm`}></div>
                    <div className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full ${item.year === 'CURRENT' ? 'bg-earth-rusty' : 'bg-earth-tan'} border-4 border-white dark:border-zinc-900 shadow-sm`}></div>
                    
                    <span className="text-[10px] font-black font-accent text-earth-tan uppercase tracking-[0.3em]">{item.year}</span>
                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white mt-2 transition-colors leading-none">{item.role}</h3>
                    <p className="text-earth-rusty font-extrabold font-accent text-[11px] uppercase mt-2 tracking-widest transition-colors">{item.company}</p>
                    <p className="mt-5 text-earth-moss dark:text-earth-tan/70 text-base leading-relaxed transition-colors font-medium">{item.description}</p>
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
