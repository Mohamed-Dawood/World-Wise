import { useState } from 'react';
import styles from './Login.module.css';
import PageNav from '../../components/PageNav/PageNav.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/app');
    }
  };

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
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
        
        <div className={styles.registerLink}>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </form>
    </main>
  );
}
