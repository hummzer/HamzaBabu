import React from 'react';
import { Github } from 'lucide-react';

const LoginPage: React.FC = () => {
  const handleGitHubLogin = () => {
    // Redirect to backend which redirects to GitHub
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/login/github`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to Nexus</h2>
          <p className="mt-2 text-sm text-gray-600">Your digital headquarters</p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleGitHubLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Github className="h-5 w-5 text-gray-400 group-hover:text-gray-300" aria-hidden="true" />
            </span>
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
