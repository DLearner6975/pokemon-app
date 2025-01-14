import { useState, useCallback } from 'react';
import { LoginHeader } from './login-header';
import { LoginModal, User } from './login-modal';

export function LoginManager() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = useCallback((user: User) => {
    setUser(user);
    setIsLoginModalOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <>
      <LoginHeader
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLogin}
      />
    </>
  );
}
