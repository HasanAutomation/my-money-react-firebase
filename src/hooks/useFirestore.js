import { useEffect, useReducer, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

const IS_PENDING = 'IS_PENDING';
const ADDED_DOCUMENT = 'ADDED_DOCUEMENT';
const ERROR = 'ERROR';

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const firebaseReducer = (state, action) => {
  switch (action.type) {
    case IS_PENDING:
      return { isPending: true, document: null, error: null, success: false };
    case ADDED_DOCUMENT:
      return {
        ...state,
        isPending: false,
        error: null,
        success: true,
        document: action.payload,
      };
    case ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = collection => {
  const [response, dispatch] = useReducer(firebaseReducer, initialState);
  const [unMounted, setUnMounted] = useState(false);

  const ref = projectFirestore.collection(collection);

  const dispatchIfNotMounted = action => {
    if (!unMounted) dispatch(action);
  };

  // Add a document
  const addDocument = async doc => {
    dispatch({ type: IS_PENDING });
    try {
      // Firebase timestamp
      const createdAt = timestamp.fromDate(new Date());
      const returnedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotMounted({ type: ADDED_DOCUMENT, payload: returnedDocument });
    } catch (err) {
      dispatchIfNotMounted({ type: ERROR, payload: err.message });
    }
  };

  // Delete a document
  const deleteDocument = async id => {
    try {
      await ref.doc(id).delete();
    } catch (err) {
      console.log(err.message);
      dispatchIfNotMounted({ type: ERROR, payload: err.message });
    }
  };

  useEffect(() => {
    return () => setUnMounted(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
