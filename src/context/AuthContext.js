import { createContext, useContext, useEffect, useReducer } from 'react';
import { projectAuth } from '../firebase/config';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTH_IS_READY = 'AUTH_IS_READY';

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: AUTH_IS_READY, payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
