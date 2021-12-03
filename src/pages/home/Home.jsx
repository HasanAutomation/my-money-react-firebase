import { useAuth } from '../../context/AuthContext';
import styles from './Home.module.css';
import TransactionForm from './TransactionForm';
export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.content}>transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
