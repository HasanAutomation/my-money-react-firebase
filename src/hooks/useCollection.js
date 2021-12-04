import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
  const [isPending, setIsPending] = useState(false);
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState('');

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    setIsPending(true);
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

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
        console.log(error);
        setError(error.message);
        setIsPending(false);
      }
    );

    // unsubscribe
    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error, isPending };
};
