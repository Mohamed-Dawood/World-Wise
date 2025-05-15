import Map from '../../components/Map/Map.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import User from '../../components/User/User.jsx';
import styles from './AppLayout.module.css';
import { useAuth } from '../../contexts/AuthContext.jsx';

function AppLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {isAuthenticated && <User />}
    </div>
  );
}

export default AppLayout;
