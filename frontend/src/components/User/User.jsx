import styles from './User.module.css';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function User() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
  }, []);

  function handleClick() {
    logout();
    navigate('/');
  }

  if (!userName) return null;

  return (
    <div className={styles.user}>
      <span>Welcome, {userName}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
