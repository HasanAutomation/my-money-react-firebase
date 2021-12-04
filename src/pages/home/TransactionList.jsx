import React from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import styles from './Home.module.css';

function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions');
  return (
    <ul className={styles.transactions}>
      {transactions.map(transaction => (
        <li key={transaction.id} onClick={() => deleteDocument(transaction.id)}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
