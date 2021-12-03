import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = collection => {
  const [isPending, setIsPending] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsPending(true);
    const ref = projectFirestore.collection(collection);

    const unsubscribe = ref.onSnapshot(
      snapshot => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(results);
        setError(null);
        setIsPending(false);
      },
      error => {
        setError(error.message);
        setIsPending(false);
      }
    );

    // unsubscribe
    return () => unsubscribe();
  }, [collection]);

  return { documents, error, isPending };
};
