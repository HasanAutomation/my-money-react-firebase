import { useState } from 'react';
import { projectAuth } from '../firebase/config';

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  async function signup(email, password, displayName) {
    try {
      setIsPending(true);
      setError(null);
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);
      if (!res) throw new Error('Could not complete signup');
      res.user.updateProfile({ displayName });
      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  }
  return { signup, isPending, error };
};
