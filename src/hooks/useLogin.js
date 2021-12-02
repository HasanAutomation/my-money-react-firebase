import { useEffect, useState } from 'react';
import { LOGIN, useAuth } from '../context/AuthContext';
import { projectAuth } from '../firebase/config';

export const useLogin = () => {
  const [unMounted, setUnMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();

  async function login(email, password) {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      if (!res) throw new Error('Could not login,Try Again!');
      dispatch({ type: LOGIN, payload: res.user });
      if (!unMounted) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!unMounted) {
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    return () => setUnMounted(true);
  }, []);

  return { error, isPending, login };
};
