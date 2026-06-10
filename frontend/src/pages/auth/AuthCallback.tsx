import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    // If already authenticated, just go to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    // Prevent multiple executions in Strict Mode or re-renders
    if (processed.current) return;

    const token = searchParams.get('token');
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (token && id && email) {
      processed.current = true;
      login(token, { id, email, github_id: 0 });
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [searchParams, login, navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg">Authenticating...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
