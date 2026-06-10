import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import AuthCallback from './pages/auth/AuthCallback';
import './App.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900">Nexus Dashboard</h1>
        <p className="mt-4 text-green-600 font-medium">✅ Authentication Successful!</p>
        
        <div className="mt-8 space-y-4 border-t pt-6">
          <div className="grid grid-cols-3 gap-4">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="col-span-2 text-gray-600">{user?.email}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <span className="font-semibold text-gray-700">User ID:</span>
            <span className="col-span-2 text-gray-600 font-mono text-sm">{user?.id}</span>
          </div>
          <div className="mt-6">
            <p className="font-semibold text-gray-700 mb-2">Access Token:</p>
            <div className="bg-gray-50 p-4 rounded border font-mono text-xs break-all text-gray-500">
              {token}
            </div>
          </div>
        </div>

        <button 
          onClick={logout}
          className="mt-10 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

function AppRoutes() {
  return (
    <Routes>
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
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
