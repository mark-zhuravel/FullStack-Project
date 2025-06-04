import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { UserMenu } from './UserMenu';
import { authService } from '../../services/authService';

type AuthMode = 'login' | 'signup' | null;

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export const AuthManager: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(null);
      const data = await authService.login(email, password);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setAuthMode(null);
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Ошибка при входе');
    }
  };

  const handleSignUp = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      await authService.register(name, email, password);
      // После успешной регистрации выполняем вход
      await handleLogin(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Ошибка при регистрации');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  const handleCloseModal = () => {
    setAuthMode(null);
    setError(null);
  };

  if (user) {
    return <UserMenu user={user} onLogout={handleLogout} />;
  }

  return (
    <>
      <div className="flex space-x-4">
        <button
          onClick={() => setAuthMode('login')}
          className="text-sm font-semibold hover:text-[#F2890F] transition-colors cursor-pointer"
        >
          Войти
        </button>
        <button
          onClick={() => setAuthMode('signup')}
          className="text-sm font-semibold hover:text-[#F2890F] transition-colors cursor-pointer"
        >
          Регистрация
        </button>
      </div>

      <Modal
        isOpen={authMode === 'login'}
        onClose={handleCloseModal}
        title="Вход"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
            {error}
          </div>
        )}
        <LoginForm
          onSubmit={handleLogin}
          onSignUpClick={() => setAuthMode('signup')}
        />
      </Modal>

      <Modal
        isOpen={authMode === 'signup'}
        onClose={handleCloseModal}
        title="Регистрация"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
            {error}
          </div>
        )}
        <SignUpForm
          onSubmit={handleSignUp}
          onLoginClick={() => setAuthMode('login')}
        />
      </Modal>
    </>
  );
}; 