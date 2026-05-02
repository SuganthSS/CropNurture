import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! Please log in.');
    }
  }, []);

  const triggerShake = () => { setIsShaking(true); setTimeout(() => setIsShaking(false), 500); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields.'); triggerShake(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); triggerShake(); return; }
    const result = login(email, password);
    if (result.success) { navigate('/dashboard', { replace: true }); }
    else { setError(result.error || 'Login failed.'); triggerShake(); }
  };

  return (
    <AuthLayout>
      <div className={isShaking ? 'animate-shake' : ''}>
        <h2 className="text-2xl font-display font-bold text-terra-900 mb-1">Welcome Back</h2>
        <p className="text-gray-400 text-sm mb-8">Sign in to access your farm dashboard</p>

        {successMessage && (
          <div className="mb-6 p-3 bg-terra-50 border border-terra-200 rounded-xl text-terra-700 text-sm font-medium flex items-center gap-2">
            <svg className="w-5 h-5 text-terra-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full bg-terra-50/50 border border-terra-100 rounded-xl py-3.5 pl-12 pr-4 text-gray-800 placeholder-gray-400 text-sm font-medium outline-none transition-all duration-300 focus:border-terra-400 focus:ring-2 focus:ring-terra-100 focus:bg-white hover:border-terra-200" />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input id="login-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full bg-terra-50/50 border border-terra-100 rounded-xl py-3.5 pl-12 pr-12 text-gray-800 placeholder-gray-400 text-sm font-medium outline-none transition-all duration-300 focus:border-terra-400 focus:ring-2 focus:ring-terra-100 focus:bg-white hover:border-terra-200" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-terra-600 transition-colors">
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-terra-600 text-white font-bold text-sm shadow-md shadow-terra-500/20 hover:bg-terra-500 hover:shadow-lg hover:shadow-terra-500/30 transition-all duration-300 transform active:scale-[0.98] mt-2">
            <span className="flex items-center justify-center gap-2">
              Sign In
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-xs text-gray-400 font-medium">NEW HERE?</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <Link to="/register" className="block w-full text-center py-3 rounded-xl border border-terra-200 text-terra-700 font-semibold text-sm hover:bg-terra-50 hover:border-terra-300 transition-all duration-300">
          Create an Account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
