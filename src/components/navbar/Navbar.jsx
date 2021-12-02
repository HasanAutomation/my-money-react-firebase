import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { logout } = useLogout();

  const { user } = useAuth();

  const guestRoutes = (
    <>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/signup'>Signup</Link>
      </li>
    </>
  );

  const authRoutes = (
    <>
      <li>{user?.email}</li>
      <li>
        <button className='btn' onClick={logout}>
          Logout
        </button>
      </li>
    </>
  );

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>
        {user ? authRoutes : guestRoutes}
      </ul>
    </nav>
  );
}
