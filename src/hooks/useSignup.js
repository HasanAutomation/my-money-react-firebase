import { useEffect, useState } from 'react';
import { LOGIN, useAuth } from '../context/AuthContext';
import { projectAuth } from '../firebase/config';

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [unMounted, setUnMounted] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuth();

  async function signup(email, password, displayName) {
    try {
      setIsPending(true);
      setError(null);
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) throw new Error('Could not complete signup');
      res.user.updateProfile({ displayName });
      dispatch({ type: LOGIN, payload: res.user });
      if (!unMounted) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      console.log(err.message);
      if (!unMounted) {
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    return () => setUnMounted(true);
  }, []);

  return { signup, isPending, error };
};
