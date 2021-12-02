import { useEffect, useState } from 'react';
import { LOGOUT, useAuth } from '../context/AuthContext';
import { projectAuth } from '../firebase/config';

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [unMounted, setUnMounted] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();

  async function logout() {
    setError(null);
    setIsPending(true);
    try {
      await projectAuth.signOut();
      dispatch({ type: LOGOUT });
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
  return { logout, error, isPending };
};
