import { NavLink, useNavigate } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from '../Logo/Logo.jsx';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button/Button';

function PageNav() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <div className={styles.userSection}>
              <span className={styles.welcomeText}>Welcome, {user?.name}</span>
              <Button type="primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <NavLink to="/login" className={styles.ctaLink}>
                Login
              </NavLink>
              <NavLink to="/register" className={styles.ctaLink}>
                Register
              </NavLink>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
