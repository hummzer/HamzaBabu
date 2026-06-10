import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './pages/auth/LoginPage';
import AuthCallback from './pages/auth/AuthCallback';
import LandingPage from './pages/marketing/LandingPage';
import AboutPage from './pages/marketing/AboutPage';
import ProjectsPage from './pages/marketing/ProjectsPage';
import CertificationsPage from './pages/marketing/CertificationsPage';
import MarketplacePage from './pages/marketing/MarketplacePage';
import './App.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  return (
    <div className="min-h-screen bg-earth-cream/20 dark:bg-earth-dark p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-[2rem] shadow-xl p-10 border border-earth-tan/10 transition-colors duration-300">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black text-earth-rusty">Nexus Dashboard</h1>
            <p className="mt-2 text-earth-moss dark:text-earth-tan font-bold uppercase text-[10px] tracking-[0.3em]">Access Verified ✅</p>
          </div>
          <div className="h-16 w-16 bg-earth-cream dark:bg-earth-dark rounded-2xl flex items-center justify-center text-earth-rusty border border-earth-tan/20">
            <span className="text-2xl font-black">SH</span>
          </div>
        </div>
        
        <div className="space-y-6 border-t border-earth-tan/10 pt-10">
          <div className="bg-earth-cream/10 dark:bg-black/20 p-6 rounded-2xl border border-earth-tan/5">
            <span className="block text-[10px] font-black text-earth-tan uppercase tracking-widest mb-2">Connected Account</span>
            <span className="text-gray-900 dark:text-gray-100 font-bold">{user?.email}</span>
          </div>
          
          <div className="bg-earth-cream/10 dark:bg-black/20 p-6 rounded-2xl border border-earth-tan/5">
            <span className="block text-[10px] font-black text-earth-tan uppercase tracking-widest mb-2">Internal UUID</span>
            <span className="text-gray-600 dark:text-gray-400 font-mono text-xs">{user?.id}</span>
          </div>

          <div className="mt-6">
            <p className="text-[10px] font-black text-earth-tan uppercase tracking-widest mb-3 px-1">Session Token</p>
            <div className="bg-earth-cream/10 dark:bg-black/40 p-6 rounded-2xl border border-earth-tan/10 font-mono text-[10px] break-all text-earth-moss dark:text-earth-tan/40 leading-relaxed">
              {token}
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button 
            onClick={logout}
            className="px-8 py-3 bg-red-500/10 text-red-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all"
          >
            Terminal Session
          </button>
          <button className="flex-grow py-3 bg-earth-rusty text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-earth-rusty/90 transition-all shadow-lg shadow-earth-rusty/20">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/certifications" element={<CertificationsPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
