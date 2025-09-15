import React, { useState } from 'react';
import { User } from '../types';
import { Terminal, Shield, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'faculty' | 'staff' | 'admin'>('student');
  const [isBlinking, setIsBlinking] = useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      const user: User = {
        id: Math.random().toString(36).substring(2, 15),
        name,
        email,
        role
      };
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div 
              key={i} 
              className="border-green-400 border-opacity-30 border-r border-b animate-pulse"
              style={{ animationDelay: `${(i % 20) * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Terminal className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">SEAL UNIVERSITY</h1>
          </div>
          <div className="border border-green-400 p-4 mb-4">
            <p className="text-sm leading-relaxed">
              GRIEVANCE REDRESSAL PORTAL v1.0
              <br />
              <span className="text-green-300">
                [CLASSIFIED - SECURE CONNECTION ESTABLISHED]
              </span>
            </p>
          </div>
          <div className="border border-green-400 p-4 bg-green-400 bg-opacity-10">
            <div className="flex items-center mb-2">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-xs font-bold">ANONYMITY PROTOCOL ACTIVE</span>
            </div>
            <p className="text-xs text-green-300">
              All issues reported on this portal are recorded anonymously. 
              We will work to the best of our ability to resolve complaints efficiently.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">
              &gt; USER_TYPE:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full bg-black border border-green-400 text-green-400 p-3 focus:outline-none focus:border-green-300 font-mono"
            >
              <option value="student">STUDENT</option>
              <option value="faculty">FACULTY</option>
              <option value="staff">STAFF</option>
              <option value="admin">ADMIN</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">
              &gt; ENTER_NAME:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-green-400 text-green-400 p-3 focus:outline-none focus:border-green-300 font-mono placeholder-green-600"
              placeholder="John_Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              &gt; ENTER_EMAIL:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-green-400 text-green-400 p-3 focus:outline-none focus:border-green-300 font-mono placeholder-green-600"
              placeholder="user@seal.edu"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              &gt; ENTER_PASSWORD:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-green-400 text-green-400 p-3 focus:outline-none focus:border-green-300 font-mono placeholder-green-600"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black border-2 border-green-400 text-green-400 p-4 hover:bg-green-400 hover:text-black transition-colors duration-200 font-mono font-bold"
          >
            <div className="flex items-center justify-center">
              <Lock className="w-4 h-4 mr-2" />
              [INITIATE_CONNECTION]
              {isBlinking && <span className="ml-2">_</span>}
            </div>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs opacity-75">
          <p>&gt; SYSTEM_STATUS: ONLINE</p>
          <p>&gt; SECURITY_LEVEL: MAXIMUM</p>
          <p>&gt; CONNECTION: ENCRYPTED</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;