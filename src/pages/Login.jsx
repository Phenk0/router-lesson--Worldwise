import { useEffect, useState } from 'react';

import PageNav from '../components/PageNav.jsx';

import styles from './Login.module.css';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    if (email && login) login(email, password);
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="current-password"
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
