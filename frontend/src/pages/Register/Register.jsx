import { useState } from 'react';
import styles from './Register.module.css';
import PageNav from '../../components/PageNav/PageNav.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';

export default function Register() {
  // PRE-FILL FOR DEV PURPOSES
  const [name, setName] = useState('Mohamed');
  const [email, setEmail] = useState('m@gmail.com');
  const [password, setPassword] = useState('12345678');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      navigate('/app');
    }
  };

  return (
    <main className={styles.register}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

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
          <Button type="primary">Register</Button>
        </div>

        <div className={styles.loginLink}>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </main>
  );
}
